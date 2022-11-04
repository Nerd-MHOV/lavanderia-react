//********************** PARAMETRIZAÇÃO DO PROJETO ***********************

#define nome "GeoShow"

#define pinRele 8       //Porta do Arduino que irá acionar o relé
#define nivelRele HIGH  //Nivel lógico de ACIONAMENTO do relé

#define pinBotaoStart 53  //Porta do Arduino em que o botao Start esta ligado (o segundo terminal do botao deve ser ligado em GND)

#define tempoReset 2000           //define o tempo em que o botao Start deve ficar apertado para efetuar o reset (em milisegundos)
#define tempoContador 1           //define o tempo do contador (em segundos)
#define tempoLimiteContador 2205  // TEMPO DA APRESENTAÇÃO

//********************** FINAL DA PARAMETRIZAÇÃO DO PROJETO ***********************


//BIBLIOTECAS
#include <Arduino.h>
#include <TimerOne.h>
#include <Servo.h>

//FUNCOES
byte pinBotaoStartApertado();
void showPonto(bool pisca);
void contaTempo();




//VARIAVEIS PUBLICAS
int tempo = tempoContador;
int contador = 0;
byte colContador[4] = { 28, 46, 72, 90 };
byte contadorStatus = 0;  //0=Pause, 1=Run
byte linha = 11;

//SERVOS
Servo servoAmarelo;
Servo servoVermelho;


//***********************************************************************************************
void setup() {
  Serial.begin(9600);
  Serial.println("Carregou funões...");

  pinMode(pinRele, OUTPUT);


  //Servos:
  servoAmarelo.attach(2);
  servoVermelho.attach(3);


  //DECLAREI OS PINS JA!
  pinMode(30, OUTPUT);  // PRE CAMBRIANO
  pinMode(31, OUTPUT);  // CAMBRIANO
  pinMode(32, OUTPUT);  // ORDOVICIANO
  pinMode(33, OUTPUT);  // SILURIANO
  pinMode(34, OUTPUT);  // DEVONIANO
  pinMode(35, OUTPUT);  // CABONIFERO
  pinMode(36, OUTPUT);  // PERMIANO
  pinMode(37, OUTPUT);  // TRIASSICO
  pinMode(38, OUTPUT);  // ALOSSAURO
  pinMode(39, OUTPUT);  // JURASSICO
  pinMode(40, OUTPUT);  // CRETACEO
  pinMode(41, OUTPUT);  // TERCIARIO
  pinMode(42, OUTPUT);  // CUESTAS
  pinMode(43, OUTPUT);  // SERRA DO MAR
  pinMode(44, OUTPUT);  // VALE DO PARAIBA + SP
  pinMode(45, OUTPUT);  // MAR DE MORROS
  pinMode(46, OUTPUT);  // QUARTENARIO
  pinMode(47, OUTPUT);  // LUZES DAS CIDADES
  pinMode(48, OUTPUT);  // DIMMER LUZ AMARELA
  pinMode(49, OUTPUT);  // DIMMER LUZ VERMELHA
  pinMode(50, OUTPUT);  // LUZES DE IMPACTO
  pinMode(51, OUTPUT);  // LUZES DE IMPACTO

  digitalWrite(pinRele, !nivelRele);

  pinMode(pinBotaoStart, INPUT_PULLUP);

  //INICIO DO TIMER
  Timer1.initialize(1000000);  //TIMER IRA EXECUTAR A CADA 1 SEGUNDO (PARAMETRO EM MICROSEGUNDOS)
  Timer1.attachInterrupt(contaTempo);
}


