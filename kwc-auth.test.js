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
});
