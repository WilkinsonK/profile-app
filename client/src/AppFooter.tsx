import { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import { doFetchAppName } from "./common/details";

export default function AppFooter() {
    const [appName, setAppName] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const inner = async () => {
            const fetched = await doFetchAppName();
            setAppName(fetched);
            setLoading(false);
        };
        inner();
    }, []);

    let nameRender = <></>
    if (!loading) {
        nameRender = <i>{appName}</i>
    }
    return (
        <Stack direction="horizontal" gap={1}>
            <div className="p-2"></div>
            <div className="p-2 ms-auto"></div>
            <div className="p-2">
                {nameRender}
            </div>
        </Stack>
    )
}
