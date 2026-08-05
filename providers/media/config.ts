export const mediaConfig = {

  imageProvider: "gemini",

  videoProvider: "gemini"

};

export function getImageProvider(){

  return mediaConfig.imageProvider;

}

export function getVideoProvider(){

  return mediaConfig.videoProvider;

}

export function setImageProvider(
  provider:string
){

  mediaConfig.imageProvider = provider;

}

export function setVideoProvider(
  provider:string
){

  mediaConfig.videoProvider = provider;

}
