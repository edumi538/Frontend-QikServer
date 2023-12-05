import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import { RegisterComponent } from "../signup/components/registerComponent";
import SuccessAlert from "../../components/alerts/success";
import DangerAlert from "../../components/alerts/danger";
import { useSession } from "next-auth/react";

export default function UpdateScreen() {
  const router = useRouter();
  const { data: session } = useSession();
  const [Seconds, setSeconds] = useState(0);
  const [Response, setResponse] = useState("");
  const [Fechar, setFechar] = useState(false);
  const [UpdateUsername, setUpdateUsername] = useState<string | string[]>("");
  const [UpdateId, setUpdateId] = useState<string | string[]>("");

  useEffect(() => {
    router.query.name && setUpdateUsername(router.query.name);
    if (router?.query && router.query.id) {
      router.query && setUpdateId(router.query.id[0] || router.query.id);
    }
  }, [router?.query]);

  useEffect(() => {
    if (Response) {
      setTimeout(() => {
        if (Seconds > 0) {
          setSeconds(Seconds - 1);
        } else {
          router.push("/control_panel");
        }
      }, 1000);
    }
  }, [Seconds]);

  function Feedback(response: string) {
    if (response == "sucesso") {
      return <SuccessAlert texto={"O Usuário foi atualizado com sucesso!"} />;
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
    } else {
      return null;
    }
  }

  return (
    <div>
      <Navbar page={"Editar Usuário"} />
      {Feedback(Response)}
      <RegisterComponent
        setResponse={setResponse}
        setSeconds={setSeconds}
        updateUsername={UpdateUsername}
        updateId={UpdateId}
        Edicao={true}
        router={router}
        session={session}
      />
    </div>
  );
}
