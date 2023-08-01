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
    #phoneNumber = "";
    #emailId = "";

    createOrganization(name, addressLine1, addressLine2, city, pincode, gstNumber, phonenumber, emailId) {
        this.#name = name;
        this.#addressLine1 = addressLine1;
        this.#addressLine2 = addressLine2;
        this.#city = city;
        this.#pincode = pincode;
        this.#gstNumber = gstNumber;
        this.#phoneNumber = phonenumber;
        this.#emailId = emailId
    }

    printOraganizationDetails() {
        return `***************${this.#name}***************\n${this.#addressLine1}\n${this.#addressLine2}\n${this.#city} - ${this.#pincode}\n${this.#phoneNumber}\n${this.#emailId}\nGST: ${this.#gstNumber}`

    }
}
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

class SGST extends Taxes {
    #SGSTAmount = 0;
    #typeATaxPerc = 2.50;
    #typeBTaxPerc = 6;
    #typeCTaxPerc = 9;


    #calculatedSGST() {
        if (this.getTypeOfProudct() === 'A') {
            return this.#SGSTAmount = ((this.getTaxable()) * this.#typeATaxPerc) / 100;
        } else if (this.getTypeOfProudct() === 'B') {
            return this.#SGSTAmount = ((this.getTaxable()) * this.#typeBTaxPerc) / 100;
        } else if (this.getTypeOfProudct() === 'C') {
            return this.#SGSTAmount = ((this.getTaxable()) * this.#typeCTaxPerc) / 100;
        } else {
            return this.#SGSTAmount;
        }
    }

    getCalculatedSGST() {
        return this.#calculatedSGST();
    }
}

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
            this.billAmount += customerPurchasedProducts[i]?.mrp * customerPurchasedProducts[i]?.purchasedQuantity;
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
        console.log("********************************************");
        console.log(`Bill number: ${this.billNumber}`);
        console.log(`Hello ${this.customer.name}, Please check your bill`);
        for (let i = 0; i < this.customer.products.length; i++) {
            console.log("____________________________________________________")
            console.log(`${i + 1}. ${this.customer.products[i].name} - ${this.customer.products[i].purchasedQuantity} X ${this.customer.products[i].mrp} `)
            console.log("____________________________________________________")
        }
        console.log(`Your bill amount:Rs. ${this.calculateBillAmount()}`);
        console.log(`Today discount:Rs. ${this.calculateDiscountAmount()}`);
        console.log(`Amount to pay:Rs. ${this.calculateAmountToPay()}`);
        console.log("**********************Happy shopping!!!*************************");
    }

}



/** Logic section ends */

/** Configuration section start */

/**Org */
const store = new Organization();
store.createOrganization("ABCD HYPERMARKET", "21, TVS Avenue", "North coimbatore", "Coimbatore", 641035, "29GGGGG1314R9Z6", "9898541202", "info@abchypermarket.com");
const storeDetails = store.printOraganizationDetails();

/**Taxes */
/**
 * configure sgst
 * configure cgst
 * configure igst
 */

/**Product */
const product = new Product();
const sugar = product.createProduct("Sugar", "A", 52);
const cheese = product.createProduct("Cheese", "B", 50);
const toothpaste = product.createProduct("Toothpaste", "C", 20);

/** Configuration section ends */

/** Customer section start */
const customer = new Customer();
customer.name = "Sherin";
customer.buyProducts(sugar, 2);
customer.buyProducts(cheese, 1);
customer.buyProducts(toothpaste, 1);

/** Customer section ends */

/*** Billing section start*/
const bill = new Bill(storeDetails, "1000", customer)
bill.generateBill();

/*** Billing section ends*/

