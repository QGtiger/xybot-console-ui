import { createCustomModel } from '@/utils';

export type MenuModelProps = {
  uploadImage?: (
    file: File,
    opts?: {
      onProgress?: (progress: number) => void;
      onSuccess?: (url: string) => void;
      onError?: (error: Error) => void;
    },
  ) => Promise<string>;
};

export const MenuModel = createCustomModel((props: MenuModelProps) => {
  return {
    ...props,
  };
});
