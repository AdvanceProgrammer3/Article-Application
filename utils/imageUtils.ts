// utils/imageUtils.ts

import imageCompression from 'browser-image-compression';

const resizeImage = async (file: File, maxWidth: number, maxHeight: number, quality: number): Promise<File> => {
  try {
    const compressedFile = await imageCompression(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: maxWidth || 800,
      useWebWorker: true
    //   quality: quality || 0.8,
    });

    return compressedFile as File;
  } catch (error) {
    console.error('Error resizing image:', error);
    throw error;
  }
};

export { resizeImage };
