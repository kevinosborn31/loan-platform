import { mockLenders } from "../mocks/lenders";
import { Lender } from "../types/quote";
import { filterLenders } from "./filterLenders";

const testFilterLenders = (
  lenders: Lender[],
  loanTerm: number,
  loanAmount: number,
  deposit: number,
  expectedFilteredLenders: Lender[]
) => {
  const result = filterLenders(lenders, loanTerm, loanAmount, deposit);
  expect(result).toEqual(expectedFilteredLenders);
};

test("filters lenders correctly for matching criteria", () => {
  testFilterLenders(mockLenders, 36, 15000, 3000, [
    {
      name: "Lender B",
      interestRate: 5.0,
      fees: [{ value: 10, feeType: "processing fee" }],
      minTerm: 12,
      maxTerm: 60,
      maxLoanAmount: 25000,
      requiredDepositPercentage: 25,
    },
  ]);
});

test("filters lenders correctly when deposit is insufficient", () => {
  testFilterLenders(mockLenders, 36, 15000, 1000, []); 
});

test("filters lenders correctly when loan amount exceeds limits", () => {
  testFilterLenders(mockLenders, 36, 120000, 60000, [
    {
      name: "Lender C",
      interestRate: 6.0,
      fees: [],
      minTerm: 12,
      maxTerm: 60,
      maxLoanAmount: 100000,
      requiredDepositPercentage: 50,
    },
  ]); 
});
