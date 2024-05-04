/* eslint-disable @typescript-eslint/no-explicit-any */
import { environment } from "../environments/environment";
import { IStrapiFilm } from "../type/strapi.types";

export async function addFilm(
  filmID: string
): Promise<IStrapiFilm | undefined> {
  const url = `http://localhost:1337/api/films?populate=*`;
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${environment.strapiApiKey}`,
    },
    body: JSON.stringify({
      data: {
        filmID: filmID,
      },
    }),
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    /// Film already exist in the database with this ID
    return undefined;
  }

  const json: any = await response.json();
  const addedFilm: IStrapiFilm = {
    id: json.data.id,
    filmId: json.data.attributes.filmID,
    createdAt: json.data.attributes.createdAt,
    updatedAt: json.data.attributes.updatedAt,
    commentaires: undefined,
  };

  return addedFilm;
}

export async function deleteFilm(filmID: string): Promise<number | undefined> {
  const url = `http://localhost:1337/api/films/${filmID}?populate=*`;
  const options = {
    method: "DELETE",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${environment.strapiApiKey}`,
    },
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    /// Film already deleted
    return undefined;
  }

  const json: any = await response.json();
  const suppressedFilmID: number = json.data.id;
  return suppressedFilmID;
}

export async function getFilmByFilmID(
  filmID: string
): Promise<IStrapiFilm | undefined> {
  const url = `http://localhost:1337/api/films?filters[filmID][$eq]=${filmID}&populate=*`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${environment.strapiApiKey}`,
    },
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    /// Film doesn't exist in the database with this ID
    return undefined;
  }

  const json: any = await response.json();

  if (json.data.length == 0) {
    // Ajouter le film à Strapi
    const film = await addFilm(filmID);
    if (film) {
      return film;
    }
  }

  const film: IStrapiFilm = {
    id: json.data[0].id,
    filmId: json.data[0].attributes.filmID,
    createdAt: json.data[0].attributes.createdAt,
    updatedAt: json.data[0].attributes.updatedAt,
    commentaires: json.data[0].attributes.commentaires,
  };

  return film;
}
