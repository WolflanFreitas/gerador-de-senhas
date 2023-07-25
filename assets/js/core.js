let passwordLength = 16;
const passwordElement = document.querySelector("#password");
const buttonCopy = document.querySelector("#copy");
const passwordLengthElement = document.querySelector("#password-length");

const generatePassword = () => {
    const chars =
        "abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ123456789?!@&*()[]";

    let password = "";

    for (let i = 0; i < passwordLength; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }

    passwordElement.value = password;
};

const copy = () => {
    navigator.clipboard.writeText(passwordElement.value);
};

buttonCopy.addEventListener("click", copy);

passwordLengthElement.addEventListener("input", () => {
    passwordLength = passwordLengthElement.value;
    generatePassword();
});

generatePassword();
