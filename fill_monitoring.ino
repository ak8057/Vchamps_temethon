#include <ESP8266WebServer.h>
#include <ArduinoJson.h>
#include <ESP8266WiFi.h>

const char* ssid = "vishnu1";
const char* password = "271103@@@";

ESP8266WebServer server(80);

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  // Handle CORS pre-flight requests
  server.on("/fill", HTTP_OPTIONS, []() {
    server.sendHeader("Access-Control-Allow-Origin", "*");
    server.sendHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    server.sendHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    server.send(204);
  });

  // Handle actual data requests
  server.on("/fill", HTTP_GET, handleFillData);
  
  server.begin();
}

void loop() {
  server.handleClient();
}

void handleFillData() {
  // Set CORS headers for the main request
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.sendHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  server.sendHeader("Access-Control-Allow-Headers", "Content-Type");
  
  // Create JSON response
  StaticJsonDocument<1024> doc;
  JsonArray bins = doc.createNestedArray("bins");
  
  // Add bin data
  JsonObject bin1 = bins.createNestedObject();
  bin1["id"] = "BIN001";
  bin1["fillLevel"] = getFillLevel(1);  // Replace with your sensor reading
  bin1["temperature"] = getTemperature(1);  // Replace with your sensor reading
  bin1["status"] = "Normal";
  
  JsonObject bin2 = bins.createNestedObject();
  bin2["id"] = "BIN002";
  bin2["fillLevel"] = getFillLevel(2);
  bin2["temperature"] = getTemperature(2);
  bin2["status"] = "Normal";
  
  String jsonString;
  serializeJson(doc, jsonString);
  
  server.send(200, "application/json", jsonString);
}

// Example sensor reading functions - replace with your actual sensor code
int getFillLevel(int binNumber) {
  // Replace with actual ultrasonic sensor reading
  return random(0, 100);  // For testing only
}

int getTemperature(int binNumber) {
  // Replace with actual temperature sensor reading
  return random(20, 30);  // For testing only
}
