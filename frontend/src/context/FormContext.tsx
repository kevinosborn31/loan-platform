import axios from "axios";
import {
  createContext,
  useState,
  useContext,
  FC,
  ReactNode
} from "react";
import { Quote } from "../types/quote";
import { useNavigate } from "react-router-dom";

interface FormData {
  personalDetails: { [key: string]: any };
  loanDetails: { [key: string]: any };
}

interface FormContextProps {
  formData: FormData;
  // TODO fix any types
  setPersonalDetails: (data: any) => void;
  setLoanDetails: (data: any) => void;
  submitData: () => void;
  quotes: Quote[];
  loadingQuotes: boolean; 
  clearState: () => void; 
}

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const FormProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    personalDetails: {},
    loanDetails: {},
  });

  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loadingQuotes, setLoadingQuotes] = useState<boolean>(false); 

  // TODO fix any type
  const setPersonalDetails = (data: any) => {
    setFormData((prev) => ({ ...prev, personalDetails: data }));
  };

  // TODO fix any type
  const setLoanDetails = (data: any) => {
    setFormData((prev) => ({ ...prev, loanDetails: data }));
  };

  const submitData = async () => {
    setLoadingQuotes(true);
    try {
      const response = await axios.post(
        // TODO update this to use env var
        "http://localhost:5000/quotes",
        formData
      );

      const { quotes: quoteOptions } = response.data;

      setQuotes(quoteOptions);
      navigate("/quotes");
    } catch (error) {
        // TODO handle error in a better way
      console.error("Error submitting data:", error);
    } finally {
        setLoadingQuotes(false);
    }
  };

  const clearState = () => {
    setFormData({
      personalDetails: {},
      loanDetails: {},
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
        clearState
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useForm = (): FormContextProps => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useForm must be used within a FormProvider");
  }
  return context;
};
