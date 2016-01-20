/**
 * Created by mlazzje on 01/03/15.
 */

/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    email: {
      type      : DataTypes.STRING,
      unique    : true,
      validate  : { isEmail: true },
      allowNull : false
    }
  }, {
    indexes : [
      {
        fields: [
        'email',
      ]}
    ], 
    freezeTableName: false, // Model tableName will be the same as the model name
    tableName: 'users'
  });
};