let passwordLength = 16;
const passwordMaxLength = 64;

const passwordElement = document.querySelector("#password");
const buttonCopyElement = document.querySelector("#copy");
const buttonCopy2Element = document.querySelector("#copy-2");
const passwordLengthElement = document.querySelector("#password-length");

const upperCaseCheckElement = document.querySelector("#uppercase-check");
const numberCheckElement = document.querySelector("#number-check");
const specialCheckElement = document.querySelector("#special-check");

const passwordLengthTextElement = document.querySelector(
    "#password-length-text"
);

const securityIndicatorBarElement = document.querySelector(
    "#security-indicator-bar"
);

const generatePassword = () => {
    let chars = "abcdefghjkmnpqrstuvwxyz";
    const upperCaseChars = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    const numberChars = "123456789";
    const specialChars = "!@&*()[]";

    if (upperCaseCheckElement.checked) chars += upperCaseChars;
    if (numberCheckElement.checked) chars += numberChars;
    if (specialCheckElement.checked) chars += specialChars;

    let password = "";

    for (let i = 0; i < passwordLength; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }

    passwordElement.value = password;
    calculateQuality();
    calculateFontSize();
};

const calculateQuality = () => {
    const percent = Math.round(
        (passwordLength / passwordMaxLength) * 35 +
            (upperCaseCheckElement.checked ? 20 : 0) +
            (numberCheckElement.checked ? 20 : 0) +
            (specialCheckElement.checked ? 25 : 0)
    );
    securityIndicatorBarElement.style.width = `${percent}%`;

    if (percent > 69) {
        securityIndicatorBarElement.classList.remove("critical");
        securityIndicatorBarElement.classList.remove("warning");
        securityIndicatorBarElement.classList.add("safe");
    } else if (percent > 50) {
        securityIndicatorBarElement.classList.remove("critical");
        securityIndicatorBarElement.classList.add("warning");
        securityIndicatorBarElement.classList.remove("safe");
    } else {
        securityIndicatorBarElement.classList.add("critical");
        securityIndicatorBarElement.classList.remove("warning");
        securityIndicatorBarElement.classList.remove("safe");
    }

    if (percent == 100) {
        securityIndicatorBarElement.classList.add("completed");
    } else {
        securityIndicatorBarElement.classList.remove("completed");
    }
};

const calculateFontSize = () => {
    if (passwordLength > 45) {
        passwordElement.classList.remove("font-sm");
        passwordElement.classList.remove("font-xs");
        passwordElement.classList.add("font-xxs");
    } else if (passwordLength > 32) {
        passwordElement.classList.remove("font-sm");
        passwordElement.classList.add("font-xs");
        passwordElement.classList.remove("font-xxs");
    } else if (passwordLength > 22) {
        passwordElement.classList.add("font-sm");
        passwordElement.classList.remove("font-xs");
        passwordElement.classList.remove("font-xxs");
    } else {
        passwordElement.classList.remove("font-sm");
        passwordElement.classList.remove("font-xs");
        passwordElement.classList.remove("font-xxs");
    }
};

const copy = () => {
    navigator.clipboard.writeText(passwordElement.value);
};

buttonCopyElement.addEventListener("click", copy);
buttonCopy2Element.addEventListener("click", copy);

passwordLengthElement.addEventListener("input", () => {
    passwordLength = passwordLengthElement.value;
    passwordLengthTextElement.innerText = passwordLengthElement.value;
    generatePassword();
});

upperCaseCheckElement.addEventListener("click", generatePassword);

numberCheckElement.addEventListener("click", generatePassword);

specialCheckElement.addEventListener("click", generatePassword);

generatePassword();
