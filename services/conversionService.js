const Analytics = require("../models/Analytics");
const Conversion = require("../models/Conversion");

const addConversion = async (newConversionDTO) => {
    const newConversion = new Conversion ({
        name: newConversionDTO.name
    });
    try {
        const result = await newConversion.save();
        const newAnalytics = new Analytics ({
            name: newConversionDTO.name,
            calls: [],
            totalCalls: 0
        });
        await newAnalytics.save();
        return result;
    } catch (err) {
        console.log(err);
        return false;
    }
}

const addConversionCall = async (conversionCallDTO) => {
    try {
        const conversion = await Conversion.find({name: conversionCallDTO});
        if (conversion.length) {
            const isCreated = await Analytics.find({name: conversionCallDTO});
            isCreated[0].calls.push(Date.now());
            isCreated[0].totalCalls++;
            await isCreated[0].save();
        } else {
            throw new Error('No conversion for the given call!');
        } 
    } catch (err) {
        return err;
    }
}

const getAllConversionData = async () => {   
    try {
        const analytics = await Analytics.find();
        return analytics;
    } catch (err) {
        return err;
    }
}

const getDataInRange = async (startDate, endDate, conversionName) => {
    try {
        const analytics = await Analytics.find({name: conversionName, calls:  { $gte: startDate, $lte: endDate }});
        return analytics;
    } catch (err) {
        return err;
    }
}

module.exports = {
    addConversion,
    addConversionCall,
    getAllConversionData,
    getDataInRange
  }