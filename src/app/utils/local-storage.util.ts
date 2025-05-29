export class LocalStorageUtil {
  static saveData(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  static getData<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) as T : null;
  }
}