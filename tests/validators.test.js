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

describe('ejs/validators', function () {

  'use strict';

  var EUnknownValidator = require('../lib/errors/EUnknownValidator');

  var Validators;

  beforeEach(function () {

    Validators = require('../lib');

  });

  afterEach(function () {

    var name = require.resolve('../lib');
    delete require.cache[name];

  });

  describe('Validators.register()', function () {

    it('shouldBeAbleToRegisterNewValidator', function () {

      var validator = function () {};

      Validators.register('test', validator);

      test.array(
        Validators.validators().test
      ).hasLength(1).is([{
        callback: validator,
        weight: 0
      }]);

    });

    it('shouldBeAbleToRegisterMultipleCallbacks', function () {

      var validator1 = function () {},
          validator2 = function () {},
          validator3 = function () {};

      Validators.register('test', validator1);
      Validators.register('test', validator2);
      Validators.register('test', validator3);

      test.array(
        Validators.validators().test
      ).hasLength(3).is([{
        callback: validator1,
        weight: 0
      }, {
        callback: validator2,
        weight: 0
      }, {
        callback: validator3,
        weight: 0
      }]);

    });

    it('multipleCallbacksShouldBeSortedByWeight', function () {

      var validator1 = function () {},
          validator2 = function () {},
          validator3 = function () {};

      Validators.register('test', validator1, 10);
      Validators.register('test', validator2, -10);
      Validators.register('test', validator3);

      test.array(
        Validators.validators().test
      ).hasLength(3).is([{
        callback: validator2,
        weight: -10
      }, {
        callback: validator3,
        weight: 0
      }, {
        callback: validator1,
        weight: 10
      }]);

    });

  });

  describe('Validators.registered()', function () {

    it('shouldReturnFalseIfTheValidatorHasntBeenRegistered', function () {

      test.bool(
        Validators.registered('test')
      ).isNotTrue();

    });

    it('shouldReturnFalseIfTheValidatorHasBeenRegisteredButEmpty', function () {

      Validators.validators().test = [];

      test.bool(
        Validators.registered('test')
      ).isNotTrue();

    });

    it('shouldReturnTrueIfValidatorHasBeenRegistered', function () {

      var validator = function () {};

      Validators.register('test', validator);

      test.bool(
        Validators.registered('test')
      ).isTrue();

    });

  });

  describe('Validators.unregister()', function () {

    it('shouldThrowAnErrorIfValidatorDoesntExist', function () {

      test.exception(function () {
        Validators.unregister('test');
      }).isInstanceOf(EUnknownValidator);

    });

    it('shouldUnregisterAllValidators', function () {

      var validator1 = function () {},
          validator2 = function () {},
          validator3 = function () {};

      Validators.register('test', validator1, 10);
      Validators.register('test', validator2, -10);
      Validators.register('test', validator3);

      Validators.unregister('test');
      test.array(
        Validators.validators().test
      ).hasLength(0);

    });

    it('shouldUnregisterSpecifiedCallback', function () {

      var validator1 = function () {},
          validator2 = function () {},
          validator3 = function () {};

      Validators.register('test', validator1, 10);
      Validators.register('test', validator2, -10);
      Validators.register('test', validator3);

      Validators.unregister('test', validator2);
      test.array(
        Validators.validators().test
      ).hasLength(2).is([{
        callback: validator3,
        weight: 0
      }, {
        callback: validator1,
        weight: 10
      }]);

    });

    it('shouldUnregisterSpecifiedCallbackDuplicates', function () {

      var validator1 = function () {},
          validator2 = function () {},
          validator3 = function () {};

      Validators.register('test', validator1, 10);
      Validators.register('test', validator2, -10);
      Validators.register('test', validator3);
      Validators.register('test', validator2, 90);

      Validators.unregister('test', validator2);
      test.array(
        Validators.validators().test
      ).hasLength(2).is([{
        callback: validator3,
        weight: 0
      }, {
        callback: validator1,
        weight: 10
      }]);

    });

  });

  describe('Validators.validate()', function () {

    it('shouldThrowAnErrorIfValidatorDoesntExist', function (done) {

      Validators.validate(function (err) {

        test.object(err).isInstanceOf(EUnknownValidator);

        done();

      }, 'test', 'test');

    });

    it('shouldExecuteCorrectValidators', function (done) {

      var v1 = false, v2 = false, v3 = false,
          validator1 = function (next, name, value) {
            v1 = true;
            next();
          },
          validator2 = function (next, name, value) {
            v2 = true;
            next();
          },
          validator3 = function (next, name, value) {
            v3 = true;
            next();
          };

      Validators.register('test', validator1);
      Validators.register('test2', validator2);
      Validators.register('test', validator3);

      Validators.validate(function (err) {

        test.value(err).isNull();

        test.bool(v1).isTrue();
        test.bool(v2).isNotTrue();
        test.bool(v3).isTrue();

        done();

      }, 'test', 'test');

    });

    it('shouldMarkAsInvalidIfAnErrorIsSubmitted', function (done) {

      var v1 = false, v2 = false, v3 = false,
          validator1 = function (next, name, value) {
            v1 = true;
            next();
          },
          validator2 = function (next, name, value) {
            v2 = true;
            next(new Error());
          },
          validator3 = function (next, name, value) {
            v3 = true;
            next();
          };

      Validators.register('test', validator1);
      Validators.register('test', validator2);
      Validators.register('test', validator3);

      Validators.validate(function (err) {

        test.object(err).isInstanceOf(Error);

        test.bool(v1).isTrue();
        test.bool(v2).isTrue();
        test.bool(v3).isNotTrue();

        done();

      }, 'test', 'test');

    });

    it('shouldCaptureExceptionsAndFail', function (done) {

      var v1 = false, v2 = false, v3 = false,
          validator1 = function (next, name, value) {
            v1 = true;
            next();
          },
          validator2 = function (next, name, value) {
            if (value === 'test') {
              throw new Error();
            }

            v2 = true;
            next();
          },
          validator3 = function (next, name, value) {
            v3 = true;
            next();
          };

      Validators.register('test', validator1);
      Validators.register('test', validator2);
      Validators.register('test', validator3);

      Validators.validate(function (err) {

        test.object(err).isInstanceOf(Error);

        test.bool(v1).isTrue();
        test.bool(v2).isNotTrue();
        test.bool(v3).isNotTrue();

        done();

      }, 'test', 'test');

    });

  });

});
