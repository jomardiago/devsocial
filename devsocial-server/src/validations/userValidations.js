function validateLoginInput({ username, password }) {
    console.log('Validating login input for username:', username);
    const errors = {};

    if (username.trim() === '') {
        errors.username = 'Username is required';
    }

    if (password === '') {
        errors.password = 'Password is required'
    }

    return { errors, valid: Object.keys(errors).length < 1 };
}

function validateRegisterInput({ username, email, password, confirmPassword }) {
    console.log('Validating register input for username:', username);
    const errors = {};

    if (username.trim() === '') {
        errors.username = 'Username is required';
    }

    if (email.trim() === '') {
        errors.email = 'Email is required';
    } else {
        const regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!email.match(regEx)) {
            errors.email = 'Email must be a valid email address'
        }
    }

    if (password.trim() === '') {
        errors.password = 'Password is required';
    } else if (confirmPassword.trim !== '' && confirmPassword !== password) {
        errors.password = 'Passwords must match';
    }

    return { errors, valid: Object.keys(errors).length < 1 };
}

module.exports = {
    validateLoginInput,
    validateRegisterInput
}
