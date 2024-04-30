

// Créer une nouvelle liste
export async function createList(tokenKey: string, sessionId: string, name: string): Promise<any> {
    const url = `https://api.themoviedb.org/3/list?session_id=${sessionId}`;
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${tokenKey}`
        },
        body: JSON.stringify({ name, session_id: sessionId })
    };

    const response = await fetch(url, options);
    return response.json();
}

// Supprimer une liste
export async function deleteList(tokenKey: string,listId: string): Promise<any> {
    const url = `https://api.themoviedb.org/3/list/${listId}`;
    const options = {
        method: 'DELETE',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${tokenKey}`
        }
    };

    const response = await fetch(url, options);
    return response.json();
}

// Ajouter un film à une liste
export async function addFilmToList(tokenKey: string,listId: string, filmId: string): Promise<any> {
    const url = `https://api.themoviedb.org/3/list/${listId}/add_item`;
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${tokenKey}`
        },
        body: JSON.stringify({ media_id: filmId })
    };

    const response = await fetch(url, options);
    return response.json();
}

// Supprimer un film d'une liste
export async function removeFilmFromList(tokenKey: string,listId: string, filmId: string): Promise<any> {
    const url = `https://api.themoviedb.org/3/list/${listId}/remove_item`;
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${tokenKey}`
        },
        body: JSON.stringify({ media_id: filmId })
    };

    const response = await fetch(url, options);
    return response.json();
}

// Récupérer toutes les listes de films de l'utilisateur
export async function fetchLists(tokenKey: string,): Promise<any> {
    const url = `https://api.themoviedb.org/3/account/null/lists?page=1`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${tokenKey}`
        }
    };

    const response = await fetch(url, options);
    return response.json();
}
