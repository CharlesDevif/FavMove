import { DetailedFilm } from "../type/films";

export  async function findDetailsFilm(tokenKey:string,id:number): Promise<DetailedFilm>{
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${tokenKey}`
        }
      };

      
      const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
      return res.json();
      
      
}


