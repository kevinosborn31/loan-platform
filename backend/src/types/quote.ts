export interface Fee {
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
  employmentStatus: "Employed" | "Self-Employed" | "Unemployed";
  dateOfBirth: Date;
  employerName?: string;
}

export interface LoanDetails {
  vehiclePrice: number;
  deposit: number;
  loanPurpose: "Vehicle" | "Home Improvement";
  loanTerm: number; // in years
}

export interface Quote {
  lender: Lender;
  loanAmount: number;
  interestRate: number;
  fees: Fee[];
  monthlyRepayment: number;
}
