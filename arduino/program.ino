constexpr int sensor = 2;
volatile double signal{};

void setup() {
  Serial.begin(9600);
  pinMode(sensor, INPUT);
  attachInterrupt(digitalPinToInterrupt(sensor), pulse, RISING);
}

void loop() {
  Serial.println(signal);
  delay(500);
}

void pulse() {
  signal += 1.0 / 450;
}