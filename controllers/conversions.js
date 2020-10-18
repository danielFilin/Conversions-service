const conversionService = require('../services/conversionService');
const { ConversionRequest } = require("../DTO/conversionRequest");
const { ConversionCall } = require("../DTO/conversionCall");
const { ConversionDataQuery } = require("../DTO/conversionDataQuery");


exports.addConversion = async(req, res) => {
    try {
        const newConversion = new ConversionRequest(req);
        if (!newConversion.validate()) {
            throw new Error ('data type is incorrect')
        }
        const result = await conversionService.addConversion(newConversion);
        if (!result) {
            throw new Error ('data was not fetched');
        }
        res.status(200).json({
            message: 'conversion was added!',
        })
    } catch (err) {
        res.status(202).json({
            message: 'conversion was not added',
            err: err
        })   
    }
}

exports.conversionCall = async(req, res) => {
    try {
        const newQuery = new ConversionCall(req);
        if (!newQuery.validate()) {
            throw new Error ('data type is incorrect')
        }
        const result = await conversionService.addConversionCall(newQuery.query);
        if (result !== undefined) {

            throw new Error('call failed, conversion with the given name does not exist!')
        }
        res.status(200).json({
            message: 'conversion call registered',
            data: result
        });
    }   catch (err) {
        res.status(202).json({
            message: 'Ooops! Somethign went wrong!',
            err: err
        });
    }
}

exports.getAllData = async (req, res) => {
    try {
        const analytics = await conversionService.getAllConversionData();
        if (!analytics.length) {
            res.status(202).json({
                data: 'No items to show!'
           })
        } else {
            res.status(200).json({
                message: 'data obtained',
                data: analytics
            });
        }
    } catch (err) {
       res.status(401).json({
            message: 'Something went wrong!'
       })
    }
}

exports.getConversionData = async (req, res) => {
    try {
        const newQuery = new ConversionDataQuery (req);
        if (!newQuery.validate()) {
            throw new Error ('data type is incorrect')
        }
        let { startDate, endDate, conversionName } = req.params;
        const analytics = await conversionService.getDataInRange(startDate, endDate, conversionName);
        if (analytics.length) {
            res.status(200).json({
                data: analytics,
                message: 'data fetched!'
            })
        }  else {
            throw new Error ('no data found!');
        }
    } catch (err) {
        res.status(204).json({
            message: 'No data availiable',
            err: err
        })
    } 
}

