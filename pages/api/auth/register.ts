import base_service from "../../../services/base_service";

interface DataObject {
  id?: number;
  name: string;
  password: string;
}

export async function Signup(data: DataObject) {
  try {
    await base_service.post({
      api: process.env.NEXT_PUBLIC_API_ROUTE + "users",
      data: data,
      params: {
        headers: {
          apikey: process.env.NEXT_PUBLIC_API_KEY,
        },
      },
    });
    return "sucesso";
  } catch (err) {
    return "falhou";
  }
}
export async function UpdateUser(data: DataObject, id: number | undefined) {
  try {
    await base_service.put({
      api: process.env.NEXT_PUBLIC_API_ROUTE + `users?id=eq.${id}`,
      data: data,
      params: {
        headers: {
          apikey: process.env.NEXT_PUBLIC_API_KEY,
        },
      },
    });
    return "sucesso";
  } catch (err) {
    return "falhou";
  }
}

export async function GetAll() {
  try {
    const response = await base_service.get({
      api: process.env.NEXT_PUBLIC_API_ROUTE + "users",
      params: {
        headers: {
          apikey: process.env.NEXT_PUBLIC_API_KEY,
        },
      },
    });
    return response.data;
  } catch (err) {
    return "falhou";
  }
}

export async function GetUserById(id: number) {
  try {
    const response = await base_service.get({
      api: process.env.NEXT_PUBLIC_API_ROUTE + `users?id=eq.${id}`,
      params: {
        headers: {
          apikey: process.env.NEXT_PUBLIC_API_KEY,
        },
      },
    });
    return response.data;
  } catch (err) {
    return "falhou";
  }
}
export async function DeleteById(id: number) {
  try {
    await base_service.delete({
      api: process.env.NEXT_PUBLIC_API_ROUTE + `users?id=eq.${id}`,
      params: {
        headers: {
          apikey: process.env.NEXT_PUBLIC_API_KEY,
        },
      },
    });
    return "sucesso";
  } catch (err) {
    return "falhou";
  }
}
