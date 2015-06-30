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
 * Provides the EInvalidURL error which is thrown when the provided value
 * is not a valid URL address.
 *
 * @author Orgun109uk <orgun109uk@gmail.com>
 *
 * @module ejs
 * @submodule Validators
 */

var util = require('util'),
    t = require('ejs-t');

/**
 * Thrown when trying to validate a value which is not a valid URL address.
 *
 * @param {String} value The value being validated.
 *
 * @class EInvalidURL
 * @constructor
 * @extends Error
 */
function EInvalidURL(value) {
  'use strict';

  EInvalidURL.super_.call(this);
  Error.captureStackTrace(this, EInvalidURL);

  this.message = t.t(
    'The value ":value" is not a valid URL address.',
    {':value': value}
  );
}

/**
 * Inherit from the {Error} class.
 */
util.inherits(EInvalidURL, Error);

/**
 * Export the error constructor.
 */
module.exports = EInvalidURL;
