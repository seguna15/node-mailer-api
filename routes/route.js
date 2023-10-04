const router = require('express').Router();
const { signUp, getBill, test } = require('../controllers/appController');

/** HTTP Requests */
router.post('/user/signup', signUp );
router.post("/product/getbill", getBill);
router.get('/test', test)

module.exports = router;