//***********************************************************************************************
void loop() {

  if (contadorStatus == 1) {
    digitalWrite(pinRele, nivelRele);
  } else {
    digitalWrite(pinRele, !nivelRele);
  }

  byte estadoBotaoStart = pinBotaoStartApertado();
  if (estadoBotaoStart == 1) {

    if (tempo > 0) {
      if (contadorStatus == 0) {

        if (contador == 0) {
          contador = tempo;
        }

        //INICIA O CONTADOR NOVAMENTE
        Timer1.start();
        Timer1.attachInterrupt(contaTempo);
        contadorStatus = 1;
      } else {

        //PARA O CONTADOR
        Timer1.stop();
        contadorStatus = 0;
      }
    }
  }

  if (estadoBotaoStart == 2) {
#if habilitaDebugSerial == true
    Serial.println("RESET");
#endif

    if (tempo > 0) {
      Timer1.stop();
      contadorStatus = 0;
      contador = 0;
    }
  }

  showPonto(contadorStatus);
}


byte pinBotaoStartApertado() {
#define tempoDebounce 50  //(tempo para eliminar o efeito Bounce EM MILISEGUNDOS)

  static bool estadoBotaoAnt;
  static unsigned long delayBotao = 0;
  static unsigned long botaoApertado;
  static byte fase = 0;

  bool estadoBotao;
  byte estadoRet;

  estadoRet = 0;
  if ((millis() - delayBotao) > tempoDebounce) {
    estadoBotao = digitalRead(pinBotaoStart);
    if (!estadoBotao && (estadoBotao != estadoBotaoAnt)) {
      delayBotao = millis();
      botaoApertado = millis();
      fase = 1;
    }

    if ((fase == 1) && ((millis() - botaoApertado) > tempoReset)) {
      fase = 0;
      estadoRet = 2;
    }

    if (estadoBotao && (estadoBotao != estadoBotaoAnt)) {
      delayBotao = millis();

      if (fase == 1) {
        estadoRet = 1;
      }
      fase = 0;
    }

    estadoBotaoAnt = estadoBotao;
  }

  return estadoRet;
}

void showPonto(bool pisca) {
  static bool piscaAnt = !pisca;
  static bool aceso = true;
  static bool acesoAnt = !aceso;
  static unsigned long delayPisca;
#define tempoPisca 500


  if (pisca) {
    if ((millis() - delayPisca) < tempoPisca) {
      aceso = true;

    } else {
      aceso = false;
    }

    if ((millis() - delayPisca) >= (tempoPisca * 2)) {
      delayPisca = millis();
    }

    acesoAnt = aceso;
  }

  piscaAnt = pisca;
}


