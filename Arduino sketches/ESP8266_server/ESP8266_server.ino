#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>
#include <ArduinoJson.h>
#include <Servo.h>

MDNSResponder mdns;

// Replace with your network credentials
const char* ssid = "PetarIvo2";
const char* password = "perosero11122";

ESP8266WebServer server(80);

String webPage = "";

const int LEDpin = 13;
Servo servo;

void setup(void){
  webPage += "<h1>ESP8266 Web Server</h1>";

  pinMode(LEDpin, OUTPUT);
  servo.attach(12);
  
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  Serial.println("");

  // Wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  
  if (mdns.begin("esp8266", WiFi.localIP())) {
    Serial.println("MDNS responder started");
  }
  
  server.on("/", handleRequest);
    /*StaticJsonBuffer<200> jsonBuffer;
    JsonObject& root = jsonBuffer.parseObject(server.arg("plain"));
    root.printTo(Serial);*/
 
  server.begin();
  Serial.println("HTTP server started");
}
 
void loop(void){
  server.handleClient();
} 

void handleRequest(){
  server.send(200, "text/plain", "OK");
  
  StaticJsonBuffer<200> jsonBuffer;
  JsonObject& root = jsonBuffer.parseObject(server.arg("plain"));
  root.printTo(Serial);
  Serial.println("");

  //LED control
  String LEDvalue = root["LED"];
  Serial.print("Value of LED: ");
  Serial.println(LEDvalue);

  if (LEDvalue == "ON"){
    digitalWrite(LEDpin, HIGH);
  }
  else if(LEDvalue == "OFF"){
    digitalWrite(LEDpin, LOW);
  }

  //Servo control
  String servoValue = root["servo"];
  if(servoValue == "open"){
    servo.write(120);
    delay(500);
    servo.write(90);
  }
  else if(servoValue == "close"){
    servo.write(60);
    delay(500);
    servo.write(90);
  }
}
