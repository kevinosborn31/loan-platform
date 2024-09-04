import { Lender } from "../types/quote";

export const mockLenders: Lender[] = [
  {
    name: "Lender A",
    interestRate: 5.5,
    fees: [{ value: 10, feeType: "application fee" }],
    minTerm: 12,
    maxTerm: 60,
    maxLoanAmount: 10000,
    requiredDepositPercentage: 0,
  },
  {
    name: "Lender B",
    interestRate: 5.0,
    fees: [{ value: 10, feeType: "processing fee" }],
    minTerm: 12,
    maxTerm: 60,
    maxLoanAmount: 25000,
    requiredDepositPercentage: 25,
  },
  {
    name: "Lender C",
    interestRate: 6.0,
    fees: [],
    minTerm: 12,
    maxTerm: 60,
    maxLoanAmount: 100000,
    requiredDepositPercentage: 50,
  },
  {
    name: "Lender D",
    interestRate: 4.8,
    fees: [{ value: 20, feeType: "administration fee" }],
    minTerm: 24,
    maxTerm: 72,
    maxLoanAmount: 50000,
    requiredDepositPercentage: 10,
  },
  {
    name: "Lender E",
    interestRate: 6.5,
    fees: [{ value: 15, feeType: "annual fee" }],
    minTerm: 12,
    maxTerm: 36,
    maxLoanAmount: 15000,
    requiredDepositPercentage: 15,
  },
];