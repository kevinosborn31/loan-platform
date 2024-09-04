import { FC } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";
import { PageRoutes } from "../constants/PageRoutes";

const Home: FC = () => {
  return (
    <Container>
      <Typography>Welcome to Driva!</Typography>
      <Button component={Link} to={PageRoutes.PersonalDetails}>Get a quote</Button>
    </Container>
  );
};

export default Home;
