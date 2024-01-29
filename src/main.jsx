import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import {Route,RouterProvider,createBrowserRouter,createRoutesFromElements} from 'react-router-dom'
import Protected from './Components/AuthLayout.jsx'
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
      <Route path='/login' element={
        <Protected authenticated={false}>
          <LogIn/>
        </Protected>
      }/>
      <Route path='/signup' element={
        <Protected authenticated={false}>
          <SignUp/>
        </Protected>
      }/>
      <Route path='/add-post' element={
        <Protected>
          <AddPost/>
        </Protected>
      }/>
      <Route path='/all-posts' element={
        <Protected>
          <AllPosts/>
        </Protected>
      }/>
      <Route path='/edit-post/:slug' element={
        <Protected>
          <EditPost/>
        </Protected>
      }/>
      <Route path='/post/:slug' element={
        <Protected>
          <Post/>
        </Protected>
      }/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>,
)
