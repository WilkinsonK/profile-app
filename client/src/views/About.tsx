import { Card, Col, Container, Row } from "react-bootstrap";

function OverviewCard() {
    return (
        <Card>
            <Card.Header>
                <Card.Title>Experience and Relevant Technologies</Card.Title>
            </Card.Header>
            <Card.Body>
                <h3>Languages</h3>
                <p>
                    5 years of experience providing solutions, in various
                    languages, to unique and challenging problems.
                </p>
                <ul>
                    <li>5 years Python</li>
                    <li>4 years Java</li>
                    <li>2 years Rust</li>
                    <li>2 years Typscript</li>
                    <li>4 years Common Web Languages (HTML/CSS/JS)</li>
                </ul>
                <br></br>
                <h3>Technologies</h3>
                <p>
                    As a professional, I have been required to be flexible and
                    have needed to work with a tech-stack of many different
                    kinds. Overall, the end-goal is often the same, but the
                    ergonomics can differ depending on the team, the individual,
                    or the needs of the project itself. This results in needing
                    to be capable of learning new frameworks, operating systems,
                    databases, you name it. What I have listed here, though is
                    a short list of items I am most confident in and/or are
                    simply a favorite of mine.
                </p>
                <h5>CI/CD Pipelines and Helper Tools</h5>
                <ul>
                    <li>Github Actions</li>
                    <li>Jenkins</li>
                    <li>Precommit</li>
                </ul>
                <h5>Database Servers and Languages</h5>
                <ul>
                    <li>MongoDB</li>
                    <li>Oracle</li>
                    <li>PostgreSQL</li>
                    <li>Redis</li>
                    <li>SQL Server</li>
                </ul>
                <h5>Frontend and UI Frameworks</h5>
                <ul>
                    <li>Bootstrap</li>
                    <li>React</li>
                    <li>Slint</li>
                </ul>
                <h5>REST and General Web Frameworks</h5>
                <ul>
                    <li>Django</li>
                    <li>FastAPI</li>
                    <li>Flask</li>
                    <li>Rocket</li>
                    <li>Spring and Spring Boot</li>
                </ul>
            </Card.Body>
        </Card>
    )
}


export default function About() {
    return (
        <Container>
            <Row>
                <Col>
                    <br></br>
                    <OverviewCard />
                    <br></br>
                </Col>
            </Row>
        </Container>
    )
}
