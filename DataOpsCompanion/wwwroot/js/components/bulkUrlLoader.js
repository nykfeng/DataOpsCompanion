import utilities from "../utilities.js";

const goButton = document.querySelector("button#go-to-url");
const inputField = document.querySelector("textarea#url-box");

goButton.addEventListener("click", (e) => {
    e.preventDefault();
    const input = inputField.value;

    let inputArray = input.split(/\s+/);
    inputArray = inputArray.map(trimNewlineCharacter).map(trimComma);
    inputArray = removeDuplicates(inputArray);

    inputArray.forEach((input) => {
        if (utilities.isEmptyString(input)) return;
        if (isValidURL(input)) {
            window.open(addProtocolIfNecessary(input), "_blank");
        } else if (isValidPageId(input)) {
            window.open(troiRadarUrlBuilder(input), "_blank");
        }
    });
});

function isValidURL(url) {
    // Regular expression to match a URL pattern
    const urlRegex =
        /^((https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w.-]*)*\/?)|(www\.([\da-z.-]+)\.([a-z.]{2,6})([\/\w.-]*)*\/?)$/i;

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
    return num > 0 && num <= 1000000;
}

function isValidPageId(str) {
    if (isConvertibleToInt(str)) {
        return isPageIdInRange(parseInt(str));
    } else return false;
}

function troiRadarUrlBuilder(pageId) {
    const troiRadarViewInstancePageUrl = `https://troiradar.mrinternal.com/DigitalManagement/ViewInstance?urlSearchString=${pageId}&isProd=true`;
    return troiRadarViewInstancePageUrl;
}

function trimNewlineCharacter(str) {
    if (str.endsWith("\n")) {
        return str.slice(0, -1);
    } else return str;
}

function trimComma(str) {
    if (str.endsWith(",")) {
        return str.slice(0, -1);
    } else return str;
}

function removeDuplicates(array) {
    return [...new Set(array)];
}