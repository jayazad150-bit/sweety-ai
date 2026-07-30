import type {
 AIMessage
} from "../types";


export class LongTermMemory {

 private memories: AIMessage[]=[];


 add(message:AIMessage){

  this.memories.push(message);

 }


 get(){

  return [
   ...this.memories
  ];

 }


 clear(){

  this.memories=[];

 }

}