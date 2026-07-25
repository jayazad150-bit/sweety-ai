export interface ImageAnalysis {

  labels: string[];

  description: string;

}

export class ImageAnalyzer {

  async analyze(image: File): Promise<ImageAnalysis> {

    return {

      labels: [],

      description: "Image analysis not connected yet.",

    };

  }

}