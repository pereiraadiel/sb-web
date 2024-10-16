import { Good } from "@/domain/entities/good.entity";
import { ApiService } from "@/domain/services/api.service";
import { AccessTokenService } from "@/domain/services/accessToken.service";

class CreateGoodUsecase {
  private static instance: CreateGoodUsecase | null = null;

  public static singleton(): CreateGoodUsecase {
    if (!CreateGoodUsecase.instance) {
      CreateGoodUsecase.instance = new CreateGoodUsecase(
        ApiService.singleton(),
        AccessTokenService.singleton()
      );
    }
    return CreateGoodUsecase.instance;
  }

  private constructor(
    private readonly apiService: ApiService,
    private readonly accessTokenService: AccessTokenService
  ) {}

  public async execute(good: Omit<Good, "id">): Promise<Good> {
    const token = this.accessTokenService.getAccessToken();
    if (token === null) {
      throw new Error("Access token not found");
    }
    return this.apiService.useAccessToken(token).post<Good>("/goods", good);
  }
}

export { CreateGoodUsecase };
