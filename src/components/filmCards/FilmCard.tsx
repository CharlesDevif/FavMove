import "./fimlCardStylle.css"
import { useAppDispatch, useAppSelector } from "../../store/hook"
import { asyncAddFavori, asyncRemoveFavori } from "../../store/favoriStore"
import { useNavigate } from "react-router-dom"

export default function FilmCard({ film }: any) {
	const favori = useAppSelector((store) => store.favori)
	const isFavori = favori.includes(film.id)
	const token = useAppSelector((store) => store.token)

	const navigate = useNavigate();

    const goToFilmDetails = () => {
        navigate(`/film/${film.id}`);
    };

	const dispatch = useAppDispatch()

	const handleDeleteFavori = async () => {
		dispatch(asyncRemoveFavori(token.token, token.account, film.id, false))
	}
	const handleAddFavori = async () => {
		dispatch(asyncAddFavori(token.token, token.account, film.id, true))
	}

	const imgCardStyle = {
		backgroundImage: `url(https://image.tmdb.org/t/p/original/${film.poster_path})`,
		backgroundSize: "cover",
		backgroundPosition: "center",
	}

	return (
		<div style={imgCardStyle} className="containerCard" onClick={goToFilmDetails}>
			<div className="favori">
				{isFavori ? (
					<button className="retire" onClick={handleDeleteFavori}>Retirer favori</button>
				) : (
					<button className="ajout" onClick={handleAddFavori}>Ajouter favori</button>
				)}
				<div id="addToList">
					<button className="ajout"> Ajouter a voir</button>
				</div>
			</div>
		</div>
	)
}
