// const express = require('express');
// const router = express.Router();
// const stripe = require('stripe')('sk_test_51HOh8WKPrBKz6xdyLgvtL54gxQVJQJTktlReZhDcAGXq218R6aH0e5dSIrFHZ3bFLFqzxgLGKmryi3jvimx6EG9N00I4T1s0x5')

// // var response = await http.post(
// //     Uri.parse('https://api.stripe.com/v1/payment_intents'),
// //     headers => {
// //       'Authorization':
// //       'Bearer sk_test_51HOh8WKPrBKz6xdyLgvtL54gxQVJQJTktlReZhDcAGXq218R6aH0e5dSIrFHZ3bFLFqzxgLGKmryi3jvimx6EG9N00I4T1s0x5',
// //       'Content-Type': 'application/x-www-form-urlencoded'


// router.post('/process', async (req,res) => {
//     const { amount, token } = req.body;
// console.log("22222222222222222", req.body );
//     try{
//         const paymentIntent = await stripe.paymentIntents.create ({
//             'amount': amount,
//             'currency': 'usd ',
//             'payment_method_types[]': 'card',
//             //'confirmation_method': 'manual',
//             // "metadata[orderId]": '$OrderId',
//             'confirm': 'true',
//         });

//         if (paymentResult.success) {
//             // Payment successfull
//             res.json({ message: 'Payment successful!' });

//         } else {
//             //payment failed
//             res.status(400).json({ message: 'Payment failed. Please try again.' });
//         }
//     } catch (error) {
//         console.error("11111111111111111",error);
//         res.status(500).json({ message: 'Internal server error' });
//     }

// });

// module.exports = router;


const mongoose = require("mongoose"); 
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));
'Authorization: Bearer sk_test_51HOh8WKPrBKz6xdyLgvtL54gxQVJQJTktlReZhDcAGXq218R6aH0e5dSIrFHZ3bFLFqzxgLGKmryi3jvimx6EG9N00I4T1s0x5';
      'Content-Type : application/x-www-form-urlencoded';

const paymentController = require('./paymentController');
const router = require('./authRoutes');

router.post('/create-customer', paymentController.createCustomer);
router.post('/add-card', paymentController.addNewCard);
router.post('/create-charges', paymentController.createCharges);

module.exports = router;
