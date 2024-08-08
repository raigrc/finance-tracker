export const formatCurrency = (amount: number | undefined) => {
  if (amount === undefined) return "₱0.00"; // Default value if amount is undefined
  return new Intl.NumberFormat("fil-PH", {
    style: "currency",
    currency: "PHP",
  }).format(amount);
};
