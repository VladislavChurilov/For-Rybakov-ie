import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <main className="">
        <h1> Home page should be here </h1>
        <Link href={"/withdraw"} className={"link"}>
          Go to Withdraw
        </Link>
      </main>
    </div>
  );
}
