import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StrapiResponse } from "../lib/strapi.usersApi";

interface UserState {
  token: string;
  sessionId: string;
  apiKey: string;
  username: string;
  accountId: string;
  strapiUser: StrapiResponse | undefined;
}

const initialState: UserState = {
  token: "",
  sessionId: "",
  apiKey: "",
  username: "",
  accountId: "",
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
