/* globals suite, test, fixture, assert */
import './kwc-auth.js';
// import { AuthTestUtil } from './test/util.js';

const basic = fixture`
    <kwc-auth></kwc-auth>
`;

suite('kwc-auth', () => {
    test('instantiating the element works', () => {
        const element = basic();
        assert(element instanceof customElements.get('kwc-auth'));
    });
    // EXAMPLE: Test for sign in
    // test('login event', (cb) => {
    //     const element = basic();
    //     const testUtil = new AuthTestUtil(element);

    //     testUtil.type(testUtil.login.username, validUsername);
    //     testUtil.type(testUtil.login.password, validPassword);

    //     element.addEventListener('login', (e) => {
    //         assert.equal(e.detail.username, validUsername);
    //         assert.equal(e.detail.password, validPassword);
    //         cb();
    //     });

    //     testUtil.login.form.dispatchEvent(new CustomEvent('submit'));
    // });
})