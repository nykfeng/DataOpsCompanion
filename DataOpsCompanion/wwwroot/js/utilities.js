function isEmptyString(str) {
    return str.trim().length === 0;
}

function clearOutputContent(element) {
    element.remove();
}

function copyTextToClipboard(text) {
    navigator.clipboard
        .writeText(text)
        .then(function () {
            console.log("Text copied to clipboard");
        })
        .catch(function (error) {
            console.error("Error copying text to clipboard:", error);
        });
}

export default {
    isEmptyString,
    clearOutputContent,
    copyTextToClipboard
};
