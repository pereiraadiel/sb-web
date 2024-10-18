import { create } from "zustand";

import { AccessTokenService } from "@/domain/services/accessToken.service";
import { Good } from "@/domain/entities/good.entity";
import { ApiService } from "@/domain/services/api.service";

type UseGood = {
  error?: string;
  good?: Good;
  goods?: Good[];
  getById: (id: string) => Promise<void>;
  getMany: () => Promise<void>;
};

const accessTokenService = AccessTokenService.singleton();
const accessToken = accessTokenService.getAccessToken();

const fakeGoods: Good[] = [
	{
		id: "1",
		fullname: "Coca-cola 375ml",
		description: "Refrigerante de cola",
		priceCents: 500,
		category: "bebidas",
		createdAt: new Date(),
	},
	{
		id: "2",
		fullname: "Pastel de carne",
		description: "Pastel de carne moída",
		priceCents: 1000,
		category: "pastel",
		createdAt: new Date(),
	},
		
]

const useGood = create<UseGood>((set) => {
  return {
		goods: fakeGoods,
		good: fakeGoods[0],
    getById: async (id: string) => {
      try {
        if (!accessToken) {
          set({ error: "Acesso negado" });
          return;
        }
        const good = await ApiService.singleton()
          .useAccessToken(accessToken)
          .get<Good>(`/goods/${id}`);
        set({ good });
      } catch (error) {
        set({ error: "Erro ao buscar produto" });
      }
    },
    getMany: async () => {
      try {
        if (!accessToken) {
          set({ error: "Acesso negado" });
          return;
        }
        const goods = await ApiService.singleton()
          .useAccessToken(accessToken)
          .get<Good[]>("/goods");

        set({ goods });
      } catch (error) {
        set({ error: "Erro ao buscar produtos" });
      }
    },
  };
});

export { useGood };
