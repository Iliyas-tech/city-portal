const router = require('express').Router();
const {modelMap } = require("../../models");
const RouteConstant = require('../../constant/Routes');
const CommonController = require('./CommonController')(modelMap);


module.exports = (app) => {
    router.post("/add_booking", CommonController.addBooking);
    router.post("/csv_data", CommonController.csvOperation);

    app.use(`${RouteConstant.VERSION+RouteConstant.COMMON}`, router);
};

