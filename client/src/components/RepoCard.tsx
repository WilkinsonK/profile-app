import { Card, Placeholder, Spinner, Stack } from "react-bootstrap";
import { useEffect, useState } from "react";

import { Repository } from "../models/github";

function MetaBadge(props: { icon: string, children?: any | any[] }) {
    return (
        <Stack direction="horizontal" gap={2}>
            <Card.Img
                src={props.icon}
                id="repo-icon"
                className="vlb-icon"
            />
            <>{props.children}</>
        </Stack>
    )
}

export default function RepoCard(props: { name: string }) {
    const [loading, setLoading]   = useState(true);
    const [repoData, setRepo]     = useState(new Repository());

    useEffect(() => {
        const inner = async () => {
            const repo = await doFetchRepository(props.name);
            setRepo(repo);
            setLoading(false);
        };
        inner();
    }, [props]);

    let header   = <><Spinner></Spinner></>;
    let content  = <><Placeholder></Placeholder></>;
    let license  = <i>No Licsense</i>;
    let language = <i>No Language</i>;
    if (!loading) {
        if (repoData.license !== undefined) {
            license = <>{repoData.license.spdx_id}</>
        }
        language = <>{repoData.language}</>

        header = (
            <>
                <a href={repoData.html_url} target="_blank" rel="noreferrer" id="repo-icon-link">
                    <MetaBadge icon="icon/book-solid.svg">
                        <Card.Title>{repoData.name}</Card.Title>
                    </MetaBadge>
                </a>
            </>
        )
        content = (
            <>
                <Card.Text>{repoData.description}</Card.Text>
                <Stack direction="horizontal" gap={2}>
                    <MetaBadge icon="icon/file-code-solid.svg">
                        <Card.Text>{language}</Card.Text>
                    </MetaBadge>
                    <MetaBadge icon="icon/scale-solid.svg">
                        <Card.Text>{license}</Card.Text>
                    </MetaBadge>
                </Stack>
            </>
        );
    }

    return (
        <Card className="ms-auto" style={{ width: '50%' }}>
            <Card.Header>{header}</Card.Header>
            <Card.Body>{content}</Card.Body>
        </Card>
    );
}

async function doFetchRepository(name: string): Promise<Repository> {
    let data;
    try {
        const res = await fetch(`/github/${name}`);
        if (!res.ok) {
            throw new Error(`HTTP error: Status ${res.status}`);
        }
        data = await res.json();
    } catch (err) {
        console.log(`failed trying to fetch repo data: ${err}`);
        data = new Repository();
    } finally {
        return data;
    }
}
