import { Good } from "./good.entity";

export type Stand = {
  id: string;
  fullname: string;
  category: string;
  goods: Good[];
  createdAt: Date;
};
