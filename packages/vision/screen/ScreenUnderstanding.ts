export interface ScreenInfo {

  width: number;

  height: number;

  url?: string;

}

export class ScreenUnderstanding {

  inspect(): ScreenInfo {

    return {

      width: window.innerWidth,

      height: window.innerHeight,

      url: window.location.href,

    };

  }

}