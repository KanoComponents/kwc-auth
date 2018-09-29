import '../kwc-auth.js';

suite('kwc-auth', function() {
    test('instantiating the element works', function() {
        var element = fixture('basic');
        assert.equal(element.is, 'kwc-auth');
    });
});
/** TODO:
 * - Open should open modal
 * - Close should close modal
 * - Cancel should close and fire event
 * - Skip should close and fire event
 * - Reset resets internal state
 * - If isForceSignup is true the modal can't be closed
 * - Error messages
 * - Changing username, email, firstName and password trigger events
 * - Submitting forms trigger events
 * - If terms is not true, can't click continue
 * - If processing is true, show spinner
 * - If modal is opened, `opened` should be true
 * - 'showXXX' should display XXX page
 */