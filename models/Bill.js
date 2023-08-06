class Bill {
    billNumber = "";
    billAmount = 0;
    discoutAmount = 0;
    amountToPay = 0;
    orgDetails = "";
    #weightOfCart = 0;

    constructor(orgDetails, billNumber, customer) {
        this.orgDetails = orgDetails;
        this.billNumber = billNumber;
        this.customer = customer
    }


    calculateBillAmount() {
        let customerPurchasedProducts = this.customer.cart;
        for (let i = 0; i < customerPurchasedProducts.length; i++) {
            this.billAmount += customerPurchasedProducts[i]?.mrp * customerPurchasedProducts[i]?.purchasedQty;
            this.#calculateProductWeight(customerPurchasedProducts[i]?.unitWeight * customerPurchasedProducts[i]?.purchasedQty)
        }
        return this.billAmount;
    }

    calculateDiscountAmount() {
        if (this.billAmount <= 1000) {
            this.discoutAmount = 50;
        } else if (this.billAmount > 1000 && this.billAmount <= 5000) {
            this.discoutAmount = 100;
        } else if (this.billAmount > 5000 && this.billAmount <= 10000) {
            this.discoutAmount = 500;
        } else {
            this.discoutAmount = 1000;
        }
        return this.discoutAmount;

    }

    calculateAmountToPay() {
        return this.amountToPay = this.billAmount - this.discoutAmount;
    }

    #calculateProductWeight(unitWeight) {
        return this.#weightOfCart += (unitWeight / 1000); //value in Kilo Gram
    }

    get weightOfCart() {
        return this.#weightOfCart;
    }

    generateBill() {
        console.log(this.orgDetails);
        console.log("********************************************");
        console.log(`Bill number: ${this.billNumber}`);
        console.log(`Hello ${this.customer.name}, Please check your bill`);
        for (let i = 0; i < this.customer.cart.length; i++) {
            console.log("____________________________________________________")
            console.log(`${i + 1}. ${this.customer.cart[i].name} - ${this.customer.cart[i].purchasedQty} X ${this.customer.cart[i].mrp} `)
            console.log("____________________________________________________")
        }
        console.log(`Your bill amount:Rs. ${this.calculateBillAmount()}`);
        console.log(`Today discount:Rs. ${this.calculateDiscountAmount()}`);
        console.log(`Amount to pay:Rs. ${this.calculateAmountToPay()}`);
        console.log(`Total weight: ${this.weightOfCart} Kg`);
        console.log("**********************Happy shopping!!!*************************");
    }

}

module.exports = Bill;