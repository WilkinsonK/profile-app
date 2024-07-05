import Children from 'react';
import { Card, Container, Row } from 'react-bootstrap';

function CommonContactCard() {
    return (
        <Card>
            <Card.Header><Card.Title>Contact Me</Card.Title></Card.Header>
            <Card.Body>
                <h5>Keenan W. Wilkinson</h5>
                <h6>Software Engineer | C2H (Long-Term), Freelance, Full-Time</h6>
                <p>
                    Email: keenanwilkinson@outlook.com
                    <br></br>
                    {/* Phone: (314) 479-2014
                    <br></br> */}
                    <a href="https://www.linkedin.com/in/keenan-wilkinson-0a23571a8/">LinkedIn</a> | <a href="https://github.com/WilkinsonK">Github</a>
                </p>
            </Card.Body>
        </Card>
    )
}

function FAQCard() {
    return (
        <Card>
            <Card.Header>
                <Card.Title>Frequently Asked Questions</Card.Title></Card.Header>
            <Card.Body>
                <h1>Common Q's</h1>
                <p>
                    Before making an attempt to contact me directly, you may
                    want to review some of the below <b>common Q's</b>. These
                    listed are generally the most often asked or most likely
                    reason others in the past have reached out.
                </p>
                <p>
                    The majority of what you'll read here is only going to be
                    a top-level view of what I might still be able to elaborate
                    further on. However, there is a high likelihood that these
                    topics have also been covered by other material on my
                    website.
                </p>

                <Container>
                    <FAQItem
                        question="Tell us something about yourself?"
                        answer="
                        I am a software engineer, a programming polyglot, of 5
                        years and counting. My expertise is strongest with
                        Python 3+ and Rust, but have leveraged many others at
                        this point to complete business expectations and client
                        dreams.
                        "
                    />
                    <FAQItem
                        question="
                        What technologies have you used in a professional
                        environment?
                        "
                        answer="
                        I've worked with a number of technologies in the past,
                        all of which at a Full-Stack capacity. I am capable of
                        the design, architecture and hosting of web applications
                        from the ground up.
                        "
                    />
                    <FAQItem
                        question="
                        Would you be comfortable taking a contract position
                        (6-12mo)?
                        "
                        answer="
                        Outside of my freelancing work, I prefer long-term
                        opportunities as they promise more stability and are
                        easier to feel invested in. An important component of
                        working with a team to achieve a unified goal.
                        "
                    />
                    <FAQItem
                        question="Are you open to new projects?"
                        answer="
                        For freelance and/or smaller projects that can be
                        completed quickly without causing conflicts, I am happy
                        to take the time to discuss them and potentially take
                        on the challenge.
                        "
                    />
                </Container>
            </Card.Body>
        </Card>
    )
}

function FAQItem(props: {question: string, answer: string}) {
    return (
        <Row>
            <p>
                <b>Q</b>: {props.question}
                <br></br>
                <b>A</b>: {props.answer}
            </p>
        </Row>
    )
}

export default function Contact() {
    return (
        <Container>
            <FAQCard />
            <CommonContactCard />
        </Container>
    )
}
