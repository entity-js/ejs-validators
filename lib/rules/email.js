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
 * The email address validator rule.
 *
 * @author Orgun109uk <orgun109uk@gmail.com>
 *
 * @module ejs
 * @submodule Validators
 */

var EInvalidEmail = require('../errors/EInvalidEmail');

/**
 * Validate email address.
 *
 * @param {Function} next The next callback.
 *   @param {Error} next.err Any raised errors.
 * @param {String} name The name of the validator being run.
 * @param {Mixed} value The value to validate.
 * @async
 *
 * @throws {EInvalidEmail} Thrown if the value is an invalid email address.
 */
module.exports = function validateEmail (next, name, value) {
  'use strict';

  /*jshint ignore:start,-W101*/
  /*eslint-disable*/
  if (! /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
    return next(new EInvalidEmail(value));
  }
  /*eslint-enable*/
  /*jshint ignore:end,+W101*/

  next();
};
