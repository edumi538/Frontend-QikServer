import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar.tsx";
import { RegisterComponent } from "./components/registerComponent";
import SuccessAlert from "../../components/alerts/success";
import { useRouter } from "next/navigation";
import DangerAlert from "../../components/alerts/danger";
import { getSession, useSession } from "next-auth/react";

export default function RegisterScreen() {
  const session = useSession();
  const [Response, setResponse] = useState("");
  const [Seconds, setSeconds] = useState(0);
  const [Fechar, setFechar] = useState(false);
  const { push } = useRouter();

  useEffect(() => {
    if (Response) {
      setTimeout(() => {
        if (Seconds > 0) {
          setSeconds(Seconds - 1);
        } else {
          if (!session.data) {
            push("/login");
          } else {
            push("/control_panel");
          }
        }
      }, 1000);
    }
  }, [Seconds]);

  function Feedback(response) {
    if (response == "sucesso") {
      return (
        <SuccessAlert
          texto={`O Usuário foi cadastrado com sucesso, você será redirecionado para o ${
            !session.data ? "Login" : "Painel de Controle"
          } em ${Seconds}...`}
        />
      );
    } else if (response == "falhou") {
      return (
        <>
          {!Fechar && (
            <DangerAlert
              fechar={() => setFechar(true)}
              texto={
                "Não foi possível cadastrar o usuário, tente novamente mais tarde!"
              }
            />
          )}
        </>
      );
    }
  }
  return (
    <>
      <Navbar page={"Registro"} />
      {Feedback(Response)}
      <RegisterComponent
        setSeconds={setSeconds}
        setResponse={setResponse}
      />
    </>
  );
}
