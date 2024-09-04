import { FC } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Chip,
  Paper,
} from "@mui/material";
import { useForm } from "../context/FormContext";

const Quotes: FC = () => {
  const { quotes } = useForm();

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 4,
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Available offers
      </Typography>

      {quotes.length > 0 ? (
        <Box sx={{ width: "100%", maxWidth: 800 }}>
          <List>
            {quotes.map((quote, index) => (
              <Paper
                key={index}
                elevation={3}
                sx={{
                  mb: 2,
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: "#fff",
                }}
              >
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography variant="h6" color="primary">
                        Lender: {quote.lender.name}
                      </Typography>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                          <strong>Loan Amount:</strong> $
                          {quote.loanAmount.toFixed(2)}
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                          <strong>Interest Rate:</strong>{" "}
                          {quote.interestRate.toFixed(2)}%
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                          <strong>Monthly Repayment:</strong> $
                          {quote.monthlyRepayment.toFixed(2)}
                        </Typography>
                        <Box mt={1}>
                          <Typography variant="body1" sx={{ mb: 0.5 }}>
                            <strong>Fees:</strong>
                          </Typography>
                          {quote.fees.length > 0 ? (
                            quote.fees.map((fee, i) => (
                              <Chip
                                key={i}
                                label={`${fee.name}: $${fee.amount.toFixed(2)}`}
                                sx={{
                                  mr: 1,
                                  mb: 1,
                                  backgroundColor: "#e0f7fa",
                                }}
                              />
                            ))
                          ) : (
                            <Typography variant="body1" color="textSecondary">
                              No additional fees
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
                {index < quotes.length - 1 && <Divider />}
              </Paper>
            ))}
          </List>
        </Box>
      ) : (
        <Typography variant="body1" color="textSecondary">
          Sorry, we cant help you this time
        </Typography>
      )}
    </Container>
  );
};

export default Quotes;
