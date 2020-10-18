const request = require('supertest');
const index = require('.././index');
const Conversion = require('../models/Conversion');

beforeAll( async () => {
   await Conversion.deleteMany();
});

test('Should add new Conversion to DB', async () => {
   await request(index).post('/conversions/addOne').send({
      name: 'new conversion'
   }).expect(200);
});

test('Conversion should not be added, because it exists already', async () => {
   await request(index).post('/conversions/addOne').send({
      name: 'new conversion'
   }).expect(202);
});

test('Conversion should not be added, because we entered an empty string', async () => {
   await request(index).post('/conversions/addOne').send({
      name: ''
   }).expect(202);
});

test('Conversion should not be added, name must be a string', async () => {
   await request(index).post('/conversions/addOne').send({
      name: 33
   }).expect(202);
})
