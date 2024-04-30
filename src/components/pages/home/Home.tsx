import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { ListFilm } from "../../../type/films";
import { fetchGenres, findMostPopular, findMostRated, findMoviesByGenre, findMoviesByQuery, findUpcoming } from "../../../lib/findMostRated";
import FilmCard from "../../filmCards/FilmCard";
import "./home.css";
import { deleteUser } from "../../../store/userStore";
import ModalList from "../../modal/ModalList";
import { createList } from "../../../lib/listeReq";
import Header from "../../header/Header";


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
  const [Title, setTitle] = useState<string>('')

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Ajout de l'état pour contrôler l'ouverture de la modal

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMounted.current) {
      findMostRated(user.token, 1).then((res) => setListFilms(res));
      fetchGenres(user.token).then((data) => {
        setGenres(data);
        setFilteredGenres(data);
      });
      setTitle('Films les mieux notés')

      isMounted.current = true;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsInputFocused(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value.toLowerCase();
    const filtered = genres.filter((genre) => genre.name.toLowerCase().includes(searchText));
    setFilteredGenres(filtered);
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleMostRateClick = () => {
    findMostRated(user.token, 1).then((res) => setListFilms(res));
    setIsInputFocused(false);
    setTitle('Films les mieux notés')
  };
  const handleUpcomingClick = () => {
    findUpcoming(user.token, 1).then((res) => setListFilms(res));
    setIsInputFocused(false);
    setTitle('Films qui vont arrivées')
  };
  const handlePopularClick = () => {
    findMostPopular(user.token, 1).then((res) => setListFilms(res));
    setIsInputFocused(false);
    setTitle('Films Populaires')
  };
  const handleGenreClick = (genreId: number, genreName: string) => {
    findMoviesByGenre(user.token, genreId, 1).then((res) => setListFilms(res));
    setIsInputFocused(false);
    setTitle('Films filtré par ' + genreName)
  };

  const handleSearch = () => {
    findMoviesByQuery(user.token, { year, actor, director }).then((res) => setListFilms(res));
    setTitle('Films filtré par ' + year + actor + director)
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleCreateList = async (listName: string, description: string) => {
    console.log(listName, description);
    let language = ""
    createList(user.apiKey, user.token, user.sessionId, listName, description, language).then((res) => {
      console.log(res);

    })
  };

  return (
    <>
      <Header
        handleLogoutClick={() => dispatch(deleteUser()) && navigate("/login", { replace: true })}
        handleMostRatedClick={handleMostRateClick}
        handleUpcomingClick={handleUpcomingClick}
        handlePopularClick={handlePopularClick}
      />

      <div id="divRecherche">
        <div id="conteneurRechercheParGenre" >
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
                  <li key={genre.id} onClick={() => handleGenreClick(genre.id, genre.name)}>{genre.name}</li>
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
          <button className="btn" onClick={handleSearch}>Rechercher</button>
          <button className="btn" onClick={handleModalOpen}>Créer une liste</button>
        </div>
      </div>
      <h1>{Title}</h1>
      <section id="containerCard">
        {listFilms.results?.map((u) => (
          <FilmCard film={u} key={u.id} />
        ))}
      </section>
      <ModalList isOpen={isModalOpen} onClose={handleModalClose} onCreateList={handleCreateList} />
    </>
  );
}
