import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Film } from "../type/films.ts";
import { AppDispatch } from "./store.ts";
import favoriFilms from "../lib/favoriFilms.ts";
import addfavoriFilms from "../lib/addFavoriFilms.ts";

export interface RepponseI {
    success: boolean
    status_code: number
    status_message: string
  }
  

const initialState: number[] = [];

export const asyncShowFavori = (token: string, account: number, page: number) => {


    return async (dispatch: AppDispatch) => {
        await favoriFilms(token, account, page).then((res) => {
            console.log(res);
            
            dispatch(showFavori(res));
        });
    };
}
export const asyncAddFavori = (token: string, account: number, idFilms: number, favori:boolean) => {
    return async (dispatch: AppDispatch) => {
        await addfavoriFilms(token, account, idFilms, favori ).then((res) => {
            console.log(res);
            
            dispatch(addFavori(idFilms));
        });
    };
}
export const asyncRemoveFavori = (token: string, account: number, idFilms: number, favori:boolean) => {
    return async (dispatch: AppDispatch) => {
        await addfavoriFilms(token, account, idFilms, favori ).then((res) => {
            console.log(res);
            
            dispatch(deleteFavori(idFilms));
        });
    };
}

export const favoriSlice = createSlice({
    name: "favori",
    initialState: initialState,
    reducers: {
        showFavori: (_, action: PayloadAction<Film[]>) => {
            return action.payload.map(f => f.id)
        },
        addFavori: (state, action: PayloadAction<number>) => {
            return [...state, action.payload];
        },
        deleteFavori: (state, action: PayloadAction<number>) => {
            return state.filter((e) => e !== action.payload);
        },
    },
});

export const { showFavori, addFavori, deleteFavori } = favoriSlice.actions;

export const favoriReducer = favoriSlice.reducer;
