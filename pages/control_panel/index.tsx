import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import UsersTable from "./components/users_table";
import { getSession } from "next-auth/react";
import { DeleteById, GetAll } from "../api/auth/register";
import {  getUsuarioLocalStorage } from "services/register_service";
import { GetServerSidePropsContext } from "next";
import { IUsuario } from "types/generic_interfaces";

export default function PainelDeControleScreen() {
  const [StateUsuariosExistentes, SetStateUsuariosExistentes] = useState<
    IUsuario[]
  >([]);

  useEffect(() => {
    async function fetchData() {
      const usuarios = await GetAll();
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      SetStateUsuariosExistentes(usuarios);
    }
    fetchData();
  }, []);

  async function handleDelete(id: number) {
    const res = await DeleteById(id);
    if (res == "sucesso") {
      DeleteUsuarioLocalStorage(id);
    }
  }

  function DeleteUsuarioLocalStorage(id: number) {
    const usuariosExistentes = getUsuarioLocalStorage();
    const indiceDoUsuario = usuariosExistentes.findIndex(
      (item) => item.id === id
    );
    if (indiceDoUsuario !== -1) {
      usuariosExistentes.splice(indiceDoUsuario, 1);
      localStorage.setItem("usuarios", JSON.stringify(usuariosExistentes));
      SetStateUsuariosExistentes(usuariosExistentes);
    } else {
      console.error("Objeto não encontrado no array.");
    }
  }

  return (
    <>
      <Navbar page={"Painel de Controle"} titulo={"Dashboard"} />
      <UsersTable
        usuariosExistentes={StateUsuariosExistentes}
        handleDelete={handleDelete}
      />
    </>
  );
}

export async function getServerSideProps(context:GetServerSidePropsContext) {
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
