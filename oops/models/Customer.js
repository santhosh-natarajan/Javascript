class Customer {
    name = "";
    products = [];

    constructor(name) {
        this.name = name;
    }

    buyProducts(product, purchasedQuantity) {
        this.products.push(Object.assign({}, product, { purchasedQuantity }))
    }

}
module.exports = Customer;