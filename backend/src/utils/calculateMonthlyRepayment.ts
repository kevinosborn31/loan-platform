export const calculateMonthlyRepayment = (loanAmount: number, annualInterestRate: number, loanLengthYears: number, fees = 0): number => {
    const annualInterestRateDecimal = annualInterestRate / 100;
    const monthlyInterestRate = annualInterestRateDecimal / 12;
    const loanLengthMonths = loanLengthYears * 12;
    const totalLoanAmount = loanAmount + fees;

    const repayment = monthlyInterestRate > 0
        ? (totalLoanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -loanLengthMonths))
        : totalLoanAmount / loanLengthMonths;

    return Math.round(repayment);
}