/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import "./lists.css";
import { useAppSelector } from "../../../store/hook";
import { fetchLists } from "../../../lib/listeReq";
import { IStrapiFilm, IStrapiFilmList } from "../../../type/strapi.types";
import { toast } from "react-toastify";

export default function Lists() {
  const isMounted = useRef<boolean>(false);
  const user = useAppSelector((store) => store.user);
  const [lists, setLists] = useState<IStrapiFilmList[]>([]);

  useEffect(() => {
    if (!isMounted.current) {
      fetchLists(user.strapiUser).then((strapiFilmLists) => {
        const filmLists: IStrapiFilmList[] = [];
        strapiFilmLists.forEach((strapiList) => {
          const strapiListData: any = strapiList;
          const strapiFilms: IStrapiFilm[] = [];

          strapiListData.attributes.films.data.forEach((filmData: any) => {
            strapiFilms.push({
              id: filmData.id,
              commentaires: undefined,
              createdAt: filmData.attributes.createdAt,
              filmId: filmData.attributes.filmID,
              updatedAt: filmData.attributes.updatedAt,
            });
          });

          const filmList: IStrapiFilmList = {
            id: strapiListData.id,
            description: strapiListData.attributes.description,
            createdAt: strapiListData.attributes.createdAt,
            updatedAt: strapiListData.attributes.updatedAt,
            name: strapiListData.attributes.name,
            user: {
              id: strapiListData.attributes.user.data.id,
              ...strapiListData.attributes.user.data.attributes,
            },
            films: strapiFilms,
          };

          filmLists.push(filmList);
        });

        setLists(filmLists);
      });
      isMounted.current = true;
    }
  }, [lists, user.strapiUser]); // Add dependencies to useEffect

  const handleListDetail = () => {
    toast.warning("Functionnalité non implémentée...");
  };

  return (
    <>
      <section id="pageListContainer">
        <div id="lists">
          <h2>Vos listes</h2>
          {lists.map((list) => (
            <div key={list.id} className="listItem">
              <h3>{list.name}</h3>
              <p>Description : {list.description}</p>
              <p>Films enregistrés : {list.films.length}</p>
              <button onClick={handleListDetail}>Voir les films</button>
            </div>
          ))}
        </div>
        <div id="filmsInList">
          <h2>Films dans la liste</h2>
          {/* Supposons que vous vouliez afficher les films d'une liste spécifique ici */}
        </div>
      </section>
    </>
  );
}
