import { DetailedFilm } from "../type/films";
import { StrapiResponse } from "./strapi.auth.api";
import { environment } from "../environments/environment";
import { IStrapiUser } from "../type/strapi.types";
import { findDetailsFilm } from "./findDetailsFilm";
import { getFilmListbyName } from "./listeReq";

export default async function favoriFilms(
  strapiUser: StrapiResponse
): Promise<DetailedFilm[]> {
  const filmFavorieListe = await getFilmListbyName("favoris", strapiUser)
  if (!filmFavorieListe) {
    throw new Error(`Error fetching favori films`);
  }

  console.log(filmFavorieListe.films);

  return filmFavorieListe;
}
