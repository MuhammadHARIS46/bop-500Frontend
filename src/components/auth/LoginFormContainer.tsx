import type { FC } from "react";
import { Box, Typography, styled, Container, Card } from "@mui/material";
import LoginForm from "./LoginForm";

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
`
);

const TopWrapper = styled(Box)(
  () => `
  display: flex;
  width: 100%;
  flex: 1;
  padding: 20px;
  align-items:center;
`
);

const LoginFormContainer: FC = () => {
  return (
    <MainContent>
      <TopWrapper>
        <Container maxWidth="sm">
          <Box display={"flex"} justifyContent="center" mb={2}>
            <Typography variant="h4">LOGO</Typography>
          </Box>
          <Card sx={{ py: 1 }}>
            <LoginForm />
          </Card>
        </Container>
      </TopWrapper>
    </MainContent>
  );
};

export default LoginFormContainer;
