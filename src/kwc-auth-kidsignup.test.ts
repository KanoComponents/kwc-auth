/* globals suite, test, assert, teardown, setup */
import { KidSignup } from  './components/kwc-auth-kidsignup.js';
import { AuthTestUtil } from './test/util.js';

const basic = fixture<KidSignup>`
    <kwc-auth-kidsignup></kwc-auth-kidsignup>
`;

const testUsername = 'usernametest';
const testPassword = 'passwordtest';
// const shortPword = 'shortp';
// const shortUser = 'shortu';

suite('kwc-auth-kidsignup', () => {
    test('kids sign up form successfull input and submit', (done) => {
        const el = basic();
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

    // test('kidsignup form error due to password too short', async (): Promise<void> => {
    //     await el.updateComplete;
    //     const shadowRoot = el.shadowRoot!;
    //     const testUtil = new AuthTestUtil(shadowRoot);

    //     testUtil.type(testUtil.kidsignup.username, testUsername);
    //     testUtil.type(testUtil.kidsignup.password, shortPword);

    //     el.addEventListener('valueChange', ((e: CustomEvent) => {
    //         assert.equal(e.detail.username, testUsername);
    //         assert.equal(e.detail.password, shortPword);
    //     }) as EventListener);
    //     testUtil.kidsignup.form.dispatchEvent(new CustomEvent('submit'));
    // })

    // test('kidsignup form error due to username too short', async (): Promise<void> => {
    //     await el.updateComplete;
    //     const shadowRoot = el.shadowRoot!;
    //     const testUtil = new AuthTestUtil(shadowRoot);

    //     testUtil.type(testUtil.kidsignup.username, shortUser);
    //     testUtil.type(testUtil.kidsignup.password, testPassword);

    //     el.addEventListener('valueChange', ((e: CustomEvent) => {
    //         assert.equal(e.detail.username, shortUser);
    //         assert.equal(e.detail.password, testPassword);
    //     }) as EventListener);
    //     testUtil.kidsignup.form.dispatchEvent(new CustomEvent('submit'));
    // })
})