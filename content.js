function insertSnippet(snippet) {
    // set snippet.data to clipboard
    navigator.clipboard.writeText(snippet.data).then(function () {
        // insert snippet.data
        document.execCommand("paste");
    });
}

async function main() {
    // send message to background.js
    const response = await chrome.runtime.sendMessage({
        type: "content_script_loaded",
    });

    console.log(response);

    // add eventlistener for messages from background.js
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.type === "insert_snippet") {
            console.log(request.snippet);
            insertSnippet(request.snippet);
        }
    });
}

main();
