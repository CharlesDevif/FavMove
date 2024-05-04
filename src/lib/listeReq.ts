/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "react-toastify";
import { environment } from "../environments/environment";
import { IStrapiFilm, IStrapiFilmList } from "../type/strapi.types";
import { StrapiResponse } from "./strapi.auth.api";
import { addFilm, getFilmByFilmID } from "./strapi.films";

// Créer une nouvelle liste
export async function createList(
  name: string,
  description: string,
  strapiUser?: StrapiResponse
): Promise<IStrapiFilmList | undefined> {
  const url = `http://localhost:1337/api/film-lists`;

  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${environment.strapiApiKey}`,
    },
    body: JSON.stringify({
      data: {
        name: name,
        description: description,
        user: {
          connect: [strapiUser?.user.id],
        },
      },
    }),
  };

  const response: any = await fetch(url, options);

  if (!response.ok) {
    return undefined;
  }

  const json = response.json();

  return json.data;
}

// Supprimer une liste
export async function deleteList(listId: number): Promise<number | undefined> {
  const url = `http://localhost:1337/api/film-lists/${listId}`;
  const options = {
    method: "DELETE",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${environment.strapiApiKey}`,
    },
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    return undefined;
  }

  const json = await response.json();
  return json.data.id;
}

// Ajouter un film à une liste
export async function addFilmToList(
  listId: number,
  filmId: number
): Promise<IStrapiFilmList> {
  const url = `http://localhost:1337/api/film-lists/${listId}`;

  let film = await getFilmByFilmID(`${filmId}`);

  if (film == undefined) {
    await addFilm(`${filmId}`);
    film = await getFilmByFilmID(`${filmId}`);
  }

  const options = {
    method: "PUT",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${environment.strapiApiKey}`,
    },
    body: JSON.stringify({
      data: {
        films: {
          connect: [film?.id],
        },
      },
    }),
  };

  const response = await fetch(url, options);
  return await response.json();
}

// Supprimer un film d'une liste
export async function removeFilmFromList(
  listId: number,
  filmId: number
): Promise<IStrapiFilmList | undefined> {
  const url = `http://localhost:1337/api/film-lists/${listId}?populate=*`;

  const film = await getFilmByFilmID(`${filmId}`);

  if (!film) {
    toast.error("Ce film n'existe pas !");
    return undefined;
  }

  const options = {
    method: "PUT",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${environment.strapiApiKey}`,
    },
    body: JSON.stringify({
      data: {
        films: {
          disconnect: [film.id],
        },
      },
    }),
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    toast.error("Ce film a déjà été retiré de votre liste !");
    return undefined;
  }

  const json = await response.json();

  const films: IStrapiFilm[] = [];

  json.data.attributes.films.data.forEach((filmData: any) => {
    films.push({
      id: filmData.id,
      commentaires: undefined,
      createdAt: filmData.attributes.createdAt,
      filmId: filmData.attributes.filmID,
      updatedAt: filmData.attributes.updatedAt,
    });
  });

  const updatedFilmList: IStrapiFilmList = {
    id: json.data.id,
    name: json.data.attributes.name,
    description: json.data.attributes.description,
    createdAt: json.data.attributes.createdAt,
    updatedAt: json.data.attributes.updatedAt,
    films: films,
    user: {
      id: json.data.attributes.user.data.id,
      ...json.data.attributes.user.data.attributes,
    },
  };
  return updatedFilmList;
}

// Récupérer toutes les listes de films de l'utilisateur
export async function fetchLists(
  strapiUser?: StrapiResponse
): Promise<IStrapiFilmList[]> {
  const url = `http://localhost:1337/api/film-lists?filters[user][$eq]=${strapiUser?.user.id}&populate=*`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${environment.strapiApiKey}`,
    },
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    return [];
  }

  const json = await response.json();
  const filmLists: IStrapiFilmList[] = json.data;
  return filmLists;
}

export async function getFilmListbyName(
  name: string,
  strapiUser: StrapiResponse
): Promise<IStrapiFilmList | undefined> {
  const url = `http://localhost:1337/api/film-lists?filters[name][$eq]=${name}&filters[user][$eq]=${strapiUser.user.id}&populate=*`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${environment.strapiApiKey}`,
    },
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    return undefined;
  }

  const json = await response.json();

  if (json.data.length != 0) {
    const films: IStrapiFilm[] = [];

    json.data[0].attributes.films.data.forEach((filmData: any) => {
      films.push({
        id: filmData.id,
        commentaires: undefined,
        createdAt: filmData.attributes.createdAt,
        filmId: filmData.attributes.filmID,
        updatedAt: filmData.attributes.updatedAt,
      });
    });

    const filmLists: IStrapiFilmList = {
      id: json.data[0].id,
      ...json.data[0].attributes,
      films: films,
    };

    return filmLists;
  }

  return undefined;
}
