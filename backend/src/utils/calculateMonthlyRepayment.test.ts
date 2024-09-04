import { Fee } from "../types/quote";
import { calculateMonthlyRepayment } from "./calculateMonthlyRepayment";

const testMonthlyRepayment = (
  loanAmount: number,
  annualInterestRate: number,
  loanLengthYears: number,
  fees: Fee[],
  expectedMonthlyRepayment: number
) => {
  const result = calculateMonthlyRepayment(
    loanAmount,
    annualInterestRate,
    loanLengthYears,
    fees
  );
  expect(result).toBe(expectedMonthlyRepayment);
};

test("calculates monthly repayment correctly for standard loan", () => {
  const fees: Fee[] = [{ value: 500, feeType: "Processing" }];
  testMonthlyRepayment(20000, 5, 5, fees, 387);
});

test("calculates monthly repayment correctly with zero interest rate", () => {
  const fees: Fee[] = [{ value: 500, feeType: "Processing" }];
  testMonthlyRepayment(20000, 0, 5, fees, 342);
});

test("calculates monthly repayment correctly with zero fees", () => {
  const fees: Fee[] = [];
  testMonthlyRepayment(15000, 7, 3, fees, 463);
});

test("calculates monthly repayment correctly with high fees", () => {
  const fees: Fee[] = [{ value: 2000, feeType: "Application" }];
  testMonthlyRepayment(15000, 7, 3, fees, 525);
});
