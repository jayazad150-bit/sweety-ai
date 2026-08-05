export interface MediaResult {

  success: boolean;

  provider: string;

  prompt: string;

  imageBase64?: string;

  videoBase64?: string;

  imageUrl?: string;

  videoUrl?: string;

  error?: string;

}

export interface MediaProvider {

  id: string;

  name: string;

  generateImage(
    prompt: string
  ): Promise<MediaResult>;

  editImage?(
    prompt: string,
    image: {
      mimeType: string;
      data: string;
    }
  ): Promise<MediaResult>;

  generateVideo?(
    prompt: string
  ): Promise<MediaResult>;

  editVideo?(
    prompt: string,
    video: {
      mimeType: string;
      data: string;
    }
  ): Promise<MediaResult>;

}
