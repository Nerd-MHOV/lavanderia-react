char cmd;                     //Define a variável dos comandos seriais
void setup() {
  Serial.begin(9600);         //Inicia o Monitor Serial
  pinMode(2, OUTPUT);         //Define o pino como saída
  digitalWrite(3, LOW);
}
void loop() {
  cmd = Serial.read();        //Realiza a leitura do serial
  if (cmd == 'l') {           //Se o comando for "l", liga o led
    digitalWrite(3, HIGH); 
  }
  else if (cmd == 'd') {      //Se o comando for "d", desliga o led
    digitalWrite(3, LOW);
  }
}