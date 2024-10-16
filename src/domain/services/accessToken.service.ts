import localStorageSingleton from "./localStorage.service";

export class AccessTokenService {
	storeAccessToken(accessToken: string): void {
		localStorageSingleton.setItemWithTTL<string>('tessera@accessToken', accessToken, 15 * 60 * 1000);
	}

	getAccessToken(): string | null {
		return localStorageSingleton.getItem<string>('tessera@accessToken');
	}

	removeAccessToken(): void {
		localStorageSingleton.removeItem('tessera@accessToken');
	}
}