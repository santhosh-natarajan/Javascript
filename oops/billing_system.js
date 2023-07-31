/**
 * Create departmental store billing system
 * Customer can get discount on particular product
 * Customer needs the total amount in the bill
 * Bill should contains the list of items
 * 
 */

/** Logics section start */
class Organization {
    #name = "";
    #addressLine1 = "";
    #addressLine2 = "";
    #city = "";
    #pincode = 0;
    #gstNumber = "";

    createOrganization(name, addressLine1, addressLine2, city, pincode, gstNumber) {
        this.#name = name;
        this.#addressLine1 = addressLine1;
        this.#addressLine2 = addressLine2;
        this.#city = city;
        this.#pincode = pincode;
        this.#gstNumber = gstNumber;
    }

    printOraganizationDetails() {
        return `***************${this.name}***************\n${this.addressLine1}\n${this.addressLine2}\n${this.city} - ${this.pincode}\nGST: ${this.gstNumber}`
        
    }
}
class Product {
    name = "";
    price = "";
    quantity = 0;

    constructor(name, price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity
    }

}


class Customer {
    name = "";
    products = [];

    constructor(name) {
        this.name = name;
    }

    buyProducts(product, purchasedQuantity) {
        if (product.quantity > 0) {
            this.products.push(Object.assign({}, product, { purchasedQuantity }))
        }
    }

}

class Taxes {
    taxable = 0;
    typeOfProduct = ""

    setTaxable(taxable) {
        return this.taxable = taxable;
    }

    getTaxable() {
        return this.taxable;
    }
}

class SGST extends Taxes {
    #SGSTAmount = 0;

    #calculateSGST() {
        return this.#SGSTAmount = ((this.taxable * 5) / 100);
    }

    getCalculatedSGST() {
        console.log(`Taxable amount from SGST: ${this.#calculateSGST()}`)
    }
}

class CGST extends Taxes {
    getCalculatedSGST() {
        console.log(`Taxable amount from CGST: ${this.taxable}`)
    }
}


class Bill {
    billNumber = "";
    billAmount = 0;
    discoutAmount = 0;
    amountToPay = 0;
    orgDetails = ""

    constructor(orgDetails, billNumber, customer) {
        this.orgDetails = orgDetails;
        this.billNumber = billNumber;
        this.customer = customer
    }


    calculateBillAmount() {
        let customerPurchasedProducts = this.customer.products;
        for (let i = 0; i < customerPurchasedProducts.length; i++) {
            this.billAmount += customerPurchasedProducts[i]?.price * customerPurchasedProducts[i]?.purchasedQuantity;
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

    generateBill() {
        console.log(this.orgDetails);
        console.log(`Bill number: ${this.billNumber}`);
        console.log("********************************************")
        console.log(`Hello ${this.customer.name}, Please check your bill`);
        for (let i = 0; i < this.customer.products.length; i++) {
            console.log("____________________________________________________")
            console.log(`${i + 1}. ${this.customer.products[i].name} - ${this.customer.products[i].purchasedQuantity} X ${this.customer.products[i].price} `)
            console.log("____________________________________________________")
        }
        console.log(`Your bill amount:Rs. ${this.calculateBillAmount()}`);
        console.log(`Today discount:Rs. ${this.calculateDiscountAmount()}`);
        console.log(`Amount to pay:Rs. ${this.calculateAmountToPay()}`);
        console.log("**********************Happy shopping!!!*************************");
    }

}



/** Logic section ends */

/*** Billing section start*/
const store = new Organization();
store.createOrganization("ABCD HYPERMARKET", "21, TVS Avenue", "North coimbatore", "Coimbatore", 641035, "29GGGGG1314R9Z6");
const storeDetails = store.printOraganizationDetails();
const apple = new Product("Apple", 200, 100);
const orange = new Product("Orange", 150, 100);
const graphes = new Product("Graphes", 100, 1000);
const customer = new Customer("Sherin");
customer.buyProducts(apple, 1);
customer.buyProducts(graphes, 2);
customer.buyProducts(orange, 20);
const bill = new Bill(storeDetails, "1000", customer)
// const sgst = new SGST();
// sgst.setTaxable(1000)
// sgst.getCalculatedSGST();
bill.generateBill();

/*** Billing section ends*/

