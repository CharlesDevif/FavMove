import {configureStore} from "@reduxjs/toolkit";
import {tokenReducer} from './tokenStore.ts'
import { favoriReducer } from "./favoriStore.ts";


export const store = configureStore({
    reducer: {
        token: tokenReducer,
        favori: favoriReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
