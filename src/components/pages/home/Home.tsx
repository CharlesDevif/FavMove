import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { ListFilm } from "../../../type/films";
import { fetchGenres, findMostRated, findMoviesByGenre, findMoviesByQuery } from "../../../lib/findMostRated";
import FilmCard from "../../filmCards/FilmCard";
import "./home.css";
import { deleteToken } from "../../../store/tokenStore";
import ModalList from "../../modal/modalList";

export default function Home() {
  const isMounted = useRef<boolean>(false);
  const token = useAppSelector((store) => store.token);
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
      findMostRated(token.token, 1).then((res) => setListFilms(res));
      fetchGenres(token.token).then((data) => {
        setGenres(data);
        setFilteredGenres(data);
      });
      setTitle('Films bien notées')

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

  const handleGenreClick = (genreId: number, genreName: string) => {
    findMoviesByGenre(token.token, genreId, 1).then((res) => setListFilms(res));
    setIsInputFocused(false);
    setTitle('Films filtré par ' + genreName)
  };

  const handleSearch = () => {
    findMoviesByQuery(token.token, { year, actor, director }).then((res) => setListFilms(res));
    setTitle('Films filtré par ' + year + actor + director)
  };

  const handleLogoutClick = () => {
    dispatch(deleteToken());
    navigate("/login", { replace: true });
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleCreateList = (listName: string) => {
    console.log(listName);
	
  };

  return (
    <>
      <div id="header">
        <button className="btn" id="btnLogout" onClick={handleLogoutClick}>
          Déconnexion
        </button>
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
