import utilities from "../utilities.js";

const goButton = document.querySelector("button#go-to-url");
const inputField = document.querySelector("textarea#url-box");

goButton.addEventListener("click", (e) => {
    e.preventDefault();
    const input = inputField.value;

    let inputArray = input.split(" ");
    if (inputArray.length === 1) {
        inputArray = inputArray[0].trim().split("\n");
    }

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
    return num >= 0 && num <= 1000000;
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
