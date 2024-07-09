/**
 * Create a downloader request for a specified
 * file path.
 * @param fileName 
 * @returns 
 */
export function createDownloadOnClick(srcName: string, dstName?: string) {
    return () => {
        fetch(`/download/${srcName}`)
        .then(res => res.blob())
        .then(bob => {
            const fURL = window.URL.createObjectURL(bob);
            let link = document.createElement("a");
            link.href = fURL;
            link.download = dstName !== undefined ? dstName : srcName;
            link.click();
        })
    }
}
