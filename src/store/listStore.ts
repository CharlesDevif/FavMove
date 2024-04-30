import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Définir le type pour la liste de films
export interface FilmList {
  id: string;
  name: string;
  films: number[]; // tableau d'identifiants de films
}
// interface AddRemoveFilmResponse {
//     success: boolean;
//     message: string;
//   }
  

// // Interface pour la réponse de l'API lors de la création d'une liste
// interface CreateListResponse {
//     id: string;
//     success: boolean;
//     message: string;
//   }
  
//   // Fonction asynchrone pour créer une nouvelle liste de films
//   export const createListApi = createAsyncThunk<
//     CreateListResponse,
//     { name: string },
//     { state: RootState }
//   >("lists/createList", async ({ name }, { getState }) => {
//     const { token, account } = getState().token; // Récupérer le token et l'identifiant de l'utilisateur depuis le state
//     const url = `https://api.themoviedb.org/3/list?session_id=${token}`;
//     const options = {
//       method: "POST",
//       headers: {
//         accept: "application/json",
//         "content-type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ name, session_id: token, account_id: account }),
//     };
  
//     const response = await fetch(url, options);
//     const data = await response.json();
//     return data;
//   });
  
//   // Fonction asynchrone pour supprimer une liste de films
//   export const deleteListApi = createAsyncThunk<
//     void,
//     string, // ID de la liste à supprimer
//     { state: RootState }
//   >("lists/deleteList", async (listId, { getState }) => {
//     const { token } = getState().token; // Récupérer le token depuis le state
//     const url = `https://api.themoviedb.org/3/list/${listId}`;
//     const options = {
//       method: "DELETE",
//       headers: {
//         accept: "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     };
  
//     await fetch(url, options);
//   });
  
//   // Fonction asynchrone pour récupérer toutes les listes de films de l'utilisateur
//   export const fetchListsApi = createAsyncThunk<
//     void,
//     void,
//     { state: RootState }
//   >("lists/fetchLists", async (_, { getState }) => {
//     const { token } = getState().token; // Récupérer le token depuis le state
//     const url = `https://api.themoviedb.org/3/account/null/lists?page=1`;
//     const options = {
//       method: "GET",
//       headers: {
//         accept: "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     };
  
//     const response = await fetch(url, options);
//     const data = await response.json();
//     return data;
//   });


//   // Fonction asynchrone pour ajouter un film à une liste
// export const addFilmToListApi = createAsyncThunk<
// AddRemoveFilmResponse,
// { listId: string; filmId: string },
// { state: RootState }
// >("lists/addFilmToList", async ({ listId, filmId }, { getState }) => {
// const { token } = getState().token; // Récupérer le token depuis le state
// const url = `https://api.themoviedb.org/3/list/${listId}/add_item`;
// const options = {
//   method: "POST",
//   headers: {
//     accept: "application/json",
//     "content-type": "application/json",
//     Authorization: `Bearer ${token}`,
//   },
//   body: JSON.stringify({ media_id: filmId }),
// };

// const response = await fetch(url, options);
// const data = await response.json();
// return data;
// });

// // Fonction asynchrone pour supprimer un film d'une liste
// export const removeFilmFromListApi = createAsyncThunk<
// AddRemoveFilmResponse,
// { listId: string; filmId: string },
// { state: RootState }
// >("lists/removeFilmFromList", async ({ listId, filmId }, { getState }) => {
// const { token } = getState().token; // Récupérer le token depuis le state
// const url = `https://api.themoviedb.org/3/list/${listId}/remove_item`;
// const options = {
//   method: "POST",
//   headers: {
//     accept: "application/json",
//     "content-type": "application/json",
//     Authorization: `Bearer ${token}`,
//   },
//   body: JSON.stringify({ media_id: filmId }),
// };

// const response = await fetch(url, options);
// const data = await response.json();
// return data;
// });

// État initial du reducer
const initialState: FilmList[] = [];

// Créer le slice pour le reducer des listes de films
const listSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    // Action pour ajouter une nouvelle liste de films
    addList(state, action: PayloadAction<FilmList>) {
      state.push(action.payload);
    },

    // Action pour supprimer une liste de films
    deleteList(state, action: PayloadAction<string>) {
      return state.filter((list) => list.id !== action.payload);
    },

    // Action pour ajouter un film à une liste existante
    addFilmToList(state, action: PayloadAction<{ listId: string; filmId: number }>) {
      const { listId, filmId } = action.payload;
      const list = state.find((list) => list.id === listId);
      if (list) {
        list.films.push(filmId);
      }
    },

    // Action pour supprimer un film d'une liste existante
    removeFilmFromList(state, action: PayloadAction<{ listId: string; filmId: number }>) {
      const { listId, filmId } = action.payload;
      const list = state.find((list) => list.id === listId);
      if (list) {
        list.films = list.films.filter((id) => id !== filmId);
      }
    },
  },
});

// Exporter les actions du slice
export const { addList, deleteList, addFilmToList, removeFilmFromList } = listSlice.actions;

// Exporter le reducer des listes de films
export const listReducer = listSlice.reducer;

