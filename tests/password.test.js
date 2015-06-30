/**
 *  ______   __   __   ______  __   ______  __  __
 * /\  ___\ /\ "-.\ \ /\__  _\/\ \ /\__  _\/\ \_\ \
 * \ \  __\ \ \ \-.  \\/_/\ \/\ \ \\/_/\ \/\ \____ \
 *  \ \_____\\ \_\\"\_\  \ \_\ \ \_\  \ \_\ \/\_____\
 *   \/_____/ \/_/ \/_/   \/_/  \/_/   \/_/  \/_____/
 *                                         __   ______
 *                                        /\ \ /\  ___\
 *                                       _\_\ \\ \___  \
 *                                      /\_____\\/\_____\
 *                                      \/_____/ \/_____/
 */

var test = require('unit.js');

describe('ejs/validators/rules/password', function () {

  'use strict';

  var Validators = require('../lib'),
      EInvalidLength = require('../lib/errors/EInvalidLength'),
      EInvalidCharacters = require('../lib/errors/EInvalidCharacters'),
      EMustContainDigit = require('../lib/errors/EMustContainDigit'),
      EMustContainLowercase = require('../lib/errors/EMustContainLowercase'),
      EMustContainUppercase = require('../lib/errors/EMustContainUppercase');

  it('validatorShouldBeAvailable', function () {

    test.bool(
      Validators.registered('password')
    ).isTrue();

  });

  it('shouldThrowAnInvalidLengthErrorTooFew', function (done) {

    Validators.validate(function (err) {

      test.object(
        err
      ).isInstanceOf(EInvalidLength);

      done();

    }, 'password', 'test');

  });

  it('shouldThrowAnInvalidLengthErrorTooMany', function (done) {

    var str = '';
    for (var i = 0; i < 130; i++) {
      str += 'a';
    }

    Validators.validate(function (err) {

      test.object(
        err
      ).isInstanceOf(EInvalidLength);

      done();

    }, 'password', str);

  });

  it('shouldThrowAnNoDigitError', function (done) {

    Validators.validate(function (err) {

      test.object(
        err
      ).isInstanceOf(EMustContainDigit);

      done();

    }, 'password', 'testpassword');

  });

  it('shouldThrowAnNoLowercaseError', function (done) {

    Validators.validate(function (err) {

      test.object(
        err
      ).isInstanceOf(EMustContainLowercase);

      done();

    }, 'password', 'TESTPASSWORD1');

  });

  it('shouldThrowAnNoUppercaseError', function (done) {

    Validators.validate(function (err) {

      test.object(
        err
      ).isInstanceOf(EMustContainUppercase);

      done();

    }, 'password', 'testpassword1');

  });

  it('shouldThrowAnInvalidCharactersError', function (done) {

    Validators.validate(function (err) {

      test.object(
        err
      ).isInstanceOf(EInvalidCharacters);

      done();

    }, 'password', 'Test Password 1');

  });

  it('shouldValidateAsValid', function (done) {

    Validators.validate(function (err) {

      test.value(
        err
      ).isNull();

      done();

    }, 'password', 'TestPassword1');

  });

});
