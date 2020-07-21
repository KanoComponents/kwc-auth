import { _ } from '@kano/i18n/dist/index.js';

export const validateUsername = (username : string) => {
    let errorUsername = null;

    if (!username || username.length === 0) { 
        errorUsername = _('VALIDATION_USERNAME_IS_REQUIRED', 'Username is required.');
    } else if (username.length < 3) {
        errorUsername = _('VALIDATION_USERNAME_MUST_BE_LONG', 'Username must be at least 3 characters long.');
    } else if (username.length > 25) {	
        errorUsername = _('VALIDATION_USERNAME_MUST_NOT_BE_TOO_LONG', 'Username must be at most 25 characters long.');
    } else if (!/^[a-zA-Z0-9_\-.]+$/.test(username)) {
        errorUsername = _('VALIDATION_USERNAME_MUST_CERTAIN_CHARS', 'Username must only contain letters, numbers, dashes, underscores or dots.');
    }
    return errorUsername;
};

export const validateForgotPassword = (username : string) => {
    let errorUsername = null;

    if (!username || username.length === 0) { 
        errorUsername = _('VALIDATION_USERNAME_IS_REQUIRED', 'Username is required.');
    }
    return errorUsername;
};


export const validatePassword = (password : string) => {
    let errorPassword = null;

    if (!password || password.length === 0) {
        errorPassword = _('VALIDATION_PASSWORD_CANNOT_BE_EMPTY', 'Password cannot be empty.');
    } else if (password.includes(' ')) {
        errorPassword = _('VALIDATION_PASSWORD_CANNOT_CONTAIN_SPACES', 'Password cannot contain spaces.');
    } else if (password.length < 8) {
        errorPassword = _('VALIDATION_PASSWORD_MUST_BE_LONG', 'Password must be at least 8 characters long.');
    }
   
    return errorPassword;
};

export const validateEmail = (email : string) => {
    let errorEmail = null;
    const emailRegex = /^[_a-z0-9-\+]+(\.[_a-z0-9-\+]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]+)$/i;

    if (!emailRegex.test(email)) {
        errorEmail = _('VALIDATION_EMAIL', 'Please enter a valid email address.');
    }
   
    return errorEmail;
};

export const validateRegion = (region : string) => {
    let errorRegion = null;
    if (!region) {
        errorRegion = _('VALIDATION_REGION', 'Please select a region.');
    }
   
    return errorRegion;
};
