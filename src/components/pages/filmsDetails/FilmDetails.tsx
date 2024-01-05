import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { useAppSelector } from "../../../store/hook"
import { DetailedFilm } from "../../../type/films"
import { findDetailsFilm } from "../../../lib/findDetailsFilm"

export default function FilmDetails() {
	const { id } = useParams()
    const filmId = id ? parseInt(id) : 0; 
    
	const isMounted = useRef<boolean>(false)
    
	const token = useAppSelector((store) => store.token)
	const [detailsFilm, setListDetailsFilm] = useState<DetailedFilm>({} as DetailedFilm)

	useEffect(() => {
        if (!isMounted.current) {
			findDetailsFilm(token.token, filmId).then((res) => setListDetailsFilm(res))
			isMounted.current = true
		}

        console.log(detailsFilm);

    }, [detailsFilm])

	

	return (
		<>
			<section>
				<div className="imgFilmDetails"><img src={`https://image.tmdb.org/t/p/original/${detailsFilm.poster_path}`} alt="" /></div>
				<div>
					<h3 id="titleFilm">{detailsFilm.original_title}</h3>
					<h3 id="overview">{detailsFilm.overview}</h3>
				</div>
			</section>
		</>
	)
}
