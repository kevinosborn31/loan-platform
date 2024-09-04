import express, { Request, Response } from "express";
import cors from "cors";
import QuoteService from "./services/QuoteService";
import { QuoteError } from "./errors/quotes";
import { HTTPStatuses } from "./constants/HTTPStatuses";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post("/quote", (req: Request, res: Response) => {
  try {
    const { personalDetails, loanDetails } = req.body;
    const result = QuoteService.generateQuote(personalDetails, loanDetails);
    res.json(result);
  } catch (error) {    
    console.error('Error occurred:', error);

    if (error instanceof QuoteError) {
      res.status(error.statusCode || HTTPStatuses.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    } else {
      res.status(HTTPStatuses.INTERNAL_SERVER_ERROR).json({
        message: 'An unexpected error occurred.',
      });
    }
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
