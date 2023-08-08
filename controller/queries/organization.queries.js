//'INSERT INTO organization (name, addressLine1, addressLine2, city, pincode, gstNumber, phonenumber, emailId) VALUES (?, ?, ?, ?, ?, ?, ?, ?) '
class OrganizationQueries {
    #createOrganizationQ = `
    CREATE TABLE IF NOT EXISTS organization 
    (
    id int AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL, 
    addressLine1 VARCHAR(255) NOT NULL, 
    addressLine2 VARCHAR(255) NOT NULL, 
    city VARCHAR(255) NOT NULL, 
    pincode VARCHAR(255) NOT NULL, 
    gstNumber VARCHAR(255) NOT NULL, 
    phonenumber VARCHAR(255) NOT NULL, 
    emailId VARCHAR(255)
    )
    `;

    #insertOrganizatonQ = `INSERT INTO organization (name, addressLine1, addressLine2, city, pincode, gstNumber, phonenumber, emailId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    #getOrganizationByIdQ = `SELECT * FROM organization WHERE id = ?`;

    get createOrganizationQ() {
        return this.#createOrganizationQ;
    }

    get insertOrganizatonQ() {
        return this.#insertOrganizatonQ;
    }

    get organizationByIdQ() {
        return this.#getOrganizationByIdQ;
    }
}

const orgQueries = new OrganizationQueries();
module.exports = orgQueries;