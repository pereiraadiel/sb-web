import { ApiService } from "@/domain/services/api.service";
import { AccessTokenService } from "@/domain/services/accessToken.service";

class AuthenticateAdminUsecase {
  private static instance: AuthenticateAdminUsecase | null = null;

  public static singleton(): AuthenticateAdminUsecase {
    if (!AuthenticateAdminUsecase.instance) {
      AuthenticateAdminUsecase.instance = new AuthenticateAdminUsecase(
        ApiService.singleton(),
        AccessTokenService.singleton()
      );
    }
    return AuthenticateAdminUsecase.instance;
  }

  private constructor(
    private readonly apiService: ApiService,
    private readonly accessTokenService: AccessTokenService
  ) {}

  public async execute(code: string): Promise<{ token: string }> {
    const response = await this.apiService.post<{ token: string }>("/auth", {
      code,
    });

    this.accessTokenService.storeAccessToken(response.token);

    return response;
  }
}

export { AuthenticateAdminUsecase };
