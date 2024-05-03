import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../store/hook";
import { DetailedFilm } from "../../../type/films";
import { findDetailsFilm } from "../../../lib/findDetailsFilm";

import "./FilmDetails.css";

export default function FilmDetails() {
    const { id } = useParams();
    const filmId = id ? parseInt(id) : 0;

    const isMounted = useRef<boolean>(false);
    const token = useAppSelector((store) => store.user.token);
    const [detailsFilm, setDetailsFilm] = useState<DetailedFilm>({} as DetailedFilm);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!isMounted.current) {
            findDetailsFilm(filmId).then((res) => {
				console.log(res);
                setDetailsFilm(res);
                setIsLoading(false);
            }).catch(err => {
                console.log(err);
                
                setError('Failed to fetch film details');
                setIsLoading(false);
            });
            isMounted.current = true;
        }
    }, [token, filmId]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="film-details-container">
            <h1>{detailsFilm.title} ({new Date(detailsFilm.release_date).getFullYear()})</h1>
            <div className="film-details">
                <img src={`https://image.tmdb.org/t/p/original/${detailsFilm.poster_path}`} alt={detailsFilm.title} className="film-poster" />
                <div className="film-info">
                    <p><strong>Tagline:</strong> {detailsFilm.tagline}</p>
                    <p><strong>Overview:</strong> {detailsFilm.overview}</p>
                    <p><strong>Genres:</strong> {detailsFilm.genres.map(genre => genre.name).join(', ')}</p>
                    <p><strong>Duration:</strong> {detailsFilm.runtime} minutes</p>
                    <p><strong>Release Date:</strong> {new Date(detailsFilm.release_date).toLocaleDateString()}</p>
                    <p><strong>Rating:</strong> {detailsFilm.vote_average} ({detailsFilm.vote_count} votes)</p>
                    <p><strong>Revenue:</strong> ${detailsFilm.revenue.toLocaleString()}</p>
                    <p><strong>Budget:</strong> ${detailsFilm.budget.toLocaleString()}</p>
                    <p><strong>Production Companies:</strong> {detailsFilm.production_companies.map(company => company.name).join(', ')}</p>
                </div>
            </div>
        </div>
    );
}
