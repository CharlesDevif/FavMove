import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Film } from "../type/films.ts";
import { AppDispatch } from "./store.ts";
import favoriFilms from "../lib/favoriFilms.ts";
import addfavoriFilms from "../lib/addFavoriFilms.ts";
import { StrapiResponse } from "../lib/strapi.auth.api.ts";

export interface RepponseI {
  success: boolean;
  status_code: number;
  status_message: string;
}

const initialState: number[] = [];

export const asyncShowFavori = (strapiUser: StrapiResponse) => {
  console.log("part là");

  return async (dispatch: AppDispatch) => {
    await favoriFilms(strapiUser).then((res) => {
      const detailedFilms: unknown = res;
      const films = detailedFilms as Film[];
      dispatch(showFavori(films));
    });
  };
};
export const asyncAddFavori = (
  token: string,
  account: string,
  idFilms: number,
  favori: boolean
) => {
  return async (dispatch: AppDispatch) => {
    await addfavoriFilms(token, account, idFilms, favori).then((res) => {
      console.log(res);

      dispatch(addFavori(idFilms));
    });
  };
};
export const asyncRemoveFavori = (
  token: string,
  account: string,
  idFilms: number,
  favori: boolean
) => {
  return async (dispatch: AppDispatch) => {
    await addfavoriFilms(token, account, idFilms, favori).then((res) => {
      console.log(res);

      dispatch(deleteFavori(idFilms));
    });
  };
};

export const favoriSlice = createSlice({
  name: "favori",
  initialState: initialState,
  reducers: {
    showFavori: (_, action: PayloadAction<Film[]>) => {
      return action.payload.map((f) => f.id);
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
