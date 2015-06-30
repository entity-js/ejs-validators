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

/**
 * The password validator rule.
 *
 * @author Orgun109uk <orgun109uk@gmail.com>
 *
 * @module ejs
 * @submodule Validators
 */

var EInvalidLength = require('../errors/EInvalidLength'),
    EInvalidCharacters = require('../errors/EInvalidCharacters'),
    EMustContainDigit = require('../errors/EMustContainDigit'),
    EMustContainLowercase = require('../errors/EMustContainLowercase'),
    EMustContainUppercase = require('../errors/EMustContainUppercase');

/**
 * Validate password.
 *
 * @param {Function} next The next callback.
 *   @param {Error} next.err Any raised errors.
 * @param {String} name The name of the validator being run.
 * @param {Mixed} value The value to validate.
 * @async
 *
 * @throws {EInvalidLength} Thrown if the value is too long or short.
 * @throws {EInvalidCharacters} If the value contains invalid characters.
 */
module.exports = function validateMachineName (next, name, value) {
  'use strict';

  var min = 5, // @todo - config?
      max = 128; // @todo - config?

  if (value.length < min || value.length > max) {
    return next(new EInvalidLength(value, min, max));
  }

  if (value.match(/^.*(?=\d).*$/) === null) {
    return next(new EMustContainDigit(value));
  }

  if (value.match(/^.*(?=[a-z]).*$/) === null) {
    return next(new EMustContainLowercase(value));
  }

  if (value.match(/^.*(?=[A-Z]).*$/) === null) {
    return next(new EMustContainUppercase(value));
  }

  if (value.match(/[^0-9a-zA-Z!%^&*\-_+#~@?]/) !== null) {
    return next(new EInvalidCharacters(value, '0-9 a-z A-Z !%^&*-_+#~@?'));
  }

  next();
};
