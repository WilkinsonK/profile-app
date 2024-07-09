import { ReactElement } from 'react';
import { Button, Card, Container, Stack } from 'react-bootstrap';
import { createDownloadOnClick } from '../common/download';

class LinkProps {
    name: string;
    href: string;

    constructor(name: string, href: string) {
        this.name = name;
        this.href = href;
    }

    intoElement(): ReactElement {
        return (
            <a href={this.href} target="_blank" rel="noreferrer">{this.name}</a>
        )
    }
}

class CommonContactProps {
    availability!: string[];
    email!:        string;
    fullName!:     string;
    links!:        LinkProps[];
    phone!:        string;
    title!:        string;
}

function CommonContactCard(props: CommonContactProps) {
    let email = props.email !== "" ? <>Email: {props.email}<br></br></> : "";
    let phone = props.phone !== "" ? <>Phone: {props.phone}<br></br></> : "";

    return (
        <Card>
            <Card.Header><Card.Title>My Information</Card.Title></Card.Header>
            <Card.Body>
                <h5>{props.fullName}</h5>
                <h6>{props.title} | {props.availability.join(', ')}</h6>
                <p>
                    {email}
                    {phone}
                    | {props.links.map(link => <>{link.intoElement()} | </>)}
                </p>
            </Card.Body>
            <Card.Footer>
                <Stack direction="horizontal" gap={1}>
                    <div className="p-1"></div>
                    <div className="p-1 ms-auto"></div>
                    <div className="p-1">
                        <Button
                            onClick={createDownloadOnClick("resume.pdf", "Keenan Wilkinson Resume.pdf")}>
                            Download Resume
                        </Button>
                    </div>
                </Stack>
            </Card.Footer>
        </Card>
    )
}

export default function Contact() {
    let linkedInLink = "https://www.linkedin.com/in/keenan-wilkinson-0a23571a8/";

    return (
        <Container>
            <br></br>
            <h1>Contact Me</h1>
            <p>
                Please do reach out. I will try to answer emails as swiftly as
                possible. However, it is more effective to reach me via <a href={linkedInLink}>LinkedIn</a>.
                Additionally you are invited to download a copy of my resume.
            </p>
            <br></br>
            <CommonContactCard
                availability={[
                    "C2H (Long-Term)",
                    "Freelance",
                    "Full-Time"
                ]}
                email="keenanwilkinson@outlook.com"
                fullName="Keenan W. Wilkinson"
                links={[
                    new LinkProps("LinkedIn", linkedInLink),
                    new LinkProps("Github", "https://github.com/WilkinsonK")
                ]}
                phone=""
                title="Software Engineer"
            />
            <br></br>
        </Container>
    )
}
