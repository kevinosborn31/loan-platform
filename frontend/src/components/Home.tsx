import { FC } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";
import { PageRoutes } from "../constants/PageRoutes";

const Home: FC = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        border: '2px solid #ccc',
        borderRadius: '8px',
        padding: '2rem',
        backgroundColor: '#f9f9f9',
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ mb: 3 }}
      >
        Welcome to Driva!
      </Typography>
      <Button
        component={Link}
        to={PageRoutes.PersonalDetails}
        variant="contained"
        color="primary"
        sx={{ padding: '0.75rem 1.5rem' }}
      >
        Get a quote
      </Button>
    </Container>
  );
};

export default Home;
