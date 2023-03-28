function isEmptyString(str) {
    return str.trim().length === 0;
}

function clearOutputContent(element) {
    element.remove();
}

export default {
    isEmptyString,
    clearOutputContent,
};
