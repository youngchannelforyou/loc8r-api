const express = require('express');
const router = express.Router();
const ctrlLocations = require('../controllers/locations');
const ctrlReviews = require('../controllers/reviews');
const ctrlAuth = require('../controllers/authentication')
const { expressjwt: jwt } = require('express-jwt');
const auth = jwt({
    // secret: process.env.JWT_SECRET,
    secret: '2018250034',
    algorithms: ['HS256'],
    userProperty: 'req.auth'
});

// locations
router
    .route('/locations')
    .get(ctrlLocations.locationsListByDistance)
    .post(ctrlLocations.locationsCreate);

router
    .route('/locations/:locationid')
    .get(ctrlLocations.locationsReadOne)
    .put(ctrlLocations.locationsUpdateOne)
    .delete(ctrlLocations.locationsDeleteOne);

// reviews
router
    .route('/locations/:locationid/reviews')
    .post(auth, ctrlReviews.reviewsCreate);

router
    .route('/locations/:locationid/reviews/:reviewid')
    .get(ctrlReviews.reviewsReadOne)
    .put(auth, ctrlReviews.reviewsUpdateOne)
    .delete(auth, ctrlReviews.reviewsDeleteOne);

router.route('/register')
    .post(ctrlAuth.register);

router.post('/login', ctrlAuth.login);


module.exports = router;