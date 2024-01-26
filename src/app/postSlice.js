import { createSlice } from "@reduxjs/toolkit";

const initialState={
    posts:[],
}

const postSlice=createSlice({
    name:'post',
    initialState,
    reducers:{
        setPosts:(state,action)=>{
            state.posts=action.payload
        },
        addPost:(state,action)=>{
            state.posts=state.posts.push(action.payload)
        },
        deletePost:(state,action)=>{
            state.posts=state.posts.filter(post=>post.$id!==action.payload)
        },
        updatePost:(state,action)=>{
            state.posts=state.posts.map(post=>post.$id===action.payload.id?action.payload.updatedPost:post)
        },
    }
})

export const {reducer:postReducer,actions:postActions}=postSlice