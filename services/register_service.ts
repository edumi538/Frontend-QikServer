export interface Usuario {
  id: number;
  name: string;
  password: string;
}

export function UpdateUsuarioLocalStorage(
  usuario: {
    name: string;
    password: string;
  },
  updateId: number
) {
  const usuariosExistentes = getUsuarioLocalStorage();
  const indiceDoUsuario = usuariosExistentes.findIndex(
    (item) => item.id === updateId
  );
  if (indiceDoUsuario !== -1) {
    usuariosExistentes[indiceDoUsuario].name = usuario.name;
    usuariosExistentes[indiceDoUsuario].password = usuario.password;
    localStorage.setItem("usuarios", JSON.stringify(usuariosExistentes));
  } else {
    console.error("Objeto não encontrado no array.");
  }
}

export function getUsuarioLocalStorage() {
  const usuariosDoLocalStorageString = localStorage.getItem("usuarios");
  const usuariosExistentes: Usuario[] = usuariosDoLocalStorageString
    ? JSON.parse(usuariosDoLocalStorageString)
    : [];
  return usuariosExistentes;
}
