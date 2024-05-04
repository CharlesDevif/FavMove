import "./filmCardStyle.css";
import { useNavigate } from "react-router-dom";
import { Film } from "../../type/films";
import { toast } from "react-toastify";
import {
  addFilmToList,
  getFilmListbyName,
  removeFilmFromList,
} from "../../lib/listeReq";
import { useAppSelector } from "../../store/hook";
import { useState } from "react";

export default function FilmCard(props: { film: Film }) {
  const user = useAppSelector((store) => store.user);
  const [isFavori, setIsFavori] = useState<boolean>(false);
  const navigate = useNavigate();

  if (user.strapiUser) {
    getFilmListbyName("favoris", user.strapiUser)
      .then((list) => {
        if (list) {
          list.films.forEach((film) => {
            if (film.filmId == `${props.film.id}`) {
              setIsFavori(true);
            }
          });
        }
      })
      .catch(() => {
        toast.error(
          "Une erreur s'est produite, veuillez actualiser votre navigateur."
        );
      });
  }

  const goToFilmDetails = () => {
    navigate(`/film/${props.film.id}`);
  };

  const handleDeleteFavori = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation(); // Stop the event from bubbling up to the parent
    if (user.strapiUser) {
      const favoriList = await getFilmListbyName("favoris", user.strapiUser);
      if (favoriList) {
        const isFilmRemoved = await removeFilmFromList(
          favoriList.id,
          props.film.id
        );
        if (isFilmRemoved != undefined) {
          toast.success("Film retiré de la liste.");
          setIsFavori(false);
        } else {
          console.log("wesh");

          setIsFavori(false);
        }
      }
    }
  };

  const handleAddFavori = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation(); // Stop the event from bubbling up to the parent
    if (user.strapiUser) {
      const favoriList = await getFilmListbyName("favoris", user.strapiUser);
      if (favoriList) {
        await addFilmToList(favoriList.id, props.film.id);
        toast.success("Film ajouté de la liste.");
        setIsFavori(true);
      }
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return "#00ed00";
    else if (rating >= 6) return "orange";
    else return "red";
  };

  const ratingColor = getRatingColor(props.film.vote_average);

  const imgCardStyle = {
    backgroundImage: `url(https://image.tmdb.org/t/p/original/${props.film.poster_path})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const handleAddToList = () => {
    toast.warning("Fonctionnalité non implémentée...");
  };

  return (
    <div
      style={imgCardStyle}
      className="containerCard"
      onClick={goToFilmDetails}>
      <div className="overlay">
        <div className="filmDetails">
          <div className="filmStats" style={{ color: ratingColor }}>
            <span className="voteAverage">
              Note: {props.film.vote_average.toFixed(1)} / 10
            </span>
          </div>
        </div>
        <div className="favori">
          {isFavori ? (
            <button className="retire" onClick={handleDeleteFavori}>
              Retirer favori
            </button>
          ) : (
            <button className="ajout" onClick={handleAddFavori}>
              Ajouter favori
            </button>
          )}
          <div id="addToList">
            <button className="ajout" onClick={handleAddToList}>
              Ajouter à voir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
