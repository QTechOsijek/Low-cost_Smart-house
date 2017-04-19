#include <Servo.h>
Servo myServo;

void setup() {
  myServo.attach(13);

}

void loop() {
  myServo.write(180);
  delay(500);
  myServo.write(90);
  delay(5000);
  myServo.write(10);
  delay(500);
  myServo.write(90);
  delay(10000);
}
