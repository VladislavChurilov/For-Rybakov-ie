"use client";
import React from "react";
import { useWithdrawalStore } from "@/store";
import {FieldValues, useForm} from "react-hook-form";
import s from "./Withdraw.module.css";

const Withdraw = () => {
  const { submit, state } = useWithdrawalStore();

  const form = useForm({
    // resolver: zodResolver(schema), при необходимости можно настроить резолвер zod и тп
    mode: "onChange",
  });

  const onSubmit = (data: FieldValues) => {
    submit(data.amount, data.destination)
  }

  return (
    <form
      className={s.form}
      // onSubmit={form.handleSubmit((data) =>
      //   submit(data.amount, data.destination),
      // )}
        onSubmit={onSubmit}
    >
      <input
        type="number"
        {...form.register("amount", {
          valueAsNumber: true,
        })}
      />

      <input type="text" {...form.register("destination")} />

      <input style={{}} title={'confirm'} type="checkbox" {...form.register("confirm")} />

      <button disabled={!form.formState.isValid || state.type === "submitting"}>
        {state.type === "submitting" ? "Processing..." : "Withdraw"}
      </button>
    </form>
  );
};

export default Withdraw;
