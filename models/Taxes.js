class Taxes {
    #taxable = 0;
    #typeOfProduct = "";
    static #typeATaxPerc = 2.50;
    #typeBTaxPerc = 6;
    #typeCTaxPerc = 9;

    setTaxable(taxable) {
        this.#taxable = taxable;
    }

    getTaxable() {
        return this.#taxable;
    }

    setTypeProduct(productType) {
        this.#typeOfProduct = productType;
    }

    getTypeOfProudct() {
        return this.#typeOfProduct;
    }

    get typeATaxPerc() {
        return Taxes.#typeATaxPerc;
    }

    get typeBTaxPerc() {
        return this.#typeBTaxPerc;
    }

    get typeCTaxPerc() {
        return this.#typeCTaxPerc;
    }

    static updateTypeAperc(newTaxARate) {
        Taxes.#typeATaxPerc = newTaxARate;
    }
}

module.exports = Taxes;