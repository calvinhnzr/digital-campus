#include <Arduino.h>
#include <WiFi.h>
#include <ArduinoJson.h>
#include <PubSubClient.h>
#include "Ultrasonic.h"

void wifiSetup();
void reconnect();
// void callback(char*, byte*, unsigned int);

void publishTrigger(int, String, String);

const char* ssid = "iPhone floseph";
const char* password = "supersecret1177";

const char* mqqt_server = "broker.hivemq.com";

Ultrasonic ultrasonicOutside(18);
Ultrasonic ultrasonicInside(24);

const int triggerDistanceOutside = 50;
const int triggerDistanceInside = 60;


WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  Serial.begin(9600);
  wifiSetup();
  client.setServer(mqqt_server, 1883);
  // client.setCallback(callback);
  reconnect();
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  long rangeInCentimetersEntrance = ultrasonicOutside.MeasureInCentimeters();
  long rangeInCentimetersExit = ultrasonicInside.MeasureInCentimeters();

  if(rangeInCentimetersEntrance < triggerDistanceOutside){
    publishTrigger(1, "test-room", "outside");
  }

  if(rangeInCentimetersExit < triggerDistanceInside){
    publishTrigger(2, "test-room", "inside");
  }
}

void wifiSetup() {
  WiFi.begin(ssid, password);

  while(WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to Wifi..");
  }
  Serial.println("Connected to the Wifi network");
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Create a random client ID
    String clientId = "ESP32Client-";
    clientId += String(random(0xffff), HEX);
    // Attempt to connect
    if (client.connect(clientId.c_str())) {
      //connected to Server
      Serial.println("connected");
      // subscripe to specific street channel. Street No. 1 in this example
      client.subscribe("/ep-thkoeln/digitalcampus/1");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void publishTrigger(int id, String room, String position) {
  const int capacity = JSON_OBJECT_SIZE(3);
  StaticJsonDocument<capacity> doc;
  doc["id"] = id;
  doc["room"] = room;
  doc["positon"] = position;

  char output[128];
  serializeJson(doc, output);
  client.publish("/ep-thkoeln/digitalcampus/1", output);
}