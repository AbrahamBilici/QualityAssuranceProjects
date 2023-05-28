const returnUnits = {
  gal: "L",
  L: "gal",
  mi: "km",
  km: "mi",
  lbs: "kg",
  kg: "lbs",
}


const unitNames = {
  gal: "gallons",
  mi: "miles",
  km: "kilometers",
  lbs: "pounds",
  kg: "kilograms",
}
const shortUnits = ["gal", "mi", "km", "lbs", "kg"]
function ConvertHandler() {





  this.getNum = function (input) {
    const letter = /^[a-zA-Z]+$/.exec(input);
    const afterLetters = /[a-zA-Z]+$/.exec(input);
    const pattern = /^\d+(?:\.\d+)?(?:\/\d+(?:\.\d+)?)?[a-zA-Z]+$/;
    const numbers = /^(.*?)(?=[a-zA-Z])/;

    if (input === "") {

      return 1;

    } else if (letter !== null) {

      return 1;

    } else if (afterLetters === null && input !== "" && letter === null) {

      return "invalid number"

    } else if (input[0] === ".") {

      const newInput = 0 + input;

      const chk = pattern.exec(newInput);
      if (chk === null) {

        return "invalid number"

      } else {

        const result = numbers.exec(newInput)[0];
        if (result.includes("/")) {
          const parts = result.split("/");
          const numerator = parseFloat(parts[0]);
          const denominator = parseFloat(parts[1]);
          const num = numerator / denominator;
          return num;
        } else {
          const num = Number(result);
          return num;
        }
      }
    } else {

      const chk = pattern.exec(input);

      if (chk === null) {

        return "invalid number"

      } else {

        const result = numbers.exec(input)[0];
        if (result.includes("/")) {
          const parts = result.split("/");
          const numerator = parseFloat(parts[0]);
          const denominator = parseFloat(parts[1]);
          const num = numerator / denominator;
          return num;
        } else {
          const num = Number(result);
          return num;
        }
      }
    }
  };








  this.getUnit = function (input) {
    const pattern = /[a-zA-Z]+$/;
    let result = pattern.exec(input)[0];

    if (result.toLowerCase() === "l") {
      return "L"
    } else if (shortUnits.includes(result.toLowerCase())) {
      return result.toLowerCase();
    } else {
      return "invalid unit";
    }




  };

  this.getReturnUnit = function (initUnit) {
    return returnUnits[initUnit];
  };

  this.spellOutUnit = function (unit) {
    const lowercaseUnit = unit.toLowerCase();
    if (lowercaseUnit === "l") {
      return "liters";
    } else {
      return unitNames[lowercaseUnit];
    }
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    const conversionRate = {
      gal: galToL,
      L: 1 / galToL,
      mi: miToKm,
      km: 1 / miToKm,
      lbs: lbsToKg,
      kg: 1 / lbsToKg
    }

    const numericInitNum = parseFloat(initNum);
    const returnRate = conversionRate[initUnit] * numericInitNum;
    return Number(returnRate.toFixed(5));

  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    const unitName = this.spellOutUnit(initUnit);
    const returnUnitName = this.spellOutUnit(returnUnit);
    let result = `${initNum} ${unitName} converts to ${returnNum} ${returnUnitName}`;

    return result;
  };

}

module.exports = ConvertHandler;
