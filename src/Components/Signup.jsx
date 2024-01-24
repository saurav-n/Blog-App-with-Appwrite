import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { authService } from "../appwriteServices/authentication";
import { useNavigate } from "react-router";
import { authActions } from "../app/authSlice";
import Input from "./Input";

export default function Signup() {
    const [error, setError] = useState('');
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const signup=async (data)=>{
        setError('')
        try {
            const session=await authService.createUserAccount(data)
            if(session){
                const userData=await authService.getCurrentUser()
                if(userData) dispatch(authActions.logIn(userData))
                navigate('/')
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                
                <form onSubmit={handleSubmit(signup)}>
                    <div className="space-y-5">
                        <Input
                        label='Email:'
                        type='email'
                        placeholder='Enter the email'
                        {...register('email',{
                            required:'Email is required',
                            pattern:{
                                value:/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                message:'Email address must be valid'
                            }
                        })}
                        />
                        <Input
                        label='Password:'
                        type='password'
                        placeholder='Enter the password'
                        {...register('password',{
                            required:'Password is required'
                        })}
                        />
                        <button 
                        type='submit' 
                        className="w-full bg-blue-600 rounded-md hover:bg-blue-900 text-white py-2"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}