import { Typography, Container, Box, styled, Card } from "@mui/material";
import Head from "next/head";
import RegistrationForm from "./RegistrationForm";

const MainContent = styled(Box)(
  () => `
    height: 100%;
    overflow: auto;
    flex: 1;
`
);

function RegistrationFormContainer() {
  return (
    <>
      <Head>
        <title>Register - BOP500</title>
      </Head>
      <MainContent>
        <Container
          sx={{
            my: 4,
          }}
          maxWidth="md"
        >
          <Box display={"flex"} justifyContent="center" mb={2}>
            <Typography variant="h4">LOGO</Typography>
          </Box>
          <Card sx={{ py: 2 }}>
            <RegistrationForm />
          </Card>
        </Container>
      </MainContent>
    </>
  );
}

export default RegistrationFormContainer;
