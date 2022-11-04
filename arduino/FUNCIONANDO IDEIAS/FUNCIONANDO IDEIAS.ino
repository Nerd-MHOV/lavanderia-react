#include <WiFi.h>
#include <WiFiClient.h>
#include <WebServer.h>
#include <Adafruit_Fingerprint.h> //https://github.com/adafruit/Adafruit-Fingerprint-Sensor-Library
#include <ESPmDNS.h>


const char* ssid     = "FundacaoCEU"; //Grupo Peraltas
const char* password = "";

IPAddress ip(192,168,10,85);
IPAddress gateway(192,168,10,37);
IPAddress subnet(255,255,255,0);
IPAddress dns(192,168,10,4);

WebServer server(80);

const int led = 13;

//Senha padrão do sensor de digitais
const uint32_t passwordLeitor = 0x0;
Adafruit_Fingerprint fingerprintSensor = Adafruit_Fingerprint(&Serial2, passwordLeitor);

void handleRoot() {
  digitalWrite(led, 1);
  server.send(200, "text/plain", "hello from esp32!");
  digitalWrite(led, 0);
}

void handleNotFound() {
  digitalWrite(led, 1);
  String message = "File Not Found\n\n";
  message += "URI: ";
  message += server.uri();
  message += "\nMethod: ";
  message += (server.method() == HTTP_GET) ? "GET" : "POST";
  message += "\nArguments: ";
  message += server.args();
  message += "\n";
  for (uint8_t i = 0; i < server.args(); i++) {
    message += " " + server.argName(i) + ": " + server.arg(i) + "\n";
  }
  server.send(404, "text/plain", message);
  digitalWrite(led, 0);
}

void setupFingerprintSensor()
    {
      //Inicializa o sensor
      fingerprintSensor.begin(57600);      

      //Verifica se a senha está correta 
      if(!fingerprintSensor.verifyPassword())
      {
        //Se chegou aqui significa que a senha está errada ou o sensor está problemas de conexão
        Serial.println(F("Não foi possível conectar ao sensor. Verifique a senha ou a conexão"));
        server.send(201, "text/plain", "erro ao comunicar com o sensor!");        
        while(true);
      }
    }

