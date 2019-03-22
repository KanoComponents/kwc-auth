/* globals suite, test, fixture, assert */
import './kwc-auth.js';
import { AuthTestUtil } from './test/util.js';
import { KwcAuth } from './kwc-auth.js';

const basic = fixture<KwcAuth>`
    <kwc-auth></kwc-auth>
`;

const kidsignup = fixture<KwcAuth>`
    <kwc-auth view="kidsignup"></kwc-auth>
`;

const kidparentsemail = fixture<KwcAuth>`
    <kwc-auth view="kidparentsemail"></kwc-auth>
`;
const testUsername = 'usernametest';
const testPassword = 'passwordtest';
const testTooshortPassword = 'short';

const testEmail = 'email@test.co.uk'

suite('kwc-auth', () => {
    test('instantiating the element works', () => {
        const element = basic();
        assert(element instanceof customElements.get('kwc-auth'));
    });
    
    test('kids-signup-form', (cb) => {
        const element = kidsignup();
        const testUtil = new AuthTestUtil(element);

        testUtil.type(testUtil.kidsignup.username, testUsername);
        testUtil.type(testUtil.kidsignup.password, testPassword);

        element.addEventListener('kids-signup-form', ((e : CustomEvent) => {
            assert.equal(e.detail.username, testUsername);
            assert.equal(e.detail.password, testPassword);
            cb();
        }) as EventListener);

        testUtil.kidsignup.form.dispatchEvent(new CustomEvent('submit'));
    });

    test('kid-signup-form, password-tooshort', (cb) => {
        const element = kidsignup();
        const testUtil = new AuthTestUtil(element);

        testUtil.type(testUtil.kidsignup.username, testUsername);
        testUtil.type(testUtil.kidsignup.password, testTooshortPassword);

        testUtil.kidsignup.form.dispatchEvent(new CustomEvent('submit'));
        // const errors = element.get('errors');
        // assert.equal(errors.password, 'password must contain 8 characters');
        cb();
    })



    //username must be more then 3 charaters long 
    //username must not be empty
    //username must only contain letters, numbers, dashes, underscores and dots
    
    //password must contain 8 charaters
    //password must not be empty
    //password must not contain spaces
    //password must only contrain letters, numbers, dashes, underscores and dots 

    test('kids-parents-email', (cb) => {
        const element = kidparentsemail();
        const testUtil = new AuthTestUtil(element);

        testUtil.type(testUtil.kidparentsemail.email, testEmail);
        
        element.addEventListener('kid-parent-email', ((e :CustomEvent) => {
            assert.equal(e.detail.email, testEmail);
            cb();
        }) as EventListener);

        testUtil.kidparentsemail.form.dispatchEvent(new CustomEvent('submit'));
    })

    //email must be in a valid format 
    //error if email is not in valid format 
})