import { useSelector } from "react-redux";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router";

export default function Protected({children,authenticated=true}){
    const [loading, setLoading] = useState(true);
    const authStatus=useSelector(state=>state.auth.status)
    const navigate=useNavigate()

    useEffect(()=>{
        if(authenticated&&authStatus!==authenticated) navigate('/login')
        setLoading(false)
    },[authenticated,authStatus,navigate])

    return loading?<p>Loading...</p>:<>{children}</>
}