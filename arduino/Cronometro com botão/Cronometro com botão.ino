/****************************************************************************************
  Video Q0175 - Explorando o Arduino - Timers
  
  Desenvolvido pela Fábrica de Programas - Brincando com Ideias (www.brincandocomideias.com)
  www.youtube.com/c/BrincandoComIdeias

  Autor Flavio Guimaraes  
*****************************************************************************************/ 

//********************** PARAMETRIZAÇÃO DO PROJETO ***********************

#define nome "Brincando com Ideias"

#define pinRele 8        //Porta do Arduino que irá acionar o relé  
#define nivelRele HIGH   //Nivel lógico de ACIONAMENTO do relé

#define pinBotaoStart  4 //Porta do Arduino em que o botao Start esta ligado (o segundo terminal do botao deve ser ligado em GND)

#define tempoReset     2000  //define o tempo em que o botao Start deve ficar apertado para efetuar o reset (em milisegundos)
#define tempoContador  30    //define o tempo do contador (em segundos)

//********************** FINAL DA PARAMETRIZAÇÃO DO PROJETO ***********************


//BIBLIOTECAS
#include <Arduino.h>
#include <TimerOne.h>


//FUNCOES
byte pinBotaoStartApertado();
void showPonto(bool pisca);
void contaTempo();

//VARIAVEIS PUBLICAS
int tempo = tempoContador;
int contador = 0;
byte colContador[4] = {28,46,72,90};
byte contadorStatus = 0; //0=Pause, 1=Run
byte linha = 11;


//***********************************************************************************************
void setup()
{

  pinMode(pinRele, OUTPUT);
  digitalWrite(pinRele, !nivelRele);

  pinMode(pinBotaoStart, INPUT_PULLUP);

  //INICIO DO TIMER
  Timer1.initialize(1000000);   //TIMER IRA EXECUTAR A CADA 1 SEGUNDO (PARAMETRO EM MICROSEGUNDOS)
  Timer1.attachInterrupt(contaTempo);
}


//***********************************************************************************************
void loop()
{

   if (contadorStatus == 1) { 
      digitalWrite(pinRele, nivelRele);
   } else {
      digitalWrite(pinRele, !nivelRele);
   }

   byte estadoBotaoStart = pinBotaoStartApertado();
   if ( estadoBotaoStart == 1 ) {
    
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

   if ( estadoBotaoStart == 2 ) {
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
   #define tempoDebounce 50 //(tempo para eliminar o efeito Bounce EM MILISEGUNDOS)

   static bool estadoBotaoAnt; 
   static unsigned long delayBotao = 0;
   static unsigned long botaoApertado;
   static byte fase = 0;

   bool estadoBotao;
   byte estadoRet;

   estadoRet = 0;  
   if ( (millis() - delayBotao) > tempoDebounce ) {
       estadoBotao = digitalRead(pinBotaoStart);
       if ( !estadoBotao && (estadoBotao != estadoBotaoAnt) ) {
          delayBotao = millis();          
          botaoApertado = millis();
          fase = 1;
       } 

       if ( (fase == 1) && ((millis() - botaoApertado) > tempoReset) ) {
          fase = 0;
          estadoRet = 2;
       }
       
       if ( estadoBotao && (estadoBotao != estadoBotaoAnt) ) {
          delayBotao = millis();

          if ( fase == 1 ) {
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
     if ( (millis() - delayPisca) < tempoPisca) {
        aceso = true;
    
     } else {
        aceso = false;        
     }

     if ( (millis() - delayPisca) >= (tempoPisca * 2)) {
        delayPisca = millis();
     }

     acesoAnt = aceso;
  }

  piscaAnt = pisca;
}

void contaTempo() {
  if (contadorStatus == 1) { 
     contador--;

     if (contador <= 0) {
        contador = 0;
        contadorStatus = 0;
     }


    Serial.println("Esta em:"+ contador);
  }
}
