export interface VoiceProfile {

  name: string;

  lang: string;

  rate: number;

  pitch: number;

}

export const VoiceProfiles: VoiceProfile[] = [

  {
    name: "Default",
    lang: "en-IN",
    rate: 1,
    pitch: 1,
  },

  {
    name: "Soft",
    lang: "en-IN",
    rate: 0.9,
    pitch: 1.2,
  },

  {
    name: "Fast",
    lang: "en-IN",
    rate: 1.3,
    pitch: 1,
  },

];