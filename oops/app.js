/**
 * Create departmental store billing system
 * Customer can get discount on particular product
 * Customer needs the total amount in the bill
 * Bill should contains the list of items
 * 
 */

/** Imports section start */
const Bill = require('./models/Bill');
const Customer = require('./models/Customer');
const Organization = require('./models/Organization');
const Product = require('./models/Product');
/** Imports section ends */

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
const sugar = product.createProduct("Sugar", "A", 52, 20, 1000);
const cheese = product.createProduct("Cheese", "B", 50, 40, 250);
const toothpaste = product.createProduct("Toothpaste", "C", 20, 70, 100);

/** Configuration section ends */

/** Customer section start */
const customer = new Customer("Sherin");
// let value = customer.updateCustomerCart(product.buyProducts(sugar, 1));
let purchasedProduct = product.buyProducts({ product: sugar, qty: 10 }, { product: cheese, qty: 1 }, { product: toothpaste, qty: 5 });
customer.updateCustomerCart(purchasedProduct);
// customer.buyProducts(sugar, 2);
// customer.buyProducts(cheese, 1);
// customer.buyProducts(toothpaste, 1);

/** Customer section ends */

/*** Billing section start*/
const bill = new Bill(storeDetails, "1000", customer.customerDetails)
bill.generateBill();

/*** Billing section ends*/

