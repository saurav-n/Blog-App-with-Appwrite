import { useState, useEffect } from "react"
import { authActions } from "./app/authSlice"
import { useDispatch, useSelector } from 'react-redux'
import { authService } from "./appwriteServices/authentication";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch=useDispatch()
  const isUserLoggedIn=useSelector(state=>state.status)
  useEffect(()=>{
    authService.getCurrentUser()
      .then((userData)=>{
        if(userData) dispatch(authActions.logIn(userData))
        else dispatch(authActions.logOut())
      })
      .catch(error=>console.log(error))
      .finally(()=>setIsLoading(false))
  },[])

  return !isLoading ? (
    isUserLoggedIn?(
      <p>user is logged in</p>
    ):(
      <p>user is not logged in so displaying sinup page</p>
    )
  ) : (
    <p>app loading...</p>
  )
  
}

export default App
