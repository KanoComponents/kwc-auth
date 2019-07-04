// /* globals suite, test, assert, teardown, setup */
import { EmailInput } from './kwc-auth-email.js';
import { AuthTestUtil } from '../test/util.js';

const email = fixture<EmailInput>`
    <kwc-auth-email></kwc-auth-email>
`;

const testEmail = 'email@test.com';
const invalidEmail1 = 'email@testcom'
const invalidEmail2 = 'email.test.com'

suite('kwc-auth-email', () => {
    test('Input and submit email form', (done) => {
        const el = email();
        el.updateComplete.then(() => {

        const shadowRoot = el.shadowRoot!;
        const testUtil = new AuthTestUtil(shadowRoot);
        
        testUtil.type(testUtil.email.email, testEmail);
        
        el.addEventListener('submit', ((e : CustomEvent) => {
            assert.equal(e.detail.payload.email, testEmail);
            done();
        }) as EventListener);

        testUtil.email.button.dispatchEvent(new CustomEvent('mousedown'));
        });
    });
    
    test('Email cannot be empty', () => {
        const el = email();
        return el.updateComplete.then(() => {            
            const shadowRoot = el.shadowRoot!;
            const testUtil = new AuthTestUtil(shadowRoot);

            testUtil.type(testUtil.email.email, '');
            testUtil.blur(testUtil.email.email);

            assert.equal(el.error, 'Please enter a valid email address.');
        });
    });

    test('Email will throw an error if not presented with a dot symbol', () => {const el = email();
        return el.updateComplete.then(() => {            
            const shadowRoot = el.shadowRoot!;
            const testUtil = new AuthTestUtil(shadowRoot);

            testUtil.type(testUtil.email.email, invalidEmail1);
            testUtil.blur(testUtil.email.email);

            assert.equal(el.error, 'Please enter a valid email address.');
        })
    })
    test('Email will throw an error if not presented with an @ symbol', () => {const el = email();
        return el.updateComplete.then(() => {            
            const shadowRoot = el.shadowRoot!;
            const testUtil = new AuthTestUtil(shadowRoot);

            testUtil.type(testUtil.email.email, invalidEmail2);
            testUtil.blur(testUtil.email.email);

            assert.equal(el.error, 'Please enter a valid email address.');
        })
    })

});