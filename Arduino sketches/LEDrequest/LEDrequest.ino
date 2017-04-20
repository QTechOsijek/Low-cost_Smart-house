#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <ArduinoJson.h>

const int LEDpin = 2;

void setup() {

  Serial.begin(115200); //Serial connection
  WiFi.begin("CoWorking", "Coworking2013");   //WiFi connection

  while (WiFi.status() != WL_CONNECTED) {  //Wait for the WiFI connection completion
    delay(500);
    Serial.println("Waiting for connection");
  }

  pinMode(LEDpin, OUTPUT);
}

void loop() {
  
  StaticJsonBuffer<200> jsonBuffer;

  JsonObject& root = jsonBuffer.createObject();
  root["temperature"] = 0;
  if(WiFi.status()== WL_CONNECTED){   //Check WiFi connection status
    HTTPClient http;    //Declare object of class HTTPClient

    http.begin("http://192.168.102.107:8000/led");      //Specify request destination
    http.addHeader("Content-Type", "application/json");  //Specify content-type header
    root.printTo(Serial);

    String json;
    root.printTo(json);
    int httpCode = http.POST(json);   //Send the request
    String payload = http.getString();  //Get the response payload

    Serial.println(httpCode);   //Print HTTP return code
    Serial.println(payload);  //Print request response payload

    JsonObject& response = jsonBuffer.parseObject(payload);
    if (response["LED"] == "ON"){
      digitalWrite(LEDpin, HIGH);
    }else if (response["LED"] == "OFF"){
      digitalWrite(LEDpin, LOW);
    }
    
    http.end();  //Close connection
  }else{
    Serial.println("Error in WiFi connection");   
}

delay(1000);  //Send a request every 10 seconds

}
