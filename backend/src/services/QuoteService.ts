import { calculateMonthlyRepayment } from "../utils/calculateMonthlyRepayment";
import { mockLenders } from "../mocks/lenders";
import { filterLenders } from "../utils/filterLenders";
import { HTTPStatuses } from "../constants/HTTPStatuses";
import { QuoteError } from "../errors/quotes";
import { Lender, LoanDetails, PersonalDetails, Quote } from "../types/quote";

const MIN_LOAN_AMOUNT = 2000;

class QuoteService {
  static generateQuote(
    personalDetails: PersonalDetails,
    loanDetails: LoanDetails
  ): { quotes: Quote[] } {
    this.validateInputs(personalDetails, loanDetails);

    const loanAmount = this.calculateLoanAmount(loanDetails);

    if (loanAmount < MIN_LOAN_AMOUNT) {
      throw new QuoteError(
        `Loan amount must be more than ${MIN_LOAN_AMOUNT}`,
        HTTPStatuses.BAD_REQUEST
      );
    }

    const potentialLenders = filterLenders(
      mockLenders,
      loanDetails.loanTerm,
      loanAmount,
      loanDetails.deposit
    );

    if (potentialLenders.length === 0) {
      return { quotes: [] };
    }

    const quotes = this.generateQuotes(
      potentialLenders,
      loanAmount,
      loanDetails.loanTerm
    );

    return { quotes };
  }

  private static validateInputs(
    personalDetails: PersonalDetails,
    loanDetails: LoanDetails
  ): void {
    if (!personalDetails) {
      throw new QuoteError(
        "Personal details are required",
        HTTPStatuses.BAD_REQUEST
      );
    }

    if (!loanDetails) {
      throw new QuoteError(
        "Loan details are required",
        HTTPStatuses.BAD_REQUEST
      );
    }
  }

  private static calculateLoanAmount(loanDetails: LoanDetails): number {
    return loanDetails.vehiclePrice - loanDetails.deposit;
  }

  private static generateQuotes(
    lenders: Lender[],
    loanAmount: number,
    loanTerm: number
  ): Quote[] {
    return lenders.map((lender) => {
      const { interestRate, fees } = lender;
      const monthlyRepayment = calculateMonthlyRepayment(
        loanAmount,
        interestRate,
        loanTerm,
        fees
      );

      return {
        lender,
        loanAmount,
        interestRate,
        fees,
        monthlyRepayment,
      };
    });
  }
}

export default QuoteService;
