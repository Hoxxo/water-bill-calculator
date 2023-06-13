#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <HTTPClient.h>

const char* ssid = "";
const char* password = "";

// server to send data
String serverName = "http://server-name:port/data";
WiFiClientSecure client;

// variable to hold the data from Arduino
String payload;

void setup() {
  Serial.begin(115200);  // Make sure the baud rate matches with Arduino
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
}

void loop() {
  if (Serial.available()) {
    Serial.println("read!");
    payload = Serial.readStringUntil('\n');
    if (WiFi.status() == WL_CONNECTED) { //Check WiFi connection status
      HTTPClient http;
      http.begin(serverName);

      // Add this line to send data as form data
      String postData = "message=" + payload;

      // Change Content-Type to application/x-www-form-urlencoded
      http.addHeader("Content-Type", "application/x-www-form-urlencoded");

      // Use postData in the POST request
      int httpResponseCode = http.POST(postData);

      //...
    }
    else {
      Serial.println("WiFi Disconnected");
    }
  }
  delay(500);
}