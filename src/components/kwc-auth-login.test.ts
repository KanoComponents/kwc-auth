/* globals suite, test, assert, teardown, setup */
import { Login } from './kwc-auth-login';
import { AuthTestUtil } from '../test/util.js';
import { fixture, assert } from '@kano/web-tester/helpers.js';

const login = fixture<Login>`
    <kwc-auth-login></kwc-auth-login>
`;

const testUsername = 'usernametest';
const testPassword = 'passwordtest';

suite('kwc-auth-login', () => {
    test('Input and submit username and password for login', (done) => {
        const el = login();
        el.updateComplete.then(() => {
            const shadowRoot = el.shadowRoot!;
            const testUtil = new AuthTestUtil(shadowRoot);

            testUtil.type(testUtil.login.username, testUsername);
            testUtil.type(testUtil.login.password, testPassword);
    
            el.addEventListener('submit', ((e : CustomEvent) => {
                assert.equal(e.detail.username, testUsername);
                assert.equal(e.detail.password, testPassword);
                done();
            }) as EventListener);

            testUtil.login.form.dispatchEvent(new CustomEvent('submit'));
 
        })
    })
})