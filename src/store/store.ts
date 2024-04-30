import {configureStore} from "@reduxjs/toolkit";
import {userReducer} from './userStore.ts'
import { favoriReducer } from "./favoriStore.ts";
import { listReducer } from "./listStore.ts";


export const store = configureStore({
    reducer: {
        user: userReducer,
        favori: favoriReducer,
        list: listReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
