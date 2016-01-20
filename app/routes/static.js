var Path = require('path');

// Serving static files
module.exports = [{
        method: 'GET',
        path: '/{param*}',
        config: {
            handler: {
                directory: {
                    path: 'public'
                }
            }
        }
    },
    { 
        method: 'GET', 
        path: '/vendor/{param*}',
        config: {
            handler: {
                directory: {
                    path: 'vendor'
                }
            }
        }
    },
    {
        method: 'GET', 
        path: '/dist/{param*}',
        config: {
            handler: {
                directory: {
                    path: 'dist'
                }
            }
        }
}];