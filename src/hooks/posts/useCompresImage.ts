import Compressor from "compressorjs";

const compressImage = (image: File | Blob) => {
  return new Promise<Blob>((resolve, reject) => {
    new Compressor(image, {
      quality: 0.4,
      success(result) {
        resolve(result);
      },
      error(err) {
        console.error("Error compressing image:", err);
        reject(err);
      },
    });
  });
};

export default compressImage;
