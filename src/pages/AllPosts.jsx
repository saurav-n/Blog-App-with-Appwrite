import { useSelector } from "react-redux";
import PostCard from "../Components/PostCard";

export default function AllPosts(){
    const posts=useSelector(state=>state.post.posts)
    return(
        <div className="w-full py-8">
            <div className="flex flex-wrap">
                {
                    posts.map(post=>(
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard post={post}/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}