import { EmploymentStatus } from "./EmploymentStatuses";
import { LoanPurposes } from "./LoanPurposes";

export interface Fee {
  name: string;
  amount: number;
  value: number;
  feeType: string;
}

export interface Lender {
  maxLoanAmount: number;
  name: string;
  interestRate: number;
  fees: Fee[];
  minTerm: number;
  maxTerm: number;
  requiredDepositPercentage: number;
}

export interface PersonalDetails {
  firstName: string;
  lastName: string;
  email: string;
  employmentStatus: EmploymentStatus;
  dateOfBirth: Date;
  employerName?: string;
}

export interface LoanDetails {
  vehiclePrice: number;
  deposit: number;
  loanPurpose: LoanPurposes;
  loanTerm: number; // in years
}

export interface Quote {
  lender: Lender;
  loanAmount: number;
  interestRate: number;
  fees: Fee[];
  monthlyRepayment: number;
}
