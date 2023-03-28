import utilities from "../../utilities.js";

const actionPanelEl = document.querySelector("#action-panel");

const cssBtn = actionPanelEl.querySelector("#css-btn");
const inputEl = actionPanelEl.querySelector("#action-variable-input");
const actionPanelContentEl = actionPanelEl.querySelector(
    ".title-sub-container"
);

cssBtn.addEventListener("click", function () {
    let currentValue = inputEl.value;
    if (utilities.isEmptyString(currentValue)) return;

    const cssSelectorStatement = createCssSelectorStatement(currentValue);

    let elementsToBeRemoved = actionPanelEl.querySelectorAll(
        "[id^=action-variable-output]"
    );
    if (elementsToBeRemoved.length > 0) {
        elementsToBeRemoved.forEach((elementToBeRemoved) => {
            utilities.clearOutputContent(elementToBeRemoved);
        });
    }

    actionPanelContentEl.insertAdjacentHTML(
        "beforeend",
        renderCssSelectorStatement(cssSelectorStatement)
    );

    const complexRuleObj = convertToComplexRule(currentValue);

    if (complexRuleObj) {
        actionPanelContentEl.insertAdjacentHTML(
            "beforeend",
            renderComplexRule(complexRuleObj)
        );
    }

    copyBtnsListeners(getAllCopyBtns());
});

function createCssSelectorStatement(cssSelector) {
    return `document.querySelectorAll(\`${cssSelector}\`)`;
}

function convertToComplexRule(cssSelector) {
    const hasSelectorStr = ":has(";
    if (!cssSelector.includes(hasSelectorStr)) return;

    const complexRule = {
        ParentContainerCssSelector: cssSelector.substring(
            0,
            cssSelector.indexOf(hasSelectorStr)
        ),
        IdentifierCssSelector: cssSelector.substring(
            cssSelector.indexOf(hasSelectorStr) + hasSelectorStr.length,
            cssSelector.length - 1
        ),
    };

    return complexRule;
}

function renderCssSelectorStatement(cssSelectorStatement) {
    const html = `
    <div class="mx-2 py-1 bg-white d-flex justify-content-between" id="action-variable-output-div-1">
        <div id="action-variable-output"
        class="bg-secondary text-white px-2 d-flex align-items-center copy-text">
        ${cssSelectorStatement}
        </div>
        <button class="btn btn-success btn-sm copy-btn">Copy</button>
        
    </div>
    `;
    return html;
}

function renderComplexRule(complexRule) {
    const html = `
    <div class="mx-2 py-1 bg-white d-flex flex-column gap-2" id="action-variable-output-div-2">
    <div class="horizontal-line"></div>
    <div class="d-flex justify-content-between gap-1">
        <div class=" d-flex align-items-center justify-content-between gap-2 w-100">
            <div class="output-label">ParentContainerCssSelector</div>
            <div class="bg-secondary text-white px-2 d-flex copy-text">
                ${complexRule["ParentContainerCssSelector"]}
            </div>
        </div>
        <button class="btn btn-success btn-sm copy-btn">Copy</button>
    </div>

    <div class="d-flex justify-content-between gap-1">
        <div class="d-flex align-items-center justify-content-between gap-2 w-100">
            <div class="output-label">IdentifierCssSelector</div>
            <div class="bg-secondary text-white px-2 d-flex copy-text">
            ${complexRule["IdentifierCssSelector"]}
            </div>
        </div>
        <button class="btn btn-success btn-sm copy-btn">Copy</button>
    </div>
    </div>
    `;

    return html;
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

function getAllCopyBtns() {
    const btns = document.querySelectorAll(".copy-btn");
    return btns;
}

function copyBtnsListeners(btns) {
    btns.forEach((btn) => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            const copyBtnParentContainer = this.parentElement;
            const toBeCopiedTextContentEl =
                copyBtnParentContainer.querySelector(".copy-text");
            const textToBeCopied = getTextFromElement(toBeCopiedTextContentEl);
            if (textToBeCopied.length != 0) {
                copyTextToClipboard(textToBeCopied);
                transformBtnToCopied(this);
            }
        });
    });
}

function getTextFromElement(element) {
    if (element.tagName === "INPUT") {
        return element.value.trim();
    } else if (element.tagName === "DIV") {
        return element.textContent.trim();
    } else return "";
}

function transformBtnToCopied(btn) {
    const allCopyBtns = getAllCopyBtns();
    allCopyBtns.forEach((btn) => {
        btn.textContent = "Copy";
        if (btn.classList.contains("fw-bold")) {
            btn.classList.remove("fw-bold");
        }
    });
    btn.textContent = "Copied";
    btn.classList.add("fw-bold");
}

copyBtnsListeners(getAllCopyBtns());
