import { useSelector } from "react-redux";
import PostCard from "../Components/PostCard";
import Container from "../Components/Container";

export default function AllPosts(){
    const posts=useSelector(state=>state.post.posts)
    console.log(posts)
    return(
        <Container>
            <div className="w-full py-8">
                    <div className="flex flex-wrap gap-x-1">
                        {
                            posts.map(post=>(
                                <div key={post.$id} className='p-2 w-1/4 min-w-[250px]'>
                                    <PostCard post={post}/>
                                </div>
                            ))
                        }
                    </div>
            </div>
        </Container>
    )
}