const Taxes = require("./Taxes");

class CGST extends Taxes {
    #CGSTAmount = 0;
    #typeATaxPerc = 2.50;
    #typeBTaxPerc = 6;
    #typeCTaxPerc = 9;


    #calculatedCGST() {
        if (this.getTypeOfProudct() === 'A') {
            return this.#CGSTAmount = ((this.getTaxable()) * this.#typeATaxPerc) / 100;
        } else if (this.getTypeOfProudct() === 'B') {
            return this.#CGSTAmount = ((this.getTaxable()) * this.#typeBTaxPerc) / 100;
        } else if (this.getTypeOfProudct() === 'C') {
            return this.#CGSTAmount = ((this.getTaxable()) * this.#typeCTaxPerc) / 100;
        } else {
            return this.#CGSTAmount;
        }
    }

    getCalculatedCGST() {
        return this.#calculatedCGST();
    }
}

module.exports = CGST;