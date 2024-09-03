import { calculateMonthlyRepayment } from "../calculateMonthlyRepayment";

export const testMonthlyRepayment = (
    loanAmount: number,
    annualInterestRate: number,
    loanLengthYears: number,
    fees: number,
    expectedMonthlyRepayment: number
) => {
    const result = calculateMonthlyRepayment(loanAmount, annualInterestRate, loanLengthYears, fees);
    expect(result).toBe(expectedMonthlyRepayment);
};