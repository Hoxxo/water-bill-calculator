#include <WiFi.h>
#include <HTTPClient.h>

// Set your Wi-Fi credentials
const char* ssid     = "your_SSID";
const char* password = "your_PASSWORD";

constexpr int sensor = 2;
volatile double signal{};

// Create an instance of the HTTPClient class
HTTPClient http;

void setup() {
  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");

  pinMode(sensor, INPUT);
  attachInterrupt(digitalPinToInterrupt(sensor), pulse, RISING);
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {   //Check the current connection status
    http.begin("http://localhost:5000/data"); //Specify the URL
    http.addHeader("Content-Type", "application/x-www-form-urlencoded");  //Specify content-type header

    int httpResponseCode = http.POST(String(signal));   //Send the actual POST request

    if (httpResponseCode > 0) {
      String response = http.getString(); //Get the response to the request
      Serial.println(httpResponseCode);   //Print return code
      Serial.println(response);           //Print request answer
    } else {
      Serial.print("Error on sending POST: ");
      Serial.println(httpResponseCode);
    }

    http.end();  //Free resources
  }

  delay(500);
}

void pulse() {
  signal += 1.0 / 450;
}
