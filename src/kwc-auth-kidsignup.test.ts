/* globals suite, test, assert, teardown, setup */
import { KidSignup } from  './components/kwc-auth-kidsignup.js';
import { AuthTestUtil } from './test/util.js';

const kidsignup = fixture<KidSignup>`
    <kwc-auth-kidsignup></kwc-auth-kidsignup>
`;

const testUsername = 'usernametest';
const testPassword = 'passwordtest';
const shortPword = 'shortp';
// const shortUser = 'shortu';

suite('kwc-auth-kidsignup', () => {
    test('kids sign up form successfull input and submit', (done) => {
        const el = kidsignup();
        el.updateComplete.then(() => {
            const shadowRoot = el.shadowRoot!;
            const testUtil = new AuthTestUtil(shadowRoot);
    
            testUtil.type(testUtil.kidsignup.username, testUsername);
            testUtil.type(testUtil.kidsignup.password, testPassword);
    
            el.addEventListener('submit', ((e : CustomEvent) => {
                assert.equal(e.detail.username, testUsername);
                assert.equal(e.detail.password, testPassword);
                done();
            }) as EventListener);

            testUtil.kidsignup.form.dispatchEvent(new CustomEvent('submit'));
        });
    });

    test('kids sign up form password too short', (done) => {
        const el = kidsignup();
        el.updateComplete.then(() => {
            const shadowRoot = el.shadowRoot!;
            const testUtil = new AuthTestUtil(shadowRoot);

            testUtil.type(testUtil.kidsignup.username, testUsername);
            testUtil.type(testUtil.kidsignup.password, shortPword);

            el.addEventListener('submit', ((e: CustomEvent) => {
                assert.equal(e.detail.username, testUsername);
                assert.equal(e.detail.password, shortPword);
                done();
            }) as EventListener);

            testUtil.kidsignup.form.dispatchEvent(new CustomEvent('submit'));

            const errors = el.errors;  
            assert.equal(errors.username, '');          
            assert.equal(errors.password, 'Password must be at least 8 characters long.');
            done();
        });
    });
});
