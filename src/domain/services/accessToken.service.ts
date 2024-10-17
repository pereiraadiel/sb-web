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

//singleton
let accessTokenService: AccessTokenService;

export const getAccessTokenService = (): AccessTokenService => {
	if (!accessTokenService) {
		accessTokenService = new AccessTokenService();
	}

	return accessTokenService;
};