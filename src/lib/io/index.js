import Compressor from "compressorjs";

/**
 * Throws an error if one occurs
 * 
 * @param {*} file 
 * @param {*} success 
 * @returns 
 */
export const compressFile = (file, success, error) => {
    return new Compressor(file, {
        quality: 0.6, maxWidth: 1500, maxHeight: 1000,
        success, error,
    });
};
