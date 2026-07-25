export interface OCRResult {

  text: string;

}

export class OCR {

  async read(image: File): Promise<OCRResult> {

    // Placeholder until OCR library is integrated
    return {

      text: "",

    };

  }

}