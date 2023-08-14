const Taxes = require("../models/Taxes");

class TaxController {

    updateTaxTypeA(req, res) {
        console.log("***", req.body)
        const requestBody = req.body;
        if (requestBody.updatedSGSTTypeARate > 0) {
            Taxes.updateTypeAperc(requestBody.updatedSGSTTypeARate);
            res.json({ message: 'Tax value updated' });
        } else {
            return res.json({ message: 'invalid value' })
        }

    }
}

const taxController = new TaxController();
module.exports = taxController;