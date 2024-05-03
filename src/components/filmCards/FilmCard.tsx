import "./filmCardStyle.css";
// import { useAppDispatch, useAppSelector } from "../../store/hook";
import { useNavigate } from "react-router-dom";
import { Film } from "../../type/films";

export default function FilmCard(props: { film: Film }) {
  // const favori = useAppSelector((store) => store.favori);
  // const isFavori = favori.includes(props.film.id);
  // const user = useAppSelector((store) => store.user);
  const isFavori = false;

  const navigate = useNavigate();

  const goToFilmDetails = () => {
    navigate(`/film/${props.film.id}`);
  };

  // const dispatch = useAppDispatch();

  const handleDeleteFavori = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation(); // Stop the event from bubbling up to the parent
    //dispatch(asyncRemoveFavori(user.token, user.sessionId, film.id, false));
  };

  const handleAddFavori = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation(); // Stop the event from bubbling up to the parent
    //dispatch(asyncAddFavori(user.token, user.sessionId, film.id, true));
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
            <button className="ajout">Ajouter à voir</button>
          </div>
        </div>
      </div>
    </div>
  );
}
