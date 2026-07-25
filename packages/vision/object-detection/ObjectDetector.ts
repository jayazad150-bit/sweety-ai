export interface DetectedObject {

  label: string;

  confidence: number;

}

export class ObjectDetector {

  async detect(image: File): Promise<DetectedObject[]> {

    return [];

  }

}