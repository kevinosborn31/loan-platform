import { calculateMonthlyRepayment } from "../utils/calculateMonthlyRepayment";
import { filterLenders } from "../utils/filterLenders";
import { HTTPStatuses } from "../constants/HTTPStatuses";
import { QuoteError } from "../errors/quotes";
import {
  Fee,
  Lender,
  LoanDetails,
  PersonalDetails,
  Quote,
} from "../types/quote";
import QuoteService from "./QuoteService";
import { LoanPurposes } from "../constants/LoanPurposes";
import { EmploymentStatus } from "../constants/EmploymentStatuses";

jest.mock("../utils/calculateMonthlyRepayment");
jest.mock("../utils/filterLenders");
jest.mock("../mocks");

describe("QuoteService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should throw an error if personal details are missing", () => {
    const loanDetails: LoanDetails = {
      vehiclePrice: 15000,
      deposit: 3000,
      loanTerm: 12,
      loanPurpose: LoanPurposes.Vehicle,
    };

    expect(() => {
      QuoteService.generateQuote(null as any, loanDetails);
    }).toThrowError(
      new QuoteError("Personal details are required", HTTPStatuses.BAD_REQUEST)
    );
  });

  it("should throw an error if loan details are missing", () => {
    const personalDetails: PersonalDetails = {
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@example.com",
      employmentStatus: EmploymentStatus.Employed,
    };

    expect(() => {
      QuoteService.generateQuote(personalDetails, null as any);
    }).toThrowError(
      new QuoteError("Loan details are required", HTTPStatuses.BAD_REQUEST)
    );
  });

  it("should throw an error if loan amount is below the minimum threshold", () => {
    const personalDetails: PersonalDetails = {
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@example.com",
      employmentStatus: EmploymentStatus.Employed,
    };

    const loanDetails: LoanDetails = {
      vehiclePrice: 1500,
      deposit: 2000,
      loanPurpose: LoanPurposes.Vehicle,
      loanTerm: 12,
    };

    expect(() => {
      QuoteService.generateQuote(personalDetails, loanDetails);
    }).toThrowError(
      new QuoteError(
        `Loan amount must be more than 2000`,
        HTTPStatuses.BAD_REQUEST
      )
    );
  });

  it("should return an empty quotes array if no lenders are available", () => {
    const personalDetails: PersonalDetails = {
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@example.com",
      employmentStatus: EmploymentStatus.Employed,
    };

    const loanDetails: LoanDetails = {
      vehiclePrice: 15000,
      deposit: 3000,
      loanPurpose: LoanPurposes.Vehicle,
      loanTerm: 12,
    };

    (filterLenders as jest.Mock).mockReturnValue([]);

    const result = QuoteService.generateQuote(personalDetails, loanDetails);

    expect(result).toEqual({ quotes: [] });
  });

  it("should generate quotes correctly for available lenders", () => {
    const personalDetails: PersonalDetails = {
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@example.com",
      employmentStatus: EmploymentStatus.Employed,
    };

    const loanDetails: LoanDetails = {
      vehiclePrice: 15000,
      deposit: 3000,
      loanPurpose: LoanPurposes.Vehicle,
      loanTerm: 12,
    };

    const mockLenders: Lender[] = [
      {
        maxLoanAmount: 20000,
        name: "Lender A",
        interestRate: 5.0,
        fees: [{ value: 100, feeType: "Processing" }],
        minTerm: 6,
        maxTerm: 24,
        requiredDepositPercentage: 10,
      },
      {
        maxLoanAmount: 25000,
        name: "Lender B",
        interestRate: 6.0,
        fees: [{ value: 150, feeType: "Application" }],
        minTerm: 12,
        maxTerm: 36,
        requiredDepositPercentage: 15,
      },
    ];

    const loanAmount = loanDetails.vehiclePrice - loanDetails.deposit;

    (filterLenders as jest.Mock).mockReturnValue(mockLenders);
    (calculateMonthlyRepayment as jest.Mock).mockImplementation(
      (amount: number, rate: number, term: number, fees: Fee[]) =>
        (amount * (rate / 100)) / term +
        fees.reduce((acc, fee) => acc + fee.value, 0)
    );

    const expectedQuotes: Quote[] = mockLenders.map((lender) => ({
      lender,
      loanAmount,
      interestRate: lender.interestRate,
      fees: lender.fees,
      monthlyRepayment:
        (loanAmount * (lender.interestRate / 100)) / loanDetails.loanTerm +
        lender.fees.reduce((acc, fee) => acc + fee.value, 0),
    }));

    const result = QuoteService.generateQuote(personalDetails, loanDetails);

    expect(result).toEqual({ quotes: expectedQuotes });
  });
});
