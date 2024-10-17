import { ApiService } from "@/domain/services/api.service";
import { AccessTokenService } from "@/domain/services/accessToken.service";

export class AuthenticateAdminUsecase {
  constructor(
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

// singleton
let authenticateAdminUsecase: AuthenticateAdminUsecase;

export const getAuthenticateAdminUsecase = (): AuthenticateAdminUsecase => {
  if (!authenticateAdminUsecase) {
    authenticateAdminUsecase = new AuthenticateAdminUsecase(
      new ApiService(),
      new AccessTokenService()
    );
  }

  return authenticateAdminUsecase;
};
