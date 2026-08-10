export interface MediaResult {

  success: boolean;

  provider: string;

  prompt: string;

  imageBase64?: string;

  videoBase64?: string;

  imageUrl?: string;

  videoUrl?: string;

  error?: string;

  /**
   * True when the result was produced by a fallback provider
   * rather than the primary AI media provider.
   */
  fallback?: boolean;

  /**
   * Optional human-readable status for the UI.
   */
  message?: string;

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
