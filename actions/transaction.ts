"use server";

import { TransactionSchema } from "@/schemas";
import { z } from "zod";

export const transaction = async (
  values: z.infer<typeof TransactionSchema>,
) => {
  const transactionData = TransactionSchema.safeParse(values);

  console.log(transactionData);

  // return
};
