import { environment } from "../environments/environment";
import { DetailedFilm } from "../type/films";

export async function findDetailsFilm(id: number): Promise<DetailedFilm> {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${environment.tmdbToken}`,
    },
  };

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?language=fr-FR`,
    options
  );
  return res.json();
}
