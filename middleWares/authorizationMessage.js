const CustomError = require('../helpers/cutomError')
const Massege = require('../model/message')
require('express-async-errors');

module.exports = async (req, res, next) => {
    const id = req.params.id;
    const {user: {id: userId}} = req;
    const message = await Massege.findById(id)
    if (!message.userId.equals(userId)) throw CustomError('Not Authrized', 403, 'you are not Authrized to do this')
    next();
}