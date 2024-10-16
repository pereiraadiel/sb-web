import { Good } from "@/domain/entities/good.entity";
import { ApiService } from "@/domain/services/api.service";
import { AccessTokenService } from "@/domain/services/accessToken.service";

export class AssociateGoodToStandUsecase {
  constructor(
    private readonly apiService: ApiService,
    private readonly accessTokenService: AccessTokenService
  ) {}

  public async execute(goodId: string, standId: string, priceCents: number, stock: number): Promise<Good> {
    const token = this.accessTokenService.getAccessToken();
    if (token === null) {
      throw new Error("Access token not found");
    }
    return this.apiService.useAccessToken(token).post<Good>(`/stands/${standId}/goods`, {
      goodId,
      priceCents,
      stock,
    });
  }
}
