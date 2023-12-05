import React, { useState } from "react";
import { getSession } from "next-auth/react";
import Navbar from "../../components/navbar";
import LoginComponent from "./components/loginComponent";
import DangerAlert from "../../components/alerts/danger";
import { GetServerSidePropsContext } from "next";

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
      <LoginComponent setAlert={setAlert}  />
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
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
