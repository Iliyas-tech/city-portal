module.exports = (sequelize, DataTypes) => {
    const vendor = sequelize.define('vendor', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING
      },
      vehicle_number:{
        type: DataTypes.STRING
      },
      vehicle_model: {
        type: DataTypes.STRING,
      },
      is_enabled: {
        type : DataTypes.BOOLEAN
      },
      is_voided: {
        type : DataTypes.BOOLEAN
      }
    }, {
      freezeTableName: true,
    });
    vendor.associate = function (models) {
      
    }
  
    return vendor;
  };