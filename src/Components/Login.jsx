import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authService } from "../appwriteServices/authentication";
import { authActions } from "../app/authSlice";
import { dbService } from "../appwriteServices/database";
import { postActions } from "../app/postSlice";
import { useForm } from "react-hook-form"
import Input from "./Input";
import Logo from "./Logo";

export default function LogInComponent() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState('');
    const { handleSubmit, register,formState:{errors},watch } = useForm()

    const login = async (data) => {
        setError('')
        try {
            const session = await authService.logIn(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(authActions.logIn(userData))
                    const {documents:posts}=await dbService.getBlogs()
                    if(posts) dispatch(postActions.setPosts(posts))
                }
                navigate('/')
            }
        } catch (error) {
            setError(error.message)
        }
    }

    useEffect(()=>{
        const subscription=watch(()=>{console.log('component reloaded' ,errors)})
        return ()=>subscription.unsubscribe()
    },[watch])

    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        
                <form onSubmit={handleSubmit(login)}>
                    <div className="space-y-5">
                        <Input
                            lablel='Email:'
                            type='email'
                            placeholder='Enter your email'
                            {...register('email',{
                                required:'Email is required',
                                pattern:{
                                    value:/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                    message:'Email address must be valid'
                                }
                            })}
                        />
                        {errors.email&& <p className="text-red-600 mt-8 text-center">{errors.email.message}</p>}
                        <Input
                            lablel='Password:'
                            type='password'
                            placeholder='Enter your password'
                            {...register('password',{
                                required:'Password is required',
                                minLength:{
                                    value:7,
                                    message:'Password must be at least of 7 characters'
                                }
                            })}
                        />
                        {errors.password&& <p className="text-red-600 mt-8 text-center">{errors.password.message}</p>}
                        <button 
                        type='submit' 
                        className="w-full bg-blue-600 rounded-md hover:bg-blue-900 text-white py-2"
                        >
                            Log In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}