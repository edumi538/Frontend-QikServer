import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { GetAll } from "./register";
import { IUsuario } from "types/generic_interfaces";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "username",
          placholder: "username",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };
        const usuarios = await GetAll();
        if (usuarios !== "falhou") {
          const usuarioEncontrado = usuarios.find(
            (user: IUsuario) =>
              user.name === username && user.password === password
          );
          if (usuarioEncontrado) {
            return usuarioEncontrado;
          } else {
            return null;
          }
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/dashboard",
  },
});
