import { Session } from "next-auth";

const CustomSession = (session: Session) => {
  const customSession = session as {
    user: {
      name?: string | null | undefined;
      email?: string | null | undefined;
      image?: string | null | undefined;
      id?: number | null | undefined;
    };
  };
  return customSession;
};

export default CustomSession;
