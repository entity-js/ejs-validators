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
 * Provides the EMustContainLowercase error which is thrown when the provided
 * value doesnt conain at least 1 lowercase character.
 *
 * @author Orgun109uk <orgun109uk@gmail.com>
 *
 * @module ejs
 * @submodule Validators
 */

var util = require('util'),
    t = require('ejs-t');

/**
 * Thrown when tryng to validate a value which doesnt contain at least 1
 * lowercase character.
 *
 * @param {String} value The value being validated.
 *
 * @class EMustContainLowercase
 * @constructor
 * @extends Error
 */
function EMustContainLowercase(value) {
  'use strict';

  EMustContainLowercase.super_.call(this);
  Error.captureStackTrace(this, EMustContainLowercase);

  this.message = t.t(
    'The value ":value" must contain at least 1 lowercase character.',
    {':value': value}
  );
}

/**
 * Inherit from the {Error} class.
 */
util.inherits(EMustContainLowercase, Error);

/**
 * Export the error constructor.
 */
module.exports = EMustContainLowercase;
