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
 * Provides the EUnknownValidator error which is used when attempting to use
 * an unknown validator.
 *
 * @author Orgun109uk <orgun109uk@gmail.com>
 *
 * @module ejs
 * @submodule Validators
 */

var util = require('util'),
    t = require('ejs-t');

/**
 * Thrown when tryng to use an unknown validator.
 *
 * @param {String} name The name of the validator.
 *
 * @class EUnknownValidator
 * @constructor
 * @extends Error
 */
function EUnknownValidator(name) {
  'use strict';

  EUnknownValidator.super_.call(this);
  Error.captureStackTrace(this, EUnknownValidator);

  this.message = t.t(
    'Unknown validator ":name".',
    {':name': name}
  );
}

/**
 * Inherit from the {Error} class.
 */
util.inherits(EUnknownValidator, Error);

/**
 * Export the error constructor.
 */
module.exports = EUnknownValidator;
