var redis = require('redis');
var client = redis.createClient(); //redis cli instance

const PREFIX                = 'secure:';
const SUFFIX                = ':ban';
const DEFAULT_TIME          = 10 * 60;
const DEFAULT_BAN_TIME      = 60 * 60;

/** 
* Handles overflowed requests on a specific route
* @param {map} _options { time: '', banTime: '', quota: ''}
* @param {string} remoteAddress 
*/
function Overflow(remoteAddress, route) {   

    if(typeof route === 'undefined') {
        throw new Error('No route provided');
    }

    // Setting key
    this.key = PREFIX + remoteAddress + ':' + route;
}

/** 
*/
Overflow.prototype.secure = function(options, next) {
    // Set default if undefined in options
    var time = typeof options.time !== 'undefined' ? options.time : DEFAULT_TIME;
    var banTime = typeof options.banTime !== 'undefined' ?  options.banTime : DEFAULT_BAN_TIME;

    var self = this;

    var secure = false;

    this.isBanned(function(timeToBan) {

        if(!timeToBan) {

            self.reset(time, function() {

                client.incr(self.key, function(err, hits) {

                    if(hits > options.quota) {

                        self.ban(banTime, hits, function() {

                            next(secure, banTime);
                        }); 

                    } else {

                        secure = true;

                        next(secure);    
                    }
                });
            });
            
        } else {    

            next(secure, timeToBan);
        }
    });
}

Overflow.prototype.reset = function(time, next) {

    client.exists(this.key, function(err, exists) {

        if(!exists) {
                    
            client.multi()
                .setex(this.key, time, 0)
                .exec(function(err, replies) {

                    next();
                });

        } else {
            next();
        }
    });
}

Overflow.prototype.ban = function(banTime, hits, next) {

    client.multi()
        .del(this.key)
        .setex(this.key + SUFFIX, banTime, hits)
        .exec(function() {
            console.log(hits);
            next();
         });
}

Overflow.prototype.isBanned = function(next) {
    
    client.ttl(this.key + SUFFIX, function(err, reply) {
        
        timeToBan = reply;

        if(reply === -2 || reply === 0) {
            timeToBan = false;
        }

        next(timeToBan);
    });
}

module.exports = Overflow;