const goButton = document.querySelector("button#go-to-url");
const inputField = document.querySelector("textarea#url-box");

const input = inputField.textContent;
const inputArray = input.split(" ");

inputArray.forEach((input) => {
    if (isEmptyString(input)) return;
    if (isValidURL(input)) {
        window.open(addProtocolIfNecessary(input), "_blank");
    } else if (isValidPageId(input)) {
        window.open(troiRadarUrlBuilder(input), "_blank");
    }
});

function isEmptyString(str) {
    return str.trim().length === 0;
}

function isValidURL(url) {
    // Regular expression to match a URL pattern
    const urlRegex =
        /^(?:(?:https?|ftp):\/\/)?(?:[\w-]+\.)+[a-z]{2,}(?:\/[\w_.-]*)*(?:\?(?:[\w_-]+=[\w_-]+&?)*)?(?:#[\w_-]*)?$/i;

    // Test the URL string against the regular expression
    return urlRegex.test(url);
}

function addProtocolIfNecessary(url) {
    if (url.toLowerCase().startsWith("http")) {
        return url;
    } else return "https://" + url;
}

function isConvertibleToInt(str) {
    return !isNaN(parseInt(str));
}

function isPageIdInRange(num) {
    return num >= 0 && num <= 1000000;
}

function isValidPageId(str) {
    if (isConvertibleToInt(str)) {
        return isPageIdInRange(parseInt(str));
    } else return false;
}

function troiRadarUrlBuilder(pageId) {
    const troiRadarViewInstancePageUrl = `https://${pageId}=true`;
    return troiRadarViewInstancePageUrl;
}
