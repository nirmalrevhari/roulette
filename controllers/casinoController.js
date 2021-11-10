const Casino = require('../models/casinoModel');
const base = require('./baseController');
const AppError = require("../utils/appError");

exports.register = async (req, res, next) => {
    try {
        const casino = await Casino.create({
            name: req.body.name,
            balance: req.body.balance
        });

        res.status(200).json({
            status: "success",
            data: {
                casino,
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.rechargeCasino = async (req, res, next) => {
    try {
        const doc = await Casino.findByIdAndUpdate(req.params.id, { $inc: { balance: req.body.amount } }, {
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
exports.getAllCasinos = base.getAll(Casino);
exports.getCasino = base.getOne(Casino);
exports.updateCasino = base.updateOne(Casino);