import { Buffer } from "buffer";
import { Card, Spinner, Stack } from "react-bootstrap";
import { useEffect, useState } from "react";

import { Readme, Repository } from "../models/github";
import Markdown from "react-markdown";

export function ReadMe(props: { name: string}) {
    const [loading, setLoading]   = useState(true);
    const [readmeData, setReadme] = useState(new Readme());

    useEffect(() => {
        const inner = async () => {
            const readme = await doFetchReadme(props.name);
            setReadme(readme);
            setLoading(false);
        };
        inner();
    }, []);

    let data = <><Spinner></Spinner></>;
    if (!loading) {
        let readme = Buffer
            .from(readmeData.content, "base64")
            .toString();
        data = <Markdown>{readme}</Markdown>;
    }
    return data;
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
    }, []);

    let content = <><Spinner></Spinner></>
    let license = <i>No Licsense</i>
    if (!loading) {
        if (repoData.license !== undefined) {
            license = <>{repoData.license.spdx_id}</>
        }
        content = (
            <>
            <a href={repoData.html_url} target="_blank" rel="noreferrer" id="repo-icon-link">
                <Stack direction="horizontal" gap={2}>
                    <Card.Img
                        src="icon/book-solid.svg"
                        id="repo-icon"
                        className="vlb-icon"
                    />
                    <Card.Title>{repoData.name}</Card.Title>
                </Stack>
            </a>
            <Card.Text>{repoData.description}</Card.Text>
            <Stack direction="horizontal" gap={2}>
                <Card.Img
                    src="icon/scale-solid.svg"
                    id="repo-icon"
                    className="vlb-icon"
                />
                <Card.Text>{license}</Card.Text>
            </Stack>
            </>
        );
    }

    return (
        <Card className="ms-auto">
            <Card.Body>{content}</Card.Body>
        </Card>
    );
}

async function doFetchReadme(name: string): Promise<Readme> {
    let data;
    try {
        const res = await fetch(`/github/${name}/readme`);
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
