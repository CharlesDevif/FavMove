import { useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../store/hook"
import { ListFilm } from "../../../type/films"
import { findMostRated } from "../../../lib/findMostRated"
import FilmCard from "../../filmCards/FilmCard"
import "./home.css"
import { deleteToken } from "../../../store/tokenStore"
import { useNavigate } from "react-router-dom"

export default function Home() {
	const isMounted = useRef<boolean>(false)
	const token = useAppSelector((store) => store.token)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const [listFilms, setListFilms] = useState<ListFilm>({} as ListFilm)

	useEffect(() => {
		if (!isMounted.current) {
			findMostRated(token.token, 1).then((res) => setListFilms(res))
			isMounted.current = true
		}
	}, [])

	const handleClic = () => {
		dispatch(deleteToken())
		navigate("/login", { replace: true })
	}

	return (
		<>
			<div id="header">
				<button id="btnLogout" onClick={handleClic}>
					Déconnexion
				</button>

				<div id="divRecherche">
					<h1>Film les plus aimée</h1>
				</div>
			</div>
			<section id="containerCard">
				{listFilms.results?.map((u) => (
					<FilmCard film={u} key={u.id} />
				))}
			</section>
		</>
	)
}
