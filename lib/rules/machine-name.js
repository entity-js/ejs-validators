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
 * The machine name validator rule.
 *
 * @author Orgun109uk <orgun109uk@gmail.com>
 *
 * @module ejs
 * @submodule Validators
 */

var EInvalidLength = require('../errors/EInvalidLength'),
    EInvalidCharacters = require('../errors/EInvalidCharacters');

/**
 * Validate machine name.
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

  var min = 3, // @todo - config?
      max = 128; // @todo - config?

  if (value.length < min || value.length > max) {
    return next(new EInvalidLength(value, min, max));
  }

  if (value.match(/[^-_a-z0-9]/) !== null) {
    return next(new EInvalidCharacters(value, '- _ a-z 0-9'));
  }

  next();
};
