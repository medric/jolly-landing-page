// If models are already charged do it, else nothing
if (global.hasOwnProperty('db')) {
  module.exports = global.db;
}

// Loading Sequelize
var Sequelize = require('sequelize'),
    path = require('path'),
    fs = require('fs'),
    config    = require('../../config.json')[process.env.NODE_ENV || 'local'],
    sequelize = new Sequelize(config.sequelize.database, config.sequelize.username, config.sequelize.password, {
                          dialect: config.sequelize.dialect, // or 'sqlite', 'postgres', 'mariadb'
                          host: config.sequelize.host, // 10.7.3.135
                          port: config.sequelize.port // or 5432 (for postgres)        
                    });

// Import tables
global.db = {
  Sequelize: Sequelize,
  sequelize: sequelize
};
// Read files in folder
fs.readdirSync(__dirname)
.filter(function(f) {
  // File filter to return all JS files without this one (index.js)
  return f.substr(-3) === '.js' && f !== 'index.js';
})
.forEach(function (file) {
  // Each file add specific model
  global.db[file.slice(0,-3)] = sequelize.import(__dirname + '/'+file);
});

// Define relationship
module.exports = global.db;
