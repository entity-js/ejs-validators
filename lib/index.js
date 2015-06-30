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
 * The validators component.
 *
 * @author Orgun109uk <orgun109uk@gmail.com>
 *
 * @module ejs
 * @submodule Validators
 */

var async = require('async'),
    sortBy = require('ejs-sortby'),
    EUnknownValidator = require('./errors/EUnknownValidator');

var validators,
    _validators = {
      'machine-name': [{
        callback: require('./rules/machine-name'),
        weight: 0
      }],
      'email': [{
        callback: require('./rules/email'),
        weight: 0
      }],
      'url': [{
        callback: require('./rules/url'),
        weight: 0
      }],
      'password': [{
        callback: require('./rules/password'),
        weight: 0
      }]
    };

/**
 * The Validators component.
 *
 * @class Validators
 */
validators = module.exports = {
  /**
   * Registers a new validator.
   *
   * @method register
   * @param {String} name The name of the validator.
   * @param {Function} cb The validator callback.
   * @param {Integer} [weight=0] The weight to apply to the callback.
   * @returns {Object} Returns self.
   * @chainable
   */
  register: function (name, cb, weight) {
    'use strict';

    if (_validators[name] === undefined) {
      _validators[name] = [];
    }

    _validators[name].push({
      callback: cb,
      weight: weight || 0
    });

    sortBy(_validators[name], 'weight');
    return validators;
  },

  /**
   * Determines if a validator has been registered.
   *
   * @method registered
   * @param {String} name The name of the validator.
   * @returns {Boolean} Returns true or false.
   */
  registered: function (name) {
    'use strict';

    return _validators[name] !== undefined &&
      _validators[name].length > 0;
  },

  /**
   * Unregisters a validator or a validators callback.
   *
   * @method unregister
   * @param {String} name The name of the validator to remove.
   * @param {Function} [cb] The specific callback to remove.
   * @returns {Object} Returns self.
   * @chainable
   */
  unregister: function (name, cb) {
    'use strict';

    if (_validators[name] === undefined) {
      throw new EUnknownValidator(name);
    }

    if (cb === undefined) {
      _validators[name] = [];
    } else {
      var tmp = [];

      for (var i = 0, len = _validators[name].length; i < len; i++) {
        if (_validators[name][i].callback === cb) {
          continue;
        }

        tmp.push(_validators[name][i]);
      }

      _validators[name] = tmp;
    }

    return validators;
  },

  /**
   * Attempts to validate the value.
   *
   * @method validate
   * @param {Function} done The done callback.
   *   @param {Error} done.err Any raised errors.
   * @param {String|Array} name The name(s) of the validator(s) to run.
   * @param {Mixed} value The value to validate.
   * @async
   */
  validate: function (done, name, value) {
    'use strict';

    if (_validators[name] === undefined) {
      return done(new EUnknownValidator(name));
    }

    function execValidator(validator) {
      return function (next) {
        try {
          validator.callback.call(null, next, name, value);
        } catch (e) {
          next(e);
        }
      };
    }

    var queue = [];
    for (var i = 0, len = _validators[name].length; i < len; i++) {
      queue.push(execValidator(_validators[name][i]));
    }

    async.series(queue, function (err) {
      done(err ? err : null);
    });
  },

  /**
   * Returns an object containing the registered validators.
   *
   * @method validators
   * @returns {Object} An object of registered validators.
   */
  validators: function () {
    'use strict';

    return _validators;
  }
};
