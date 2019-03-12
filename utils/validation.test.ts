/* globals suite, test, assert */
import Validation from './validation.js';
import ErrorInterface from '../error.interface'


suite('validation', () => {

    const errors:ErrorInterface = {
        username: '',
        password: '',
        terms: '',
        email: '',
    }
    
    const validation = new Validation(errors);
    
    const badEmail01 = 'not@anemail';
    // const badEmail02 = 'not.anemail';
    // const badEmail03 = 'notanemail';
    // const goodEmail = 'test@email.com';
    // const badUsername01 = 'us';
    // const badUsername02 = 'us3r@na.m7';
    // const goodUsername = 'us3rnam7';

    // Email
    test('email to error if in wrong format, no .xxx present', () => {
        validation.validateEmail(badEmail01);
        assert.equal(validation.errors.email, 'Please enter a valid email address.')
    });
    // test('email to error if in wrong format, no @xxx present', () => {

    // });
    // test('email to error if in wrong format, no @xxx or .xxx present', () => {

    // });
    // test('email to succeed if in correct format', () => {

    // });

    // // Username
    // test('username to error if undefined or empty', () => {

    // });
    // test('username to error if under 3 characters', () => {

    // });
    // test('username to error if restricted characters are present', () => {
    //     // Only letters, numbers, dashes, underscores and dots are allowed

    // });
    // test('username to error if is email address', () => {

    // });
    // test('username to succeed if is valid', () => {

    // });

    // // Terms
    // test('terms to error if unselected', () => {

    // });
    // test('terms to succeed if selected', () => {

    // });
});
