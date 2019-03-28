/* globals suite, test, assert, teardown, setup */
import './components/kwc-auth-kidsignup.js';
import { AuthTestUtil } from './test/util.js';
import { LitElement } from 'lit-element';

const testUsername = 'usernametest';
const testPassword = 'passwordtest';

suite('kwc-auth-kidsignup', () => {
    let el: LitElement;

    setup(() => {
        el = (document.createElement('kwc-auth-kidsignup') as LitElement);
        document.body.appendChild(el);
    })

    teardown(() => {
        document.body.removeChild(el);
    })
    
    test('kids-signup-form', async (): Promise<void> => {
        await el.updateComplete;
        const shadowRoot = el.shadowRoot!;
        const testUtil = new AuthTestUtil(shadowRoot);

        testUtil.type(testUtil.kidsignup.username, testUsername);
        testUtil.type(testUtil.kidsignup.password, testPassword);

        el.addEventListener('valueChange', ((e : CustomEvent) => {
            assert.equal(e.detail.username, testUsername);
            assert.equal(e.detail.password, testPassword);
        }) as EventListener);

        testUtil.kidsignup.form.dispatchEvent(new CustomEvent('submit'));
    });
})