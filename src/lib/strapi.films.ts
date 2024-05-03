/* eslint-disable @typescript-eslint/no-explicit-any */
import { environment } from "../environments/environment";
import { IStrapiFilm } from "../type/strapi.types";

type StrapiFilmType = Pick<
  IStrapiFilm,
  "id" | "filmId" | "createdAt" | "updatedAt"
>;

export async function addFilm(
  filmID: string
): Promise<StrapiFilmType | undefined> {
  const url = `http://localhost:1337/api/films`;
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
  const addedFilm: StrapiFilmType = {
    id: json.data.id,
    filmId: json.data.attributes.filmID,
    createdAt: json.data.attributes.createdAt,
    updatedAt: json.data.attributes.updatedAt,
  };

  return addedFilm;
}

export async function deleteFilm(filmID: string): Promise<number | undefined> {
  const url = `http://localhost:1337/api/films/${filmID}`;
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
  const film: IStrapiFilm = {
    id: json.data.id,
    filmId: json.data.attributes.filmID,
    createdAt: json.data.attributes.createdAt,
    updatedAt: json.data.attributes.updatedAt,
    commentaires: json.data.attributes.commentaires,
  };

  return film;
}
