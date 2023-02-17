const router = require('express').Router();
const { signUp, getBill } = require('../controllers/appController');

/** HTTP Requests */
router.post('/user/signup', signUp );
router.post("/product/getbill", getBill);

module.exports = router;