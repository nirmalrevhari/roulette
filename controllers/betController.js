const Bet = require('../models/betModel');
const base = require('./baseController');

exports.register = async (req, res, next) => {
    try {
        const bet = await Bet.create({
            name: req.body.name,
            balance: req.body.balance
        });

        res.status(200).json({
            status: "success",
            data: {
                bet,
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.getAllBets = base.getAll(Bet);
exports.getBet = base.getOne(Bet);
exports.updateBet = base.updateOne(Bet);