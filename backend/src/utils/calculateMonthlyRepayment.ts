import { Fee } from "../types/quote";

export const calculateMonthlyRepayment = (
  loanAmount: number,
  annualInterestRate: number,
  loanTerm: number,
  fees: Fee[]
): number => {
  const totalFeeAmount = fees.reduce((total, fee) => total + fee.value, 0);
  const annualInterestRateDecimal = annualInterestRate / 100;
  const monthlyInterestRate = annualInterestRateDecimal / 12;
  const loanLengthMonths = loanTerm * 12;
  const totalLoanAmount = loanAmount + totalFeeAmount;

  const repayment =
    monthlyInterestRate > 0
      ? (totalLoanAmount * monthlyInterestRate) /
        (1 - Math.pow(1 + monthlyInterestRate, -loanLengthMonths))
      : totalLoanAmount / loanLengthMonths;

  return Math.round(repayment);
};
