import { useContext } from "react";
import { LoadingContext } from "../app/LoadingContext";
import { useSelector } from "react-redux";
import Container from "../Components/Container";
import Loader from "../Components/Loader";
import { Link } from "react-router-dom";
export default function Home(){
    const {isAppLoading}=useContext(LoadingContext)
    const isUserLoggedIn=useSelector(state=>state.auth.status)

    return(
        <Container>
            {

            !isAppLoading?
                isUserLoggedIn?(
                  <p>You are logged in {<Link to={'all-posts'} className="text-blue-800">Click here</Link>} to see posts</p>
                ):(
                    <p>{<Link to={'/login'} className="text-blue-800">Log in</Link>} to see posts</p>
                ):(
                    <Loader/>
            )
            }
        </Container>
        
    )

}