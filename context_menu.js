// Create context menu entry
chrome.contextMenus.create({
    title: "Math-Snippet hinzufügen",
    id: "math_snippet",
});

// fetch math_snippet.json from https://github.com/sleepsleeprepat/math-snippets/blob/main/math_snippets.json

snippets = await fetch(
    "https://raw.githubusercontent.com/sleepsleeprepat/math-snippets/main/math_snippets.json"
);
