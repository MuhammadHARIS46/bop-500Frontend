import Head from "next/head";
import LoginFormContainer from "@/components/auth/LoginFormContainer";

const Login = () => {
  return (
    <>
      <Head>
        <title>Login - BOP500</title>
      </Head>
      <LoginFormContainer />
    </>
  );
};

export default Login;
