export class LocalStorageService {
	
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

		const parsedItem = JSON.parse(item);

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

    localStorage.setItem(key, JSON.stringify(item));
  }

	/**
	 * 
	 * @param key string
	 */
	removeItem(key: string) {
		localStorage.removeItem(key);
	}
}

const localStorageSingleton = new LocalStorageService();

export default localStorageSingleton;