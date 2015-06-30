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

describe('ejs/validators/rules/machine-name', function () {

  'use strict';

  var Validators = require('../lib'),
      EInvalidLength = require('../lib/errors/EInvalidLength'),
      EInvalidCharacters = require('../lib/errors/EInvalidCharacters');

  it('validatorShouldBeAvailable', function () {

    test.bool(
      Validators.registered('machine-name')
    ).isTrue();

  });

  it('shouldThrowAnInvalidLengthForTooFew', function (done) {

    Validators.validate(function (err) {

      test.object(
        err
      ).isInstanceOf(EInvalidLength);

      done();

    }, 'machine-name', 't');

  });

  it('shouldThrowAnInvalidLengthForTooMany', function (done) {

    var str = '';

    for (var i = 0; i < 130; i++) {
      str += 'a';
    }

    Validators.validate(function (err) {

      test.object(
        err
      ).isInstanceOf(EInvalidLength);

      done();

    }, 'machine-name', str);

  });

  it('shouldThrowAnInvalidCharacters', function (done) {

    Validators.validate(function (err) {

      test.object(
        err
      ).isInstanceOf(EInvalidCharacters);

      done();

    }, 'machine-name', 'John Doe');

  });

  it('shouldValidateAsValid', function (done) {

    Validators.validate(function (err) {

      test.value(
        err
      ).isNull();

      done();

    }, 'machine-name', 'john-doe');

  });

});
