const SNIPPET_URL = "./snippets.json";

var context_menu_created = false;

async function fetchSnippets() {
    let res = await fetch(SNIPPET_URL);
    let snippets = await res.json();
    return snippets;
}

async function registerEventlisteners(math_snippets) {
    chrome.contextMenus.onClicked.addListener(async (info, tab) => {
        let snippet = math_snippets
            .find((category) => category.id === info.parentMenuItemId)
            .items.find((item) => item.id === info.menuItemId.split("|")[1]);

        if (!snippet) return;

        console.log(snippet);

        chrome.tabs.sendMessage(tab.id, {
            type: "insert_snippet",
            snippet: snippet,
        });
    });
}

async function createContextMenu() {
    let snippets = await fetchSnippets();

    console.log(snippets);

    chrome.contextMenus.removeAll();

    chrome.contextMenus.create({
        title: "Math-Snippet hinzufügen",
        id: "math_snippet",
        contexts: ["editable"],
    });

    snippets.forEach((category) => {
        // Create category
        chrome.contextMenus.create({
            title: category.title,
            parentId: "math_snippet",
            id: category.id,
            contexts: ["editable"],
        });

        // Create items
        category.items.forEach((item) => {
            chrome.contextMenus.create({
                title: item.title,
                parentId: category.id,
                id: `${category.id}|${item.id}`,
                contexts: ["editable"],
            });
        });
    });

    await registerEventlisteners(snippets);
}

function main() {
    // add eventlistener for messages from content.js
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.type === "content_script_loaded") {
            sendResponse({ type: "background_script_loaded" });

            if (!context_menu_created) {
                context_menu_created = true;
                createContextMenu();
            }
        }
    });
}

main();
