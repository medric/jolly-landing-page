/**
 * Created by mlazzje on 01/03/15.
 */

var Joi = require('joi');
var userController = require('../controllers/userController');
var config = require('../config.json')[process.env.NODE_ENV || 'local'];
var Boom = require('boom');
var overflowFilter = require('../filters/overflowFilter');

var overflow = undefined;

module.exports = [{
  method: 'POST',
  path: '/app/subscribe',
  config: {
    pre: [
      { method: overflowFilter, assign: 'm1' }
    ],
    handler: userController.create,
    validate: {
      payload: {
        email: Joi.string().email()
      }
    }
  }
}];
