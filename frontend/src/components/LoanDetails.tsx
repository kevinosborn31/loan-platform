import { FC } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Box
} from "@mui/material";
import { useForm as useFormContext } from "../context/FormContext";
import { PageRoutes } from "../constants/PageRoutes";

interface LoanDetailsFormData {
  vehiclePrice: number;
  deposit: number;
  loanPurpose: string;
  loanTerm: number;
}

const LoanDetails: FC = () => {
  const { setLoanDetails } = useFormContext();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<LoanDetailsFormData>({
    defaultValues: {
      vehiclePrice: 0,
      deposit: 0,
      loanPurpose: "",
      loanTerm: 1
    }
  });

  const vehiclePrice = watch("vehiclePrice");

  const onSubmit: SubmitHandler<LoanDetailsFormData> = (data) => {
    setLoanDetails(data);
    navigate(PageRoutes.Quotes);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={2}>
          <Controller
            name="vehiclePrice"
            control={control}
            rules={{
              required: "Vehicle price is required",
              min: {
                value: 2000,
                message: "Vehicle price must be at least $2000"
              }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Vehicle Price"
                type="number"
                fullWidth
                error={!!errors.vehiclePrice}
                helperText={errors.vehiclePrice?.message}
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
                message: "Deposit cannot be less than $0"
              },
              validate: {
                maxValue: (value) => value <= vehiclePrice || "Deposit cannot exceed vehicle price",
                minDifference: (value) => (vehiclePrice - value) > 2000 || "Vehicle price - deposit must be greater than $2000"
              }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Deposit"
                type="number"
                fullWidth
                error={!!errors.deposit}
                helperText={errors.deposit?.message}
              />
            )}
          />
        </Box>

        <Box mb={2}>
          <Controller
            name="loanPurpose"
            control={control}
            rules={{ required: "Loan purpose is required" }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.loanPurpose}>
                <InputLabel>Loan Purpose</InputLabel>
                <Select
                  {...field}
                  label="Loan Purpose"
                  value={field.value || ""}
                  onChange={(event) => field.onChange(event.target.value)}
                >
                  <MenuItem value="Vehicle">Vehicle</MenuItem>
                  <MenuItem value="Home Improvement">Home Improvement</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
                <FormHelperText>{errors.loanPurpose?.message}</FormHelperText>
              </FormControl>
            )}
          />
        </Box>

        <Box mb={2}>
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
                  onChange={(event) => field.onChange(event.target.value)}
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
        </Box>

        <Box mt={2}>
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
    </Container>
  );
};

export default LoanDetails;