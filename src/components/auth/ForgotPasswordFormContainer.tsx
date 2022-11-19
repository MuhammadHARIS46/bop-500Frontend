import { Box, Card, Container, styled } from "@mui/material";

import ForgotPasswordForm from "./ForgotPasswordForm";

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);

const ForgotPasswordFormContainer = () => {
  return (
    <>
      <MainContent>
        <Container maxWidth="sm">
          <Card sx={{ py: 1 }}>
            <ForgotPasswordForm />
          </Card>
        </Container>
      </MainContent>
    </>
  );
};

export default ForgotPasswordFormContainer;
