/* globals suite, test, assert */
import { Validation } from './validation.js';
import { IError } from '../error.js';

suite('validation', () => {

    const errors: IError = {
        username: '',
        password: '',
        terms: '',
        email: '',
    }

    const validation = new Validation(errors);

    const badEmail01 = 'not@anemail';
    const badEmail02 = 'not.anemail';
    const badEmail03 = 'notanemail';
    const goodEmail = 'test@email.com';
    const badUsername01 = 'us';
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
        validation.validateEmail(badEmail01);
        assert.equal(validation.errors.email, 'Please enter a valid email address.')
    });

    test('email to error if in wrong format, no @xxx present', () => {
        validation.validateEmail(badEmail02);
        assert.equal(validation.errors.email, 'Please enter a valid email address.')
    });

    test('email to error if in wrong format, no @xxx or .xxx present', () => {
        validation.validateEmail(badEmail03);
        assert.equal(validation.errors.email, 'Please enter a valid email address.')

    });
    test('email to succeed if in correct format', () => {
        validation.validateEmail(goodEmail);
        assert.equal(validation.errors.email, '')
    });

    // Username
    test('username to error if under 3 characters', () => {
        validation.validateUsername(badUsername01);
        assert.equal(validation.errors.username, 'Must be at least 3 characters long.')
    });

    test('username to error if undefined or empty', () => {
        validation.validateUsername(badUsername02);
        assert.equal(validation.errors.username, 'Username is required.')
    });
    
    test('username to error if restricted characters are present', () => {
        validation.validateUsername(badUsername03);
        assert.equal(validation.errors.username, 'Only letters, numbers, dashes, underscores and dots are allowed.')
    });

    test('username to error if is email address', () => {
        validation.validateUsername(badUsername04);
        assert.equal(validation.errors.username, 'Only letters, numbers, dashes, underscores and dots are allowed.')
    });

    test('username to succeed if is valid', () => {
        validation.validateUsername(goodUsername);
        assert.equal(validation.errors.username, '')
    });

    // Terms
    test('terms to error if unselected', () => {
       validation.validateTerms(false);
       assert.equal(validation.errors.terms, 'Please agree to the terms and conditions')
    });

    test('terms to succeed if selected', () => {
        validation.validateTerms(true);
        assert.equal(validation.errors.terms, '')
    });

    //Password
    test('password to error if under 6 characters', () => {
        validation.validatePassword(badPassword1);
        assert.equal(validation.errors.password, 'Password must be at least 6 characters long.')
    })

    test('password to error if contains spaces', () => {
        validation.validatePassword(badPassword2);
        assert.equal(validation.errors.password, 'Password cannot contain spaces.')
    })

    test('password to error if empty or undefined', () => {
        validation.validatePassword(badPassword3);
        assert.equal(validation.errors.password, 'Password cannot be empty.')
    })

    test('password to succeed if valid', () => {
        validation.validatePassword(goodPassword);
        assert.equal(validation.errors.password, '')
    })

});
