import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

import ContactCard, { ContactProps, doFetchContacts } from "../components/ContactCard";
import { Link } from '../common/link';

export default function Contact() {
    const [contact, setContacts] = useState(new ContactProps());
    const [loading, setLoading]  = useState(true);

    useEffect(() => {
        const inner = async () => {
            const fetched = await doFetchContacts();
            setContacts(fetched[0]);
            setLoading(false);
        }
        inner();
    }, []);

    // Can only render these components after we
    // have acquired our needed contact details.
    // Must wait until after loading is complete.
    let card = <></>;
    let linkedInLink = <></>;
    if (!loading) {
        card = (
            <ContactCard
                availability={contact.availability}
                email={contact.email}
                fullName={contact.fullName}
                links={contact.links}
                phone={contact.phone}
                title={contact.title}
            />
        );

        contact
            .links
            .filter(link => link.name === "LinkedIn")
            .forEach(link => { linkedInLink = Link.from(link).intoElement(); });
    }

    return (
        <Container>
            <br></br>
            <h1>Contact Me</h1>
            <p>
                Please do reach out. I will try to answer emails as swiftly as
                possible. However, it is more effective to reach me via {linkedInLink}.
                Additionally you are invited to download a copy of my resume.
            </p>
            <br></br>
            {card}
            <br></br>
        </Container>
    )
}
