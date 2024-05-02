import { environment } from "../environments/environment";

export interface StrapiResponse {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: true;
    blocked: false;
    createdAt: string;
    updatedAt: string;
  };
}

export async function loginStrapiUser(
  email: string,
  password: string
): Promise<StrapiResponse> {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${environment.strapiApiKey}`,
    },
    body: JSON.stringify({
      identifier: email,
      password: password,
    }),
  };

  const res = await fetch(`http://localhost:1337/api/auth/local`, options);

  if (!res.ok) {
    console.log(res);

    throw new Error(`Error when trying to log in: ${res.statusText}`);
  }

  const data: StrapiResponse = await res.json();
  return data;
}

export type StrapiUserResponse = Pick<StrapiResponse, "user">;

export async function registerStrapiUser(
  email: string,
  password: string,
  username?: string
): Promise<StrapiUserResponse> {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${environment.strapiApiKey}`,
    },
    body: JSON.stringify({
      username:
        username ?? Math.floor(Math.random() * 10000 + 10000).toString(), // TODO: Ajouter un champ "username" -> OBLIGATOIRE dans Strapi
      email: email,
      password: password,
      provider: "local",
      confirmed: true,
      blocked: false,
      role: {
        connect: [
          {
            id: 1,
          },
        ],
      },
    }),
  };

  const res = await fetch(`http://localhost:1337/api/users`, options);

  if (!res.ok) {
    console.log(res);
    throw new Error(`Error when trying to log in: ${res.statusText}`);
  }

  const data: StrapiUserResponse = await res.json();
  return data;
}
