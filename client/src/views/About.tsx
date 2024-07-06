import { ReactElement } from "react";
import { Card, Container } from "react-bootstrap";

class OverviewListSectionProps {
    title!:  string;
    excerp!: string;
    items!:  any[];
}

type olsRenderer = (t: string, e: any, i: any) => JSX.Element;

function OverviewListSection(props: OverviewListSectionProps, renderer: olsRenderer) {
    let excerp;
    if (props.excerp !== "") {
        excerp = <p>{props.excerp}</p>;
    }

    let items;
    if (props.items.length > 0) {
        items = (
            <ul>
                {props.items.map(item => <li>{item}</li>)}
            </ul>
        );
    }
    return renderer(props.title, excerp, items)
}

function OverviewListSection1(props: OverviewListSectionProps) {
    return OverviewListSection(props, (t, e, i) => {
        return (
            <>
            <h3>{t}</h3>
            {e}
            {i}
            </>
        )
    })
}

function OverviewListSection2(props: OverviewListSectionProps) {
    return OverviewListSection(props, (t, e, i) => {
        return (
            <>
            <h5>{t}</h5>
            {e}
            {i}
            </>
        )
    })
}

function OverviewCard(props: { children: ReactElement[] }) {
    return (
        <Card>
            <Card.Header>
                <Card.Title>Experience and Relevant Technologies</Card.Title>
            </Card.Header>
            <Card.Body>
                { props.children.map(child => child) }
            </Card.Body>
        </Card>
    )
}

function PersonalityCard() {
    return (
        <Card>
            <Card.Header><Card.Title>Who Am I</Card.Title></Card.Header>
            <Card.Body>
                <p>
                    I'm Jean Valjean. Prisoner 24601.
                </p>
            </Card.Body>
        </Card>
    )
}

export default function About() {
    return (
        <Container>
            <br></br>
            <OverviewCard>
                <OverviewListSection1
                    title="Languages"
                    excerp="
                    5 years of experience providing solutions, in
                    various languages, to unique and challenging
                    problems.
                    "
                    items={[
                        "5 years Python",
                        "4 years Java",
                        "2 years Rust",
                        "2 years Typescript",
                        "4 years Common Web Language (HTML/CSS/JS)"
                    ]}
                />
                <br></br>
                <OverviewListSection1
                    title="Technologies"
                    excerp="
                    As a professional, I have been required to be
                    flexible and have needed to work with a tech-stack
                    of many different kinds. Overall, the end-goal is
                    often the same, but the ergonomics can differ
                    depending on the team, the individual, or the
                    needs of the project itself. This results in
                    needing to be capable of learning new frameworks,
                    operating systems, databases, you name it. What I
                    have listed here, though is a short list of items
                    I am most confident in and/or are simply a
                    favorite of mine.
                    "
                    items={[]}
                />
                <OverviewListSection2
                    title="CI/CD Pipelines and Helper Tools"
                    excerp=""
                    items={[
                        "Github Actions",
                        "Jenkins",
                        "Precommit"
                    ]}
                />
                <OverviewListSection2
                    title="Database Servers and Languages"
                    excerp=""
                    items={[
                        "MongoDB",
                        "Oracle",
                        "PostgreSQL",
                        "Redis",
                        "SQL Server"
                    ]}
                />
                <OverviewListSection2
                    title="Frontend and UI Frameworks"
                    excerp=""
                    items={[
                        "Bootstrap",
                        "React",
                        "Slint"
                    ]}
                />
                <OverviewListSection2
                    title="REST and General Web Frameworks"
                    excerp=""
                    items={[
                        "Django",
                        "FastAPI",
                        "Flask",
                        "Rocket",
                        "Spring and Spring Boot"
                    ]}
                />
            </OverviewCard>
            <br></br>
            <PersonalityCard />
            <br></br>
        </Container>
    )
}