void contaTempo() {
  if (contadorStatus == 1) {
    Serial.println(contador);
    contador++;


    // ===============================================================

    //            TESTES SERVO MOTOR

    //  --------------- Vai -----------------
    // if (contador == 5) {
    //   servoAmarelo.write(154);
    // }

    // if (contador == 6) {
    //   servoAmarelo.write(90);
    // }



    // if (contador == 5) {
    //   servoAmarelo.write(122);
    // }

    // if (contador == 7) {
    //   servoAmarelo.write(90);
    // }


    if (contador == 5) {
      servoAmarelo.write(103);
    }

    if (contador == 9) {
      servoAmarelo.write(90);
    }


    //------------- VOLTA -------------------
    if (contador == 9) {
      servoAmarelo.write(58);
    }

     if (contador == 11) {
      servoAmarelo.write(90);
    }


    // if (contador == 9) {
    //   servoAmarelo.write(79);
    // }

    //  if (contador == 13) {
    //   servoAmarelo.write(90);
    // }



    // ===============================================================



    //3:57
    if (contador == 237) {
      // digitalWrite(48, LOW);  // DIMMER LUZ VERMELHA (inicio 3:57)
      // digitalWrite(49, LOW);  // DIMMER LUZ AMARELA (inicio 3:57)
      servoAmarelo.write(154);
      servoVermelho.write(154);

      Serial.println("LOW DIMMER LUZ VERMELHA");
      Serial.println("LOW DIMMER LUZ AMARELA");
    }
    //3:58
    if (contador == 238) {
      servoAmarelo.write(90);
      servoVermelho.write(90);
    }


    //4:30
    if (contador == 270) {
      // digitalWrite(48, HIGH);  // DIMMER LUZ VERMELHA (fim 4:30)ZERAR AOS POUCOS
      // digitalWrite(49, HIGH);  // DIMMER LUZ AMARELA (fim 4:30)ZERAR AOS POUCOS
      servoAmarelo.write(79);
      servoVermelho.write(79);

      Serial.println("HIGH DIMMER LUZ VERMELHA");
      Serial.println("HIGH DIMMER LUZ AMARELA");
    }

    //4:34
    if (contador == 274) {
      servoAmarelo.write(90);
      servoVermelho.write(90);
    }

    //6:25
    if (contador == 385) {
      digitalWrite(50, LOW);  // LUZES DE IMPACTO (inicio 6:25)
      Serial.println("LUZES DE IMPACTO (inicio 6:25)");
    }

    //6:30
    if (contador == 390) {
      digitalWrite(50, HIGH);  // LUZES DE IMPACTO (fim 6:30)
      Serial.println("LUZES DE IMPACTO (fim 6:30)");
    }

    //10:40
    if (contador == 640) {
      digitalWrite(30, LOW);  // PRE CAMBRIANO (inicio 10:40)
      Serial.println("PRE CAMBRIANO (inicio 10:40)");
    }

    //13:12
    if (contador == 792) {
      digitalWrite(30, HIGH);  // PRE CAMBRIANO (fim 13:12)
      Serial.println("PRE CAMBRIANO (fim 13:12)");
    }

    //13:57
    if (contador == 837) {
      digitalWrite(31, LOW);  // CAMBRIANO (inicio 13:57)
      Serial.println("CAMBRIANO (inicio 13:57)");
    }

    //14:00
    if (contador == 840) {
      digitalWrite(32, LOW);  // ORDOVICIANO (inicio 14:00)
      Serial.println("ORDOVICIANO (inicio 14:00)");
    }


    //14:03
    if (contador == 843) {
      digitalWrite(33, LOW);  // SILURIANO (inicio 14:03)
      Serial.println("SILURIANO (inicio 14:03)");
    }

    //14:05
    if (contador == 845) {
      digitalWrite(34, LOW);  // DEVONIANO (inicio 14:05)
      Serial.println("DEVONIANO (inicio 14:05)");
    }

    //14:28
    if (contador == 868) {
      digitalWrite(31, HIGH);  // CAMBRIANO (fim 14:28)
      digitalWrite(32, HIGH);  // ORDOVICIANO (fim 14:28)
      digitalWrite(33, HIGH);  // SILURIANO (fim 14:28)

      Serial.println("CAMBRIANO (fim 14:28)");
      Serial.println("// ORDOVICIANO (fim 14:28)");
      Serial.println("SILURIANO (fim 14:28)");
    }

    //14:31
    if (contador == 871) {
      digitalWrite(34, HIGH);  // DEVONIANO (fim 14:31)
      Serial.println("DEVONIANO (fim 14:31)");
    }

    //14:32
    if (contador == 872) {
      digitalWrite(35, LOW);  // CABONIFERO (inicio 14:32)
      Serial.println("CABONIFERO (inicio 14:32)");
    }

    //15:07
    if (contador == 907) {
      digitalWrite(35, HIGH);  // CABONIFERO (fim 15:07)
      Serial.println("CABONIFERO (fim 15:07)");
    }

    //15:08
    if (contador == 908) {
      digitalWrite(36, LOW);  // PERMIANO (inicio 15:08)
      Serial.println("PERMIANO (inicio 15:08)");
    }

    //16:54
    if (contador == 1014) {
      digitalWrite(36, HIGH);  // PERMIANO (fim 16:54)
      Serial.println("PERMIANO (fim 16:54)");
    }

    //17:31
    if (contador == 1051) {
      digitalWrite(37, LOW);  // TRIASSICO (inicio 17:31)
      Serial.println("TRIASSICO (inicio 17:31)");
    }

    //17:36
    if (contador == 1056) {
      // digitalWrite(48, LOW);  // SUBIR DIMMER LUZ AMARELA (inicio 17:36)
      servoAmarelo.write(154);
      Serial.println("SUBIR DIMMER LUZ AMARELA (inicio 17:36)");
    }

    //17:37
    if (contador == 1057) {
      servoAmarelo.write(90);
    }

    //17:58
    if (contador == 1078) {
      // digitalWrite(48, HIGH);  // APAGAR DIMMER LUZ AMARELA (fim 17:58)
      servoAmarelo.write(26);
      Serial.println("APAGAR DIMMER LUZ AMARELA (fim 17:58)");
    }
    //17:59
    if (contador == 1079) {
      servoAmarelo.write(90);
    }

    //19:06
    if (contador == 1146) {
      digitalWrite(38, LOW);  // ALOSSAURO (inicio 19:06)
      Serial.println("ALOSSAURO (inicio 19:06)");
    }

    //19:16
    if (contador == 1156) {
      digitalWrite(38, HIGH);  // ALOSSAURO (fim 19:16)
      Serial.println("ALOSSAURO (fim 19:16)");
    }

    //19:27
    if (contador == 1167) {
      // digitalWrite(49, LOW);  // SUBIR DIMMER LUZ VERMELHA (inicio 19:27)
      servoVermelho.write(154);
      Serial.println("SUBIR DIMMER LUZ VERMELHA (inicio 19:27)");
    }
    //19:28
    if (contador == 1168) {
      servoVermelho.write(90);
    }

    //19:56
    if (contador == 1196) {
      digitalWrite(37, HIGH);  // TRIASSICO (fim 19:56)
      Serial.println("TRIASSICO (fim 19:56)");
    }

    //20:00
    if (contador == 1200) {
      digitalWrite(39, LOW);  // JURASSICO (inicio 20:00)
      Serial.println("JURASSICO (inicio 20:00)");
    }

    //20:51
    if (contador == 1251) {
      // digitalWrite(49, HIGH);  // APAGAR DIMMER LUZ VERMELHA (fim 20:51)
      servoVermelho.write(26);
      Serial.println("APAGAR DIMMER LUZ VERMELHA (fim 20:51)");
    }
    //20:52
    if (contador == 1252) {
      servoVermelho.write(90);
    }

    //21:27
    if (contador == 1227) {
      digitalWrite(39, HIGH);  // JURASSICO (fim 21:27)
      Serial.println("JURASSICO (fim 21:27)");
    }

    //21:29
    if (contador == 1289) {
      digitalWrite(40, LOW);  // CRETACEO (inicio 21:29)
      Serial.println("CRETACEO (inicio 21:29)");
    }

    //23:32
    if (contador == 1412) {
      digitalWrite(50, LOW);  // LUZES DE IMPACTO (inicio 23:32)
      Serial.println("LUZES DE IMPACTO (inicio 23:32)");
    }

    //23:37
    if (contador == 1417) {
      digitalWrite(50, HIGH);  // LUZES DE IMPACTO (fim 23:37)
      Serial.println("LUZES DE IMPACTO (fim 23:37)");
    }

    //24:27
    if (contador == 1467) {
      digitalWrite(40, HIGH);  // CRETACEO (fim 24:27)
      Serial.println("CRETACEO (fim 24:27)");
    }

    //24:50
    if (contador == 1490) {
      digitalWrite(41, LOW);  // TERCIARIO (inicio 24:50)
      Serial.println("TERCIARIO (inicio 24:50)");
    }

    //26:03
    if (contador == 1563) {
      digitalWrite(42, LOW);  // CUESTAS (inicio 26:03)
      Serial.println("CUESTAS (inicio 26:03)");
    }

    //26:14
    if (contador == 1574) {
      digitalWrite(42, HIGH);  // CUESTAS (fim 26:14)
      Serial.println("CUESTAS (fim 26:14)");
    }

    //26:26
    if (contador == 1586) {
      digitalWrite(43, LOW);  // SERRA DO MAR (inicio 26:26)
      Serial.println("SERRA DO MAR (inicio 26:26)");
    }

    //26:30
    if (contador == 1590) {
      digitalWrite(43, HIGH);  // SERRA DO MAR (fim 26:30)
      Serial.println("SERRA DO MAR (fim 26:30)");
    }

    //26:35
    if (contador == 1595) {
      digitalWrite(44, LOW);  // VALE DO PARAIBA + SP (inicio 26:35)
      Serial.println("VALE DO PARAIBA + SP (inicio 26:35)");
    }

    //26:51
    if (contador == 1611) {
      digitalWrite(44, HIGH);  // VALE DO PARAIBA + SP (fim 26:51)
      Serial.println("VALE DO PARAIBA + SP (fim 26:51)");
    }

    //27:04
    if (contador == 1624) {
      digitalWrite(45, LOW);  // MAR DE MORROS (inicio 27:04)
      Serial.println("MAR DE MORROS (inicio 27:04)");
    }

    //27:08
    if (contador == 1628) {
      digitalWrite(45, HIGH);  // MAR DE MORROS (fim 27:08)
      Serial.println("MAR DE MORROS (fim 27:08)");
    }

    //27:14
    if (contador == 1634) {
      digitalWrite(41, HIGH);  // TERCIARIO (fim 27:14)
      Serial.println("TERCIARIO (fim 27:14)");
    }

    //27:21
    if (contador == 1641) {
      digitalWrite(46, LOW);  // QUARTENARIO (inicio 27:21)
      Serial.println("QUARTENARIO (inicio 27:21)");
    }

    //28:09
    if (contador == 1689) {
      digitalWrite(42, LOW);  // CUESTAS (inicio 28:09)
      digitalWrite(43, LOW);  // SERRA DO MAR (inicio 28:09)
      digitalWrite(44, LOW);  // VALE DO PARAIBA + SP (inicio 28:09)
      digitalWrite(45, LOW);  // MAR DE MORROS (inicio 28:09)
      digitalWrite(47, LOW);  // LUZES DAS CIDADES (inicio 28:09)

      Serial.println("CUESTAS (inicio 28:09)");
      Serial.println("SERRA DO MAR (inicio 28:09)");
      Serial.println("VALE DO PARAIBA + SP (inicio 28:09)");
      Serial.println("MAR DE MORROS (inicio 28:09)");
      Serial.println("LUZES DAS CIDADES (inicio 28:09)");
    }

    //28:25
    if (contador == 1705) {
      digitalWrite(42, HIGH);  // CUESTAS (fim 28:25)
      digitalWrite(43, HIGH);  // SERRA DO MAR (fim 28:25)
      digitalWrite(44, HIGH);  // VALE DO PARAIBA + SP (fim 28:25)
      digitalWrite(45, HIGH);  // MAR DE MORROS (fim 28:25)
      digitalWrite(47, HIGH);  // LUZES DAS CIDADES (fim 28:25)


      Serial.println("CUESTAS (fim 28:25)");
      Serial.println("SERRA DO MAR (fim 28:25)");
      Serial.println("VALE DO PARAIBA + SP (fim 28:25)");
      Serial.println("MAR DE MORROS (fim 28:25)");
      Serial.println("LUZES DAS CIDADES (fim 28:25)");
    }

    //31:44
    if (contador == 1904) {
      digitalWrite(30, LOW);  // PRE CAMBRIANO (inicio 31:44)
      Serial.println("PRE CAMBRIANO (inicio 31:44)");
    }

    //31:45
    if (contador == 1905) {
      digitalWrite(31, LOW);  // CAMBRIANO (inicio 31:45)
      Serial.println("CAMBRIANO (inicio 31:45)");
    }

    //31:46
    if (contador == 1906) {
      digitalWrite(32, LOW);  // ORDOVICIANO (inicio 31:46)
      Serial.println("ORDOVICIANO (inicio 31:46)");
    }

    //31:47
    if (contador == 1907) {
      digitalWrite(33, LOW);  // SILURIANO (inicio 31:47)
      Serial.println("SILURIANO (inicio 31:47)");
    }

    //31:48
    if (contador == 1908) {
      digitalWrite(34, LOW);  // DEVONIANO (inicio 31:48)
      Serial.println("DEVONIANO (inicio 31:48)");
    }

    //31:49
    if (contador == 1909) {
      digitalWrite(35, LOW);  // CABONIFERO (inicio 31:49)
      Serial.println("CABONIFERO (inicio 31:49)");
    }

    //31:50
    if (contador == 1910) {
      digitalWrite(36, LOW);  // PERMIANO (inicio 31:50)
      Serial.println("PERMIANO (inicio 31:50)");
    }

    //31:51
    if (contador == 1911) {
      digitalWrite(37, LOW);  // TRIASSICO (inicio 31:51)
      Serial.println("TRIASSICO (inicio 31:51)");
    }

    //31:52
    if (contador == 1912) {
      digitalWrite(38, LOW);  // ALOSSAURO (inicio 31:52)
      Serial.println("ALOSSAURO (inicio 31:52)");
    }

    //31:53
    if (contador == 1913) {
      digitalWrite(39, LOW);  // JURASSICO (inicio 31:53)
      digitalWrite(40, LOW);  // CRETACEO (inicio 31:53)

      Serial.println("JURASSICO (inicio 31:53)");
      Serial.println("CRETACEO (inicio 31:53)");
    }

    //31:56
    if (contador == 1916) {
      digitalWrite(42, LOW);  // CUESTAS (inicio 31:56)
      Serial.println("CUESTAS (inicio 31:56)");
    }

    //31:57
    if (contador == 1917) {
      digitalWrite(43, LOW);  // SERRA DO MAR (inicio 31:57)
      Serial.println("SERRA DO MAR (inicio 31:57)");
    }

    //31:58
    if (contador == 1918) {
      digitalWrite(44, LOW);  // VALE DO PARAIBA + SP (inicio 31:58)
      Serial.println("VALE DO PARAIBA + SP (inicio 31:58)");
    }

    //31:59
    if (contador == 1919) {
      digitalWrite(45, LOW);  // MAR DE MORROS (inicio 31:59)
      Serial.println("MAR DE MORROS (inicio 31:59)");
    }

    //32:00
    if (contador == 1920) {
      digitalWrite(47, LOW);  // LUZES DAS CIDADES (inicio 32:00)
      Serial.println("LUZES DAS CIDADES (inicio 32:00)");
    }

    //32:01
    if (contador == 1921) {
      // digitalWrite(48, LOW);  // DIMMER LUZ AMARELA (inicio 32:01)
      // digitalWrite(49, LOW);  // DIMMER LUZ VERMELHA (inicio 32:01)
      servoAmarelo.write(154);
      servoVermelho.write(154);

      Serial.println("DIMMER LUZ AMARELA (inicio 32:01)");
      Serial.println("DIMMER LUZ VERMELHA (inicio 32:01)");
    }
    //32:02
    if (contador == 1922) {
      servoAmarelo.write(90);
      servoVermelho.write(90);
    }

    //32:02
    if (contador == 1922) {
      digitalWrite(50, LOW);  // LUZES DE IMPACTO (inicio 32:02)
      digitalWrite(51, LOW);  // LUZES DE IMPACTO (inicio 32:02)

      Serial.println("LUZES DE IMPACTO (inicio 32:02)");
      Serial.println("LUZES DE IMPACTO (inicio 32:02)");
    }

    //36:44
    if (contador == 2204) {
      servoAmarelo.write(26);            
      servoVermelho.write(26);            
    }

    //36:45
    if (contador == 2205) {
      digitalWrite(38, HIGH);  // ALOSSAURO (fim 36:45)
      digitalWrite(46, HIGH);  // QUARTENARIO (manter ligada ate o final)
      digitalWrite(30, HIGH);  // PRE CAMBRIANO (fim 36:45)
      digitalWrite(31, HIGH);  // CAMBRIANO (fim 36:45)
      digitalWrite(32, HIGH);  // ORDOVICIANO (fim 36:45)
      digitalWrite(33, HIGH);  // SILURIANO (fim 36:45)
      digitalWrite(34, HIGH);  // DEVONIANO (fim 36:45)
      digitalWrite(35, HIGH);  // CABONIFERO (fim 36:45)
      digitalWrite(36, HIGH);  // PERMIANO (fim 36:45)
      digitalWrite(37, HIGH);  // TRIASSICO (fim 36:45)
      digitalWrite(39, HIGH);  // JURASSICO (fim 36:45)
      digitalWrite(40, HIGH);  // CRETACEO (fim 36:45)
      digitalWrite(42, HIGH);  // CUESTAS (fim 36:45)
      digitalWrite(43, HIGH);  // SERRA DO MAR (fim 36:45)
      digitalWrite(44, HIGH);  // VALE DO PARAIBA + SP (fim 36:45)
      digitalWrite(45, HIGH);  // MAR DE MORROS (fim 36:45)
      digitalWrite(47, HIGH);  // LUZES DAS CIDADES (fim 36:45)
      // digitalWrite(48, HIGH);  // DIMMER LUZ AMARELA (fim 36:45)
      // digitalWrite(49, HIGH);  // DIMMER LUZ VERMELHA (fim 36:45)
      digitalWrite(50, HIGH);  // LUZES DE IMPACTO (fim 36:45)
      digitalWrite(51, LOW);   // LUZES DE IMPACTO (inicio 32:02)

      servoAmarelo.write(90);
      servoVermelho.write(90);

      Serial.println("ALOSSAURO (fim 36:45)");
      Serial.println("QUARTENARIO (manter ligada ate o final)");
      Serial.println("PRE CAMBRIANO (fim 36:45)");
      Serial.println("CAMBRIANO (fim 36:45)");
      Serial.println("ORDOVICIANO (fim 36:45)");
      Serial.println("SILURIANO (fim 36:45)");
      Serial.println("DEVONIANO (fim 36:45)");
      Serial.println("CABONIFERO (fim 36:45)");
      Serial.println("PERMIANO (fim 36:45)");
      Serial.println("TRIASSICO (fim 36:45)");
      Serial.println("JURASSICO (fim 36:45)");
      Serial.println("CRETACEO (fim 36:45)");
      Serial.println("CUESTAS (fim 36:45)");
      Serial.println("SERRA DO MAR (fim 36:45)");
      Serial.println("VALE DO PARAIBA + SP (fim 36:45)");
      Serial.println("MAR DE MORROS (fim 36:45)");
      Serial.println("LUZES DAS CIDADES (fim 36:45)");
      Serial.println("DIMMER LUZ AMARELA (fim 36:45)");
      Serial.println("DIMMER LUZ VERMELHA (fim 36:45)");
      Serial.println("LUZES DE IMPACTO (fim 36:45)");
      Serial.println("LUZES DE IMPACTO (fim 36:45)");
    }

    //.............................................................

    if (contador <= 0) {
      contador = 0;
      contadorStatus = 0;
    }

    if (contador >= (tempoLimiteContador + 1)) {
      contador = (tempoLimiteContador + 1);
      contadorStatus = 0;
    }
  }
}