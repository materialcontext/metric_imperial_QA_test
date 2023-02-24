const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();
const validInputs = ["kg", "KG", "lbs", "LBS", "km", "KM", "mi", "MI", "gal", "GAL", "L", "l"];
const units = {
    "kg": {unit: "kg", name: "kilograms", returnUnit: "lbs"},
    "lbs": {unit: "lbs", name: "pounds", returnUnit: "kg"},
    "km": {unit: "km", name: "kilometers", returnUnit: "mi"},
    "mi": {unit: "mi", name: "miles", returnUnit: "km"},
    "gal": {unit: "gal", name: "gallons", returnUnit: "L"},
    "L": {unit: "L", name: "liters", returnUnit: "gal"},
}

suite('Unit Tests', function(){
    // #1
    test('#1 whole number input', function(done){
        let input = "5kg";
        assert.equal(convertHandler.getNum(input), 5);
        done();
    });
    // #2
    test('#2 decimal number input', function(done){
        let input = "5.5kg";
        assert.equal(convertHandler.getNum(input), 5.5);
        done();
    });
    // #3
    test("#3 fraction input", function(done){
        let input = "1/2kg";
        assert.equal(convertHandler.getNum(input), 0.5);
        done();
    });
    // #4
    test("#4 return error on double fraction", function(done){
        let input = "1/2/3kg";
        assert.equal(convertHandler.getNum(input), "invalid number");
        done();
    });
    // #5
    test("#5 return error on invalid input", function(done){
        let input = "kgs";
        assert.equal(convertHandler.getUnit(input), "invalid unit");
        done();
    });
    // #6
    test("#6 use 1 when no input", function(done){
        let input = "gal";
        assert.equal(convertHandler.getNum(input), 1);
        done();
    });
    // #7
    test("#7 correctly reads all valid inputs", function(done){
        for (i of validInputs) {
            let unit = convertHandler.getUnit(i);
            assert.equal(unit, units[unit].unit);
        }
        done();
    });
    // #8
    test("#8 get correct return unit for each valid input", function(done){
        for (i of validInputs) {
            let unit = convertHandler.getUnit(i);
            assert.equal(convertHandler.getReturnUnit(unit), units[unit].returnUnit);
        }
        done();
    });
    // #9
    test("#9 return the correct full name for each valid input", function(done){
        for (i of validInputs) {
            let unit = convertHandler.getUnit(i);
            assert.equal(convertHandler.spellOutUnit(unit), units[unit].name);
        }
        done();
    });
    // #10
    test("#10 correctly read a fraction with a decimal", function(done){
        let input = "1.2/2kg";
        assert.equal(convertHandler.getNum(input), 0.6);
        done();
    });
    // #11
    test("#11 convert gal to L", function(done){
        let input = "gal";
        let initNum = convertHandler.getNum(input);
        let initUnit = convertHandler.getUnit(input);
        let expected = 3.78541;
        assert.approximately(convertHandler.convert(initNum, initUnit), expected, 0.1);
        done();
    });
    // #12
    test("#12 convert L to gal", function(done){
        let input = "L";
        let initNum = convertHandler.getNum(input);
        let initUnit = convertHandler.getUnit(input);
        let expected = 0.264172;
        assert.approximately(convertHandler.convert(initNum, initUnit), expected, 0.1);
        done();
    });
    // #13
    test(" #13 convert mi to km", function(done){
        let input = "mi";
        let initNum = convertHandler.getNum(input);
        let initUnit = convertHandler.getUnit(input);
        let expected = 1.60934;
        assert.approximately(convertHandler.convert(initNum, initUnit), expected, 0.1);
        done();
    });
    // #14
    test("#14 convert km to mi", function(done){
        let input = "km";
        let initNum = convertHandler.getNum(input);
        let initUnit = convertHandler.getUnit(input);
        let expected = 0.621371;
        assert.approximately(convertHandler.convert(initNum, initUnit), expected, 0.1);
        done();
    });
    // #15
    test("#15 convert kg to lbs", function(done){
        let input = "kg";
        let initNum = convertHandler.getNum(input);
        let initUnit = convertHandler.getUnit(input);
        let expected = 2.20462;
        assert.approximately(convertHandler.convert(initNum, initUnit), expected, 0.1);
        done();
    });
    // #16
    test("#16 convert lbs to kg", function(done){
        let input = "lbs";
        let initNum = convertHandler.getNum(input);
        let initUnit = convertHandler.getUnit(input);
        let expected = 0.453592;
        assert.approximately(convertHandler.convert(initNum, initUnit), expected, 0.1);
        done();
    });
});