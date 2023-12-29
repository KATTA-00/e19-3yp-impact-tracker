#pragma once

#include <Arduino.h>

#include "communications/wifi.h"
#include "communications/mqtt.h"
#include "utils/eeprom.h"

#define BAUD_RATE 9600
#define ID 1

String ssid = "";
String password = "";

String ssid_default = "";
String password_defalt = "";

// MQTT Broker
const char *mqtt_broker = "broker.emqx.io";
const char *topic = "emqx/esp32";
const char *mqtt_username = "emqx";
const char *mqtt_password = "public";
const int mqtt_port = 1883;

String BUDDY_ID = "buddy-";