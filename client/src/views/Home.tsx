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
                        <h3>Over Achiever</h3>
                        <p>
                            Often <i>criticized</i> for over doing it. Going
                            above and beyond to produce the best possible work.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Image
                        src="carousel-background.png"
                    />
                    <Carousel.Caption>
                        <h3>Organized & Structured</h3>
                        <p>Excellence that is on the verge of OCD.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Image
                        src="carousel-background.png"
                    />
                    <Carousel.Caption>
                        <h3>Team Player</h3>
                        <p>
                            Never afraid to admit when wrong or reach out for
                            assistance. Celebrates victories with all involved.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <br></br>
            <h1>Top Projects</h1>
            <p>
                As someone constantly buried into their IDE on a daily basis,
                I'm seldom writing Shakespeare. However, I am more rapidly
                developing applications and libraries the average developer
                might envy.
            </p>
            <p>
                The overall goal, when creating something new, is to devine into
                existence a product someone else can appreciate. Listed here are
                things I've either worked on or am currently still that meets
                the requirement.
            </p>
            <br></br>
            <div>
                <RepoCard name="vixen" />
                <p>
                    Vixen is a passion project of mine where I've been able to
                    push the limits of what I think I know about programming and
                    Computer Science as a whole. Every time I take a stab at
                    improving the quality or enhancing this "language" I have
                    been gifted with the continued understanding of how little
                    I actually have.
                </p>
                <p>
                    Vixen itself is supposed to be a programming language. In a
                    world where it becomes Turing complete, self-hosted and
                    compiled across modern platforms, I will know that my
                    skills have reached a milestone which few are capable of (or
                    care to) achieve. Constantly still in development, but an
                    excellent source of real-world challenges and discovery.
                </p>
                <br></br>
                <RepoCard name="xapi-oxidized" />
                <p>
                    During my time at Washington University, there was a regular
                    need for some scripts or tooling to be coordinated where in
                    the internal logic would end up being the same. While, yes,
                    there were already libraries existing for languages such as
                    Python, their implementations were obfuscated into oblivion,
                    not performant and/or doing more than they should just to
                    access a simple web server.
                </p>
                <p>
                    In spite of the nature of what an XNAT is supposed to
                    service. The application itself is simply that. A web
                    server. Not to be treated as somthing more than necessary, <b>xapi-oxidized</b> was
                    designed to take the "Keep It Simple S.." approach. This
                    allowed for more control and customized.
                    [TODO]
                </p>
                <br></br>
                <RepoCard name="todo_app" />
                <p>Lorem ipsum</p>
                <RepoCard name="pyg" />
                <p>A møøse once bit my sister</p>
            </div>
        </Container>
    )
}
