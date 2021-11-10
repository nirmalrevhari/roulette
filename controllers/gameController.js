const Game = require('../models/gameModel');
const base = require('./baseController');

exports.register = async (req, res, next) => {
    try {
        const game = await Game.create({
            name: req.body.name,
            balance: req.body.balance
        });

        res.status(200).json({
            status: "success",
            data: {
                game,
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.getAllGames = base.getAll(Game);
exports.getGame = base.getOne(Game);
exports.updateGame = base.updateOne(Game);