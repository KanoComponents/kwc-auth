export function validateUsername(username : string){
    let errorUsername = null

    if (!username || username.length === 0) { 
        errorUsername = 'Username is required.';
    } else if (username.length < 3) {	
        errorUsername = 'Username must be at least 3 characters long.';
    } else if (username.length > 25) {	
        errorUsername = 'Username must be at most 25 characters long.';
    } else if (!/^[a-zA-Z0-9_\-.]+$/.test(username)) {
        errorUsername = 'Username must only contain letters, numbers, dashes, underscores or dots.';
    }
    return errorUsername
}

export function validatePassword(password : string){
    let errorPassword = null

    if (!password || password.length === 0) {
        errorPassword = 'Password cannot be empty.';
    } else if (password.includes(' ')) {
        errorPassword = 'Password cannot contain spaces.';
    } else if (password.length < 8) {
        errorPassword = 'Password must be at least 8 characters long.';
    }
   
    return errorPassword
}

export function validateEmail(email : string){
    let errorEmail = null
    const emailRegex = /^[_a-z0-9-\+]+(\.[_a-z0-9-\+]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]+)$/i;

    if (!emailRegex.test(email)) {
        errorEmail = 'Please enter a valid email address.';
    }
   
    return errorEmail
}
