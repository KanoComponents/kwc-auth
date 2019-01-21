import './kwc-auth.js';
import { AuthTestUtil } from './test/util.js';

const basic = fixture`
    <kwc-auth></kwc-auth>
`;
const signup = fixture`
    <kwc-auth view="signup"></kwc-auth>
`;

const validUsername = 'Test';
const validPassword = 'Testtest';

suite('kwc-auth', () => {
    test('instantiating the element works', () => {
        const element = basic();
        assert.equal(element.is, 'kwc-auth');
    });
    test('login event', (done) => {
        const element = basic();
        const testUtil = new AuthTestUtil(element);

        testUtil.type(testUtil.login.username, validUsername);
        testUtil.type(testUtil.login.password, validPassword);

        element.addEventListener('login', (e) => {
            assert.equal(e.detail.username, validUsername);
            assert.equal(e.detail.password, validPassword);
            done();
        });

        testUtil.login.form.dispatchEvent(new CustomEvent('submit'));
    });
    test('signup-info event', () => {
        const element = signup();
        const testUtil = new AuthTestUtil(element);

        testUtil.type(testUtil.signup.username, validUsername);
        testUtil.type(testUtil.signup.password, validPassword);

        element.addEventListener('submit-signup-info', (e) => {
            assert.equal(e.detail.username, validUsername);
            assert.equal(e.detail.password, validPassword);
            done();
        });

        testUtil.signup.form.dispatchEvent(new CustomEvent('submit'));
    });
});
/** TODO:
 * - Open should open modal
 * - Close should close modal
 * - Cancel should close and fire event
 * - Skip should close and fire event
 * - Reset resets internal state
 * - If isForceSignup is true the modal can't be closed
 * - Error messages
 * - Changing username, email, firstName and password trigger events
 * - Submitting forms trigger events
 * - If terms is not true, can't click continue
 * - If processing is true, show spinner
 * - If modal is opened, `opened` should be true
 * - 'showXXX' should display XXX page
 */