void setup(void) {
  pinMode(led, OUTPUT);
  digitalWrite(led, 0);
  Serial.begin(115200);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  WiFi.config(ip, gateway, subnet, dns);
  Serial.println("");
  setupFingerprintSensor();

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

  if (MDNS.begin("esp32")) {
    Serial.println("MDNS responder started");
  }

  server.on("/", handleRoot);

  server.on("/inline", []() {
    server.send(200, "text/plain", "Esta ligado e funcionando!");
  });




// =====================CADASTRAR============================ //
  server.on("/register", []() {
     //Verifica se a senha está correta 
      if(!fingerprintSensor.verifyPassword())
      {
        //Se chegou aqui significa que a senha está errada ou o sensor está problemas de conexão
        Serial.println(F("Não foi possível conectar ao sensor. Verifique a senha ou a conexão"));
        server.send(201, "text/plain", "erro ao comunicar com o sensor!");        
        return;
      }
      Serial.println(F("Coloque o dedo no sensor ...."));      
      server.send(200, "application/json", "{ \"msg\": \"Coloque o dedo no sensor\", \"status\": \"200\" }");
  });

  server.on("/register2", []() {
      //Espera até pegar uma imagem válida da digital
      while (fingerprintSensor.getImage() != FINGERPRINT_OK);
      
      //Converte a imagem para o primeiro padrão
      if (fingerprintSensor.image2Tz(1) != FINGERPRINT_OK)
      {
        //Se chegou aqui deu erro, então abortamos os próximos passos
        Serial.println(F("Erro image2Tz 1"));
        server.send(200, "text/plain", "erro Tente novamente!");
        return;
      }
      Serial.println(F("Tire o dedo do sensor"));
      server.send(200, "application/json", "{ \"msg\": \"Retire o dedo do sensor\", \"status\": \"200\" }");

  });

  server.on("/register3", []() {
      //Espera até pegar uma imagem válida da digital
      delay(2000);

      //Espera até tirar o dedo
      while (fingerprintSensor.getImage() != FINGERPRINT_NOFINGER);

      //Antes de guardar precisamos de outra imagem da mesma digital
      Serial.println(F("Encoste o mesmo dedo no sensor"));
      server.send(200, "application/json", "{ \"msg\": \"Encoste o mesmo dedo no sensor\", \"status\": \"200\" }");
  });

  server.on("/register4", []() {
      int location = server.arg(0).toInt();
       //Espera até pegar uma imagem válida da digital
      while (fingerprintSensor.getImage() != FINGERPRINT_OK);

      //Converte a imagem para o segundo padrão
      if(fingerprintSensor.image2Tz(2) != FINGERPRINT_OK)
      {
        //Se chegou aqui deu erro, então abortamos os próximos passos
        Serial.println(F("Erro image2Tz 2"));
        server.send(201, "application/json", "{ \"msg\": \"Erro, tente novamente\", \"status\": \"201\" }");
        return;
      }

      //Cria um modelo da digital a partir dos dois padrões
      if(fingerprintSensor.createModel() != FINGERPRINT_OK)
      {
        //Se chegou aqui deu erro, então abortamos os próximos passos
        Serial.println(F("Erro createModel"));
        server.send(201, "application/json", "{ \"msg\": \"Erro, tente novamente\", \"status\": \"201\" }");
        return;
      }

      //Guarda o modelo da digital no sensor
      if(fingerprintSensor.storeModel(location) != FINGERPRINT_OK)
      {
        //Se chegou aqui deu erro, então abortamos os próximos passos
        server.send(201, "application/json", "{ \"msg\": \"Erro, tente novamente\", \"status\": \"201\" }");
        Serial.println(F("Erro storeModel"));
        return;
      }

      //Se chegou aqui significa que todos os passos foram bem sucedidos
      Serial.println(F("Sucesso!!!"));
      server.send(200, "application/json", "{ \"msg\": \"Digital Cadastrada!\", \"status\": \"200\" }");
  });
  


// =====================VERIFICAR============================ //
  server.on("/find", []() {
     //Verifica se a senha está correta 
      if(!fingerprintSensor.verifyPassword())
      {
        //Se chegou aqui significa que a senha está errada ou o sensor está problemas de conexão
        Serial.println(F("Não foi possível conectar ao sensor. Verifique a senha ou a conexão"));
        server.send(201, "text/plain", "erro ao comunicar com o sensor!");        
        return;
      }
      Serial.println(F("Coloque o dedo no sensor ...."));      
      server.send(200, "application/json", "{ \"msg\": \"Coloque o dedo no sensor\", \"status\": \"200\" }");
  });

  server.on("/find2", []() {
     //Espera até pegar uma imagem válida da digital
      while (fingerprintSensor.getImage() != FINGERPRINT_OK);

      //Converte a imagem para o padrão que será utilizado para verificar com o banco de digitais
      if (fingerprintSensor.image2Tz() != FINGERPRINT_OK)
      {
        server.send(201, "application/json", "{ \"msg\": \"Erro, tente novamente\", \"status\": \"201\" }");
        //Se chegou aqui deu erro, então abortamos os próximos passos
        Serial.println(F("Erro image2Tz"));
        return;
      }

      //Procura por este padrão no banco de digitais
      if (fingerprintSensor.fingerFastSearch() != FINGERPRINT_OK)
      {
        //Se chegou aqui significa que a digital não foi encontrada
        server.send(201, "application/json", "{ \"msg\": \"Erro, tente novamente\", \"status\": \"201\" }");
        Serial.println(F("Digital não encontrada"));
        return;
      }

      //Se chegou aqui a digital foi encontrada
      //Mostramos a posição onde a digital estava salva e a confiança
      //Quanto mais alta a confiança melhor
      Serial.print(F("Digital encontrada com confiança de "));
      Serial.print(fingerprintSensor.confidence);
      Serial.print(F(" na posição "));
      Serial.println(fingerprintSensor.fingerID);
        
      //server.send(200, "application/json", String(fingerprintSensor.fingerID));
      server.send(200, "application/json", "{ \"msg\": \"Digital Encontrada! na posição " + String(fingerprintSensor.fingerID) + " \", \"status\": \"200\",  \"position\": \""+String(fingerprintSensor.fingerID)+"\" } ");
  });

// =====================APAGAR============================ //


server.on("/clear", []() {
     //Apaga todas as digitais
    if(fingerprintSensor.emptyDatabase() != FINGERPRINT_OK)
    {
      server.send(201, "application/json", "{ \"msg\": \"Erro, tente de novo!\", \"status\": \"201\" }");
      Serial.println(F("Erro ao apagar banco de digitais"));
    }
    else
    {
      server.send(200, "application/json", "{ \"msg\": \"Banco de digitais apagado com sucesso!!!\", \"status\": \"200\" }");
      Serial.println(F("Banco de digitais apagado com sucesso!!!"));
    }
});

  server.on("/remove", []() {
    int location = server.arg(0).toInt();

  //Verifica se a posição é válida ou não
  if(location < 1 || location > 149)
  {
    //Se chegou aqui a posição digitada é inválida, então abortamos os próximos passos
    server.send(201, "application/json", "{ \"msg\": \" Indique uma posição valida! \", \"status\": \"201\" }");
    Serial.println(F("Posição inválida"));
    return;
  }

  //Apaga a digital nesta posição
  if(fingerprintSensor.deleteModel(location) != FINGERPRINT_OK)
  {
    server.send(201, "application/json", "{ \"msg\": \"Erro, tente de novo!\", \"status\": \"201\" }");
    Serial.println(F("Erro ao apagar digital"));
  }
  else
  {
    server.send(200, "application/json", "{ \"msg\": \"Digital apagada!\", \"status\": \"200\" }");
    Serial.println(F("Digital apagada com sucesso!!!"));
  }    
  });




  

  server.onNotFound(handleNotFound);

  server.enableCORS();
  server.begin();
  Serial.println("HTTP server started");
}

void loop(void) {
  server.handleClient();
  delay(2);//allow the cpu to switch to other tasks
}








