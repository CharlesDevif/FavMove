/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { ListFilm } from "../../../type/films";
import {
  fetchGenres,
  findMostPopular,
  findMostRated,
  findMoviesByGenre,
  findMoviesByQuery,
  findUpcoming,
} from "../../../lib/findMostRated";
import FilmCard from "../../filmCards/FilmCard";
import "./home.css";
import { deleteUser } from "../../../store/userStore";
import ModalList from "../../modal/ModalList";
import { createList } from "../../../lib/listeReq";
import Header from "../../header/Header";
import { toast } from "react-toastify";

export default function Home() {
  const isMounted = useRef<boolean>(false);
  const user = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [listFilms, setListFilms] = useState<ListFilm>({} as ListFilm);
  const [genres, setGenres] = useState<any[]>([]);
  const [filteredGenres, setFilteredGenres] = useState<any[]>([]);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [year, setYear] = useState<string>("");
  const [actor, setActor] = useState<string>("");
  const [director, setDirector] = useState<string>("");
  const [Title, setTitle] = useState<string>("");
  const [pageIndex, setPageIndex] = useState<number>(1);

  const [, setIsLoading] = useState(false);
  const [, setError] = useState("");

  // Au début du composant
  const [totalPages] = useState(10); // Supposons que vous récupérez cela de l'API

  // Plus bas dans le composant
  const handleNextPage = () => {
    setPageIndex((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const handlePreviousPage = () => {
    setPageIndex((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Ajout de l'état pour contrôler l'ouverture de la modal

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMounted.current) {
      fetchGenres(user.token).then((data) => {
        setGenres(data);
        setFilteredGenres(data);
      });
      setTitle("Films les mieux notés");
      isMounted.current = true;
    }

    // Fonction pour charger les films basée sur le type actuel et l'index de page
    const loadFilms = () => {
      setIsLoading(true);
      switch (Title) {
        case "Films les mieux notés":
          findMostRated(user.token, pageIndex)
            .then(setListFilms)
            .catch(() => setError("Erreur lors du chargement des films"))
            .finally(() => setIsLoading(false));
          break;
        case "Films qui vont arrivées":
          findUpcoming(user.token, pageIndex)
            .then(setListFilms)
            .catch(() => setError("Erreur lors du chargement des films"))
            .finally(() => setIsLoading(false));
          break;
        case "Films Populaires":
          findMostPopular(user.token, pageIndex)
            .then(setListFilms)
            .catch(() => setError("Erreur lors du chargement des films"))
            .finally(() => setIsLoading(false));
          break;
        default:
          // Gérer d'autres types ici si nécessaire
          break;
      }
    };

    loadFilms(); // Appeler cette fonction à chaque changement de pageIndex
  }, [pageIndex, Title]); // Ajout de Title pour recharger les films si le type change également

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsInputFocused(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []); // Ce useEffect ne dépend d'aucune variable mutable et s'exécute une seule fois

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value.toLowerCase();
    const filtered = genres.filter((genre) =>
      genre.name.toLowerCase().includes(searchText)
    );
    setFilteredGenres(filtered);
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleMostRateClick = () => {
    findMostRated(user.token, pageIndex).then((res) => setListFilms(res));
    setIsInputFocused(false);
    setTitle("Films les mieux notés");
  };
  const handleUpcomingClick = () => {
    findUpcoming(user.token, pageIndex).then((res) => setListFilms(res));
    setIsInputFocused(false);
    setTitle("Films qui vont arrivées");
  };
  const handlePopularClick = () => {
    findMostPopular(user.token, pageIndex).then((res) => setListFilms(res));
    setIsInputFocused(false);
    setTitle("Films Populaires");
  };
  const handleGenreClick = (genreId: number, genreName: string) => {
    findMoviesByGenre(user.token, genreId, pageIndex).then((res) =>
      setListFilms(res)
    );
    setIsInputFocused(false);
    setTitle("Films filtré par " + genreName);
  };

  const handleSearch = () => {
    findMoviesByQuery(user.token, { year, actor, director }).then((res) =>
      setListFilms(res)
    );
    setTitle("Films filtré par " + year + actor + director);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleCreateList = async (listName: string, description: string) => {
    console.log(listName, description);
    createList(listName, description, user.strapiUser).then((res) => {
      toast.success("Votre liste vient d'être créée !");
      console.log(res);
    });
  };

  return (
    <>
      <Header
        handleLogoutClick={() =>
          dispatch(deleteUser()) && navigate("/login", { replace: true })
        }
        handleMostRatedClick={handleMostRateClick}
        handleUpcomingClick={handleUpcomingClick}
        handlePopularClick={handlePopularClick}
      />

      <div id="divRecherche">
        <div id="conteneurRechercheParGenre">
          <div className="containerInput" ref={containerRef}>
            <label htmlFor="filtreByGenre">Filtrer par genre</label>
            <input
              name="filtreByGenre"
              type="text"
              placeholder="Filtrer les genres"
              onChange={handleFilterChange}
              onFocus={handleInputFocus}
            />
            {isInputFocused && (
              <ul className="containerListGenre">
                {filteredGenres.map((genre) => (
                  <li
                    key={genre.id}
                    onClick={() => handleGenreClick(genre.id, genre.name)}>
                    {genre.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="containerInput">
            <label htmlFor="year">Année</label>
            <input
              name="year"
              type="text"
              value={year}
              placeholder="Ex: 2022"
              onChange={(e) => setYear(e.target.value)}
            />
          </div>

          <div className="containerInput">
            <label htmlFor="actor">Acteur</label>
            <input
              name="actor"
              type="text"
              value={actor}
              placeholder="Nom de l'acteur"
              onChange={(e) => setActor(e.target.value)}
            />
          </div>

          <div className="containerInput">
            <label htmlFor="director">Réalisateur</label>
            <input
              name="director"
              type="text"
              value={director}
              placeholder="Nom du réalisateur"
              onChange={(e) => setDirector(e.target.value)}
            />
          </div>
        </div>
        <div id="containerBtnRecherche">
          <button className="btn" onClick={handleSearch}>
            Rechercher
          </button>
          <button className="btn" onClick={handleModalOpen}>
            Créer une liste
          </button>
        </div>
      </div>
      <h1>{Title}</h1>
      <section id="containerCard">
        {listFilms.results?.map((u) => (
          <FilmCard film={u} key={u.id} />
        ))}
        <div className="containerBtnPage">
          <button onClick={handlePreviousPage}>Page précédente</button>
          <button onClick={handleNextPage}>Page suivante</button>
        </div>
      </section>
      <ModalList
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onCreateList={handleCreateList}
      />
    </>
  );
}
