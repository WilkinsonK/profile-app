import { Button, Card, Stack } from "react-bootstrap";

import { Link } from "../common/link";
import { createDownloadOnClick } from "../common/download";
import Wrap from "./Wrap";

export class ContactProps {
    availability!: string[];
    email!:        string;
    fullName!:     string;
    links!:        Link[];
    phone!:        string;
    title!:        string;
}

export default function CommonContactCard(props: ContactProps) {
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
                    | {props.links.map(link => <Wrap key={link.name}>{Link.from(link).intoElement()} | </Wrap>)}
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

/**
 * Attempt to get contacts from the backend server.
 */
export async function doFetchContacts(): Promise<ContactProps[]> {
    let data;
    try {
        const res = await fetch("/info/contact");
        if (!res.ok) {
            throw new Error(`HTTP error: Status ${res.status}`);
        }
        data = await res.json();
    } catch (err) {
        console.log(`error occurred trying to fetch contact data: ${err}`);
        data = [];
    } finally {
        return data;
    }
}
