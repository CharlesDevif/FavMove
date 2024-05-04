import { DetailedFilm } from "../type/films";
import { StrapiResponse } from "./strapi.auth.api";
import { getFilmListbyName } from "./listeReq";
import { findDetailsFilm } from "./findDetailsFilm";

export default async function favoriFilms(
  strapiUser: StrapiResponse
): Promise<DetailedFilm[]> {
  const filmFavorieListe = await getFilmListbyName("favoris", strapiUser);

  if (!filmFavorieListe) {
    throw new Error(`Error fetching favori films`);
  }

  // On récupère de TMDB
  const tmdbDetailedFilms: DetailedFilm[] = [];
  console.log(filmFavorieListe.id);

  // if (filmFavorieListe.films.length > 1) {
  //   for (const film of filmFavorieListe.films) {
  //     tmdbDetailedFilms.push(await findDetailsFilm(film.filmId));
  //   }
  // } else {
  //   tmdbDetailedFilms.push(
  //     await findDetailsFilm(filmFavorieListe.films[0].filmId)
  //   );
  // }

  return tmdbDetailedFilms;
}
