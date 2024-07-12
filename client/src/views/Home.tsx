import { Container } from "react-bootstrap";
import RepoCard from "../components/RepoCard";

export default function Home() {
    return (
        <Container>
            <h1>Welcome Home</h1>
            <div content="center">
                <RepoCard name="vixen" />
                <br></br>
                <RepoCard name="todo_app" />
                <br></br>
                <RepoCard name="pyg" />
            </div>
        </Container>
    )
}
