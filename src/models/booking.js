module.exports = (sequelize, DataTypes) => {
    const booking = sequelize.define('booking', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      user_id : {
        type : DataTypes.INTEGER,
      },
      booking_time: {
        type: DataTypes.DATE
      },
      pickup_time:{
        type: DataTypes.DATE
      },
      source: {
        type: DataTypes.STRING,
      },
      source_address: {
        type: DataTypes.STRING,
      },
      source_location:{
        type: DataTypes.STRING,
      },
      source_city:{
        type: DataTypes.STRING,
      },
      source_state:{
        type: DataTypes.STRING,
      },
      source_zip:{
        type: DataTypes.STRING,
      },
      source_country:{
        type: DataTypes.STRING,
      },
      source_lat:{
        type: DataTypes.DECIMAL,
      },
      source_lng:{
        type: DataTypes.DECIMAL,
      },
      destination: {
        type: DataTypes.STRING,
      },
      destination_address: {
        type: DataTypes.STRING,
      },
      destination_location:{
        type: DataTypes.STRING,
      },
      destination_city:{
        type: DataTypes.STRING,
      },
      destination_state:{
        type: DataTypes.STRING,
      },
      destination_zip:{
        type: DataTypes.STRING,
      },
      destination_country:{
        type: DataTypes.STRING,
      },
      destination_lat:{
        type: DataTypes.DECIMAL,
      },
      destination_lng:{
        type: DataTypes.DECIMAL,
      },
    }, {
      freezeTableName: true,
    });
    booking.associate = function (models) {
      
    }
  
    return booking;
  };