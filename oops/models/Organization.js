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

module.exports = Organization;