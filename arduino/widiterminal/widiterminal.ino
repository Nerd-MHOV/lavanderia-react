//WiFiTerm full demo
//Please open Serial terminal and follow instructions

#include <ESP8266WiFi.h>
#include <DNSServer.h>
#include <ESP8266WebServer.h>

#include "WiFiTerm.h"

ESP8266WebServer server(80);

#define DNS_PORT        53

IPAddress apIP(192, 168, 1, 1);
DNSServer dnsServer;

void setup()
{

  Serial.begin(115200);
  term.link(Serial); //optional : echo every print() on Serial

  term.println("");
  term.println("**************");
  term.println("Program Start");
  term.println("**************");

  term.println("Welcome to WiFiTerm full demo example");

  //******************************************************

  // enable the wifi with the proper settings
  WiFi.mode(WIFI_AP);
  WiFi.softAPConfig(apIP, apIP, IPAddress(255, 255, 255, 0));
  WiFi.softAP("ArduinoTerminal", "");

  // if DNSServer is started with "*" for domain name, it will reply with
  // provided IP to all DNS request
  dnsServer.start(DNS_PORT, "*", apIP);

  // replay to all requests with same HTML
  server.onNotFound(requestNotFound);
  server.begin();
  term.begin(server);

  //******************************************************

  Serial.print("I'm waiting for you at http://");
  Serial.print(WiFi.localIP());
  Serial.println("/term.html");

  //term.unlink(); //optional : stop echo on Serial
  term.println("Welcome here");
  term.println("Please note that previous lines were printed BEFORE WiFiTerm connection");
  term.println("Now send me some text...");
}

void loop()
{
 server.handleClient();
 term.handleClient();

 if (term.available())
 {
 term.print("Ok I received : ");
 while (term.available())         //standard way
 {
 char c = term.read();
 term.print(c);
 }
 term.println();
 }

}