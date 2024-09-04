import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import QuoteService from "./services/QuoteService";
import { QuoteError } from "./errors/quotes";
import { HTTPStatuses } from "./constants/HTTPStatuses";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post("/quote", (req: Request, res: Response, next: NextFunction) => {
  try {
    const { personalDetails, loanDetails } = req.body;

    const result = QuoteService.generateQuote(personalDetails, loanDetails);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

app.use((err: Error, _: Request, res: Response) => {
  if (err instanceof QuoteError) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    res
      .status(HTTPStatuses.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
