import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { authService } from "../appwriteServices/authentication";
import { authActions } from "../app/authSlice";
import { useForm } from "react-hook-form"
import Input from "./Input";

export default function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState('');
    const { handleSubmit, register } = useForm()

    const login = async (data) => {
        try {
            const session = await authService.logIn(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(authActions.logIn(userData))
                navigate('/')
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center w-full">
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
            </div>
            <form onSubmit={handleSubmit(login)}>
                <div className="w-[50%] flex flex-col items-center justify-center gap-x-2">
                    <Input
                        lablel='Email:'
                        type='email'
                        classname='w-[80%]'
                        placeholder='Enter your email'
                        {...register('email',{
                            required:true,
                            validate:{
                                matchPattern:(value)=>/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)||
                                'Email address must be valid address'
                            }
                        })}
                    />
                    <Input
                        lablel='Password:'
                        type='text'
                        className='w-[80%]'
                        placeholder='Enter your password'
                        {...register('password',{required:true})}
                    />
                    <button 
                    type='submit' 
                    className="w-[80%] bg-blue-600 rounded-md hover:bg-blue-900 text-white py-2"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}