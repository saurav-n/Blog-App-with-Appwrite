import { useForm } from "react-hook-form";
import { dbService } from "../appwriteServices/database";
import { storageService } from "../appwriteServices/storage";
import {useSelector,useDispatch} from 'react-redux'
import { useNavigate } from "react-router";
import { useEffect,useId} from "react";
import { ID } from "appwrite";
import Input from "./Input";
import RTE from "./RTE";
import { postActions } from "../app/postSlice";


export default function PostForm({post}){
    const id=useId()
    const {control,register,watch,handleSubmit,setValue,getValues}=useForm({
            defaultValues:{
                title:post?post.title:'',
                slug:post?post.$id:'',
                content:post?post.content:'',
                status:post?post.status:'active'
            }
    })
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const userData=useSelector(state=>state.auth.userData)

    const onPostSubmit=async (data)=>{
        if(post){
            const file=data.image[0]?await storageService.uploadFile(data.image[0]):null
            
            if(file) {
                storageService.deleteFile(post.featuredImgId)
            }

            const dbPost=await dbService.updateBlog({
                ...data,
                featuredImgId:file?file.$id:post.featuredImgId
            })
            console.log(dbPost.content)
            if(dbPost) {
                dispatch(postActions.updatePost({id:dbPost.$id,updatedPost:dbPost}))
                navigate(`/post/${dbPost.$id}`)
            }
        }
        else{
            const file=data.image[0]?await storageService.uploadFile(data.image[0]):null
            const dbPost=await dbService.createBlog({
                ...data,
                featuredImgId:file?file.$id:undefined,
                userId:userData.$id
            })

            if(dbPost) {
                if(dbPost.status==='active') dispatch(postActions.addPost(dbPost))
                navigate(`/post/${dbPost.$id}`)
            }
        }
    }

   
    const slugTransform=(vlaue)=>{
        if(vlaue && typeof vlaue==='string'){
            return vlaue.
                trim().
                toLowerCase().
                replace(/[^a-zA-Z\d\s]+/g, "-").
                replace(/\s/g, "-")
        }
        return ''
    }

    useEffect(()=>{
        const subscription=watch((vlaue,{name})=>{
            if(name==='title') setValue('slug',slugTransform(vlaue.title))
        })

        return ()=>{
            subscription.unsubscribe()
        }
    },[watch,setValue])

    return(
        <form action="" className="flex flex-wrap" onSubmit={handleSubmit(onPostSubmit)}>
            <div className="w-2/3 px-2">
                <Input
                label='Title'
                type='text'
                placeholder='Enter Title'
                {...register('title',{required:true})}
                />
                <Input
                label='Slug'
                type='text'
                placeholder='Enter Slug'
                {...register('slug',{required:true})}
                onInput={(e)=>{setValue('slug',slugTransform(e.target.value),{shouldValidate:true})}}
                />
                <RTE name='content' label='Content:' control={control} defaultValue={getValues('content')}/>
            </div>
            <div className="w-1/3 px-2">
                <Input
                label='Featured Image'
                type='file'
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register('image',{required:!post})}
                />
                {post&&
                    <div className="w-full mb-4">
                        <img src={storageService.getFilePreview(post.featuredImgId)} alt={post.title} />
                    </div>
                }
                <div className="w-full flex flex-col gap-y-1">
                    <label htmlFor={id}>Status:</label>
                    <select 
                    name="" 
                    id={id}
                    {...register('status',{required:true})}
                    className="px-3 py-2 rounded-lg bg-white text-black outline-none 
                    focus:bg-gray-50 duration-200 border border-gray-200 w-full"
                    >
                        <option value="active">active</option>
                        <option value="inactive">inactive</option>
                    </select>
                    <button type="submit" className='w-full bg-green-500 rounded-md py-1'>{post?'Update':'Submit'}</button>
                </div>
            </div>
        </form>
    )
}