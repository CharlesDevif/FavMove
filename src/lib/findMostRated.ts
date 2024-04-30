import { ListFilm } from "../type/films";

export  async function findMostRated(tokenKey:string,page:number): Promise<ListFilm>{
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${tokenKey}`
        }
      };

      
      const res = await fetch(`https://api.themoviedb.org/3/movie/top_rated?language=fr-FR&page=${page}`, options)
      return res.json();
      
      
}
export  async function findMostPopular(tokenKey:string,page:number): Promise<ListFilm>{
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${tokenKey}`
        }
      };

      
      const res = await fetch(`https://api.themoviedb.org/3/movie/popular?language=fr-FR&page=${page}`, options)
      return res.json();
      
      
}
export  async function findUpcoming(tokenKey:string,page:number): Promise<ListFilm>{
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${tokenKey}`
        }
      };

      
      const res = await fetch(`https://api.themoviedb.org/3/movie/upcoming?language=fr-FR&page=${page}`, options)
      return res.json();
      
      
}

export async function findMoviesByQuery(tokenKey: string, query: { year?: string, actor?: string, director?: string }): Promise<ListFilm> {
  let url = `https://api.themoviedb.org/3/discover/movie?language=fr-FR&`;

  // Ajoute les paramètres de recherche à l'URL
  if (query.year) {
      url += `primary_release_year=${query.year}&`;
  }
  if (query.actor) {
      url += `with_cast=${query.actor}&`;
  }
  if (query.director) {
      url += `with_crew=${query.director}&`;
  }

  const options = {
      method: 'GET',
      headers: {
          accept: 'application/json',
          Authorization: `Bearer ${tokenKey}`
      }
  };

  const res = await fetch(url, options);
  return res.json();
}

export const fetchGenres = async (tokenKey: string) => {
  const options = {
      method: 'GET',
      headers: {
          accept: 'application/json',
          Authorization: `Bearer ${tokenKey}`
      }
  };

  const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?language=fr-FR`, options);
  const data = await res.json();
  return data.genres;
};

export async function findMoviesByGenre(tokenKey: string, genreId: number, page: number): Promise<ListFilm> {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${tokenKey}`
        }
    };

    const res = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=fr-FR&page=${page}`, options);
    return res.json();
}



