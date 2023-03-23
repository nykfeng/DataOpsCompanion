const goButton = document.querySelector("button#go-to-url");
const inputField = document.querySelector("textarea#url-box");

goButton.addEventListener("click", (e) => {
    e.preventDefault();
    const input = inputField.value;
    console.log("input  is ");
    console.log(input);

    let inputArray = input.split(" ");
    if (inputArray.length === 1) {
        inputArray = inputArray[0].trim().split("\n");
    }

    console.log("input array is ");
    console.log(inputArray);

    inputArray.forEach((input) => {
        if (isEmptyString(input)) return;
        if (isValidURL(input)) {
            window.open(addProtocolIfNecessary(input), "_blank");
        } else if (isValidPageId(input)) {
            window.open(troiRadarUrlBuilder(input), "_blank");
        }
    });
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
    const troiRadarViewInstancePageUrl = `https://troiradar.mrinternal.com/DigitalManagement/ViewInstance?urlSearchString=${pageId}&isProd=true`;
    return troiRadarViewInstancePageUrl;
}
