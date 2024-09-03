import express from "express";
import cors from "cors";
import { calculateMonthlyRepayment } from "./utils/calculateMonthlyRepayment";
import { lenders } from "./mocks";
import { filterLenders } from "./utils/filterLenders";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post("/generate-quote", (req, res) => {
  const { personalDetails, loanDetails } = req.body;

  if (!personalDetails) {
    return res.status(400).json({ error: "Personal details are required" });
  }

  if (!loanDetails) {
    return res.status(400).json({ error: "Loan details are required" });
  }

  const { vehiclePrice, deposit, loanTerm, annualInterestRate, fees } =
    loanDetails;

  if (vehiclePrice - deposit < 2000) {
    return res
      .status(400)
      .json({
        error: "Deposit must be at least $2000 less than vehicle price",
      });
  }

  if (
    !loanTerm ||
    !annualInterestRate ||
    isNaN(loanTerm) ||
    isNaN(annualInterestRate)
  ) {
    return res
      .status(400)
      .json({ error: "Invalid loan term or annual interest rate" });
  }

  const feesAmount = fees || 0;

  const loanAmount = vehiclePrice - deposit;

  const monthlyRepayment = calculateMonthlyRepayment(
    loanAmount,
    annualInterestRate,
    loanTerm,
    feesAmount
  );

  res.json({
    quote: {
      loanAmount,
      annualInterestRate,
      loanTerm,
      fees: feesAmount,
      monthlyRepayment,
    },
    lenders: filterLenders(lenders, loanTerm, loanAmount, deposit),
  });
});

app.get("/", (_, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
