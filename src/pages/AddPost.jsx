import Container from "../Components/Container";
import PostForm from "../Components/PostForm";

export default function AddPost() {
    return (
        <Container>
            <div className="py-8">
                    <PostForm />
            </div>
        </Container>
    )
}