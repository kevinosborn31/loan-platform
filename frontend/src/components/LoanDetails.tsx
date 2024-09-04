import React, { FC } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { Container, Button, TextField, Box, Paper } from "@mui/material";
import { useForm as useFormContext } from "../context/FormContext";
import { PageRoutes } from "../constants/PageRoutes";
import { LoanDetailsFormData } from "../types/Form";

const LoanDetails: FC = () => {
  const { setLoanDetails, submitData } = useFormContext();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoanDetailsFormData>({
    defaultValues: {
      vehiclePrice: 0,
      deposit: 0,
      loanPurpose: "Vehicle",
      loanTerm: 5,
    },
  });

  const vehiclePrice = watch("vehiclePrice");

  const onSubmit: SubmitHandler<LoanDetailsFormData> = (data) => {
    const loanData = {
      ...data,
      deposit: Number(data.deposit) || 0,
      vehiclePrice: Number(data.vehiclePrice) || 0,
    };
    console.log("Form data before setting loan details:", loanData);

    setLoanDetails(loanData);
    submitData();
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper
        sx={{
          padding: 4,
          borderRadius: 2,
          border: "1px solid #ddd",
          backgroundColor: "#fff",
          boxShadow: 3,
          width: "100%",
          maxWidth: 600,
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box mb={2}>
            <Controller
              name="vehiclePrice"
              control={control}
              rules={{
                required: "Vehicle price is required",
                min: {
                  value: 2000,
                  message: "Vehicle price must be at least $2000",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Vehicle Price"
                  type="number"
                  fullWidth
                  error={!!errors.vehiclePrice}
                  helperText={errors.vehiclePrice?.message}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  value={field.value || ""}
                />
              )}
            />
          </Box>

          <Box mb={2}>
            <Controller
              name="deposit"
              control={control}
              rules={{
                required: "Deposit is required",
                min: {
                  value: 0,
                  message: "Deposit cannot be less than $0",
                },
                validate: {
                  maxValue: (value) =>
                    parseFloat(value.toString()) <= vehiclePrice ||
                    "Deposit cannot exceed vehicle price",
                  minDifference: (value) =>
                    vehiclePrice - parseFloat(value.toString()) > 2000 ||
                    "Vehicle price - deposit must be greater than $2000",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Deposit"
                  type="number"
                  fullWidth
                  error={!!errors.deposit}
                  helperText={errors.deposit?.message}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  value={field.value || ""}
                />
              )}
            />
          </Box>

          {/* TODO fix loan term */}
          {/* <Box mb={2}>
            <Controller
              name="loanTerm"
              control={control}
              rules={{ required: "Loan term is required" }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.loanTerm}>
                  <InputLabel>Loan Term (Years)</InputLabel>
                  <Select
                    {...field}
                    label="Loan Term (Years)"
                    value={field.value || ""}
                    onChange={(event) => field.onChange(parseInt(event.target.value))}
                  >
                    {Array.from({ length: 7 }, (_, i) => i + 1).map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.loanTerm?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Box> */}

          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
            <Button
              component={Link}
              to={PageRoutes.PersonalDetails}
              variant="outlined"
              sx={{ ml: 2 }}
            >
              Back
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default LoanDetails;
