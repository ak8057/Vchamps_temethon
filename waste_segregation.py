import argparse
import sys
import time
import cv2
import mediapipe as mp
import RPi.GPIO as GPIO
import pigpio
from picamera2 import Picamera2
from mediapipe.tasks import python
from mediapipe.tasks.python import vision
from utils import visualize

class WasteSegregationSystem:
    def _init_(self):
        # Initialize camera
        self.picam2 = Picamera2()
        self.picam2.preview_configuration.main.size = (640, 480)
        self.picam2.preview_configuration.main.format = "RGB888"
        self.picam2.preview_configuration.align()
        self.picam2.configure("preview")
        self.picam2.start()

        # FPS tracking
        self.counter = 0
        self.fps = 0
        self.start_time = time.time()
        self.fps_avg_frame_count = 10

        # Servo control setup
        self.COMPARTMENT_SERVO_PIN = 17  # For selecting compartment
        self.FLAP_SERVO_PIN = 23        # For operating the flap
        self.setup_motors()

        # Detection visualization parameters
        self.row_size = 50
        self.left_margin = 24
        self.text_color = (0, 0, 0)
        self.font_size = 1
        self.font_thickness = 1

        # Servo positions for four compartments
        # Angles are distributed evenly across 180 degrees
        self.COMPARTMENT_POSITIONS = {
            "COMPOST_WASTE": 0,      # 0 degrees for compartment 1
            "RECYCLABLE":90 ,        # 60 degrees for compartment 2
            "NON_RECYCLABLE_WASTE": 180,    # 120 degrees for compartment 3
            "REUSABLE": 90          # 180 degrees for compartment 4
        }

    def setup_motors(self):
        """Initialize GPIO for servo motors"""
        self.pi = pigpio.pi()
        if not self.pi.connected:
            raise RuntimeError("Failed to connect to pigpio daemon")
            
        # Setup servo pins
        self.pi.set_mode(self.COMPARTMENT_SERVO_PIN, pigpio.OUTPUT)
        self.pi.set_mode(self.FLAP_SERVO_PIN, pigpio.OUTPUT)
        
        # Initialize servos to starting position
        self.move_compartment(0)  # Move to initial position
        self.operate_flap(0)      # Close flap

    def move_compartment(self, angle):
        """Control compartment selection servo"""
        # Ensure angle is within valid range
        angle = max(0, min(180, angle))
        duty = int((angle / 180.0) * 2000 + 500)  # Convert angle to pulse width
        self.pi.set_servo_pulsewidth(self.COMPARTMENT_SERVO_PIN, duty)
        # Increased delay for more stable positioning with four compartments
        time.sleep(1.2)  # Give servo time to reach position

    def operate_flap(self, angle):
        """Control flap servo"""
        # Ensure angle is within valid range
        angle = max(0, min(180, angle))
        duty = int((angle / 180.0) * 2000 + 500)  # Convert angle to pulse width
        self.pi.set_servo_pulsewidth(self.FLAP_SERVO_PIN, duty)
        time.sleep(0.5)  # Give servo time to reach position

    def handle_detection(self, detections):
        """Process detected objects and control servos"""
        if not detections:
            return
            
        for detection in detections.detections:
            category = detection.categories[0]
            if category.score > 0.5:  # Adjust confidence threshold as needed
                category_name = category.category_name
                if category_name in self.COMPARTMENT_POSITIONS:
                    print(f"Detected {category_name} with confidence {category.score:.2f}")
                    print(f"Moving to compartment position: {self.COMPARTMENT_POSITIONS[category_name]} degrees")
                    
                    # Move to correct compartment
                    self.move_compartment(self.COMPARTMENT_POSITIONS[category_name])
                    time.sleep(0.5)  # Wait for compartment to position
                    
                    # Operate flap
                    self.operate_flap(90)  # Open flap
                    time.sleep(1)     # Wait for item to fall
                    self.operate_flap(0)   # Close flap
                    
                    # Return to home position
                    time.sleep(0.5)
                    self.move_compartment(0)
                    print("Returned to home position")

    def run(self, model: str, max_results: int, score_threshold: float):
        """Main detection and control loop"""
        detection_result_list = []
        detection_frame = None

        def save_result(result, unused_output_image, timestamp_ms):
            if self.counter % self.fps_avg_frame_count == 0:
                self.fps = self.fps_avg_frame_count / (time.time() - self.start_time)
                self.start_time = time.time()
            detection_result_list.append(result)
            self.counter += 1

        # Initialize detector
        base_options = python.BaseOptions(model_asset_path=model)
        options = vision.ObjectDetectorOptions(
            base_options=base_options,
            running_mode=vision.RunningMode.LIVE_STREAM,
            max_results=max_results,
            score_threshold=score_threshold,
            result_callback=save_result)
        detector = vision.ObjectDetector.create_from_options(options)

        try:
            while True:
                # Capture and process image
                image = cv2.flip(cv2.resize(self.picam2.capture_array(), (640, 480)), -1)
                rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
                mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb_image)

                # Run detection
                detector.detect_async(mp_image, time.time_ns() // 1_000_000)

                # Show FPS
                fps_text = f'FPS = {self.fps:.1f}'
                cv2.putText(image, fps_text, (self.left_margin, self.row_size),
                          cv2.FONT_HERSHEY_DUPLEX, self.font_size, self.text_color,
                          self.font_thickness, cv2.LINE_AA)

                if detection_result_list:
                    current_frame = visualize(image, detection_result_list[0])
                    self.handle_detection(detection_result_list[0])
                    detection_frame = current_frame
                    detection_result_list.clear()

                if detection_frame is not None:
                    cv2.imshow('Waste Detection', detection_frame)

                if cv2.waitKey(1) == 27:  # ESC to exit
                    break

        finally:
            detector.close()
            cv2.destroyAllWindows()
            self.cleanup()

    def cleanup(self):
        """Cleanup resources"""
        # Center compartment servo and close flap before shutting down
        self.move_compartment(0)
        self.operate_flap(0)
        time.sleep(0.5)
        
        # Stop servo signals
        self.pi.set_servo_pulsewidth(self.COMPARTMENT_SERVO_PIN, 0)
        self.pi.set_servo_pulsewidth(self.FLAP_SERVO_PIN, 0)
        
        # Cleanup
        self.pi.stop()
        self.picam2.stop()

def main():
    parser = argparse.ArgumentParser(formatter_class=argparse.ArgumentDefaultsHelpFormatter)
    parser.add_argument('--model', help='Path of the object detection model.',
                       required=False, default='best.tflite')
    parser.add_argument('--maxResults', help='Max number of detection results.',
                       required=False, default=5)
    parser.add_argument('--scoreThreshold', help='The score threshold of detection results.',
                       required=False, type=float, default=0.25)
    args = parser.parse_args()

    system = WasteSegregationSystem()
    system.run(args.model, int(args.maxResults), args.scoreThreshold)

if _name_ == '_main_':
    main()l
