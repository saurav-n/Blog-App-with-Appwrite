import { useParams,useNavigate } from "react-router";
import { useSelector, useDispatch} from "react-redux";
import { dbService } from "../appwriteServices/database";
import { storageService } from "../appwriteServices/storage";
import { postActions } from "../app/postSlice";
import { Link } from "react-router-dom";
import parse from 'html-react-parser'
import Container from "../Components/Container";

export default function Post(){
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {slug}=useParams()
    const AllPosts=useSelector(state=>state.post.posts)
    const userData=useSelector(state=>state.auth.userData)
    const [openedPost]= AllPosts.filter(post=>post.$id===slug)
    const doesPostBelongsToLoggedInUser=openedPost&&userData?openedPost.userId===userData.$id:false

    const deletePost=async ()=>{
        const status=await dbService.deleteBlog(openedPost.$id)
        if(status){
            await storageService.deleteFile(openedPost.featuredImgId)
            dispatch(postActions.deletePost(openedPost.$id))
            navigate('/')
        }
    }

    return <Container>
        {
            openedPost?(
                <div className="py-8">
                    <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                        <img src={storageService.getFilePreview(openedPost.featuredImgId)} alt={openedPost.title} />
                        {
                            doesPostBelongsToLoggedInUser&&(
                                <div className="absolute right-6 top-6">
                                    <Link to={`/edit-post/${openedPost.$id}`}>
                                        <button className="bg-green-500 mr-3 px-2 py-1 rounded-md">Edit</button>
                                    </Link>
                                    <button
                                    className="bg-red-500 px-2 py-1 rounded-md"
                                    onClick={deletePost}
                                    >
                                        Delete
                                    </button>
                                </div>
                            )
                        }
                    </div>
                    <div className="w-full mb-6">
                        <h1 className="text-2xl font-bold">{openedPost.title}</h1>
                    </div>
                    <div>
                        {parse(openedPost.content)}
                    </div>
                </div>
            ):(
                <p>Post doesn't exist</p>
            )
        }
    </Container> 
}