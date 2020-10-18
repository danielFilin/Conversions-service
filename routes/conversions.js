const express = require('express');
const router = express.Router();

const conversionsController = require('../controllers/conversions');

router.post('/conversions/addOne', conversionsController.addConversion);

router.get('/conversions/getAllData', conversionsController.getAllData);

router.get('/conversions/inrange/:startDate/:endDate/:conversionName', conversionsController.getConversionData);

router.get('/conversions/:query', conversionsController.conversionCall);

module.exports = router;