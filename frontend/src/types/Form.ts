import { Quote } from "./Quote";

export interface LoanDetailsFormData {
  vehiclePrice: number;
  deposit: number;
  loanPurpose: string;
  loanTerm: number;
}

export interface PersonalDetailsFormData {
  firstName: string;
  lastName: string;
  email: string;
  employmentStatus: string;
  employerName?: string;
}

export interface FormContextProps {
  formData: FormData;
  setPersonalDetails: (data: PersonalDetailsFormData) => void;
  setLoanDetails: (data: LoanDetailsFormData) => void;
  submitData: () => void;
  quotes: Quote[];
  loadingQuotes: boolean;
  clearState: () => void;
}
