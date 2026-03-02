import apiInstance from "@/axios";

export interface Withdrawal {
  id: string;
  amount: number;
  destination: string;
  confirm: boolean;
  created_at: string;
}

// если очень важен контроль утечки памяти можно довавить AbortController signal...

export const postWithdrawal = async (data: {
  amount: number;
  destination: string;
  idempotency_key: string;
}) => {
  const res = await apiInstance.post<Withdrawal>("/v1/withdrawals", data);
  return res.data;
};

export const getWithdrawal = async (id: string) => {
  const res = await apiInstance.get<Withdrawal>(`/v1/withdrawals/${id}`);
  return res.data;
};
