import { create } from "zustand";

type ToastVariant = "success" | "error" | "warning" | "info";
type Toast = {
  id: string;
  text: string;
  variant?: ToastVariant;
  expiresIn?: number;
};

type UseToast = {
  toasts: Toast[];

  /**
   *
   * @param message string
   * @param variant success | error | warning | info
   * @param expiresIn seconds
   */
  addToast: (
    message: string,
    variant: ToastVariant,
    expiresIn?: number
  ) => void;

  /**
   *
   * @param id string
   * @returns
   */
  removeToast: (id: string) => void;
};

const useToast = create<UseToast>((set) => ({
  toasts: [],

  addToast: (message: string, variant: ToastVariant, expiresIn = 4) => {
    const id = Math.random().toString();
    set((state) => ({
      toasts: [
        ...state.toasts,
        { id, text: message, variant, expiresIn },
      ],
    }));

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((toast) => toast.id !== id),
      }));
    }, expiresIn * 1000);
  },

  removeToast: (id: string) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
}));

export { useToast };
