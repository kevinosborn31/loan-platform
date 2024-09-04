import { Lender } from "../types/quote";

export const lenders: Lender[] = [
  {
    name: "Lender A",
    interestRate: 5.5,
    fees: [{ value: 10, feeType: "application fee" }],
    minTerm: 12,
    maxTerm: 60,
    maxLoanAmount: 10000,
    requiredDeposit: 0
  },
  {
    name: "Lender B",
    interestRate: 5.0,
    fees: [{ value: 10, feeType: "application fee" }],
    minTerm: 12,
    maxTerm: 60,
    maxLoanAmount: 25000,
    requiredDeposit: 25
  },
  {
    name: "Lender C",
    interestRate: 6.0,
    fees: [],
    minTerm: 12,
    maxTerm: 60,
    maxLoanAmount: 100000,
    requiredDeposit: 50
  },
];
