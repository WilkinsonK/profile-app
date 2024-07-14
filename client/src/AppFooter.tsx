import { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import { doFetchAppHost, doFetchAppName } from "./common/details";

export default function AppFooter() {
    const [appName, setAppName] = useState("[build]");
    const [appHost, setAppHost] = useState("[machine]");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const inner = async () => {
            const fetched = await doFetchAppName();
            await Promise.all([
                doFetchAppHost().then(hostname => { setAppHost(hostname)}),
                doFetchAppName().then(version  => { setAppName(version)}),
            ]);
            setLoading(false);
        };
        inner();
    }, []);

    let nameRender = <i>({appHost}; {appName})</i>
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
