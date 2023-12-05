import React, { useState } from "react";
import {
  UpdateUsuarioLocalStorage,
} from "../../../services/register_service";
import { UpdateUser } from "../../api/auth/register";
import { IUsuario } from "types/generic_interfaces";

interface IPropsBodyPerfil {
  Usuario: IUsuario | undefined;
  setUsuario: (usuario: IUsuario) => void;
}

export default function PerfilBody({ Usuario, setUsuario }: IPropsBodyPerfil) {
  const [DisableUsername, setDisableUsername] = useState(true);
  const [DisablePassword, setDisablePassword] = useState(true);

  async function sendData(data: IUsuario) {
    const dataEnvio = { ...data, name: data.name };
    const response = data.id ? await UpdateUser(dataEnvio, data.id) : "falhou";
    if (response == "sucesso") {
      data.id &&
        UpdateUsuarioLocalStorage(
          {
            name: data.name ? data.name : "",
            password: data.password ? data.password : "",
          },
          data.id
        );
    }
  }

  function handleInputChange(value: string, type: string) {
    switch (type) {
      case "name":
        setUsuario({
          ...Usuario,
          name: value,
          password: Usuario?.password ? Usuario.password : "",
        });
        break;
      case "password":
        setUsuario({
          ...Usuario,
          password: value,
          name: Usuario?.name ? Usuario.name : "",
        });
        break;
      default:
        break;
    }
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center mx-auto md:h-screen lg:py-0 ">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex w-full justify-center items-center">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Dados do Meu Perfil
              </h1>
            </div>
            <form className="space-y-4 md:space-y-6" action="#">
              <div className="flex justify-center items-center">
                <label className="mr-3">Username:</label>
                <input
                  disabled={DisableUsername}
                  className={`mr-3 text-center bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 ${
                    DisableUsername ? "dark:border-gray-600" : ""
                  } dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  value={Usuario && Usuario.name}
                  onChange={(event) =>
                    handleInputChange(event.target.value, "name")
                  }
                />
                {DisableUsername ? (
                  <button onClick={() => setDisableUsername(false)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setDisableUsername(true), Usuario && sendData(Usuario);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                )}
              </div>
              <div className="flex justify-center items-center">
                <label className="mr-3">Password:</label>
                <input
                  type={DisablePassword ? "password" : "text"}
                  className={`mr-3 text-center bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 ${
                    DisablePassword ? "dark:border-gray-600" : ""
                  } dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  value={Usuario && Usuario.password}
                  onChange={(event) =>
                    handleInputChange(event.target.value, "password")
                  }
                />
                {DisablePassword ? (
                  <button onClick={() => setDisablePassword(false)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setDisablePassword(true), Usuario && sendData(Usuario);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
