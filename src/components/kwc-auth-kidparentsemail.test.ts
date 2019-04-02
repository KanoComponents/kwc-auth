// /* globals suite, test, assert, teardown, setup */
import { KidParentsEmail } from './kwc-auth-kidparentsemail.js';
import { AuthTestUtil } from '../test/util.js';
import { fixture, assert } from '@kano/web-tester/helpers.js';

const kidparentsemail = fixture<KidParentsEmail>`
    <kwc-auth-kidparentsemail></kwc-auth-kidparentsemail>
`;

const testEmail = 'email@test.com';
const invalidEmail1 = 'email@testcom'
const invalidEmail2 = 'email.test.com'

suite('kwc-auth-kidparentsemail', () => {
    test('Input and submit email form', (done) => {
        const el = kidparentsemail();
        el.updateComplete.then(() => {

        const shadowRoot = el.shadowRoot!;
        const testUtil = new AuthTestUtil(shadowRoot);
        
        testUtil.type(testUtil.kidparentsemail.email, testEmail);
        
        el.addEventListener('submit', ((e : CustomEvent) => {
            assert.equal(e.detail.email, testEmail);
            done();
        }) as EventListener);

        testUtil.kidparentsemail.form.dispatchEvent(new CustomEvent('submit'));
        });
    });
    
    test('Email cannot be empty', () => {
        const el = kidparentsemail();
        return el.updateComplete.then(() => {            
            const shadowRoot = el.shadowRoot!;
            const testUtil = new AuthTestUtil(shadowRoot);

            testUtil.type(testUtil.kidparentsemail.email, '');
            testUtil.blur(testUtil.kidparentsemail.email);

            const errors = el.errors;
            assert.equal(errors.email, 'Please enter a valid email address.');
        });
    });

    test('Email will throw an error if not presented with a dot symbol', () => {const el = kidparentsemail();
        return el.updateComplete.then(() => {            
            const shadowRoot = el.shadowRoot!;
            const testUtil = new AuthTestUtil(shadowRoot);

            testUtil.type(testUtil.kidparentsemail.email, invalidEmail1);
            testUtil.blur(testUtil.kidparentsemail.email);

            const errors = el.errors;
            assert.equal(errors.email, 'Please enter a valid email address.');
        })
    })
    test('Email will throw an error if not presented with an @ symbol', () => {const el = kidparentsemail();
        return el.updateComplete.then(() => {            
            const shadowRoot = el.shadowRoot!;
            const testUtil = new AuthTestUtil(shadowRoot);

            testUtil.type(testUtil.kidparentsemail.email, invalidEmail2);
            testUtil.blur(testUtil.kidparentsemail.email);

            const errors = el.errors;
            assert.equal(errors.email, 'Please enter a valid email address.');
        })
    })

});