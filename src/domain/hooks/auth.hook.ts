import { create } from "zustand";

import { getAuthenticateAdminUsecase } from "@/domain/usecases/authenticateAdmin.usecase";
import { getAccessTokenService } from "@/domain/services/accessToken.service";

type UseAuth = {
  isAuthenticated: boolean;
  verifyAuthentication: () => void;
  accessToken?: string;
  authenticate: (code: string) => Promise<void>;
	logout: () => void;
};

const authenticateAdminUsecase = getAuthenticateAdminUsecase();

const useAuth = create<UseAuth>((set) => {
  return {
    authenticate: async (code: string) => {
      try {
        const token = await authenticateAdminUsecase.execute(code);
        set({ isAuthenticated: true, accessToken: token.token });

        setInterval(() => {
          const accessTokenService = getAccessTokenService();
          const isStillAuthenticated = accessTokenService.getAccessToken();
          set(() => ({
            isAuthenticated: !!isStillAuthenticated,
            accessToken: isStillAuthenticated || undefined,
          }));
        }, 30 * 1000); // 30 seconds
      } catch (error) {
        set({ isAuthenticated: false });
      }
    },
    verifyAuthentication: () => {
      try {
        setInterval(() => {
          const accessTokenService = getAccessTokenService();
          const isStillAuthenticated = accessTokenService.getAccessToken();
          set(() => ({
            isAuthenticated: !!isStillAuthenticated,
            accessToken: isStillAuthenticated || undefined,
          }));
        }, 30 * 1000);
      } catch (error) {
        set({ isAuthenticated: false, accessToken: undefined });
      }
    },
		logout: () => {
			const accessTokenService = getAccessTokenService();
			accessTokenService.removeAccessToken();
			set({ isAuthenticated: false, accessToken: undefined });
		},
    isAuthenticated: false,
  };
});

export { useAuth };
