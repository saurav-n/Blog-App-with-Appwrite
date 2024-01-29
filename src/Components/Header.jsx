import { useNavigate } from "react-router";
import { authService } from "../appwriteServices/authentication";
import { authActions } from "../app/authSlice";
import { useDispatch,useSelector } from "react-redux";
import Logo from "./Logo";

export default function Header(){
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const isUserLoggedIn=useSelector(state=>state.auth.status)

    const handleLogOut=()=>{
        authService.logOut()
            .then(()=>dispatch(authActions.logOut()))
            .then(()=>navigate('/'))
            .catch(error=>console.log(error))
    }

    const navItems=[
        {
            name: 'Home',
            slug: "/",
            active: true
          }, 
          {
            name: "Login",
            slug: "/login",
            active: !isUserLoggedIn,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !isUserLoggedIn,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: isUserLoggedIn,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: isUserLoggedIn,
        },
        {
            name:'Log Out',
            slug:'',
            active:isUserLoggedIn
        }
    ]

    return(
        <div className="flex justify-between bg-gray-400 p-2">
            <Logo classname={'w-[50px]'}/>
            <ul className="flex  p-2">
                {navItems
                    .filter(navItem=>navItem.active)
                    .map(navIem=>(
                        <li key={navIem.name}>
                            <button
                                className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                                onClick={navIem.slug?()=>navigate(navIem.slug):handleLogOut}
                            >
                                {navIem.name}
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}