const CGST = require("./CGST");
const SGST = require("./SGST");

class Product {
    #name = "";
    #type = "";
    #price = "";
    #sgst = 0;
    #cgst = 0;
    #discount = 0;
    #mrp = 0;
    quantity = 0;

    createProduct(productName, productType, productPrice) {
        this.#name = productName;
        this.#type = productType;
        this.#price = productPrice;
        return {
            name: this.#name,
            type: this.#type,
            price: this.#price,
            sgst: this.#calculateSGST(),
            cgst: this.#calculateCGST(),
            mrp: this.#calculateMRP()
        }
    }

    #calculateSGST() {
        /** use sgst class */
        const sgst = new SGST();
        sgst.setTypeProduct(this.#type);
        sgst.setTaxable(this.#price);
        this.#sgst = sgst.getCalculatedSGST();
        return this.#sgst;
    }

    #calculateCGST() {
        /** use cgst class */
        const cgst = new CGST();
        cgst.setTypeProduct(this.#type);
        cgst.setTaxable(this.#price);
        this.#cgst = cgst.getCalculatedCGST();
        return this.#cgst;
    }

    #calculateMRP() {
        return this.#mrp = (this.#price + this.#calculateSGST() + this.#calculateCGST()) - this.#discount;
    }

}

module.exports = Product;