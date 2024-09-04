import React, { FC } from "react";
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
  Box,
  Paper,
} from "@mui/material";
import { useForm as useFormContext } from "../context/FormContext";
import { PageRoutes } from "../constants/PageRoutes";
import { PersonalDetailsFormData } from "../types/Form";

const PersonalDetails: FC = () => {
  const { setPersonalDetails } = useFormContext();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PersonalDetailsFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      employmentStatus: "",
      employerName: "",
    },
  });

  const employmentStatus = watch("employmentStatus");

  const onSubmit: SubmitHandler<PersonalDetailsFormData> = (data: any) => {
    setPersonalDetails(data);
    navigate(PageRoutes.LoanDetails);
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
              name="firstName"
              control={control}
              rules={{ required: "First name is required" }}
              render={({
                field,
              }: {
                field: {
                  name: string;
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
                  onBlur: () => void;
                  value: string;
                };
              }) => (
                <TextField
                  {...field}
                  label="First Name"
                  fullWidth
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
              )}
            />
          </Box>

          <Box mb={2}>
            <Controller
              name="lastName"
              control={control}
              rules={{ required: "Last name is required" }}
              render={({
                field,
              }: {
                field: {
                  name: string;
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
                  onBlur: () => void;
                  value: string;
                };
              }) => (
                <TextField
                  {...field}
                  label="Last Name"
                  fullWidth
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              )}
            />
          </Box>

          <Box mb={2}>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              }}
              render={({
                field,
              }: {
                field: {
                  name: string;
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
                  onBlur: () => void;
                  value: string;
                };
              }) => (
                <TextField
                  {...field}
                  label="Email"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
          </Box>

          <Box mb={2}>
            <Controller
              name="employmentStatus"
              control={control}
              rules={{ required: "Employment status is required" }}
              render={({
                field,
              }: {
                field: {
                  name: string;
                  onChange: (e: React.ChangeEvent<{ value: string }>) => void;
                  onBlur: () => void;
                  value: string;
                };
              }) => (
                <FormControl fullWidth error={!!errors.employmentStatus}>
                  <InputLabel>Employment Status</InputLabel>
                  <Select
                    {...field}
                    label="Employment Status"
                    value={field.value || ""}
                    onChange={(event: any) => field.onChange(event)}
                  >
                    <MenuItem value="Employed">Employed</MenuItem>
                    <MenuItem value="Self-Employed">Self-Employed</MenuItem>
                    <MenuItem value="Unemployed">Unemployed</MenuItem>
                  </Select>
                  <FormHelperText>
                    {errors.employmentStatus?.message}
                  </FormHelperText>
                </FormControl>
              )}
            />
          </Box>

          {/* TODO fix this */}
          {employmentStatus === "Employed" && (
            <Box mb={2}>
              <Controller
                name="employerName"
                control={control}
                rules={{
                  required: {
                    value: employmentStatus === "Employed",
                    message: "Employer name is required for employed status",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Employer Name"
                    fullWidth
                    error={!!errors.employerName}
                    helperText={errors.employerName?.message}
                  />
                )}
              />
            </Box>
          )}

          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button type="submit" variant="contained" color="primary">
              Next
            </Button>
            <Button
              component={Link}
              to={PageRoutes.Home}
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

export default PersonalDetails;
