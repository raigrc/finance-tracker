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
import { TransactionSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { transaction } from "@/actions/transaction";

const TransactionButton = () => {
  const form = useForm<z.infer<typeof TransactionSchema>>({
    resolver: zodResolver(TransactionSchema),
    defaultValues: {
      amount: undefined,
      category: undefined,
      type: "INCOME",
      description: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof TransactionSchema>) => {
    transaction(values);
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Add Transaction</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">Add Transaction</DialogTitle>
          <DialogDescription>This is a description</DialogDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6 py-4"
            >
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel aria-required="true">Type</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="INCOME">Income</SelectItem>
                            <SelectItem value="EXPENSE">Expense</SelectItem>
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
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel aria-required="true">Amount</FormLabel>
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
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Needs">Needs</SelectItem>
                            <SelectItem value="Wants">Wants</SelectItem>
                            <SelectItem value="Savings">Savings</SelectItem>
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
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description <span className="text-gray-400 opacity-50">(optional)</span></FormLabel>
                      <FormControl>
                        <Input placeholder="Ex. Salary, Grocery Shopping" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button className="w-full" size="lg" type="submit">
                Add Transaction
              </Button>
            </form>
          </Form>
        </DialogHeader>
        {/* <DialogDescription>This is Description</DialogDescription> */}
      </DialogContent>
    </Dialog>
  );
};

export default TransactionButton;
