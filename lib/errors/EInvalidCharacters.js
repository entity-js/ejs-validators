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
 * Provides the EInvalidCharacters error which is thrown when the provided
 * value contains invalid characters.
 *
 * @author Orgun109uk <orgun109uk@gmail.com>
 *
 * @module ejs
 * @submodule Validators
 */

var util = require('util'),
    t = require('ejs-t');

/**
 * Thrown when tryng to validate a value with invalid characters.
 *
 * @param {String} value The value being validated.
 * @param {String} rule The allowed characters.
 *
 * @class EInvalidCharacters
 * @constructor
 * @extends Error
 */
function EInvalidCharacters(value, rule) {
  'use strict';

  EInvalidCharacters.super_.call(this);
  Error.captureStackTrace(this, EInvalidCharacters);

  this.message = t.t(
    'The value ":value" contains invalid characters, must contain any of \
    ":chars" characters.',
    {':value': value, ':chars': rule}
  );
}

/**
 * Inherit from the {Error} class.
 */
util.inherits(EInvalidCharacters, Error);

/**
 * Export the error constructor.
 */
module.exports = EInvalidCharacters;
