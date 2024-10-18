import { LocalStorageService } from "./localStorage.service";

class AccessTokenService {
  private static instance: AccessTokenService | null = null;

  public static singleton(): AccessTokenService {
    if (!AccessTokenService.instance) {
      AccessTokenService.instance = new AccessTokenService();
    }
    return AccessTokenService.instance;
  }

  private constructor() {}
	
  storeAccessToken(accessToken: string): void {
    LocalStorageService.singleton().setItemWithTTL<string>(
      "tessera@accessToken",
      accessToken,
      15 * 60 * 1000
    );
  }

  getAccessToken(): string | null {
    return LocalStorageService.singleton().getItem<string>(
      "tessera@accessToken"
    );
  }

  removeAccessToken(): void {
    LocalStorageService.singleton().removeItem("tessera@accessToken");
  }
}

export { AccessTokenService };
