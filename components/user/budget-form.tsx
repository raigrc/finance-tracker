import React from "react";
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

const BudgetButton = () => {
  const { data: session } = useSession();
  const form = useForm<z.infer<typeof BudgetSchema>>({
    resolver: zodResolver(BudgetSchema),
    defaultValues: {
      userId: session?.user.id,
      totalAmount: undefined,
      needsPercentage: 50,
      wantsPercentage: 30,
      savingsPercentage: 20,
      needsAmount: 0,
      wantsAmount: 0,
      savingsAmount: 0,
      month: new Date().getMonth() + 1,
      year: new Date(Date.now()).getFullYear(),
    },
  });

  const handleSubmit = (values: z.infer<typeof BudgetSchema>) => {
    const budgetData = {
      ...values,
      needsAmount: (values.totalAmount * values.needsPercentage) / 100,
      wantsAmount: (values.totalAmount * values.wantsPercentage) / 100,
      savingsAmount: (values.totalAmount * values.savingsPercentage) / 100,
    };

    budget(budgetData);
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Add Budget</Button>
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
                          <Input {...field} />
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
                          <Input {...field} />
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
                          <Input {...field} />
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
                        <Input {...field} />
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
                          value={String(field.value)}
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
              <Button className="w-full" size="lg" type="submit">
                Add Budget
              </Button>
            </form>
          </Form>
        </DialogHeader>
        {/* <DialogDescription>This is Description</DialogDescription> */}
      </DialogContent>
    </Dialog>
  );
};

export default BudgetButton;
