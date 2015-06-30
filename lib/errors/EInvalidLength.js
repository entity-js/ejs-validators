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
 * Provides the EInvalidLength error which is thrown when the provided value
 * contains too many or too few characters.
 *
 * @author Orgun109uk <orgun109uk@gmail.com>
 *
 * @module ejs
 * @submodule Validators
 */

var util = require('util'),
    t = require('ejs-t');

/**
 * Thrown when tryng to validate a value with too many or too few characters.
 *
 * @param {String} value The value being validated.
 * @param {Integer} min The minimum allowed characters.
 * @param {Integer} max The maximum allowed characters.
 *
 * @class EInvalidLength
 * @constructor
 * @extends Error
 */
function EInvalidLength(value, min, max) {
  'use strict';

  EInvalidLength.super_.call(this);
  Error.captureStackTrace(this, EInvalidLength);

  this.message = t.t(
    'The value ":value" contains too many or too few characters, must be \
    betweem :min and :max characters.',
    {':value': value, ':min': min, ':max': max}
  );
}

/**
 * Inherit from the {Error} class.
 */
util.inherits(EInvalidLength, Error);

/**
 * Export the error constructor.
 */
module.exports = EInvalidLength;
