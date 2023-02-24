function ConvertHandler() {
  const units = [
    "gal",
    "l",
    "mi",
    "km",
    "kg",
    "lbs",
    "g",
    "mg",
    "cm",
    "ft",
    "in",
    "mm",
    "ac",
    "floz",
    "m",
    "pt",
    "qt",
    "cup",
    "cl",
    "ml",
    "sqkm",
    "sqm",
    "sqcm",
    "sqft",
    "sqin",
    "sqmm",
    "sqmi",
    "sqyd",
    "acre",
    "ha",
    "c",
    "f",
    "cg"
  ];

  this.removeSpaces = function (input) {
    input = input.replace(/\s+/g, "");
    return input;
  };

  this.getNum = function (input) {
    let result = input.split(/[a-zA-Z]/).filter((e) => e); //split input into array, filter out empty strings

    function evaluateNumber(valString) {
      let arr = valString.split("/");

      if (arr.length === 2) {
        // if there is a fraction, evaluate it
        return parseFloat(arr[0] / arr[1]);
      }
      if (arr.length === 1) {
        // if there is no fraction
        return parseFloat(arr[0]);
      }

      return NaN;
    }

    if (result.length === 0) {
      // if there is no number
      return 1;
    }

    let evaluated = evaluateNumber(result[0]);
    if (result.length > 1 || isNaN(evaluated)) {
      //verify that there is only one result and that it is a number
      return 'invalid number';
    }
    return evaluated;
  };

  this.getUnit = function (input) {
    let result = input.split(/[\d\./]/).filter((e) => e); //split input into array, filter out empty strings
    if (result.length > 1 || !units.includes(result[0].toLowerCase())) {
      //verify that there is only one result and that it is a unit
      return "invalid unit";
    }
    if (["l", "L"].includes(result[0])) return "L"; //special case for liters
    return result[0].toLowerCase();
  };

  this.getReturnUnit = function (initUnit) {
    let result;
    switch (initUnit) {
      // volume
      case "gal":
        result = "L";
        break;
      case "L":
        result = "gal";
        break;
      case "cl":
        result = "floz";
        break;
      case "ml":
        result = "floz";
        break;
      case "pt":
        result = "L";
        break;
      case "qt":
        result = "L";
        break;
      case "cup":
        result = "L";
        break;


      // mass
      case "lbs":
        result = "kg";
        break;
      case "kg":
        result = "lbs";
        break;
      case "g":
        result = "oz";
        break;
      case "mg":
        result = "oz";
        break;
      case "oz":
        result = "g";
        break;
      case "cg":
        result = "oz";
        break;

      // distance
      case "mi":
        result = "km";
        break;
      case "km":
        result = "mi";
        break;
      case "ft":
        result = "m";
        break;
      case "in":
        result = "cm";
        break;
      case "cm":
        result = "in";
        break;
      case "mm":
        result = "in";
        break;
      case "m":
        result = "ft";
        break;
      case "yd":
        result = "m";
        break;

      // area
      case "sqft":
        result = "sqm";
        break;
      case "sqin":
        result = "sqcm";
        break;
      case "sqmm":
        result = "sqin";
        break;
      case "sqm":
        result = "sqft";
        break;
      case "sqcm":
        result = "sqin";
        break;
      case "sqkm":
        result = "ac";
        break;
      case "sqyd":
        result = "sqm";
        break;
      case "ac":
        result = "sqm";
        break;
      case "ha":
        result = "ac";
        break;
      case "sqmi":
        result = "sqkm";
        break;

      // temperature
      case "f":
        result = "c";
        break;
      case "c":
        result = "f";
        break;

      default:
        result = "invalid unit";
    }

    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;
    switch (unit) {
      // volume
      case "gal":
        result = "gallons";
        break;
      case "L":
        result = "liters";
        break;
      case "floz":
        result = "fluid ounces";
        break;
      case "pt":
        result = "pints";
        break;
      case "qt":
        result = "quarts";
        break;
      case "cup":
        result = "cups";
        break;
      case "cl":
        result = "centiliters";
        break;
      case "ml":
        result = "milliliters";
        break;

      // mass
      case "lbs":
        result = "pounds";
        break;
      case "kg":
        result = "kilograms";
        break;
      case "g":
        result = "grams";
        break;
      case "cg":
        result = "centigrams";
        break;
      case "mg":
        result = "milligrams";
        break;
      case "oz":
        result = "ounces";
        break;


      // distance
      case "mi":
        result = "miles";
        break;
      case "km":
        result = "kilometers";
        break;
      case "m":
        result = "meters";
        break;
      case "cm":
        result = "centimeters";
        break;
      case "mm":
        result = "millimeters";
        break;
      case "ft":
        result = "feet";
        break;
      case "in":
        result = "inches";
        break;
      case "yd":
        result = "yards";
        break;
      
      // area
      case "sqft":
        result = "square feet";
        break;
      case "sqin":
        result = "square inches";
        break;
      case "sqmm":
        result = "square millimeters";
        break;
      case "sqcm":
        result = "square centimeters";
        break;
      case "sqm":
        result = "square meters";
        break;
      case "sqkm":
        result = "square kilometers";
        break;
      case "ac":
        result = "acres";
        break;
      case "ha":
        result = "hectares";
        break;
      case "sqmi":
        result = "square miles";
        break;

      // temperature
      case "c":
        result = "celsius";
        break;
      case "f":
        result = "fahrenheit";
        break;
      
      default:
        result = "invalid unit";
    }

    return result;
  };

  this.convert = function (initNum, initUnit) {
    // distance
    const miToKm = 1.60934;
    const ydToM = 0.9144;
    const ftToM = 0.3048;
    const inToCm = 2.54;
    const inToMm = 25.4;

    // area
    const sqydToSqm = 0.836127;
    const sqftToSqm = 0.09290304;
    const sqinToSqcm = 6.4516;
    const sqinToSqmm = 645.16;
    const acreToSqKm = 0.40468564224;
    const sqmiToSqkm = 2.59;
    const haToAcre = 2.4711;

    // volume
    const galToL = 3.78541;
    const ptToL = 0.473176473;
    const qtToL = 0.946352946;
    const cupToL = 0.2365882365;
    const flozToCl = 0.946352946;
    const flozToMl = 29.5735;

    // mass
    const lbsToKg = 0.453592;
    const ozToG = 28.3495
    const ozToMg = 28349.5;
    const ozToCg = 2834.95000;

    // temperature
    const fToC = 0.55555555556;
    let result;

    switch (initUnit) {
      // volume
      case "gal":
        result = initNum * galToL;
        break;
      case "L":
        result = initNum / galToL;
        break;
      case "pt":
        result = initNum * ptToL;
        break;
      case "qt":
        result = initNum * qtToL;
        break;
      case "cup":
        result = initNum * cupToL;
        break;
      case "floz":
        result = initNum * flozToMl;
        break;
      case "cl":
        result = initNum * flozToCl;
        break;
      case "ml":
        result = initNum / flozToMl;
        break;

      // mass
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "oz":
        result = initNum * ozToG;
        break;
      case "mg":
        result = initNum / ozToMg;
        break;
      case "g":
        result = initNum / ozToG;
        break;
      case "cg":
        result = initNum / ozToCg;

      // distance
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      case "yd":
        result = initNum * ydToM;
        break;
      case "m":
        result = initNum / ydToM;
        break;
      case "in":
        result = initNum * inToCm;
        break;
      case "cm":
        result = initNum / inToCm;
        break;
      case "mm":
        result = initNum / inToMm;
        break;
      case "ft":
        result = initNum * ftToM;
        break;

      //area
      case "ha":
        result = initNum * haToAcre;
        break;
      case "sqyd":
        result = initNum * sqydToSqm;
        break;
      case "sqm":
        result = initNum / sqydToSqm;
        break;
      case "sqft":
        result = initNum * sqftToSqm;
        break;
      case "sqin":
        result = initNum * sqinToSqcm;
        break;
      case "sqcm":
        result = initNum / sqinToSqcm;
        break;
      case "sqmm":
        result = initNum / sqinToSqmm;
        break;
      case "ac":
        result = initNum * acreToSqKm;
        break;
      case "sqkm":
        result = initNum / acreToSqKm;
        break;
      case "sqmi":
        result = initNum * sqmiToSqkm;
        break;

      // temperature
      case "f":
        result = initNum * fToC;
        break;
      case "c":
        result = initNum / fToC;
        break;

      default:
        result = "invalid unit";
    }

    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;
    if (initNum === "invalid number" && initUnit === "invalid unit") {
      result = "invalid number and unit";
    } else if (initNum === "invalid number") {
      result = "invalid number";
    } else if (initNum === Infinity) {
      result = "don't divide by zero";
    } else if (initUnit === "invalid unit") {
      result = "invalid unit";
    } else {
      result =
        initNum +
        " " +
        this.spellOutUnit(initUnit) +
        " converts to " +
        returnNum.toFixed(3) +
        " " +
        this.spellOutUnit(returnUnit);
    }

    return result;
  };
}

module.exports = ConvertHandler;
