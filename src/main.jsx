import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import {Route,RouterProvider,createBrowserRouter,createRoutesFromElements} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Post from './pages/Post.jsx'
import LogIn from './pages/Login.jsx'
import SignUp from './pages/Signup.jsx'
import AddPost from './pages/AddPost.jsx'
import AllPosts from './pages/AllPosts.jsx'
import EditPost from './pages/EditPost.jsx'

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route
    path='/'
    element={<App/>}
    >
      <Route path='' element={<Home/>}/>
      <Route path='/login' element={<LogIn/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/add-post' element={<AddPost/>}/>
      <Route path='/all-posts' element={<AllPosts/>}/>
      <Route path='/edit-post/:slug' element={<EditPost/>}/>
      <Route path='/post/:slug' element={<Post/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>,
)
