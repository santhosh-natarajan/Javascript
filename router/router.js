const express = require('express');
const router = express.Router();

const organizationController = require('../controller/organization.controller');
const productController = require('../controller/product.controller');


router.post('/organization/create', (req, res) => organizationController.insertOrganization(req, res));
router.post('/product/create', (req, res) => productController.insertProduct(req, res))

module.exports = router;