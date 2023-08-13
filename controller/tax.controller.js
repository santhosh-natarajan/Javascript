const Taxes = require("../models/Taxes");

class TaxController {

    updateTaxTypeA(newTaxRate) {
        Taxes.updateTypeAperc(newTaxRate);
    }
}

module.exports = TaxController;