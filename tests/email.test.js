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

describe('ejs/validators/rules/email', function () {

  'use strict';

  var Validators = require('../lib'),
      EInvalidEmail = require('../lib/errors/EInvalidEmail');

  it('validatorShouldBeAvailable', function () {

      test.bool(
        Validators.registered('email')
      ).isTrue();

    });

  it('shouldThrowAnInvalidEmail', function (done) {

      Validators.validate(function (err) {

        test.object(
          err
        ).isInstanceOf(EInvalidEmail);

        done();

      }, 'email', 'test.com');

    });

  it('shouldValidateAsValid', function (done) {

      Validators.validate(function (err) {

        test.value(
          err
        ).isNull();

        done();

      }, 'email', 'john-doe@example.com');

    });

});
