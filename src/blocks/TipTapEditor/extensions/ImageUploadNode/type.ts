export type UploadImageType = (
  file: File,
  opts: {
    onProgress?: (progress: number) => void;
    onSuccess?: (url: string) => void;
    onError?: (error: Error) => void;
  },
) => void;
