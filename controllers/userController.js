const User = require('../models/userModel');
const base = require('./baseController');
const AppError = require("../utils/appError");
const APIFeatures = require('../utils/apiFeatures');
const Game = require('../models/gameModel');
const Bet = require('../models/betModel');
const Casino = require('../models/casinoModel');

exports.register = async (req, res, next) => {
    try {
        const user = await User.create({
            name: req.body.name,
            balance: req.body.balance
        });

        res.status(200).json({
            status: "success",
            data: {
                user,
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.enterCasino = async (req, res, next) => {
    try {
        const doc = await User.findByIdAndUpdate(req.params.id, { casinoId: req.body.casinoId }, {
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

exports.rechargeBalance = async (req, res, next) => {
    try {
        const doc = await User.findByIdAndUpdate(req.params.id, { $inc: { balance: req.body.amount } }, {
            new: true,
            runValidators: true
        });

        if (!doc) {
            return next(new AppError(404, 'fail', 'No document found with that id'), req, res, next);
        }

        res.status(200).json({
            status: 'success',
            data: {
                doc
            }
        });
    } catch (err) {
        next(err);
    }
};

exports.listGames = async (req, res, next) => {
    try {
        const doc = await User.findById(req.params.id);

        if (!doc) {
            return next(new AppError(404, 'fail', 'No document found with that id'), req, res, next);
        }

        const casinoId = doc.casinoId;
        const features = new APIFeatures(Game.find({ casinoId: casinoId, status: 'active' }), req.query)
            .sort()
            .paginate();
        const games = await features.query;
        res.status(200).json({
            status: 'success',
            data: {
                games
            }
        });
    } catch (err) {
        next(err);
    }
};

exports.betGame = async (req, res, next) => {
    try {
        const game = await Game.findById(req.body.gameId);

        if (!game || game.status !== 'active') {
            return next(new AppError(404, 'fail', 'No document found with that id'), req, res, next);
        }

        await User.findByIdAndUpdate(req.params.id, { $inc: { balance: (req.body.amount * -1) } });
        await Casino.findByIdAndUpdate(game.casinoId, { $inc: { balance: req.body.amount } });

        const doc = await Bet.create({
            betNumber: req.body.betNumber,
            amount: req.body.amount,
            bettingTime: Date.now(),
            userId: req.params.id,
            gameId: req.body.gameId
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

exports.getAllUsers = base.getAll(User);
exports.getUser = base.getOne(User);
exports.updateUser = base.updateOne(User);