import Head from "next/head";
import Navbar from "../components/navbar.tsx";
import { getSession } from "next-auth/react";
import Apresentation from "../components/apresentation.tsx";

const Home = () => {
  return (
    <>
      <Head>
        <title>Teste FrontEnd Duo</title>
        <meta
          name="description"
          content="Nextly is a free landing page template built with next.js & Tailwind CSS"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar page={"Pagina Inicial"} isInit={true} />
      <Apresentation />
    </>
  );
};

export default Home;

export async function getServerSideProps(context) {
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
