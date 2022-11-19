import React from "react";
import Head from "next/head";
import ForgotPasswordFormContainer from "@/components/auth/ForgotPasswordFormContainer";

function ForgotPassword() {
  return (
    <>
      <Head>
        <title>Recover Password</title>
      </Head>
      <ForgotPasswordFormContainer />
    </>
  );
}

export default ForgotPassword;
