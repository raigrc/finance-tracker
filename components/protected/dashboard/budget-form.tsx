"use client";

import React, { useState, useTransition } from "react";
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
import { Button } from "../../ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BudgetSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { budget } from "@/actions/budget";
import BudgetSuccess from "./budget-success";
import BudgetError from "./budget-error";
import { Separator } from "@/components/ui/separator";

const BudgetForm = () => {
  const [isPending, startTransition] = useTransition();

  const [budgetSuccess, setBudgetSuccess] = useState<string | undefined>();
  const [budgetError, setBudgetError] = useState<string | undefined>();

  const form = useForm<z.infer<typeof BudgetSchema>>({
    resolver: zodResolver(BudgetSchema),
    defaultValues: {
      date: new Date(),
      income: 0,
      allocations: {
        Savings: 20,
        Wants: 30,
        Needs: 50,
      },
    },
  });

  const handleSubmit = (values: z.infer<typeof BudgetSchema>) => {
    startTransition(() => {
      budget(values).then((data) => {
        setBudgetSuccess(data?.success);
        setBudgetError(data?.error);
      });
      console.log(values);
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Budget</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Add Budget</DialogTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6 py-4"
            >
              <div className="space-y-4">
                <div className="flex flex-row items-center justify-between space-x-3">
                  <FormField
                    control={form.control}
                    name="month"
                    render={({ field }) => (
                      <FormItem className="w-full">
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
                              {Array.from({ length: 12 }, (_, i) => (
                                <SelectItem key={i} value={String(i + 1)}>
                                  {new Date(0, i).toLocaleString("default", {
                                    month: "long",
                                  })}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Year</FormLabel>
                        <FormControl>
                          <Select
                            disabled={isPending}
                            // value={String(field.value)}
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
              </div>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="income"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel aria-required="true">Monthly Income</FormLabel>
                      <FormControl>
                        <Input disabled={isPending} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Separator />
              <div className="space-y-4">
                <div className="flex flex-row items-center justify-between space-x-3">
                  {["Needs", "Wants", "Savings"].map((category) => (
                    <FormField
                      key={category}
                      control={form.control}
                      name={
                        `allocations.${category}` as
                          | `allocations.Needs`
                          | `allocations.Wants`
                          | `allocations.Savings`
                      }
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
                  ))}
                </div>
                {/* <div className="flex flex-row items-center justify-between space-x-3">
                  <FormField
                    control={form.control}
                    name="mainCategory.Needs"
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
                    name="mainCategory.Wants"
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
                    name="mainCategory.Savings"
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
                </div> */}
              </div>
              <div className="space-y-4"></div>
              <BudgetSuccess message={budgetSuccess} />
              <BudgetError message={budgetError} />
              <Button
                disabled={isPending}
                className="w-full"
                size="lg"
                type="submit"
              >
                Add Budget
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default BudgetForm;
