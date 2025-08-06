function initialize() {
    maxDayOfBirth();

    const form = document.getElementById("register-form");
    const emailInput = document.getElementById("email");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");
    const birthdateInput = document.getElementById("birthdate");
    const phoneInput = document.getElementById("phone");
    const genderInputs = document.getElementsByName("gender");

    emailInput.oninvalid = invalidEmail;
    emailInput.oninput = invalidEmail;

    usernameInput.oninvalid = invalidUsername;
    usernameInput.oninput = invalidUsername;

    passwordInput.oninvalid = invalidPassword;
    passwordInput.oninput = invalidPassword;

    confirmPasswordInput.oninvalid = invalidConfirmPassword;
    confirmPasswordInput.oninput = invalidConfirmPassword;

    birthdateInput.oninvalid = invalidBirthdate;
    birthdateInput.oninput = invalidBirthdate;

    phoneInput.oninvalid = invalidPhone;
    phoneInput.oninput = invalidPhone;

    for (const genderInput of genderInputs) {
        genderInput.oninvalid = invalidGender;
        genderInput.oninput = invalidGender;
    }

    form.addEventListener("submit", function (event) {
        if (!form.checkValidity()) {
            event.preventDefault();
            form.reportValidity();
            return;
        }


        event.preventDefault();
        alert("Registration successful! 🎉");
        form.reset();
    });
}

function invalidEmail() {
    this.setCustomValidity("");
    if (this.validity.valueMissing) {
        this.setCustomValidity("Email is required");
    } else if (this.validity.typeMismatch) {
        this.setCustomValidity("Please enter a valid email address");
    }
}

function invalidUsername() {
    this.setCustomValidity("");
    if (this.validity.valueMissing) {
        this.setCustomValidity("Username is required");
    } else if (this.validity.patternMismatch) {
        this.setCustomValidity("Username can only contain letters, numbers and _ (3-15 chars)");
    }
}

function checkPassword(password) {
    if (password.length < 8)
        return false;

    var lowercase = false, uppercase = false, symbol = false, number = false;

    for (var i = 0; i < password.length; i++) {
        var char = password.charAt(i);
        if (char >= "a" && char <= "z")
            lowercase = true;
        else if (char >= "A" && char <= "Z")
            uppercase = true;
        else if (char >= "0" && char <= "9")
            number = true;
        else
            symbol = true;
    }
    return lowercase && uppercase && number && symbol;
}

function invalidPassword() {
    this.setCustomValidity("");
    if (this.validity.valueMissing) {
        this.setCustomValidity("Password is required");
        return;
    } else if (!checkPassword(this.value)) {
        this.setCustomValidity("At least one lowercase and uppercase letter, one number and one special symbol (8+ chars)");
        return;
    }
    var password = this.value;
    var confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
        this.setCustomValidity("Passwords do not match");
    }
}

function invalidConfirmPassword() {
    this.setCustomValidity("");
    if (this.validity.valueMissing) {
        this.setCustomValidity("Password is required");
        return;
    }

    var password = document.getElementById("password").value;
    var confirmPassword = this.value;

    if (password !== confirmPassword) {
        this.setCustomValidity("Passwords do not match");
    }
}

function invalidBirthdate() {
    this.setCustomValidity("");
    if (this.validity.valueMissing) {
        this.setCustomValidity("Day of birth is required");
        return;
    }

    var input = new Date(this.value);
    var today = new Date();
    var before = new Date();
    before.setFullYear(today.getFullYear() - 18);

    if (input > before)
        this.setCustomValidity("You must be at least 18 years old!");
}

function invalidPhone() {
    this.setCustomValidity("");
    if (this.validity.valueMissing) {
        this.setCustomValidity("Phone number is required");
        return;
    }

    const val = this.value.trim();

    if (!val.startsWith("+387") && !val.startsWith("+381")) {
        this.setCustomValidity("Phone number must start with +387 or +381");
        return;
    }

    const rest = val.slice(4);

    if (rest.length < 7 || rest.length > 12) {
        this.setCustomValidity("Phone number must have between 7 and 12 digits after the country code");
        return;
    }

    var check = true;
    for (var i = 0; i < rest.length; i++) {
        if (rest.charAt(i) < "0" || rest.charAt(i) > "9")
            check = false;
    }
    if (!check)
        this.setCustomValidity("Phone number can contain digits only after the country code");
}
function invalidGender() {
    this.setCustomValidity("");
    if (this.validity.valueMissing)
        this.setCustomValidity("Gender is required");
}

function passwordsMatch() {
    return document.getElementById("password").value == document.getElementById("confirm-password").value;
}

function maxDayOfBirth() {
    var today = new Date();

    var day = today.getDate();
    if (day < 10)
        day = "0" + day;

    var month = today.getMonth() + 1;
    if (month < 10)
        month = "0" + month;

    today = today.getFullYear() + "-" + month + "-" + day;
    document.getElementById("birthdate").max = today;
}