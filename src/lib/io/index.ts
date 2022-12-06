import Compressor from "compressorjs";

const DEFAULT_OPTIONS: Partial<Compressor.Options> = {
    quality: 0.6, maxWidth: 1500, maxHeight: 1000,
};

type Success = Pick<Compressor.Options, "success">["success"];
type Error = Pick<Compressor.Options, "error">["error"];

export const compressFile = (file: File, success: Success, error: Error) => {
    return new Compressor(file, {
        ...DEFAULT_OPTIONS,
        success, error,
    });
};
