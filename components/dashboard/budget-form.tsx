"use client";

import React, { useRef, useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BudgetSchema, TransactionSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { budget } from "@/actions/budget";
import { useSession } from "next-auth/react";
import BudgetSuccess from "./budget-success";
import BudgetError from "./budget-error";
import { useRouter } from "next/router";

const BudgetForm = () => {
  const { data: session } = useSession();

  const [isPending, startTransition] = useTransition();

  const [budgetSuccess, setBudgetSuccess] = useState<string | undefined>();
  const [budgetError, setBudgetError] = useState<string | undefined>();

  const form = useForm<z.infer<typeof BudgetSchema>>({
    resolver: zodResolver(BudgetSchema),
    defaultValues: {
      userId: session?.user.id,
      totalAmount: 0,
      needsPercentage: 50,
      wantsPercentage: 30,
      savingsPercentage: 20,
      month: new Date().getMonth() + 1,
      year: new Date(Date.now()).getFullYear(),
    },
  });

  const handleSubmit = (values: z.infer<typeof BudgetSchema>) => {
    startTransition(() => {
      budget(values).then((data) => {
        setBudgetSuccess(data?.success);
        setBudgetError(data?.error);
        form.reset();
      });
    });
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Button asChild>Add Budget</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">Add Budget</DialogTitle>
          <DialogDescription>This is a description</DialogDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6 py-4"
            >
              <div className="space-y-4">
                <div className="flex flex-row items-center justify-between space-x-3">
                  <FormField
                    control={form.control}
                    name="needsPercentage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel aria-required="true">
                          Needs <span className="text-gray-400">(%)</span>
                        </FormLabel>
                        <FormControl>
                          <Input disabled={isPending} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="wantsPercentage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel aria-required="true">
                          Wants <span className="text-gray-400">(%)</span>
                        </FormLabel>
                        <FormControl>
                          <Input disabled={isPending} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="savingsPercentage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel aria-required="true">
                          Savings <span className="text-gray-400">(%)</span>
                        </FormLabel>
                        <FormControl>
                          <Input disabled={isPending} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="totalAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel aria-required="true">
                        Amount of Money
                      </FormLabel>
                      <FormControl>
                        <Input disabled={isPending} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="month"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Month</FormLabel>
                      <FormControl>
                        <Select
                          disabled={isPending}
                          // value={String(field.value)}
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Month" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">January</SelectItem>
                            <SelectItem value="2">February</SelectItem>
                            <SelectItem value="3">March</SelectItem>
                            <SelectItem value="4">April</SelectItem>
                            <SelectItem value="5">May</SelectItem>
                            <SelectItem value="6">June</SelectItem>
                            <SelectItem value="7">July</SelectItem>
                            <SelectItem value="8">August</SelectItem>
                            <SelectItem value="9">September</SelectItem>
                            <SelectItem value="10">October</SelectItem>
                            <SelectItem value="11">November</SelectItem>
                            <SelectItem value="12">December</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year</FormLabel>
                      <FormControl>
                        <Select
                          disabled={isPending}
                          value={String(field.value)}
                          onValueChange={(value) => field.onChange(value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Year" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 10 }, (_, i) => (
                              <SelectItem
                                key={i}
                                value={String(
                                  new Date(Date.now()).getFullYear() + i,
                                )}
                              >
                                {new Date(Date.now()).getFullYear() + i}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <BudgetSuccess message={budgetSuccess} />
              <BudgetError message={budgetError} />
              {isPending ? (
                <Button disabled className="w-full" size="lg" type="submit">
                  Adding Budget...
                </Button>
              ) : (
                <Button
                  disabled={isPending}
                  className="w-full"
                  size="lg"
                  type="submit"
                >
                  Add Budget
                </Button>
              )}
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default BudgetForm;
