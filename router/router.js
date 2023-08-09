const express = require('express');
const router = express.Router();

const organizationController = require('../controller/organization.controller');
const productController = require('../controller/product.controller');
const customerController = require('../controller/customer.controller');
const JWTFeatures = require('../helpers/jwt');

const JWT = new JWTFeatures();


router.get('/register', (req, res) => JWT.getJWTToken(req, res))
router.post('/organization/create', (req, res) => organizationController.insertOrganization(req, res));
router.post('/organization/:id', (req, res) => organizationController.getOrganizationById(req, res));

router.post('/product/create', (req, res) => productController.insertProduct(req, res));
router.post('/customer/create', (req, res) => customerController.insertCustomerRecord(req, res));

module.exports = router;