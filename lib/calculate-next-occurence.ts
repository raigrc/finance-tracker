import { addDays, addWeeks, addMonths } from "date-fns";

export const calculateNextOccurence = (date: Date, frequency: string) => {
  switch (frequency) {
    case "Daily": {
      return addDays(date, 1);
    }
    case "Weekly": {
      return addWeeks(date, 1);
    }
    case "Monthly": {
      return addMonths(date, 1);
    }
  }
};
