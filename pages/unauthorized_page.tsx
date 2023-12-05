import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { useRouter } from "next/router";

export default function UnauthorizedPage() {
  const [Seconds, setSeconds] = useState(5);
  const { push } = useRouter();


  useEffect(() => {
    setTimeout(() => {
      if (Seconds > 0) {
        setSeconds(Seconds - 1);
      } else {
        push("/login");
      }
    }, 1000);
  }, [Seconds]);

  return (
    <>
      <Navbar page={"Unauthorized Page"} />
      <div className="flex flex-col items-center justify-center px-6 py-4 mx-auto md:h-screen lg:py-0">
        <h1 className="p-10 text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:text-2xl lg:leading-tight xl:text-6xl xl:leading-tight dark:text-white">
          Você não tem autorização para acessar essa pagina :( <br />{" "}
        </h1>
        <h2 className="p-10 text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:text-2xl lg:leading-tight xl:text-4xl xl:leading-tight dark:text-white">{`você será redirecionado para a pagina de login em ${Seconds} ...`}</h2>
      </div>
    </>
  );
}
