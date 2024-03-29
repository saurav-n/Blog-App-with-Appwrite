import {configureStore,combineReducers}  from '@reduxjs/toolkit'
import { authReducer } from './authSlice'
import { postReducer } from './postSlice'

const rootReducer=combineReducers({
    auth:authReducer,
    post:postReducer
})
export const store=configureStore({
    reducer:rootReducer
})