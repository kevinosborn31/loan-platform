import axios from "axios";
import { useState, FC, ReactNode, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PageRoutes } from "../constants/PageRoutes";
import {
  LoanDetailsFormData,
  PersonalDetailsFormData,
} from "../types/Form";
import { Quote } from "../types/Quote";

interface FormData {
  personalDetails: PersonalDetailsFormData;
  loanDetails: LoanDetailsFormData;
}

interface FormContextProps {
    formData: FormData;
    setPersonalDetails: (data: PersonalDetailsFormData) => void;
    setLoanDetails: (data: LoanDetailsFormData) => void;
    submitData: () => void;
    quotes: Quote[];
    loadingQuotes: boolean;
    clearState: () => void;
  }

const BASE_URL = process.env.SERVER_URL || "http://localhost:5000";

export const FormProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  const FormContext = createContext<FormContextProps | undefined>(undefined);
  const [formData, setFormData] = useState<FormData>({
    personalDetails: {} as PersonalDetailsFormData,
    loanDetails: {} as LoanDetailsFormData,
  });

  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loadingQuotes, setLoadingQuotes] = useState<boolean>(false);

  const setPersonalDetails = (data: PersonalDetailsFormData) => {
    console.log("Setting personal details:", data);
    setFormData((prev) => ({ ...prev, personalDetails: data }));
  };

  const setLoanDetails = (data: LoanDetailsFormData) => {
    const loanData = {
      ...data,
      deposit: parseFloat(data.deposit as unknown as string),
      vehiclePrice: parseFloat(data.vehiclePrice as unknown as string),
    };
    console.log("Setting loan details:", loanData);

    setFormData((prev) => ({ ...prev, loanDetails: loanData }));
  };

  const submitData = async () => {
    setLoadingQuotes(true);
    const submitData = {
      ...formData,
      loanDetails: {
        ...formData.loanDetails,
        deposit: parseFloat(formData.loanDetails.deposit as unknown as string),
        vehiclePrice: parseFloat(
          formData.loanDetails.vehiclePrice as unknown as string
        ),
      },
    };

    console.log("Form data before submission:", submitData);

    try {
      const response = await axios.post(
        process.env.BASE_URL || `${BASE_URL}/api/quote`,
        submitData
      );

      const { quotes: quoteOptions } = response.data;

      setQuotes(quoteOptions);
      navigate(PageRoutes.Quotes);
    } catch (error) {
      // TODO handle error in a better way
      console.error("Error submitting data:", error);
    } finally {
      setLoadingQuotes(false);
    }
  };

  const clearState = () => {
    setFormData({
      personalDetails: {} as PersonalDetailsFormData,
      loanDetails: {} as LoanDetailsFormData,
    });
    setQuotes([]);
    setLoadingQuotes(false);
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        setPersonalDetails,
        setLoanDetails,
        submitData,
        quotes,
        loadingQuotes,
        clearState,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useForm = (): FormContextProps => {
  const FormContext = createContext<FormContextProps | undefined>(undefined);
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useForm must be used within a FormProvider");
  }
  return context;
};
