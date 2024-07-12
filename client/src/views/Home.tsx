import { Carousel, Container, Image } from "react-bootstrap";
import RepoCard from "../components/RepoCard";

export default function Home() {
    return (
        <Container>
            <Carousel>
                <Carousel.Item>
                    <Image
                        src="carousel-background.png"
                    />
                    <Carousel.Caption>
                        <h3>Lorem Ipsum 1</h3>
                        <p>Some mangled non-sense goes here</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Image
                        src="carousel-background.png"
                    />
                    <Carousel.Caption>
                        <h3>Lorem Ipsum 2</h3>
                        <p>Some mangled non-sense goes here</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Image
                        src="carousel-background.png"
                    />
                    <Carousel.Caption>
                        <h3>Lorem Ipsum 3</h3>
                        <p>Some mangled non-sense goes here</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <br></br>
            <h1>Top Projects</h1>
            <p>Lorem ipsum gasput</p>
            <div>
                <RepoCard name="todo_app" />
                <p>Lorem ipsum</p>
                <RepoCard name="pyg" />
                <p>Lorem ipsum</p>
                <RepoCard name="xapi-oxidized" />
                <p>Lorem ipsum</p>
            </div>
        </Container>
    )
}
