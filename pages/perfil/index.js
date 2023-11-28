import { getSession, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { GetUserById } from "../api/auth/register";
import Container from "../../components/container";
import Navbar from "../../components/navbar.tsx";
import PerfilBody from "./components/body";

export default function MeuPerfil() {
  const { data: session } = useSession();
  const [Usuario, setUsuario] = useState({});

  useEffect(() => {
    async function fetchData() {
      let usuariosExistentes =
        JSON.parse(localStorage.getItem("usuarios")) || [];
      if (usuariosExistentes) {
        const usuarioEspecifico = usuariosExistentes.filter(
          (item) => item.id === session?.user?.id
        );
        if (usuarioEspecifico[0]) {
          setUsuario(usuarioEspecifico[0]);
        } else {
          if (session) {
            const res = await GetUserById(session?.user?.id);
            setUsuario(res[0]);
          }
        }
      }
    }
    fetchData();
  }, [session]);

  useEffect(() => {
    console.log(Usuario);
  }, [Usuario.name, Usuario.password]);

  return (
    <div>
      <Navbar page={"Meu Perfil"} titulo={"Dashboard"}/>
      <PerfilBody Usuario={Usuario} setUsuario={setUsuario} />
    </div>
  );
}
export async function getServerSideProps(context) {
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
