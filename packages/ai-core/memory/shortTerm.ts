import type {
 AIMessage
} from "../types";


export class ShortTermMemory {

 private messages: AIMessage[] = [];


 add(message:AIMessage){

  this.messages.push(message);

 }


 get(){

  return [
   ...this.messages
  ];

 }


 clear(){

  this.messages=[];

 }

}