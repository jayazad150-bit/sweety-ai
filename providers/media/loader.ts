import { registerProvider } from "./manager";

import { geminiImageProvider } from "./image/gemini";
import { fallbackImageProvider } from "./image/fallback";


let loaded = false;


export function loadMediaProviders(){

  if(loaded){
    return;
  }


  registerProvider(
    geminiImageProvider
  );


  registerProvider(
    fallbackImageProvider
  );


  loaded = true;

}
