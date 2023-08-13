const Taxes = require("./Taxes");

class SGST extends Taxes {
    #SGSTAmount = 0;



    #calculatedSGST() {
        if (this.getTypeOfProudct() === 'A') {
            return this.#SGSTAmount = ((this.getTaxable()) * super.typeATaxPerc) / 100;
        } else if (this.getTypeOfProudct() === 'B') {
            return this.#SGSTAmount = ((this.getTaxable()) * this.typeBTaxPerc) / 100;
        } else if (this.getTypeOfProudct() === 'C') {
            return this.#SGSTAmount = ((this.getTaxable()) * this.typeCTaxPerc) / 100;
        } else {
            return this.#SGSTAmount;
        }
    }

    getCalculatedSGST() {
        return this.#calculatedSGST();
    }
}

module.exports = SGST;