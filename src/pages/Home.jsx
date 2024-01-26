import { useContext } from "react";
import { LoadingContext } from "../app/LoadingContext";
import { UseSelector } from "react-redux";
export default function Home(){
    const {isAppLoading}=useContext(LoadingContext)
    const isUserLoggedIn=useSelector(state=>state.auth.status)

    return(
        !isAppLoading?
            isUserLoggedIn?(
                <p>user is logged in</p>
            ):(
                <p>user is not logged in so displaying sinup page</p>
            ):(
                <p>Loading...</p>
        )
        
    )

}