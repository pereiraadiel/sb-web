import { Ticket } from "@/domain/entities/ticket.entity";
import { ApiService } from "@/domain/services/api.service";
import { AccessTokenService } from "@/domain/services/accessToken.service";

class CreateTicketsUsecase {
  private static instance: CreateTicketsUsecase | null = null;

  public static singleton(): CreateTicketsUsecase {
    if (!CreateTicketsUsecase.instance) {
      CreateTicketsUsecase.instance = new CreateTicketsUsecase(
        ApiService.singleton(),
        AccessTokenService.singleton()
      );
    }
    return CreateTicketsUsecase.instance;
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
    return this.apiService.useAccessToken(token).post<Ticket>("/tickets", {
      quantity: 10,
    });
  }
}

export { CreateTicketsUsecase };
