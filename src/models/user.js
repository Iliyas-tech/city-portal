module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      full_name: {
        type: DataTypes.STRING
      },
      mobile:{
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING,
        uniqueKey: true
      },
      is_voided: {
        type : DataTypes.BOOLEAN
      },
      is_enabled: {
        type : DataTypes.BOOLEAN
      }
    }, {
      freezeTableName: true,
    });
    user.associate = function (models) {
      
    }
  
    return user;
  };