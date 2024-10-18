import { Encoder } from "@/core/lib/encode.util";

class LocalStorageService {
  private static instance: LocalStorageService | null = null;

  public static singleton(): LocalStorageService {
    if (!LocalStorageService.instance) {
      LocalStorageService.instance = new LocalStorageService();
    }
    return LocalStorageService.instance;
  }

  private constructor() {}
  /**
   *
   * @param key string
   * @returns item from local storage
   */
  getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);

    if (!item) {
      return null;
    }

    const decodedItem = Encoder.decode(item);

    const parsedItem = JSON.parse(decodedItem);

    if (parsedItem.expiry < new Date().getTime()) {
      localStorage.removeItem(key);
      return null;
    }

    return parsedItem.value as T;
  }

  /**
   *
   * @param key string
   * @param value item to store
   * @param ttl in milliseconds
   */
  setItemWithTTL<T>(key: string, value: T, ttl: number) {
    const now = new Date();

    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    };

    const itemString = JSON.stringify(item);

    const encodedItem = Encoder.encode(itemString);

    localStorage.setItem(key, encodedItem);
  }

  /**
   *
   * @param key string
   */
  removeItem(key: string) {
    localStorage.removeItem(key);
  }
}

export { LocalStorageService };
