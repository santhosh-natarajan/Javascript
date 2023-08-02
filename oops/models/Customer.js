class Customer {
    name = "";
    #cart = [];

    constructor(name) {
        this.name = name;
    }

    updateCustomerCart(product) {
        this.#cart = product;
    }

    get customerDetails() {
        return {
            name: this.name,
            cart: this.#cart
        }
    }

}
module.exports = Customer;