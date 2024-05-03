export default async function addfavoriFilms(
  tokenKey: string,
  account: string,
  idFilms: number,
  favori: boolean
): Promise<boolean> {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${tokenKey}`,
    },
    body: JSON.stringify({
      media_type: "movie",
      media_id: idFilms,
      favorite: favori,
    }),
  };

  const res = await fetch(
    `https://api.themoviedb.org/3/account/${account}/favorite`,
    options
  );

  if (!res.ok) {
    console.log(res);

    throw new Error(`Error fetching favori films: ${res.statusText}`);
  }

  const data = await res.json();

  return data;
}
