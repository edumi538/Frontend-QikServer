import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { GetAll, Signup, UpdateUser } from "../../api/auth/register";
import {
  UpdateUsuarioLocalStorage,
  getUsuarioLocalStorage,
} from "../../../services/register_service";
import { signOut } from "next-auth/react";
import { NextRouter } from "next/router";
import { Session } from "next-auth";
import CustomSession from "utils/session_util";
import { IUsuario } from "types/generic_interfaces";
function SetUsuarioLocalStorage(novoUsuario: IUsuario) {
  const usuariosExistentes = getUsuarioLocalStorage();
  usuariosExistentes.push(novoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuariosExistentes));
}

async function gerarNovoId() {
  let contador = 0;
  let novoId = 0;
  if (typeof window !== "undefined") {
    const contadorDoLocalStorageString = localStorage.getItem("contador");

    contador = contadorDoLocalStorageString
      ? parseInt(contadorDoLocalStorageString, 10)
      : 0;
  }
  const usuarios = await GetAll();

  if (usuarios !== "falhou" && usuarios.length > 0) {
    const arrayids = usuarios.map((item: IUsuario) => item.id);
    const maiorid = Math.max.apply(null, arrayids);
    if (maiorid) {
      contador = maiorid;
    } else {
      contador = 0;
    }
    novoId = contador + 1;
    if (typeof window !== "undefined") {
      localStorage.setItem("contador", novoId.toString());
    }

    return novoId;
  } else {
    novoId = contador + 1;
    if (typeof window !== "undefined") {
      localStorage.setItem("contador", novoId.toString());
    }
    return novoId;
  }
}

interface IPropsRegisterComponent {
  setResponse: (response: string) => void;
  setSeconds: (seconds: number) => void;
  Edicao?: boolean;
  updateUsername?: string | string[];
  updateId?: string | string[];
  router?: NextRouter;
  session?: Session | null;
}

type FormValues = {
  username: string;
  password: string;
  terms: boolean;
};

export const RegisterComponent = ({
  setResponse,
  setSeconds,
  Edicao,
  updateUsername,
  updateId,
  router,
  session,
}: IPropsRegisterComponent) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    reset({
      username:
        updateUsername && typeof updateUsername == "string"
          ? updateUsername
          : "",
    });
  }, [updateUsername, reset]);

  const onSubmit: SubmitHandler<FormValues> = async (data: {
    username: string;
    password: string;
  }) => {
    const customSession = session && CustomSession(session);
    const IdNumber =
      updateId && typeof updateId == "string" ? parseInt(updateId) : 0;
    setLoading(true);
    if (!Edicao) {
      const ID = await gerarNovoId();
      const response = await Signup({
        id: ID,
        name: data.username,
        password: data.password,
      });
      if (response == "sucesso") {
        SetUsuarioLocalStorage({
          name: data.username,
          password: data.password,
          id: ID,
        });
      }
      setResponse(response);
      response !== "falhou" && setSeconds(3);
      window.scrollTo(0, 0);
    } else {
      const response = await UpdateUser(
        {
          id: IdNumber,
          name: data.username,
          password: data.password,
        },
        IdNumber
      );
      if (response == "sucesso") {
        UpdateUsuarioLocalStorage(
          { name: data.username, password: data.password },
          IdNumber
        );
        if (customSession && customSession.user.id === IdNumber) {
          await signOut({ redirect: false })
            .then(() => {
              router && router.push("/login");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }

      setTimeout(() => {
        setLoading(false);
        setResponse(response);
        response !== "falhou" && setSeconds(1);
        window.scrollTo(0, 0);
      }, 500);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center mx-auto md:h-screen lg:py-0 ">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {!Edicao ? "Criação de Usuário" : "Edição de Usuário"}
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  {...register("username", { required: true })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="username"
                />
                {errors.username && (
                  <span className="block mt-2 text-sm font-medium text-orange-600 dark:text-orange-600">
                    Esse campo é obrigatório
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  {...register("password", { required: !Edicao && true })}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.password && (
                  <span className="block mt-2 text-sm font-medium text-orange-600 dark:text-orange-600">
                    Esse campo é obrigatório
                  </span>
                )}
              </div>
              {!Edicao && (
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      {...register("terms", { required: true })}
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>

                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      Eu aceito os{" "}
                      <a
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="#"
                      >
                        Termos e Condições
                      </a>
                    </label>
                    {errors.terms && (
                      <span className="ml-2 text-orange-600">*</span>
                    )}
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
              >
                <div className="flex justify-center items-center ">
                  {Loading && (
                    <div className="mr-2">
                      <svg
                        aria-hidden="true"
                        className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    </div>
                  )}
                  <div>{!Edicao ? "Criar Usuario" : "Editar Usuário"}</div>
                </div>
              </button>
              {!Edicao && (
                <div className="flex justify-center">
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Você ja possui conta?{" "}
                    <a
                      href="/login"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Login
                    </a>
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
