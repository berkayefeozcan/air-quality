#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#define MQ2_SENSOR A0
#define MQ135_SENSOR D1
// WiFi
const char *ssid = "GM";              
const char *password = "nodemcu1234"; 
// MQTT Broker
const char *mqtt_broker = "192.168.43.219"; 
const char *topic_2 = "iot_proje/mq2";
const char *topic_135 = "iot_proje/mq135";
const int mqtt_port = 1883;
int mq2_veri;
int mq135_veri;
char cstr[16];

WiFiClient espClient;
PubSubClient client(espClient);
  
void setup()
{
    // Set software serial baud to 115200;
    Serial.begin(115200);
    pinMode(MQ135_SENSOR, INPUT);
    pinMode(LED_BUILTIN, OUTPUT);
    // connecting to a WiFi network
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.println("Connecting to WiFi..");
    }

    Serial.println("Connected to the WiFi network");
    digitalWrite(LED_BUILTIN, HIGH);
    //connecting to a mqtt broker
    client.setServer(mqtt_broker, mqtt_port);
    client.setCallback(callback);

    while (!client.connected())
    {
        String client_id = "esp8266-client-";
        client_id += String(WiFi.macAddress());

        Serial.printf("The client %s connects to mosquitto mqtt broker\n", client_id.c_str());

        if (client.connect(client_id.c_str()))
        {
            Serial.println("Public emqx mqtt broker connected");
        }
        else
        {
            Serial.print("failed with state ");
            Serial.print(client.state());
            delay(2000);
        }
    }

    // publish and subscribe
   // client.publish(topic_2, "Hello From ESP8266!");
    //client.subscribe(topic);
}
void callback(char *topic, byte *payload, unsigned int length)
{
    Serial.print("Message arrived in topic: ");
    Serial.println(topic);
    Serial.print("Message:");

    for (int i = 0; i < length; i++)
    {
        Serial.print((char)payload[i]);
    }

    Serial.println();
    Serial.println(" - - - - - - - - - - - -");
}
void loop()
{
    mq2_veri = analogRead(MQ2_SENSOR);
    mq135_veri = digitalRead(MQ135_SENSOR);
    itoa(mq2_veri,cstr,10);
    client.publish(topic_2,cstr);
    itoa(mq135_veri,cstr,10);
    client.publish(topic_135,cstr);
    client.loop();
    delay(1000);
}
