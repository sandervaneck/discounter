"use client";

// Lightweight QR decoding utility leveraging the built-in BarcodeDetector API when available.
// Falls back to a descriptive error when decoding is not supported in the current browser.

type BarcodeDetectorResult = { rawValue: string };

interface BarcodeDetectorOptions {
  formats?: string[];
}

interface BarcodeDetectorInstance {
  detect(source: ImageBitmapSource): Promise<BarcodeDetectorResult[]>;
}

interface BarcodeDetectorConstructor {
  new (options?: BarcodeDetectorOptions): BarcodeDetectorInstance;
}

interface BarcodeDetectorWindow extends Window {
  BarcodeDetector?: BarcodeDetectorConstructor;
}

/**
 * Decode a QR code image file into the URL it contains.
 *
 * @throws Error when the QR code cannot be decoded or the browser lacks support.
 */
export async function decodeQrFileToUrl(file: File): Promise<string> {
  if (typeof window === "undefined") {
    throw new Error("QR decoding is only available in the browser.");
  }

  const detectorCtor = (window as BarcodeDetectorWindow).BarcodeDetector;
  if (!detectorCtor) {
    throw new Error(
      "This browser does not support QR decoding. Please update your browser or enter the link manually."
    );
  }

  const imageBitmap = await createImageBitmap(file);
  try {
    const detector = new detectorCtor({ formats: ["qr_code"] });
    const results = await detector.detect(imageBitmap);

    const rawValue = results.find((result) => Boolean(result.rawValue))?.rawValue?.trim();
    if (!rawValue) {
      throw new Error("Unable to read the QR code from the selected image.");
    }

    return rawValue;
  } finally {
    if (typeof imageBitmap.close === "function") {
      imageBitmap.close();
    }
  }
}
