import {createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  token: string;
  sessionId: string; 
  apiKey: string;
  username:string;
  accountId:string
}


const initialState: UserState = {
  token: "",
  sessionId: "",
  apiKey: "",
  username:"",
  accountId: "",
};

  export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
      addUser: (_, action: PayloadAction<UserState>) => {
        return action.payload ; 
      },
      deleteUser: () => {
        sessionStorage.clear()
        return initialState;
      },
    },
  });
  
  export const { addUser, deleteUser } = userSlice.actions;
  
  export const userReducer = userSlice.reducer;
  
