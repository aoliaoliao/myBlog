module.exports = ( sequelize, DataTypes ) => {
  let User = sequelize.define( 'User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    age: {
      type: DataTypes.TINYINT
    }
  } )

  return User
}