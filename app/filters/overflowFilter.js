var config = require('../config.json')[process.env.NODE_ENV || 'local'];
var Overflow = require('../services/Overflow');
var Boom = require('boom');

module.exports = function (request, reply) {
	var remoteAddress = request.info.remoteAddress;
	var overflow = new Overflow(remoteAddress, request.path); // TODO : REGEX

	overflow.secure(config.secure[request.path], function(res, timeToBan) {

		if(!res) {

			return reply(Boom.create(400, 'secure_overflow', { timeToBan: timeToBan })); // The IP is banned
		}

		return reply.continue();

	});
}