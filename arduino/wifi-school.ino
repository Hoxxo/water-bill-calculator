#include <WiFi.h>
#include <HTTPClient.h>
#include <esp_wpa2.h> // Include library for enterprise networks

const char* ssid = "";
const char* EAP_IDENTITY = ""; // This might be the same as your username
const char* EAP_USERNAME = ""; // your enterprise network username

// Server to send data
String serverName = "http://10.96.212.68:5200/data";
WiFiClientSecure client;

// Variable to hold the data from Arduino
String payload = "1111111";

void setup() {
  Serial.begin(115200);

  WiFi.disconnect(true);
  WiFi.mode(WIFI_STA);

  WiFi.begin(ssid, WPA2_AUTH_PEAP, EAP_IDENTITY, EAP_USERNAME, EAP_PASSWORD);

  int connectionAttempts = 0;
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
    connectionAttempts++;
    if (connectionAttempts > 20) {  // After 20 seconds timeout stop further attempts
      Serial.println("Failed to connect to WiFi. Please check your WiFi credentials and network status.");
      return;
    }
  }
  Serial.println("Connected to WiFi");

  // Immediately send a POST request after WiFi connection
  HTTPClient http;
  if (http.begin(client, serverName)) {  // Specify the client and URL
    String postData = "message=Connection established!"; // Set your message
    http.addHeader("Content-Type", "application/x-www-form-urlencoded");
    int httpResponseCode = http.POST(postData);

    // Print HTTP response code to the serial monitor
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);

    // If you need to read response from the server:
    if (httpResponseCode > 0) {
      String payload = http.getString();
      Serial.println("Response: " + payload);
    }

    http.end();  // Close connection
  } else {
    Serial.println("Failed to initialize HTTP client");
  }
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) { // Check WiFi connection status
    if (Serial.available()) {
      Serial.println("Read!");
      payload = Serial.readStringUntil('\n');

      HTTPClient http;
      http.begin(serverName);

      // Add this line to send data as form data
      String postData = "message=" + payload;

      // Change Content-Type to application/x-www-form-urlencoded
      http.addHeader("Content-Type", "application/x-www-form-urlencoded");

      // Use postData in the POST request
      int httpResponseCode = http.POST(postData);

      //... process the response ...
    }
  } else {
    Serial.println("WiFi Disconnected");
    WiFi.begin(ssid, WPA2_AUTH_PEAP, EAP_IDENTITY, EAP_USERNAME, EAP_PASSWORD); // Try to reconnect
  }
  delay(500);
}
