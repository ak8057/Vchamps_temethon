# EcoSystem 360 - Smart Waste Classification

## 📌 Project Overview
EcoSystem 360 is an AI-powered smart waste classification system that automates waste sorting using object detection. It categorizes waste into **Recyclable, Biodegradable, and Reusable** items, enabling efficient waste management. This system integrates **YOLO-based object detection** with OpenCV and a live camera feed to classify waste in real time.

## 🎯 Features
- **Real-time Waste Detection** using a lightweight YOLO-based model.
- **Multiple Waste Categories:**
  - **Recyclable (Blue Bounding Box)**: Plastic bottles, cans, books, boxes.
  - **Biodegradable (Green Bounding Box)**: Fruits (e.g., banana).
  - **Reusable (Yellow Bounding Box)**: Clothes.
- **Multiple Model Integration**: Merges different models to detect both recyclable and biodegradable waste in a single image.
- **Edge & Cloud Processing**: Can work on edge devices and supports cloud integration.
- **IoT & Smart Bin Integration**: Part of a larger **EcoSystem 360** initiative to revolutionize waste management.

## 🖥️ Tech Stack
- **Programming Language**: Python
- **Libraries & Frameworks**: OpenCV, TensorFlow, Keras, YOLO
- **Hardware (Optional)**: Camera module for real-time detection

## 📁 Project Structure
```
📂 EcoSystem360
├── 📁 models                 # Pretrained models
│   ├── cnn_trash_classification_model.h5
│   ├── biodegradable.keras
├── 📁 data                   # Sample images & datasets
├── 📁 scripts                # Code for waste classification
│   ├── detection.py          # Main script for object detection
│   ├── utils.py              # Helper functions
├── 📁 results                # Outputs & logs
├── README.md                 # Project documentation
```

## 🛠️ Installation & Setup
1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/EcoSystem360.git
   cd EcoSystem360
   ```
2. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```
3. **Run the Detection Script**
   ```bash
   python scripts/detection.py
   ```

## 📸 Screenshots
_Add screenshots of the model in action here._

## 🏆 Future Enhancements
- Improve detection accuracy with a custom YOLO model.
- Add reject waste category for non-recyclable items.
- Integrate an IoT-based smart bin system for waste management automation.

## 🤝 Contributing
Feel free to contribute! Fork the repository, create a feature branch, and submit a pull request.

## 📜 License
This project is licensed under the **MIT License**.

## 📞 Contact
For queries, reach out via [your email] or connect on LinkedIn.
