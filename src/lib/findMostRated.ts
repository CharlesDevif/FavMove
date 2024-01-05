import { ListFilm } from "../type/films";

export  async function findMostRated(tokenKey:string,page:number): Promise<ListFilm>{
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${tokenKey}`
        }
      };

      
      const res = await fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`, options)
      return res.json();
      
      
}


