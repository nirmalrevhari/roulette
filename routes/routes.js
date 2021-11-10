const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const casinoController = require('../controllers/casinoController');
const dealerController = require('../controllers/dealerController');
// const gameController = require('../controllers/gameController');
// const betController = require('../controllers/betController');

// User routes
router.post('/users/register', userController.register)
router
    .route('/users')
    .get(userController.getAllUsers);
router
    .route('/users/:id')
    .get(userController.getUser)
    .patch(userController.updateUser);
router.patch('/users/:id/enterCasino', userController.enterCasino);
router.patch('/users/:id/recharge', userController.rechargeBalance)
router.get('/users/:id/listGames', userController.listGames);
router.post('/users/:id/bet', userController.betGame);

// Casino routes
router.post('/casino/register', casinoController.register)
router
    .route('/casino')
    .get(casinoController.getAllCasinos);
router
    .route('/casino/:id')
    .get(casinoController.getCasino)
    .patch(casinoController.updateCasino);
router.patch('/casino/:id/recharge', casinoController.rechargeCasino)

// Dealer routes
router
    .route('/dealer')
    .get(dealerController.getAllDealers)
    .post(dealerController.register);
router.get('/dealer/list/:casinoId', dealerController.list);
router.post('/dealer/:id/startGame', dealerController.startGame);
router.post('/dealer/:id/stopGame', dealerController.stopGame);
router.post('/dealer/:id/throwBall', dealerController.throwBall);
router
    .route('/dealer/:id')
    .get(dealerController.getDealer)
    .patch(dealerController.updateDealer);



module.exports = router;