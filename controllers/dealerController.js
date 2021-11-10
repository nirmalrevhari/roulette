const Dealer = require('../models/dealerModel');
const Game = require('../models/gameModel');
const base = require('./baseController');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const User = require('../models/userModel');
const Bet = require('../models/betModel');
const Casino = require('../models/casinoModel');

exports.register = async (req, res, next) => {
    try {
        const dealer = await Dealer.create({
            name: req.body.name,
            casinoId: req.body.casinoId
        });

        res.status(200).json({
            status: "success",
            data: {
                dealer,
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.list = async (req, res, next) => {
    try {
        const features = new APIFeatures(Dealer.find({ casinoId: req.params.casinoId }), req.query)
            .sort()
            .paginate();

        const doc = await features.query;

        res.status(200).json({
            status: 'success',
            results: doc.length,
            data: {
                data: doc
            }
        });

    } catch (error) {
        next(error);
    }
}

exports.startGame = async (req, res, next) => {
    try {
        const dealer = await Dealer.findById(req.params.id);

        if (!dealer) {
            return next(new AppError(404, 'fail', 'No document found with that id'), req, res, next);
        }

        const doc = await Game.create({
            startTime: Date.now(),
            status: 'active',
            dealerId: req.params.id,
            casinoId: dealer.casinoId
        });
        res.status(200).json({
            status: 'success',
            data: {
                data: doc
            }
        });

    } catch (error) {
        next(error);
    }
}

exports.stopGame = async (req, res, next) => {
    try {
        const doc = await Game.findOneAndUpdate({ dealerId: req.params.id, status: 'active' }, { endTime: Date.now(), status: 'closed' }, {
            new: true,
            runValidators: true
        });

        if (!doc) {
            return next(new AppError(404, 'fail', 'No document found with that id'), req, res, next);
        }

        res.status(200).json({
            status: 'success',
            data: {
                data: doc
            }
        });

    } catch (error) {
        next(error);
    }
}

exports.throwBall = async (req, res, next) => {
    try {
        const thrownNumber = Math.floor((Math.random() * 36) + 1);
        const game = await Game.findById(req.body.gameId);
        const doc = await Game.findOneAndUpdate({ dealerId: req.params.id, status: 'closed', thrownNumber: { $exists: false } }, { thrownNumber: thrownNumber }, {
            new: true,
            runValidators: true
        });

        if (!doc) {
            return next(new AppError(404, 'fail', 'No document found with that id'), req, res, next);
        }

        let totalAmount = 0;
        const winningBets = await Bet.find({ gameId: game._id, betNumber: thrownNumber });
        const winnersIds = winningBets.map(el => el.userId);
        await Promise.all(
            winningBets.map(async _bet => {
                totalAmount = totalAmount + (_bet.amount * 2);
                await User.findByIdAndUpdate(_bet.userId, { $inc: { balance: _bet.amount * 2 } });
            })
        )
        await Casino.findByIdAndUpdate(game.casinoId, { $inc: { balance: totalAmount * -1 } });

        res.status(200).json({
            status: 'success',
            data: {
                data: winnersIds
            }
        });

    } catch (error) {
        next(error);
    }
}

exports.getAllDealers = base.getAll(Dealer);
exports.getDealer = base.getOne(Dealer);
exports.updateDealer = base.updateOne(Dealer);