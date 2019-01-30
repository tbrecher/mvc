/*
 Software serial multiple serial test

Receives from the hardware serial, sends to software serial.
Receives from software serial, sends to hardware serial.

The circuit:
* RX is digital pin 10 (connect to TX of other device)
* TX is digital pin 11 (connect to RX of other device)

Note:
Not all pins on the Mega and Mega 2560 support change interrupts,
so only the following can be used for RX:
10, 11, 12, 13, 50, 51, 52, 53, 62, 63, 64, 65, 66, 67, 68, 69

Not all pins on the Leonardo and Micro support change interrupts,
so only the following can be used for RX:
8, 9, 10, 11, 14 (MISO), 15 (SCK), 16 (MOSI).

created back in the mists of time
modified 25 May 2012
by Tom Igoe
based on Mikal Hart's example

This example code is in the public domain.

*/
#include <SoftwareSerial.h> //includes software library

SoftwareSerial sendSerial(10, 11); // RX, TX
String id = String("AAC"); //your arduino's personal id
String tlog="";
String mlog="";

void setup() {
 Serial.begin(9600);//initiates your personal serial port
 while (!Serial) {
   ; // wait for serial port to connect. Needed for native USB port only
 }

 pinMode(10,INPUT);
 pinMode(11, OUTPUT);
 //establishes input and output pins per the SoftwareSerial library

 Serial.println("Private serial online");

 sendSerial.begin(9600);//initiates SoftwareSerial port
 //sendSerial.print(id+"000 is online");//Message to all members in remaining part of ring that you are online
}

void loop() { // run over and over
 if (sendSerial.available()) {
  
   String message = sendSerial.readString();
   String sent=message.substring(0,1);
   String senderId = message.substring(1,4);
   String recipientId = message.substring(4,7);
   if (recipientId.equals(id)){
     Serial.println(senderId+" says: "+message.substring(7,message.length()));
     sendSerial.print("!"+message.substring(1,message.length()));
   }//if message is just for you
   else if (recipientId.equals("000")) {
     Serial.println(senderId+" says to all: "+message.substring(7,message.length()));
     if (senderId.equals(id)) {
        if (recipientId.equals("000")) {
          if("?"+mlog.substring(1,mlog.indexOf('`')).equals(message)){
          Serial.println("Your message to all was succssfully forwarded.");
          }
          else{
             Serial.println("Your message to all was forwarded but seems to have been compromised.");
          }
          mlog=mlog.substring(mlog.indexOf('`')+1,mlog.length());
     }//if you get your own sender id, group comment means it went around the loop
     } else{
       sendSerial.print(message);//if it is a group message, print and forward
     }
   }
   else if (senderId.equals(id)){
        if (sent=="?"){
          Serial.println("Your message to " + recipientId + " was not received.");
        }
        else if (sent=="!"){
          if(mlog.substring(0,mlog.indexOf('`')).equals(message)){
          Serial.println("Your message to " + recipientId + " was succssfully forwarded.");
          }
          else{
            Serial.println("Your message to " + recipientId + " was forwarded but seems to have been compromised.");
          }
          
          
          
     }//if you get your own sender id, non-group comment means id does not exist in ring
     mlog=mlog.substring(mlog.indexOf('`')+1,mlog.length());
   }
   else {
      tlog+="{sender: "+senderId+"; recipient: "+recipientId+"}\n";
     //Serial.println("Message from " + senderId + " forwarded to " + recipientId + ".");
     sendSerial.print(message);
   }//simply forwarding message along since you are not involved

 }
 if (Serial.available()) {
    String a=Serial.readString();
    if (a.equals("`")){
      Serial.println(tlog);
    }
    else{
   //messageSent = Serial.read();//converts message to string
   sendSerial.print("?"+id+a);//writes message via SoftwareSerial
   mlog+="!"+id+a+"`";
    }
 }
}
