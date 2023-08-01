class Taxes {
    #taxable = 0;
    #typeOfProduct = ""

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
}

module.exports = Taxes;