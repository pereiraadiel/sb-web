import { Good } from "@/domain/entities/good.entity";
import { ApiService } from "@/domain/services/api.service";
import { AccessTokenService } from "@/domain/services/accessToken.service";

class GetAllGoodsUsecase {
  private static instance: GetAllGoodsUsecase | null = null;

  public static singleton(): GetAllGoodsUsecase {
    if (!GetAllGoodsUsecase.instance) {
      GetAllGoodsUsecase.instance = new GetAllGoodsUsecase(
        ApiService.singleton(),
        AccessTokenService.singleton()
      );
    }
    return GetAllGoodsUsecase.instance;
  }

  private constructor(
    private readonly apiService: ApiService,
    private readonly accessTokenService: AccessTokenService
  ) {}

  public async execute(): Promise<Good[]> {
    const token = this.accessTokenService.getAccessToken();
    if (token === null) {
      throw new Error("Access token not found");
    }
    return this.apiService.useAccessToken(token).get<Good[]>("/goods");
  }
}

export { GetAllGoodsUsecase };
