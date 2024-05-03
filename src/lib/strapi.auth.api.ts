import { environment } from "../environments/environment";
import { IStrapiUser } from "../type/strapi.types";
import { createList, getFilmListbyName } from "./listeReq";

export interface StrapiResponse {
  jwt: string;
  user: Pick<
    IStrapiUser,
    | "id"
    | "username"
    | "email"
    | "provider"
    | "confirmed"
    | "blocked"
    | "createdAt"
    | "updatedAt"
  >;
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

  const isFavoriteListExisting = await getFilmListbyName("favoris", data);
  console.log(isFavoriteListExisting);

  if (isFavoriteListExisting == undefined) {
    console.log("part ici fils de pute");

    await createList("favoris", "Votre liste de films favoris.", data);
  }

  return data;
}

export type StrapiUserResponse = Pick<
  IStrapiUser,
  | "id"
  | "username"
  | "email"
  | "provider"
  | "confirmed"
  | "blocked"
  | "createdAt"
  | "updatedAt"
  | "role"
>;

export async function registerStrapiUser(
  email: string,
  password: string,
  username: string
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
        username,
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
