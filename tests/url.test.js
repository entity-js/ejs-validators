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

describe('ejs/validators/rules/url', function () {

  'use strict';

  var Validators = require('../lib'),
      EInvalidURL = require('../lib/errors/EInvalidURL');

  it('validatorShouldBeAvailable', function () {

      test.bool(
        Validators.registered('url')
      ).isTrue();

    });

  it('shouldThrowAnInvalidUrl', function (done) {

      Validators.validate(function (err) {

        test.object(
          err
        ).isInstanceOf(EInvalidURL);

        done();

      }, 'url', 'test');

    });

  it('shouldNotValidateLocalhostAsValid', function (done) {

      Validators.validate(function (err) {

        test.object(
          err
        ).isInstanceOf(EInvalidURL);

        done();

      }, 'url', 'http://localhost');

    });

  it('shouldNotValidateLocalIPAsValid', function (done) {

      Validators.validate(function (err) {

        test.object(
          err
        ).isInstanceOf(EInvalidURL);

        done();

      }, 'url', 'http://127.0.0.1');

    });

  it('shouldValidateAsValid', function (done) {

      Validators.validate(function (err) {

        test.value(
          err
        ).isNull();

        done();

      }, 'url', 'http://google.com');

    });

});
