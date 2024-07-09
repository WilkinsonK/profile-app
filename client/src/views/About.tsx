import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";

export default function About() {
    return (
        <Container>
            <br></br>
            <h1>Experience and Relevant Technologies</h1>
            <p>
                As a professional, I have been required to be
                flexible and have needed to work with a tech-stack
                of many different kinds. Overall, the end-goal is
                often the same, but the ergonomics can differ
                depending on the team, the individual, or the
                needs of the project itself. This results in
                needing to be capable of learning new frameworks,
                operating systems, databases, you name it. Listed here
                are some of the technologies and concepts I've worked
                with in the past
            </p>
            <br></br>

            <h3>Core Technical</h3>
            <p>
                Fundamentally as a developer, I have to sell myself as
                someone who specializes in certain areas to advertise
                where my strengths lie. This usually breaks down as
                one of two things, or more commonly a combination of.
                This is generally posed as the question, "what kind
                of software engineer are you?", and the answer often
                differs depending on the inquierer.
            </p>
            <p>
                This is because I've had my fingers in many pies, both
                as a professional and as a hobbyist, eager to learn
                and gain a better understanding of my craft. One title
                does not simply fit the bill anymore-- so long as you
                don't ask HR. But any case, these "core" skillsets
                here might paint a better picture not of what "kind"
                of role I best fit, but instead what roles I am
                capable of.
            </p>
            <Row>
                <Col>
                    <Card>
                        <Card.Header><Card.Title>Languages</Card.Title></Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>5 years Python</ListGroup.Item>
                            <ListGroup.Item>4 years Java</ListGroup.Item>
                            <ListGroup.Item>2 years Rust</ListGroup.Item>
                            <ListGroup.Item>2 years Typescript</ListGroup.Item>
                            <ListGroup.Item>4 years Common Web Language</ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Header><Card.Title>Specializing In</Card.Title></Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Web</ListGroup.Item>
                            <ListGroup.Item>Backend Web</ListGroup.Item>
                            <ListGroup.Item>Data Pipelines</ListGroup.Item>
                            <ListGroup.Item>Ad-hoc Scripting</ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            <br></br>

            <h3>Web</h3>
            <p>
                It's all about the "W". In the case of modern developers and IT,
                It's all about the "WWW". From top to bottom, if you can't
                build a website from scratch, you'll have better luck finding
                work as a banker or something.
            </p>
            <p>
                The obvious reasoning is how easy it is to make a platform or
                service of some kind available to potential clients. I mean,
                look at us, me trying to sell myself to you now over a
                half-baked web application I cooked up in a week? Imagine, if
                you didn't already know, how enormously powerful this has been
                for businesses since the dawn of AOL. Desktop applications are
                a niche concept when a company can rely on a browser and the
                internet to do all the hard work.
            </p>
            <Row>
                <Col>
                    <Card>
                        <Card.Header><Card.Title>REST and General Web Frameworks</Card.Title></Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Django</ListGroup.Item>
                            <ListGroup.Item>FastAPI</ListGroup.Item>
                            <ListGroup.Item>Flask</ListGroup.Item>
                            <ListGroup.Item>Rocket</ListGroup.Item>
                            <ListGroup.Item>Spring and Spring Boot</ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Header><Card.Title>Frontend and UI Frameworks</Card.Title></Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Bootstrap</ListGroup.Item>
                            <ListGroup.Item>React</ListGroup.Item>
                            <ListGroup.Item>Slint</ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Header><Card.Title>Database Servers and Languages</Card.Title></Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>MongoDB</ListGroup.Item>
                            <ListGroup.Item>Oracle</ListGroup.Item>
                            <ListGroup.Item>PostgreSQL</ListGroup.Item>
                            <ListGroup.Item>Redis</ListGroup.Item>
                            <ListGroup.Item>SQL Server</ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            <br></br>

            <h3>Development Lifecycle</h3>
            <p>
                All things have a beginning and an end. Software is no
                exception. There must be first the idea, which leads into
                planning, development and eventually deployment. The devil is
                in the details, though. When working on a project there are
                numerous minute drawbacks and overall costs before an idea can
                lead from A to B as the Minimum Viable Product and there after.
                Even the processes of deprecation and/or the replacement of
                legacy systems takes exceptional consideration and cooperation
                among stakeholders.
            </p>
            <h5>Planning and Collaboration</h5>
            <p>
                While glossing over literal modes of communication (i.e Teams,
                Email, etc.) scrum masters, BSAs, PMs and clients fawn over the
                tools that assist the business in understanding the progress
                being done when carrying out a plan. These concepts and
                platforms do work even if the general consensus is that they
                might be evil.
            </p>
            <h5>CI/CD and QA/QC</h5>
            <p>
                There's another side to the collab and planning, where
                developers come together to appeal to the former. What's most
                important here is how a project is maintained prior to
                deployment, along with deployment itself. We have ways of taking
                "snapshots" of our project where we can work on new features
                separately from what is already available in production. Ways to
                enforce the formatting of the code to make it more predictable
                and easier to read across an entire team of developers.
                Automation of how to test, validate and package the project
                if/when we've hit the end of our release cycle. The meat and
                potatoes of being able to effectively create a reliable product
                that can grow and change with minimal hiccups.
            </p>
            <Row>
                <Col>
                    <Card>
                        <Card.Header><Card.Title>Planning and Collaboration</Card.Title></Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Jira/Atlassian</ListGroup.Item>
                            <ListGroup.Item>Agile Development</ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Header><Card.Title>CI/CD Pipelines and Helper Tools</Card.Title></Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Docker</ListGroup.Item>
                            <ListGroup.Item>Git</ListGroup.Item>
                            <ListGroup.Item>Github Actions</ListGroup.Item>
                            <ListGroup.Item>Jenkins</ListGroup.Item>
                            <ListGroup.Item>Mypy</ListGroup.Item>
                            <ListGroup.Item>Precommit</ListGroup.Item>
                            <ListGroup.Item>Pytest</ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            <br></br>
        </Container>
    )
}
