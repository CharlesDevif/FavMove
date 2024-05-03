import { DetailedFilm } from "../type/films";
import { StrapiResponse } from "./strapi.auth.api";
import { environment } from "../environments/environment";
import { IStrapiUser } from "../type/strapi.types";
import { findDetailsFilm } from "./findDetailsFilm";

export default async function favoriFilms(
  strapiUser: StrapiResponse
): Promise<DetailedFilm[]> {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${environment.strapiApiKey}`,
    },
  };

  const res = await fetch(
    `http://localhost:1337/api/users/${strapiUser.user.id}?populate=*`,
    options
  );

  if (!res.ok) {
    throw new Error(`Error fetching favori films: ${res.statusText}`);
  }

  const films: DetailedFilm[] = [];

  // Ici, on a **toutes** les infos de l'utilisateur dont les id des film
  const data: IStrapiUser = await res.json();
  data.film_lists.forEach(async (film) => {
    const detailedFilm = await findDetailsFilm(film.id);
    films.push(detailedFilm);
  });

  return films;
}
