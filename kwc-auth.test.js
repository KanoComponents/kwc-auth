/* globals suite, test, fixture, assert */
import './kwc-auth.js';
import { AuthTestUtil } from './test/util.js';

const basic = fixture`
    <kwc-auth></kwc-auth>
`;
const signup = fixture`
    <kwc-auth view="signup"></kwc-auth>
`;
const parents = fixture`
    <kwc-auth view="signup-parents"></kwc-auth>
`;
const done = fixture`
    <kwc-auth view="done"></kwc-auth>
`;
const forgot = fixture`
    <kwc-auth view="username-reminder"></kwc-auth>
`;
const reset = fixture`
    <kwc-auth view="password-reset"></kwc-auth>
`;

const validUsername = 'Test';
const validPassword = 'Testtest';
const validFirstName = 'JackTest';
const validEmail = 'test@kano.me';

const invalidUsername = 'test@kano.me';
const invalidPassword = 'Test test';
const invalidPasswordShort = 'short';
const invalidEmail = 'te st@kano.me';

suite('kwc-auth', () => {
    test('instantiating the element works', () => {
        const element = basic();
        assert(element instanceof customElements.get('kwc-auth'));
    });
    test('login event', (cb) => {
        const element = basic();
        const testUtil = new AuthTestUtil(element);

        testUtil.type(testUtil.login.username, validUsername);
        testUtil.type(testUtil.login.password, validPassword);

        element.addEventListener('login', (e) => {
            assert.equal(e.detail.username, validUsername);
            assert.equal(e.detail.password, validPassword);
            cb();
        });

        testUtil.login.form.dispatchEvent(new CustomEvent('submit'));
    });
    test('invalid login event, empty username', (cb) => {
        const element = basic();
        const testUtil = new AuthTestUtil(element);

        testUtil.type(testUtil.login.username, '');
        testUtil.type(testUtil.login.password, validPassword);

        testUtil.login.form.dispatchEvent(new CustomEvent('submit'));

        const errors = element.get('errors');
        assert.equal(errors.username, 'Username cannot be empty.');
        cb();
    });
    test('invalid login event, empty password', (cb) => {
        const element = basic();
        const testUtil = new AuthTestUtil(element);

        testUtil.type(testUtil.login.username, validUsername);
        testUtil.type(testUtil.login.password, '');

        testUtil.login.form.dispatchEvent(new CustomEvent('submit'));

        const errors = element.get('errors');
        assert.equal(errors.password, 'Password cannot be empty.');
        cb();
    });
    test('signup-info event', (cb) => {
        const element = signup();
        const testUtil = new AuthTestUtil(element);

        testUtil.type(testUtil.signup.username, validUsername);
        testUtil.type(testUtil.signup.password, validPassword);

        element.addEventListener('submit-signup-info', (e) => {
            assert.equal(e.detail.username, validUsername);
            assert.equal(e.detail.password, validPassword);
            cb();
        });

        testUtil.signup.form.dispatchEvent(new CustomEvent('submit'));
    });
    test('invalid signup-info event, email as username', (cb) => {
        const element = signup();
        const testUtil = new AuthTestUtil(element);

        testUtil.type(testUtil.signup.username, invalidUsername);
        testUtil.type(testUtil.signup.password, validPassword);

        testUtil.signup.form.dispatchEvent(new CustomEvent('submit'));

        const errors = element.get('errors');
        assert.equal(errors.username, 'Only letters, numbers, dashes, underscores and dots are allowed.');
        cb();
    });
    test('invalid signup-info event, password too short', (cb) => {
        const element = signup();
        const testUtil = new AuthTestUtil(element);

        testUtil.type(testUtil.signup.username, validUsername);
        testUtil.type(testUtil.signup.password, invalidPasswordShort);

        testUtil.signup.form.dispatchEvent(new CustomEvent('submit'));

        const errors = element.get('errors');
        assert.equal(errors.password, 'Password must be at least 6 characters long.');
        cb();
    });
    test('invalid signup-info event, password cannot contain spaces', (cb) => {
        const element = signup();
        const testUtil = new AuthTestUtil(element);

        testUtil.type(testUtil.signup.username, validUsername);
        testUtil.type(testUtil.signup.password, invalidPassword);

        testUtil.signup.form.dispatchEvent(new CustomEvent('submit'));

        const errors = element.get('errors');
        assert.equal(errors.password, 'Password cannot contain spaces.');
        cb();
    });
    test('invalid signup-info event, password cannot be empty', (cb) => {
        const element = signup();
        const testUtil = new AuthTestUtil(element);

        testUtil.type(testUtil.signup.username, validUsername);
        testUtil.type(testUtil.signup.password, '');

        testUtil.signup.form.dispatchEvent(new CustomEvent('submit'));

        const errors = element.get('errors');
        assert.equal(errors.password, 'Password cannot be empty.');
        cb();
    });
    test('signup-email event', (cb) => {
        const element = parents();
        const testUtil = new AuthTestUtil(element);

        testUtil.type(testUtil.parents.firstName, validFirstName);
        testUtil.type(testUtil.parents.email, validEmail);
        testUtil.check(testUtil.parents.conditions, true);

        element.addEventListener('submit-signup-email', (e) => {
            assert.equal(e.detail.firstName, validFirstName);
            assert.equal(e.detail.email, validEmail);
            assert.equal(e.detail.newsletter, false);
            cb();
        });

        testUtil.parents.form.dispatchEvent(new CustomEvent('submit'));
    });
    test('invalid signup-email event, empty first name', (cb) => {
        const element = parents();
        const testUtil = new AuthTestUtil(element);

        testUtil.type(testUtil.parents.firstName, '');
        testUtil.type(testUtil.parents.email, validEmail);
        testUtil.check(testUtil.parents.conditions, true);

        testUtil.parents.form.dispatchEvent(new CustomEvent('submit'));

        const errors = element.get('errors');
        assert.equal(errors.firstName, 'First name is required.');
        cb();
    });
    test('invalid signup-email event, empty email', (cb) => {
        const element = parents();
        const testUtil = new AuthTestUtil(element);

        testUtil.type(testUtil.parents.firstName, validFirstName);
        testUtil.type(testUtil.parents.email, '');
        testUtil.check(testUtil.parents.conditions, true);

        testUtil.parents.form.dispatchEvent(new CustomEvent('submit'));

        const errors = element.get('errors');
        assert.equal(errors.email, 'Please enter a valid email address.');
        cb();
    });
    test('invalid signup-email event, invalid email', (cb) => {
        const element = parents();
        const testUtil = new AuthTestUtil(element);

        testUtil.type(testUtil.parents.firstName, validFirstName);
        testUtil.type(testUtil.parents.email, invalidEmail);
        testUtil.check(testUtil.parents.conditions, true);

        testUtil.parents.form.dispatchEvent(new CustomEvent('submit'));

        const errors = element.get('errors');
        assert.equal(errors.email, 'Please enter a valid email address.');
        cb();
    });
    test('invalid signup-email event, terms and conditions not ticked', (cb) => {
        const element = parents();
        const testUtil = new AuthTestUtil(element);

        testUtil.type(testUtil.parents.firstName, validFirstName);
        testUtil.type(testUtil.parents.email, validEmail);
        testUtil.check(testUtil.parents.conditions, false);

        testUtil.parents.form.dispatchEvent(new CustomEvent('submit'));

        const errors = element.get('errors');
        assert.equal(errors.terms, 'Please agree to the terms and conditions');
        cb();
    });
    test('done event', (cb) => {
        const element = done();
        const testUtil = new AuthTestUtil(element);

        element.addEventListener('done', () => {
            cb();
        });

        testUtil.done.form.dispatchEvent(new CustomEvent('submit'));
    });
    test('forgot-username event', (cb) => {
        const element = forgot();
        const testUtil = new AuthTestUtil(element);

        testUtil.type(testUtil.forgot.email, validEmail);

        element.addEventListener('forgot-username', (e) => {
            assert.equal(e.detail, validEmail);
            cb();
        });

        testUtil.forgot.form.dispatchEvent(new CustomEvent('submit'));
    });
    test('invalid forgot-username event, email must not be empty', (cb) => {
        const element = forgot();
        const testUtil = new AuthTestUtil(element);

        testUtil.type(testUtil.forgot.email, '');

        testUtil.forgot.form.dispatchEvent(new CustomEvent('submit'));

        const errors = element.get('errors');
        assert.equal(errors.email, 'Please enter a valid email address.');
        cb();
    });
    test('invalid forgot-username event, email must be valid email', (cb) => {
        const element = forgot();
        const testUtil = new AuthTestUtil(element);

        testUtil.type(testUtil.forgot.email, invalidEmail);

        testUtil.forgot.form.dispatchEvent(new CustomEvent('submit'));

        const errors = element.get('errors');
        assert.equal(errors.email, 'Please enter a valid email address.');
        cb();
    });
    test('forgot-password event', (cb) => {
        const element = reset();
        const testUtil = new AuthTestUtil(element);

        testUtil.type(testUtil.reset.username, validUsername);

        element.addEventListener('forgot-password', (e) => {
            assert.equal(e.detail, validUsername);
            cb();
        });

        testUtil.reset.form.dispatchEvent(new CustomEvent('submit'));
    });
    test('invalid forgot-password event, username must not be empty', (cb) => {
        const element = reset();
        const testUtil = new AuthTestUtil(element);

        testUtil.type(testUtil.reset.username, '');

        testUtil.reset.form.dispatchEvent(new CustomEvent('submit'));

        const errors = element.get('errors');
        assert.equal(errors.username, 'Username is required.');
        cb();
    });
    test('invalid forgot-password event, username must at least 3 characters long', (cb) => {
        const element = reset();
        const testUtil = new AuthTestUtil(element);

        testUtil.type(testUtil.reset.username, 'ha');

        testUtil.reset.form.dispatchEvent(new CustomEvent('submit'));

        const errors = element.get('errors');
        assert.equal(errors.username, 'Must be at least 3 characters long.');
        cb();
    });
    test('invalid forgot-password event, username must not be contain special characters', (cb) => {
        const element = reset();
        const testUtil = new AuthTestUtil(element);

        testUtil.type(testUtil.reset.username, invalidUsername);

        testUtil.reset.form.dispatchEvent(new CustomEvent('submit'));

        const errors = element.get('errors');
        assert.equal(errors.username, 'Only letters, numbers, dashes, underscores and dots are allowed.');
        cb();
    });
});
