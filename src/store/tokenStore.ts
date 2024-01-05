import {createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TokenState {
  token: string;
  account: number; 
}

const initialState: TokenState = {
  token: "",
  account: 0, 
};

  export const tokenSlice = createSlice({
    name: 'token',
    initialState: initialState,
    reducers: {
      addToken: (_, action: PayloadAction<TokenState>) => {
        return action.payload ; 
      },
      deleteToken: () => {
        return initialState;
      },
    },
  });
  
  export const { addToken, deleteToken } = tokenSlice.actions;
  
  export const tokenReducer = tokenSlice.reducer;
  
