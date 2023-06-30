const SNIPPET_URL =
    "https://raw.githubusercontent.com/sleepsleeprepeat/chrome-math/master/math_snippets.json";

async function fetchSnippets() {
    let res = await fetch(SNIPPET_URL);
    let snippets = await res.json();
    return snippets;
}

function createContextMenu(snippets) {
    chrome.contextMenus.create({
        title: "Math-Snippet hinzufügen",
        id: "math_snippet",
    });

    snippets.forEach((category) => {
        chrome.contextMenus.create({
            title: category.title,
            parentId: "math_snippet",
            id: category.id,
        });

        category.items.forEach((item) => {
            chrome.contextMenus.create({
                title: item.title,
                parentId: category.id,
                id: item.id,
                onclick: () => {
                    // insert snippet at caret position
                    chrome.tabs.executeScript({
                        code: `document.execCommand("insertText", false, "${item.snippet}");`,
                    });
                },
            });
        });
    });
}
