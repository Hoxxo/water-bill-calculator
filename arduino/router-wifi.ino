#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "ap-pc-8024d4";
const char* password = "12345678";

// The server's IP address and port number
String serverName = "http://192.168.111.20:5200/data";

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }

  Serial.println("Connected to WiFi");
}

void loop() {
//   HTTPClient http;
//   http.begin(serverName);
//   http.addHeader("Content-Type", "application/x-www-form-urlencoded");
//   String postData = "message=12345";
//   int httpResponseCode = http.POST(postData);
//
//   if (httpResponseCode > 0) {
//     Serial.print("HTTP Response code: ");
//     Serial.println(httpResponseCode);
//     String payload = http.getString();
//     Serial.println(payload);
//   } else {
//     Serial.print("Error code: ");
//     Serial.println(httpResponseCode);
//   }
//   http.end();

  if (Serial.available()) {
    String payload = Serial.readStringUntil('\n');

    if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;

      String postData = "message=" + payload;

      int httpResponseCode = http.POST(postData);

      if (httpResponseCode > 0) {
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);
        String payload = http.getString();
        Serial.println(payload);
      } else {
        Serial.print("Error code: ");
        Serial.println(httpResponseCode);
      }

      http.end();
    } else {
      Serial.println("WiFi Disconnected");
    }
  }

  delay(500);
}
