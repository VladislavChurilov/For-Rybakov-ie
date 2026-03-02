import { Withdrawal } from "./withdrawal.types";
import { postWithdrawal } from "@/withdrawal/withdrawal";
import { retryNetwork } from "@/retry";

export class WithdrawalService {
  constructor(private api = postWithdrawal) {}

  async create(
    amount: number,
    destination: string,
    idempotencyKey: string,
  ): Promise<Withdrawal> {
    try {
      return await retryNetwork(() =>
        this.api({
          amount,
          destination,
          idempotency_key: idempotencyKey,
        }),
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("This withdrawal was already submitted.");
      }

      throw new Error("Temporary network issue. Please retry.");
    }
  }
}
