const express = require('express');
const router = express.Router();

const organizationController = require('../controller/organization.controller');
const productController = require('../controller/product.controller');
const customerController = require('../controller/customer.controller');
const JWTFeatures = require('../helpers/jwt');
const TaxController = require('../controller/tax.controller');
const taxController = require('../controller/tax.controller');

const JWTObj = new JWTFeatures();


router.get('/register', (req, res) => JWTObj.getJWTToken(req, res));
router.get('/getAccessToken', (req, res) => JWTObj.getAccessTokenUsingRefershToken(req, res));
router.post('/organization/create', JWTObj.verifiyToken, (req, res) => organizationController.insertOrganization(req, res));
router.post('/organization/:id', JWTObj.verifiyToken, (req, res) => organizationController.getOrganizationById(req, res));

router.post('/product/create', JWTObj.verifiyToken, (req, res) => productController.insertProduct(req, res));
router.post('/customer/create', JWTObj.verifiyToken, (req, res) => customerController.insertCustomerRecord(req, res));

router.post('/update/sgst/rate/typea', JWTObj.verifiyToken, (req, res) => taxController.updateTaxTypeA(req, res))

module.exports = router;