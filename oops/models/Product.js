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
    #availableQuanity = 0;

    createProduct(productName, productType, productPrice, availableQuantity) {
        this.#name = productName;
        this.#type = productType;
        this.#price = productPrice;
        this.#availableQuanity = availableQuantity
        return {
            name: this.#name,
            type: this.#type,
            price: this.#price,
            sgst: this.#calculateSGST(),
            cgst: this.#calculateCGST(),
            mrp: this.#calculateMRP(),
            availableQuantity: this.#availableQuanity
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

    buyProducts(...products) {
        let purchasedProduct = []
        for (let i = 0; i < products.length; i++) {
            if (products[i].product.availableQuantity > 0) {
                purchasedProduct.push(Object.assign({}, products[i].product, { purchasedQty: products[i].qty }));
                products[i].product.availableQuantity -= products[i].qty
                this.#updateAvailableQty(products[i].product)
            } else {
                return;
            }
        }
        return purchasedProduct;
    }

    #updateAvailableQty(updatedQty) {
        /**
         * update available quantity after buy the product
         */
        console.log("updated quantity", updatedQty)
    }

}

module.exports = Product;