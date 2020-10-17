const conversionService = require('../services/conversionService');
const { ConversionRequest } = require("../dto/conversionRequest");
const { ConversionCall } = require("../dto/conversionCall");
const { ConversionDataQuery } = require("../dto/conversionDataQuery");


exports.addConversion = async(req, res) => {
    try {
        const newConversion = new ConversionRequest(req);
        if (!newConversion.validate()) {
            throw new Error ('data type is incorrect')
        }
        const result = await conversionService.addConversion(newConversion);
        if (!result) {
            throw ('data was not fetched');
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
        await conversionService.addConversionCall(newQuery.query);
        res.status(200).json({
            message: 'conversion call registered',
        });
    }   catch (err) {
        res.status(200).json({
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

exports.getData = async (req, res) => {
    try {
        const newQuery = new ConversionDataQuery (req);
        console.log(newQuery.validate());
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
        } 
        throw new Error ('no data found!');
    } catch (err) {
        res.status(204).json({
            message: 'No data availiable',
            err: err
        })
    } 
}

