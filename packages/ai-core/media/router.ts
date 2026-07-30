import { imageSkill } from "../skills/image/image";
import { videoSkill } from "../skills/video/video";

export async function mediaRouter(
  input:string,
  context?:unknown
){

  const text = input.toLowerCase();


  if(
    text.includes("image") ||
    text.includes("picture") ||
    text.includes("photo")
  ){

    return imageSkill.execute(
      input,
      context
    );

  }


  if(
    text.includes("video") ||
    text.includes("movie") ||
    text.includes("animation")
  ){

    return videoSkill.execute(
      input,
      context
    );

  }


  return null;

}
