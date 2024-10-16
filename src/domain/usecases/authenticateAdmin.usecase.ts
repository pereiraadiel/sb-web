import { ApiService } from "@/domain/services/api.service";
import { AccessTokenService } from "@/domain/services/accessToken.service";

export class AuthenticateAdminUsecase {
  constructor(
    private readonly apiService: ApiService,
    private readonly accessTokenService: AccessTokenService
  ) {}

  public async execute(code: string): Promise<{ token: string }> {
    console.log("AuthenticateAdminUsecase · code: ", code);
    const response = await this.apiService.post<{ token: string }>("/auth", {
      code,
    });

    console.log("AuthenticateAdminUsecase · response: ", response);

    this.accessTokenService.storeAccessToken(response.token);

    return response;
  }
}
