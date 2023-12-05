import { getSession, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { GetUserById } from "../api/auth/register";
import Navbar from "../../components/navbar";
import PerfilBody from "./components/body";
import { getUsuarioLocalStorage } from "services/register_service";
import { GetServerSidePropsContext } from "next";
import CustomSession from "../../utils/session_util";
import { IUsuario } from "types/generic_interfaces";

export default function MeuPerfil() {
  const { data: session } = useSession();
  const [Usuario, setUsuario] = useState<IUsuario>();

  const customSession = session && CustomSession(session);

  useEffect(() => {
    async function fetchData() {
      let usuariosExistentes = getUsuarioLocalStorage();
      if (usuariosExistentes) {
        const usuarioEspecifico = usuariosExistentes.filter((item) => {
          item.id === customSession?.user?.id;
        });
        if (usuarioEspecifico[0]) {
          setUsuario(usuarioEspecifico[0]);
        } else {
          if (session) {
            const res =
              customSession &&
              customSession.user.id &&
              (await GetUserById(customSession?.user?.id));
            setUsuario(res[0]);
          }
        }
      }
    }
    fetchData();
  }, [session]);

  return (
    <div>
      <Navbar page={"Meu Perfil"} titulo={"Dashboard"} />
      <PerfilBody Usuario={Usuario} setUsuario={setUsuario} />
    </div>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: { destination: "/unauthorized_page" },
    };
  }
  return {
    props: {},
  };
}
