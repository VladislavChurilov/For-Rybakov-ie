import { create } from "zustand";
import { Withdrawal } from "@/withdrawal/withdrawal";
import { WithdrawalService } from "@/withdrawal/service";

type WithdrawalState =
  | { type: "idle" }
  | { type: "submitting" }
  | { type: "success"; data: Withdrawal }
  | { type: "error"; message: string };

interface Store {
  state: WithdrawalState;
  idempotencyKey: string | null;
  submit: (amount: number, destination: string) => Promise<void>;
  reset: () => void;
}

const service = new WithdrawalService();

export const useWithdrawalStore = create<Store>((set, get) => ({
  state: { type: "idle" },
  idempotencyKey: null,

  async submit(amount, destination) {
    if (get().state.type === "submitting") return;

    const key = get().idempotencyKey ?? crypto.randomUUID();

    set({
      state: { type: "submitting" },
      idempotencyKey: key,
    });

    try {
      const data = await service.create(amount, destination, key);

      set({
        state: { type: "success", data },
      });
    } catch (error) {
      set({
        state: {
          type: "error",
          message: JSON.stringify(error) || 'Submit error',
        },
      });
    }
  },

  reset() {
    set({
      state: { type: "idle" },
      idempotencyKey: null,
    });
  },
}));
