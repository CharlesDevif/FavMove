import { useEffect, useRef, useState } from "react"
import { useAppSelector } from "../../../store/hook"
import { ListFilm } from "../../../type/films"
import { findMostRated } from "../../../lib/findMostRated"
import FilmCard from "../../filmCards/FilmCard"
import "./home.css"


export default function Home() {
	const isMounted = useRef<boolean>(false)
	const token = useAppSelector((store) => store.token)
	


	const [listFilms, setListFilms] = useState<ListFilm>({} as ListFilm)

	useEffect(() => {
		if (!isMounted.current) {
			findMostRated(token.token, 1).then((res) => setListFilms(res))
			isMounted.current = true
		}
	}, [])

	return (
		<section id="containerCard">
			{listFilms.results?.map((u) => (
				<FilmCard film={u} key={u.id} />
			))}
		</section>
	)
}
