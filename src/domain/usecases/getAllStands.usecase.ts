import { Stand } from "@/domain/entities/stand.entity";
import { ApiService } from "@/domain/services/api.service";
import { AccessTokenService } from "@/domain/services/accessToken.service";

class GetAllStandsUsecase {
  private static instance: GetAllStandsUsecase | null = null;

  public static singleton(): GetAllStandsUsecase {
    if (!GetAllStandsUsecase.instance) {
      GetAllStandsUsecase.instance = new GetAllStandsUsecase(
        ApiService.singleton(),
        AccessTokenService.singleton()
      );
    }
    return GetAllStandsUsecase.instance;
  }

  private constructor(
    private readonly apiService: ApiService,
    private readonly accessTokenService: AccessTokenService
  ) {}

  public async execute(): Promise<Stand[]> {
    const token = this.accessTokenService.getAccessToken();
    if (token === null) {
      throw new Error("Access token not found");
    }
    return this.apiService.useAccessToken(token).get<Stand[]>("/stands");
  }
}

export { GetAllStandsUsecase };
