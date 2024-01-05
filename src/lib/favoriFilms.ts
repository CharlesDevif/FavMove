import { Film } from "../type/films";

export default async function favoriFilms(tokenKey: string, account: number, page: number): Promise<Film[]> {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${tokenKey}`,
        },
    }

    const res = await fetch(`https://api.themoviedb.org/3/account/${account}/favorite/movies?page=${page}&sort_by=created_at.asc`, options);
    
    if (!res.ok) {
        throw new Error(`Error fetching favori films: ${res.statusText}`);
    }

    const data = await res.json();
    console.log(data);

    return data.results; 
}
