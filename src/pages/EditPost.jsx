import PostForm from "../Components/PostForm";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import Container from "../Components/Container";

export default function EditPost(){
    const {slug}=useParams()
    const AllPosts=useSelector(state=>state.post.posts)
    const [ToBeEditedPost]=AllPosts.filter(post=>post.$id===slug)

    return(
        <Container>
            {
                ToBeEditedPost?(
                    <div className="py-8">
                        <PostForm post={ToBeEditedPost}/>
                    </div>
                ):(
                    <p>Post doesn't exist</p>
                )
            }
        </Container>
    )
}