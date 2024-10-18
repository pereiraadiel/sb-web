import { Ticket } from "@/domain/entities/ticket.entity";
import { ApiService } from "@/domain/services/api.service";
import { AccessTokenService } from "@/domain/services/accessToken.service";

class GeneratePhysicalTicketsUsecase {
  private static instance: GeneratePhysicalTicketsUsecase | null = null;

  public static singleton(): GeneratePhysicalTicketsUsecase {
    if (!GeneratePhysicalTicketsUsecase.instance) {
      GeneratePhysicalTicketsUsecase.instance =
        new GeneratePhysicalTicketsUsecase(
          ApiService.singleton(),
          AccessTokenService.singleton()
        );
    }
    return GeneratePhysicalTicketsUsecase.instance;
  }

  private constructor(
    private readonly apiService: ApiService,
    private readonly accessTokenService: AccessTokenService
  ) {}

  public async execute(): Promise<Ticket> {
    const token = this.accessTokenService.getAccessToken();
    if (token === null) {
      throw new Error("Access token not found");
    }
    return this.apiService
      .useAccessToken(token)
      .get<Ticket>("/tickets/physical");
  }
}
export { GeneratePhysicalTicketsUsecase };
