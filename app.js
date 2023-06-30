const SNIPPET_URL =
    "https://raw.githubusercontent.com/sleepsleeprepeat/chrome-math/master/snippets.json";

async function createContextMenu(snippets) {
    let snippets = await (await fetch(SNIPPET_URL)).json();

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
            });
        });
    });

    // await registerEventlisteners(snippets);
}

createContextMenu();
