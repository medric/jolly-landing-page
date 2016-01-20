/*
  Server
*/

var Hapi = require('hapi');
var Path = require('path');
var config = require('./app/config.json')[process.env.NODE_ENV || 'local'];
var routes = require('./app/routes');
var db = require('./app/models/db');
var pattern = new RegExp('\/app\/[a-z]+');

db.sequelize.sync().complete(function(err){
  if (err) {
      throw err[0]
  } else {
      var server = new Hapi.Server();

      server.connection({ port: process.env.PORT || config.node.port });

      // Declare plugins
      var plugins = [
      ];
      
      server.register(plugins, function(err) {
        if(err) {
          console.error('Failed to load plugin:', err);
        } 

        // Load routes
        server.route(routes);

        // Start server
        server.start(function() {
          console.log('Server running at:', server.info.uri);
        });
      });

      // Handles 404 response
      server.ext('onPreResponse', function (request, reply) {

        // The path is not a /app/* route
        if(!pattern.test(request.path)) {
          if (request.response.isBoom) {
            // Inspect the response here, perhaps see if it's a 404?
            return reply.redirect('/');
          }
        }

        return reply.continue();
      });
   }
});