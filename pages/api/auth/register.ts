import base_service from "../../../services/base_service";

interface DataObject {
  id: number;
  name?: string;
  password?: string;
}

export async function Signup(data: DataObject) {
  try {
    await base_service.post(process.env.NEXT_PUBLIC_API_ROUTE + "users", data, {
      headers: {
        apikey: process.env.NEXT_PUBLIC_API_KEY,
      },
    });
    return "sucesso";
  } catch (err) {
    return "falhou";
  }
}
export async function UpdateUser(data: DataObject, id: number) {
  try {
    await base_service.put(
      process.env.NEXT_PUBLIC_API_ROUTE + `users?id=eq.${id}`,
      data,
      {
        headers: {
          apikey: process.env.NEXT_PUBLIC_API_KEY,
        },
      }
    );
    return "sucesso";
  } catch (err) {
    return "falhou";
  }
}

export async function GetAll() {
  try {
    const response = await base_service.get(
      process.env.NEXT_PUBLIC_API_ROUTE + "users",
      {
        headers: {
          apikey: process.env.NEXT_PUBLIC_API_KEY,
        },
      }
    );
    return response.data;
  } catch (err) {
    return "falhou";
  }
}

export async function GetUserById(id: number) {
  try {
    const response = await base_service.get(
      process.env.NEXT_PUBLIC_API_ROUTE + `users?id=eq.${id}`,
      {
        headers: {
          apikey: process.env.NEXT_PUBLIC_API_KEY,
        },
      }
    );
    return response.data;
  } catch (err) {
    return "falhou";
  }
}
export async function DeleteById(id: number) {
  try {
    await base_service.delete(
      process.env.NEXT_PUBLIC_API_ROUTE + `users?id=eq.${id}`,
      {
        headers: {
          apikey: process.env.NEXT_PUBLIC_API_KEY,
        },
      }
    );
    return "sucesso";
  } catch (err) {
    return "falhou";
  }
}
