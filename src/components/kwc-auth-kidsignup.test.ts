/* globals suite, test, assert, teardown, setup */
import { KidSignup } from  './kwc-auth-kidsignup.js';
import { AuthTestUtil } from '../test/util.js';
import { fixture, assert } from '@kano/web-tester/helpers.js';

const kidsignup = fixture<KidSignup>`
    <kwc-auth-kidsignup></kwc-auth-kidsignup>
`;

const testUsername = 'usernametest';
const testPassword = 'passwordtest';
const invalidPassword = 'pass word';
const shortPassword = 'p';
const invalidUsername = 'user &.name';
const shortUsername = 'u';

suite('kwc-auth-kidsignup', () => {
    test('Input and submit username and password', (done) => {
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

    test('Password cannot be empty', () => {
        const el = kidsignup();
        return el.updateComplete.then(() => {            
            const shadowRoot = el.shadowRoot!;
            const testUtil = new AuthTestUtil(shadowRoot);

            testUtil.type(testUtil.kidsignup.password, '');
            testUtil.blur(testUtil.kidsignup.password);

            const errors = el.errors;
            assert.equal(errors.password, 'Password cannot be empty.');
        });
    });

    test('Password must not contain spaces', () => {
        const el = kidsignup();
        return el.updateComplete.then(() => {
            const shadowRoot = el.shadowRoot!;
            const testUtil = new AuthTestUtil(shadowRoot);

            testUtil.type(testUtil.kidsignup.password, invalidPassword);
            testUtil.blur(testUtil.kidsignup.password);

            const errors = el.errors;
            assert.equal(errors.password, 'Password cannot contain spaces.');
        });
    });

    test('Password too short', () => {
        const el = kidsignup();
        return el.updateComplete.then(() => {
            const shadowRoot = el.shadowRoot!;
            const testUtil = new AuthTestUtil(shadowRoot);

            testUtil.type(testUtil.kidsignup.password, shortPassword);
            testUtil.blur(testUtil.kidsignup.password);

            const errors = el.errors;  
            assert.equal(errors.password, 'Password must be at least 8 characters long.');
        });
    });

    test('Username cannot be empty', () => {
        const el = kidsignup();
        return el.updateComplete.then(() => {
            const shadowRoot = el.shadowRoot!;
            const testUtil = new AuthTestUtil(shadowRoot);

            testUtil.type(testUtil.kidsignup.username, '');
            testUtil.blur(testUtil.kidsignup.username);

            const errors = el.errors;
            assert.equal(errors.username, 'Username is required.');
        });
    });

    test('Username is too short', () => {
        const el = kidsignup();
        return el.updateComplete.then(() => {
            const shadowRoot = el.shadowRoot!;
            const testUtil = new AuthTestUtil(shadowRoot);

            testUtil.type(testUtil.kidsignup.username, shortUsername);
            testUtil.blur(testUtil.kidsignup.username);

            const errors = el.errors;
            assert.equal(errors.username, 'Username must be at least 6 characters long.')
        })
    })

    test('Username can only contain letters, numbers dashes, underscores and dots', () => {
        const el = kidsignup();
        return el.updateComplete.then(() => {
            const shadowRoot = el.shadowRoot!;
            const testUtil = new AuthTestUtil(shadowRoot);

            testUtil.type(testUtil.kidsignup.username, invalidUsername);
            testUtil.blur(testUtil.kidsignup.username);

            const errors = el.errors;
            assert.equal(errors.username, 'Username must only contain letters, numbers, dashes, underscores or dots.')
        })
    } )

});
