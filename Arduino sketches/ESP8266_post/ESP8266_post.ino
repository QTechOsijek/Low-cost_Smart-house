#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <ArduinoJson.h>

void setup() {

  Serial.begin(115200); //Serial connection
  WiFi.begin("PetarIvo", "perosero11122");   //WiFi connection

  while (WiFi.status() != WL_CONNECTED) {  //Wait for the WiFI connection completion
    delay(500);
    Serial.println("Waiting for connection");
  }
}

void loop() {
  
  StaticJsonBuffer<200> jsonBuffer;

  JsonObject& root = jsonBuffer.createObject();
  root["temperature"] = 0;
  if(WiFi.status()== WL_CONNECTED){   //Check WiFi connection status
    HTTPClient http;    //Declare object of class HTTPClient

    http.begin("http://192.168.1.14:8000/listen");      //Specify request destination
    http.addHeader("Content-Type", "application/json");  //Specify content-type header
    root.printTo(Serial);

    String json;
    root.printTo(json);
    int httpCode = http.POST(json);   //Send the request
    String payload = http.getString();  //Get the response payload

    Serial.println(httpCode);   //Print HTTP return code
    Serial.println(payload);    //Print request response payload
    
    http.end();  //Close connection
  }else{
    Serial.println("Error in WiFi connection");   
}

delay(10000);  //Send a request every 10 seconds

}
