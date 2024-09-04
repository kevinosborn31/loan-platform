import { FC } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Container } from "@mui/material";
import { Home, LoanDetails, PersonalDetails, Quotes } from "./components";
import { PageRoutes } from "./constants/PageRoutes";

const App: FC = () => {

  return (
    <Router>
        <Container>
          <Routes>
            <Route path={PageRoutes.Home} element={<Home />} />
            <Route path={PageRoutes.PersonalDetails} element={<PersonalDetails />} />
            <Route path={PageRoutes.LoanDetails} element={<LoanDetails />} />
            <Route path={PageRoutes.Quotes} element={<Quotes />} />
          </Routes>
        </Container>
    </Router>
  );
};

export default App;
