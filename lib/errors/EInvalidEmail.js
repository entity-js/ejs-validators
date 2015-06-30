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
 * Provides the EInvalidEmail error which is thrown when the provided value
 * is not a valid email address.
 *
 * @author Orgun109uk <orgun109uk@gmail.com>
 *
 * @module ejs
 * @submodule Validators
 */

var util = require('util'),
    t = require('ejs-t');

/**
 * Thrown when trying to validate a value which is not a valid email address.
 *
 * @param {String} value The value being validated.
 *
 * @class EInvalidEmail
 * @constructor
 * @extends Error
 */
function EInvalidEmail(value) {
  'use strict';

  EInvalidEmail.super_.call(this);
  Error.captureStackTrace(this, EInvalidEmail);

  this.message = t.t(
    'The value ":value" is not a valid email address.',
    {':value': value}
  );
}

/**
 * Inherit from the {Error} class.
 */
util.inherits(EInvalidEmail, Error);

/**
 * Export the error constructor.
 */
module.exports = EInvalidEmail;
