/**
 * Create a downloader request for a specified
 * file path.
 * @param fileName 
 * @returns 
 */
export function createDownloadOnClick(fileName: string) {
    return () => {
        fetch(`/download/${fileName}`)
        .then(res => res.blob())
        .then(bob => {
            const fURL = window.URL.createObjectURL(bob);
            let link = document.createElement("a");
            link.href = fURL;
            link.download = fileName;
            link.click();
        })
    }
}
