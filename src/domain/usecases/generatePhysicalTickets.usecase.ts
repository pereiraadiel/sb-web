import { Ticket } from "@/domain/entities/ticket.entity";
import { ApiService } from "@/domain/services/api.service";
import { AccessTokenService } from "@/domain/services/accessToken.service";

export class GeneratePhysicalTicketsUsecase {
  constructor(
    private readonly apiService: ApiService,
    private readonly accessTokenService: AccessTokenService
  ) {}

  public async execute(): Promise<Ticket> {
    const token = this.accessTokenService.getAccessToken();
    if (token === null) {
      throw new Error("Access token not found");
    }
    return this.apiService.useAccessToken(token).get<Ticket>("/tickets/physical");
  }
}
