import { useState, useEffect } from "react"
import { authActions } from "./app/authSlice"
import { postActions } from "./app/postSlice";
import { useDispatch } from 'react-redux'
import { authService } from "./appwriteServices/authentication";
import { dbService } from "./appwriteServices/database";
import { LoadingContextProvider } from "./app/LoadingContext";
import Header from "./Components/Header";
import { Outlet } from "react-router";
import Footer from "./Components/Footer";


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch=useDispatch()
  useEffect(()=>{
    authService.getCurrentUser()
      .then((userData)=>{
        if(userData) dispatch(authActions.logIn(userData))
        else dispatch(authActions.logOut())
      })
      .catch(error=>console.log(error))
      .finally(()=>setIsLoading(false))
    
    dbService.getBlogs()
      .then((posts)=>{
        if(posts) dispatch(postActions.setPosts(posts))
      })
      .catch(error=>console.log(error))
  },[])

  return(
    <LoadingContextProvider value={{isAppLoading:isLoading}}>
      <Header/>
      <Outlet/>
      <Footer/>
    </LoadingContextProvider>
  )
  
}

export default App
