import { Good } from "@/domain/entities/good.entity";
import { ApiService } from "@/domain/services/api.service";
import { AccessTokenService } from "@/domain/services/accessToken.service";

class AssociateGoodToStandUsecase {
  private static instance: AssociateGoodToStandUsecase | null = null;

  public static singleton(): AssociateGoodToStandUsecase {
    if (!AssociateGoodToStandUsecase.instance) {
      AssociateGoodToStandUsecase.instance = new AssociateGoodToStandUsecase(
        ApiService.singleton(),
        AccessTokenService.singleton()
      );
    }
    return AssociateGoodToStandUsecase.instance;
  }

  private constructor(
    private readonly apiService: ApiService,
    private readonly accessTokenService: AccessTokenService
  ) {}

  public async execute(
    goodId: string,
    standId: string,
    priceCents: number,
    stock: number
  ): Promise<Good> {
    const token = this.accessTokenService.getAccessToken();
    if (token === null) {
      throw new Error("Access token not found");
    }
    return this.apiService
      .useAccessToken(token)
      .post<Good>(`/stands/${standId}/goods`, {
        goodId,
        priceCents,
        stock,
      });
  }
}


export { AssociateGoodToStandUsecase };
