import { Stand } from "@/domain/entities/stand.entity";
import { ApiService } from "@/domain/services/api.service";
import { AccessTokenService } from "@/domain/services/accessToken.service";

class CreateStandUsecase {
  private static instance: CreateStandUsecase | null = null;

  public static singleton(): CreateStandUsecase {
    if (!CreateStandUsecase.instance) {
      CreateStandUsecase.instance = new CreateStandUsecase(
        ApiService.singleton(),
        AccessTokenService.singleton()
      );
    }
    return CreateStandUsecase.instance;
  }


  private constructor(
    private readonly apiService: ApiService,
    private readonly accessTokenService: AccessTokenService
  ) {}

  public async execute(stand: Omit<Stand, "id">): Promise<Stand> {
    const token = this.accessTokenService.getAccessToken();
    if (token === null) {
      throw new Error("Access token not found");
    }
    return this.apiService.useAccessToken(token).post<Stand>("/stands", stand);
  }
}

export { CreateStandUsecase };
