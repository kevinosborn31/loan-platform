import { FC } from "react";
import { Container, Typography, List, ListItem, ListItemText, Divider, Box, Chip } from "@mui/material";
import { useForm } from "../context/FormContext";

const Quotes: FC = () => {
  const { quotes } = useForm();

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Final Quotes
      </Typography>

      {quotes.length > 0 ? (
        <List>
          {quotes.map((quote, index) => (
            <div key={index}>
              <ListItem>
                <ListItemText
                  primary={`Lender: ${quote.lender.name}`}
                  secondary={
                    <Box>
                      <Typography variant="body2">Loan Amount: ${quote.loanAmount.toFixed(2)}</Typography>
                      <Typography variant="body2">Interest Rate: {quote.interestRate.toFixed(2)}%</Typography>
                      <Typography variant="body2">Monthly Repayment: ${quote.monthlyRepayment.toFixed(2)}</Typography>
                      <Box mt={1}>
                        <Typography variant="body2">Fees:</Typography>
                        {quote.fees.length > 0 ? (
                          quote.fees.map((fee, i) => (
                            <Chip
                              key={i}
                              label={`${fee.name}: $${fee.amount.toFixed(2)}`}
                              sx={{ mr: 1, mt: 0.5 }}
                            />
                          ))
                        ) : (
                          <Typography variant="body2">No additional fees</Typography>
                        )}
                      </Box>
                    </Box>
                  }
                />
              </ListItem>
              {index < quotes.length - 1 && <Divider />}
            </div>
          ))}
        </List>
      ) : (
        <Typography variant="body1" color="textSecondary">
          No quotes available.
        </Typography>
      )}
    </Container>
  );
};

export default Quotes;