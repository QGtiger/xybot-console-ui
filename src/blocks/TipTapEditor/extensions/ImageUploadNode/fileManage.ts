// 创建一个全局的文件管理器
class FileManager {
  private files = new Map<string, File>();

  setFile(id: string, file: File) {
    this.files.set(id, file);
  }

  getFile(id: string): File | undefined {
    return this.files.get(id);
  }

  deleteFile(id: string) {
    this.files.delete(id);
  }
}

export function generateUniqueId(): string {
  return 'file-' + Math.random().toString(36).substr(2, 9);
}

export const fileManager = new FileManager();

export function addFile(file: File): string {
  const id = generateUniqueId();
  fileManager.setFile(id, file);
  return id;
}

export function removeFile(id: string) {
  fileManager.deleteFile(id);
}
