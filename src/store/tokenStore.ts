import {createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TokenState {
  token: string;
  account: string; 
}


const initialState: TokenState = {
  token: "",
  account: "", 
};

  export const tokenSlice = createSlice({
    name: 'token',
    initialState: initialState,
    reducers: {
      addToken: (_, action: PayloadAction<TokenState>) => {
        return action.payload ; 
      },
      deleteToken: () => {
        sessionStorage.clear()
        return initialState;
      },
    },
  });
  
  export const { addToken, deleteToken } = tokenSlice.actions;
  
  export const tokenReducer = tokenSlice.reducer;
  
