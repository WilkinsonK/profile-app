export async function doFetchAppName(): Promise<string> {
    let data = "";
    try {
        const res = await fetch("/version");
        if (!res.ok) {
            throw new Error(`HTTP error: Status ${res.status}`);
        }
        data = await res.text();
    } catch (err) {
        console.log(`error occured trying to fetch version data: ${err}`);
    } finally {
        return data;
    }
}
