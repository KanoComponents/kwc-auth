/* globals suite, test, assert, teardown, setup */
import { CreatePassword } from  './kwc-auth-createpassword';
import { AuthTestUtil } from '../test/util.js';


const createpassword = fixture<CreatePassword>`
    <kwc-auth-createpassword></kwc-auth-createpassword>
`;

const testPassword = 'passwordtest';
const invalidPassword = 'pass word';
const shortPassword = 'p';


suite('kwc-auth-createpassword', () => {
    test('Input and submit password', (done) => {
        const el = createpassword();
        el.updateComplete.then(() => {
            const shadowRoot = el.shadowRoot!;
            const testUtil = new AuthTestUtil(shadowRoot);

            testUtil.type(testUtil.createpassword.password, testPassword);

            el.addEventListener('submit', ((e: CustomEvent) => {
                assert.equal(e.detail.password, testPassword);
                done();
            }) as EventListener);

            testUtil.createpassword.form.dispatchEvent(new CustomEvent('submit'));
        });
    });

    test('Password cannot be empty', () => {
        const el = createpassword();
        el.updateComplete.then(() => {
            const shadowRoot = el.shadowRoot!;
            const testUtil = new AuthTestUtil(shadowRoot);

            testUtil.type(testUtil.createpassword.password, '');
            testUtil.blur(testUtil.createpassword.password);

            const errors = el.errors;
            assert.equal(errors.password, 'Password cannot be empty.');
        });
    });

    test('Password must not contrain spaces', () => {
        const el = createpassword();
        return el.updateComplete.then(() => {
            const shadowRoot = el.shadowRoot!;
            const testUtil = new AuthTestUtil(shadowRoot);

            testUtil.type(testUtil.createpassword.password, invalidPassword);
            testUtil.blur(testUtil.createpassword.password);

            const errors = el.errors;
            assert.equal(errors.password, 'Password cannot contain spaces.');
        });
    });

    test('Password too short', () => {
        const el = createpassword();
        return el.updateComplete.then(() => {
            const shadowRoot = el.shadowRoot!;
            const testUtil = new AuthTestUtil(shadowRoot);

            testUtil.type(testUtil.createpassword.password, shortPassword);
            testUtil.blur(testUtil.createpassword.password);

            const errors = el.errors;  
            assert.equal(errors.password, 'Password must be at least 8 characters long.');
        });
    });    
});
