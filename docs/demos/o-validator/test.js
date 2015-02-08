describe('o-validator', function() {

  beforeEach(function() {
    browser().navigateTo(mainUrl);
  });
  it('should show error', function() {
    var s = '[ng-controller="OValidatorCtrl"] ';

    expect(element(s+'a').text()).toMatch('awesome user');
    element(s+'a').click();

    //not valid
    using(s).input('$data').enter('');
    element(s+'form button[type="submit"]').click();

    //form remains open
    expect(element(s+'a').css('display')).toBe('none');
    expect(element(s+'input[type="text"]:visible').count()).toBe(1);
    expect(element(s+'.editable-error:visible').count()).toBe(1);
    expect(element(s+'.editable-error').text()).toMatch('Required');

    //valid
    using(s).input('$data').enter('awesome');
    element(s+'form button[type="submit"]').click();

    expect(element(s+'a').css('display')).not().toBe('none');
    expect(element(s+'a').text()).toMatch('awesome');
    expect(element(s+'form').count()).toBe(0);
    expect(element(s+'.editable-error').count()).toBe(0);
  });

  it('should show editor and submit new value', function() {
    var s = '[ng-controller="OValidatorCtrl"] ';

    expect(element(s+'a').css('display')).not().toBe('none');
    expect(element(s+'a').text()).toMatch('awesome');
    element(s+'a').click();

    expect(element(s+'a').css('display')).toBe('none');
    expect(element(s+'form[editable-form="$form"]').count()).toBe(1);
    expect(element(s+'form input[type="text"]:visible').count()).toBe(1);
    expect(element(s+'form input[type="text"]').val()).toBe('awesome user');
    expect(element(s+'form button[type="submit"]:visible').count()).toBe(1);
    expect(element(s+'form button[type="button"]:visible').count()).toBe(1);

    using(s).input('$data').enter('username2');
    element(s+'form button[type="submit"]').click();

    expect(element(s+'a').css('display')).not().toBe('none');
    expect(element(s+'a').text()).toBe('username2');
    expect(element(s+'form').count()).toBe(0);
  });

  it('should not save by cancel button', function() {
    var s = '[ng-controller="OValidatorCtrl"] ';
    element(s+'a').click();

    using(s).input('$data').enter('username2');
    element(s+'form button[type="button"]').click();

    expect(element(s+'a').css('display')).not().toBe('none');
    expect(element(s+'a').text()).toMatch('awesome user');
    expect(element(s+'form').count()).toBe(0);
  });

  it('should cancel by click on body', function() {
    var s = '[ng-controller="OValidatorCtrl"] ';
    element(s+'a').click();

    expect(element(s+'a').css('display')).toBe('none');
    expect(element(s+'form[editable-form="$form"]').count()).toBe(1);
    expect(element(s+'form input[type="text"]:visible').count()).toBe(1);

    // click on input - stil visible
    element(s+'form input[type="text"]').click();
    expect(element(s+'a').css('display')).toBe('none');
    expect(element(s+'form[editable-form="$form"]').count()).toBe(1);
    expect(element(s+'form input[type="text"]:visible').count()).toBe(1);

    // click on body - close
    element('body').click();
    expect(element(s+'a').css('display')).not().toBe('none');
    expect(element(s+'a').text()).toMatch('awesome user');
    expect(element(s+'form').count()).toBe(0);
  });
});