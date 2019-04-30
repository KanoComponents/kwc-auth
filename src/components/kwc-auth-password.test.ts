/* globals suite, test, assert, teardown, setup */
import { PasswordInput } from  './kwc-auth-password';
import { AuthTestUtil } from '../test/util.js';


const password = fixture<PasswordInput>`
    <kwc-auth-password></kwc-auth-password>
`;

const testPassword = 'passwordtest';
const invalidPassword = 'pass word';
const shortPassword = 'p';


suite('kwc-auth-password', () => {
    test('Input and submit password', (done) => {
        const el = password();
        el.updateComplete.then(() => {
            const shadowRoot = el.shadowRoot!;
            const testUtil = new AuthTestUtil(shadowRoot);

            testUtil.type(testUtil.password.password, testPassword);

            el.addEventListener('submit', ((e: CustomEvent) => {
                assert.equal(e.detail.payload.password, testPassword);
                done();
            }) as EventListener);

            testUtil.password.button.dispatchEvent(new CustomEvent('mousedown'));
        });
    });

    test('Password cannot be empty', () => {
        const el = password();
        el.updateComplete.then(() => {
            const shadowRoot = el.shadowRoot!;
            const testUtil = new AuthTestUtil(shadowRoot);

            testUtil.type(testUtil.password.password, '');
            testUtil.blur(testUtil.password.password);

            const errors = el.errors;
            assert.equal(errors.password, 'Password cannot be empty.');
        });
    });

    test('Password must not contrain spaces', () => {
        const el = password();
        return el.updateComplete.then(() => {
            const shadowRoot = el.shadowRoot!;
            const testUtil = new AuthTestUtil(shadowRoot);

            testUtil.type(testUtil.password.password, invalidPassword);
            testUtil.blur(testUtil.password.password);

            const errors = el.errors;
            assert.equal(errors.password, 'Password cannot contain spaces.');
        });
    });

    test('Password too short', () => {
        const el = password();
        return el.updateComplete.then(() => {
            const shadowRoot = el.shadowRoot!;
            const testUtil = new AuthTestUtil(shadowRoot);

            testUtil.type(testUtil.password.password, shortPassword);
            testUtil.blur(testUtil.password.password);

            const errors = el.errors;  
            assert.equal(errors.password, 'Password must be at least 8 characters long.');
        });
    });    
});
