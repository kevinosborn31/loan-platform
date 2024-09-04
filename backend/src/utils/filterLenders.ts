import { Lender } from "../types/quote";

export const filterLenders = (
  lenders: Lender[],
  loanTerm: number,
  loanAmount: number,
  deposit: number
) => {
  return lenders.filter((lender) => {
    const minimumRequiredDeposit = (lender.requiredDepositPercentage / 100) * loanAmount;

    return (
      loanTerm >= lender.minTerm &&
      loanTerm <= lender.maxTerm &&
      loanAmount <= lender.maxLoanAmount &&
      deposit >= minimumRequiredDeposit
    );
  });
};