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
                    server. Not to be treated as somthing more than necessary,
                    xapi-oxidized was designed to take the "Keep It Simple S.."
                    approach. This allowed for more control and customized
                    behavior alternatives did not allow with their opinionated
                    design.
                </p>
                <RepoCard name="todo_app" />
                <p>
                    A standard cross-platform desktop application. Perhaps not
                    the most creative piece of material to hit the market, but
                    we all gotta start somewhere.
                </p>
                <p>
                    No, this isn't a revolutionary idea. In fact, this one in
                    particular has been beaten into the ground so much that it's
                    TODone-for. But I'm still proud of it all the same. This app
                    marks the first time I was able to complete a desktop
                    applictation-- at all-- while overcoming my irrational fear
                    of UI/UX design.
                </p>
                <RepoCard name="pyg" />
                <p>
                    Pyg. Good old Pyg. A library wrapper around the Python C
                    ABI. We wouldn't have this attempt at a Go library if not
                    for the fact that alternatives were not up-to-date enough to
                    get started with on more modern projects. At the time, the
                    latest supported version of the ABI in Go was 3.7 or less,
                    and was already considered unsupported by the Python
                    organization.
                </p>
                <p>
                    Still lacking in full functionality. I again am still very
                    proud of this project and the potential it has moving
                    forward. At the very least, it should be compatible with
                    future versions of the Python C ABI, and to that effect will
                    mean it can be developed further.
                </p>
            </div>
        </Container>
    )
}
