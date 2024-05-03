import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StrapiResponse } from "../lib/strapi.auth.api";

interface UserState {
  token: string;
  apiKey: string;
  strapiUser: StrapiResponse | undefined;
}

const initialState: UserState = {
  token: "",
  apiKey: "",
  strapiUser: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    addUser: (_, action: PayloadAction<UserState>) => {
      return action.payload;
    },
    deleteUser: () => {
      sessionStorage.clear();
      return initialState;
    },
  },
});

export const { addUser, deleteUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
