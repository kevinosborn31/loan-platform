import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { FormProvider } from "./context/FormContext";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
      <FormProvider>
        <App />
      </FormProvider>
    </BrowserRouter>
  </StrictMode>
);
