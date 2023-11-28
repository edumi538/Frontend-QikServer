import React, { useState } from "react";
import { getProviders, getSession, signIn } from "next-auth/react";
import Navbar from "../../components/navbar.tsx";
import LoginComponent from "./components/loginComponent";
import DangerAlert from "../../components/alerts/danger";

export default function LoginScreen() {
  const [Alert, setAlert] = useState(false);
  return (
    <>
      <Navbar page={"Login"} />
      {Alert && (
        <DangerAlert
          fechar={() => setAlert(false)}
          texto={
            "Não foi possível logar no momento, verifique username e password!"
          }
        />
      )}
      <LoginComponent setAlert={setAlert} signIn={signIn} />
    </>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: { destination: "/dashboard" },
    };
  }
  return {
    props: {},
  };
}
