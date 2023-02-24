const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
        //#1
        test('Convert valid input', function(done) {
            chai.request(server)
                .get('/api/convert')
                .query({ input: '1.5km' })
                .end(function(err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.text, "1.5 kilometers converts to 0.932 miles");
                    done();
                });
        });
        //#2
        test('Convert invalid unit', function(done) {
            chai.request(server)
                .get('/api/convert')
                .query({ input: '1.5kmj' })
                .end(function(err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.text, 'invalid unit');
                    done();
                });
        });
        // #3
        test("convert invalid number", function(done) {
            chai.request(server)
                .get('/api/convert')
                .query({ input: '1/3/4km' })
                .end(function(err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.text, 'invalid number');
                    done();
                });
        });
        // #4
        test("invalid unit and number", function(done) {
            chai.request(server)
                .get('/api/convert')
                .query({ input: '1/3/4kmj' })
                .end(function(err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.text, 'invalid number and unit');
                    done();
                });
        });
        // #5
        test("no number", function(done) {
            chai.request(server)
                .get('/api/convert')
                .query({ input: 'km' })
                .end(function(err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.text, '1 kilometers converts to 0.621 miles');
                    done();
                });
        });

});
