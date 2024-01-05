import { Link } from "react-router-dom"
import "./fimlCardStylle.css"
import { useAppDispatch, useAppSelector } from "../../store/hook"
import { asyncAddFavori, asyncRemoveFavori } from "../../store/favoriStore"

export default function FilmCard({ film }: any) {
	const favori = useAppSelector((store) => store.favori)
	const isFavori = favori.includes(film.id)
	const token = useAppSelector((store) => store.token)

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
<div style={imgCardStyle} className="containerCard">
      <div className="favori">
        {isFavori ? (
          <button id="retireFav" onClick={handleDeleteFavori}>Retirer favori</button>
        ) : (
          <button id="ajoutFav" onClick={handleAddFavori}>Ajouter favori</button>
        )}
      </div>
    </div>
	)
}
