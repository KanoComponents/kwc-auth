/* globals suite, test, assert */
import { validateUsername, validateEmail, validatePassword } from './validation.js';

suite('validation', () => {
    
    const badEmail01 = 'not@anemail';
    const badEmail02 = 'not.anemail';
    const badEmail03 = 'notanemail';
    const goodEmail = 'test@email.com';
    // const badUsername01 = 'us';
    const badUsername02 = '';
    const badUsername03 = 'us3]]//,'
    const badUsername04 = 'us3r@na.com';
    const goodUsername = 'us3rnam7';
    const badPassword1 = 'pa';
    const badPassword2 = 'pa sswo rd';
    const badPassword3 = '';
    const goodPassword = 'pas3wor6';

    // Email
    test('email to error if in wrong format, no .xxx present', () => {
        const result = validateEmail(badEmail01);
        assert.equal(result, 'Please enter a valid email address.')
    });

    test('email to error if in wrong format, no @xxx present', () => {
        const result = validateEmail(badEmail02);
        assert.equal(result, 'Please enter a valid email address.')
    });

    test('email to error if in wrong format, no @xxx or .xxx present', () => {
        const result = validateEmail(badEmail03);
        assert.equal(result, 'Please enter a valid email address.')

    });
    test('email to succeed if in correct format', () => {
        const result = validateEmail(goodEmail);
        assert.equal(result, null)
    });

    // Username

    test('username to error if undefined or empty', () => {
        const result = validateUsername(badUsername02);
        assert.equal(result, 'Username is required.')
    });
    
    test('username to error if restricted characters are present', () => {
        const result = validateUsername(badUsername03);
        assert.equal(result, 'Username must only contain letters, numbers, dashes, underscores or dots.')
    });

    test('username to error if is email address', () => {
        const result = validateUsername(badUsername04);
        assert.equal(result, 'Username must only contain letters, numbers, dashes, underscores or dots.')
    });

    test('username to succeed if is valid', () => {
        const result = validateUsername(goodUsername);
        assert.equal(result, null)
    });

    //Password
    test('password to error if under 8 characters', () => {
        const result = validatePassword(badPassword1);
        assert.equal(result, 'Password must be at least 8 characters long.')
    })

    test('password to error if contains spaces', () => {
        const result = validatePassword(badPassword2);
        assert.equal(result, 'Password cannot contain spaces.')
    })

    test('password to error if empty or undefined', () => {
        const result = validatePassword(badPassword3);
        assert.equal(result, 'Password cannot be empty.')
    })

    test('password to succeed if valid', () => {
        const result = validatePassword(goodPassword);
        assert.equal(result, null)
    })

});
