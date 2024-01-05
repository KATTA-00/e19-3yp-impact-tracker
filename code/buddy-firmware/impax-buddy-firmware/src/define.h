#pragma once

#include <Arduino.h>
#include "communications/wifi.h"
#include "communications/mqtt.h"
#include "utils/eeprom.h"
#include "utils/util.h"

#include "communications/com.h"

#define BAUD_RATE 9600
#define ID 1
String BUDDY_ID = "buddy-";

// WIFI
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

String CA_cert =
    "-----BEGIN CERTIFICATE-----\n"
    "################################################################\n"
    "################################################################\n"
    "################################################################\n"
    "-----END CERTIFICATE-----";

String ESP_CA_cert =
    "-----BEGIN CERTIFICATE-----\n"
    "################################################################\n"
    "################################################################\n"
    "################################################################\n"
    "-----END CERTIFICATE-----";

String ESP_RSA_key =
    "-----BEGIN RSA PRIVATE KEY-----\n"
    "################################################################\n"
    "################################################################\n"
    "################################################################\n"
    "-----END RSA PRIVATE KEY-----";