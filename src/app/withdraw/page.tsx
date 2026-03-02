import dynamic from "next/dynamic";

const Withdraw = dynamic(() => import("@/withdraw/Withdraw"));

export default async function WithdrawPage() {
  return <Withdraw />;
}
