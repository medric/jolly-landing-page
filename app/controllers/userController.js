var Boom = require('boom');
var db = require('../models/db');

function userController(){};

userController.prototype = (function() {
  return {
    create : function(request, reply) {
      var email = request.payload.email;
        
      if(email === undefined) {  
        return reply(Boom.create(400, 'undefined'));
      }
      
      db.User.find({ 
        where: {
          email : email
        }
      }).then(function(user) {
        
        db.User.create({
          email : email
        })
        .then(function() {
          
          return reply(email).code(200);
        })
        .catch(function(error) {
          
          return reply(Boom.create(400, 'uq_mail', {
            email : email
          }));
        
        });
      });
    }
  }
})();

var userController = new userController();
module.exports = userController;