import  { useEffect, useRef, useState } from "react";
import "./lists.css";
import {  useAppSelector } from "../../../store/hook";
import { useNavigate } from "react-router-dom";
import { fetchLists } from "../../../lib/listeReq";
import { List } from "../../../type/lists";

export default function Lists() {
    const isMounted = useRef<boolean>(false);
    const user = useAppSelector((store) => store.user);
    
    const navigate = useNavigate();

    const [lists, setLists] = useState<List[]>([]);
    // const [listFilms, setListFilms] = useState<ListFilm>({} as ListFilm);

    useEffect(() => {
        if (!isMounted.current) {
            fetchLists(user.token, user.accountId, user.sessionId).then((res) => {
                setLists(res.results);
            });
            isMounted.current = true;
        }
    }, [user.token, user.accountId, user.sessionId]); // Add dependencies to useEffect

    return (
        <>
    
            <section id="pageListContainer">
                <div id="lists">
                    <h2>Vos listes</h2>
                    {lists.map((list) => (
                        <div key={list.id} className="listItem">
                            <h3>{list.name}</h3>
                            <p>Description: {list.description}</p>
                            <p>Nombre d'items: {list.item_count}</p>
                            <button onClick={() => navigate(`/list/${list.id}`)}>Voir les films</button>
                        </div>
                    ))}
                </div>
                <div id="filmsInList">
                    <h2>Films dans la liste</h2>
                    {/* Supposons que vous vouliez afficher les films d'une liste spécifique ici */}
                </div>
            </section>
        </>
    );
}
