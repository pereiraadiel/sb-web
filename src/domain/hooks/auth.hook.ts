import { create } from "zustand";

import { AuthenticateAdminUsecase } from "@/domain/usecases/authenticateAdmin.usecase";
import { AccessTokenService } from "@/domain/services/accessToken.service";

type UseAuth = {
  isAuthenticated: boolean;
  error?: string;
  verifyAuthentication: () => void;
  accessToken?: string;
  authenticate: (code: string) => Promise<void>;
  logout: () => void;
};

const authenticateAdminUsecase = AuthenticateAdminUsecase.singleton();

const useAuth = create<UseAuth>((set) => {
  return {
    authenticate: async (code: string) => {
      try {
        const token = await authenticateAdminUsecase.execute(code);
        set({
          isAuthenticated: true,
          accessToken: token.token,
          error: undefined,
        });

        setInterval(() => {
          const accessTokenService = AccessTokenService.singleton();
          const isStillAuthenticated = accessTokenService.getAccessToken();
          set(() => ({
            isAuthenticated: !!isStillAuthenticated,
            accessToken: isStillAuthenticated || undefined,
            error: undefined,
          }));
        }, 30 * 1000); // 30 seconds
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        // console.error("useAuth · authenticate: ", err);
        const errors: Record<string, string> = {
          401: "Código inválido",
          429: "Muitas tentativas, tente novamente mais tarde",
        };
        const message = errors[err.status] || "Erro ao autenticar";
        set({ isAuthenticated: false, error: `${btoa(Math.random().toString())}.${err.status} · ${message}` });
      }
    },
    verifyAuthentication: () => {
      try {
        setInterval(() => {
          const accessTokenService = AccessTokenService.singleton();
          const isStillAuthenticated = accessTokenService.getAccessToken();
          set(() => ({
            isAuthenticated: !!isStillAuthenticated,
            accessToken: isStillAuthenticated || undefined,
            error: undefined,
          }));
        }, 30 * 1000);
      } catch (error) {
        set({
          isAuthenticated: false,
          accessToken: undefined,
          error: "Erro ao verificar autenticação",
        });
      }
    },
    logout: () => {
      const accessTokenService = AccessTokenService.singleton();
      accessTokenService.removeAccessToken();
      set({ isAuthenticated: false, accessToken: undefined, error: undefined });
    },
    isAuthenticated: false,
  };
});

export { useAuth };
