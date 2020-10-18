const request = require('supertest');
const index = require('.././index');
const Analytics = require('../models/Analytics');

beforeAll( async () => {
    await Analytics.deleteMany();
 })

test('Should fail to add conversion call, on conversion that was not added yet', async () => {
    await request(index).get('/conversions/notthere').expect(202);
 });

 test('Should add conversion call', async () => { 
   await request(index).post('/conversions/addOne').send({
      name: 'testone'
   }).expect(200);
    const conversionData = await Analytics.findOne({name: 'testone'});
    expect(conversionData.totalCalls).toBe(0);
 }); 

 test('Should increment calls on testone by 1 and show number of calls 1', async () => { 
    await request(index).get('/conversions/testone').expect(200);
    const conversionData = await Analytics.findOne({name: 'testone'});
    expect(conversionData.totalCalls).toBe(1)
 });

 test('Should get all conversion data from data base', async () => { 
    const testAnalytics = await request(index).get('/conversions/getAllData').expect(200);
    const dbAnalytics = await Analytics.find();
    expect(JSON.parse(testAnalytics.text).data._id).toEqual(dbAnalytics._id);
 }); 

 test('Should get conversion data for testone for the last hour', async () => { 
    const startDate = new Date();
    startDate.setHours(startDate.getHours()-1);
    const endDate = new Date();
    endDate.setHours(endDate.getHours()+1);
    const testAnalytics = await request(index).get(`/conversions/inrange/${startDate}/${endDate}/testone`).expect(200);
    const dbAnalytics = await Analytics.find({name: 'testone', calls:  { $gte: startDate, $lte: endDate }});
    expect(JSON.parse(testAnalytics.text).data._id).toEqual(dbAnalytics._id);
 }); 




