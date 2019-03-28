// /* globals suite, test, assert, teardown, setup */
import './components/kwc-auth-kidparentsemail.js';
import { AuthTestUtil } from './test/util.js';
import { LitElement } from 'lit-element';

const testEmail = 'email@test.com';

suite('kwc-auth-kidparentsemail', () => {
    let el: LitElement;

    setup(() => {
        el = (document.createElement('kwc-auth-kidparentsemail') as LitElement);
        document.body.appendChild(el);
    })

    teardown(() => {
        document.body.removeChild(el);
    })
    
    test('input and submit on the kid parents email form', async (): Promise<void> => {
        await el.updateComplete;
        const shadowRoot = el.shadowRoot!;
        const testUtil = new AuthTestUtil(shadowRoot);
        
        
        testUtil.type(testUtil.kidparentsemail.email, testEmail);
        
        el.addEventListener('valueChange', ((e : CustomEvent) => {
            assert.equal(e.detail.email, testEmail);
        }) as EventListener);

        testUtil.kidparentsemail.form.dispatchEvent(new CustomEvent('submit'));
    });
})