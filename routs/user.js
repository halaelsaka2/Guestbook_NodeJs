const express = require('express');
const router = express.Router();
const User = require('../model/user');
const validationMiddleWare = require('../middleWares/validation')
const authenticationmiddleWare = require('../middleWares/authentecation');
require('express-async-errors');
const CustomError = require('../helpers/cutomError')

const {check} = require('express-validator');

module.exports = router;

router.get("/", async (req, res, next) => {
    const usersList = await User.find().populate("guestbook").populate("massage");
    res.status(200).json(usersList);
});

router.post('/register', validationMiddleWare(
    check('password')
    .isLength({
        min: 5
    })
    .withMessage('must be at least 5 chars long')
    .matches(/\d/)
    .withMessage('must contain a number')),
    
     async (req, res, next) => {
    
    const {userName,password} = req.body;
    
    if(password){
        if(password==req.body.confirmPassword){
            const user = new User({userName,password});
            await user.save();
            res.json(user);
        }else{

            throw CustomError("wrong Data",400,"please enter right Data")
        }
    }
})

router.post('/login', async (req, res, next) => {
    const {userName,password} = req.body;
    const user = await User.findOne({userName});
    if (!user) throw new Error('wrong data');
    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error('Wrong password');
    //sign
    const token = await user.generateToken();
    res.json({
        user,
        token
    })
})




router.patch('/', authenticationmiddleWare, validationMiddleWare(
    check('password')
    .isLength({
        min: 5
    })
    .withMessage('must be at least 5 chars long')
    .matches(/\d/)
    .withMessage('must contain a number')
),
 async (req, res, next) => {
        id = req.user.id;
    const {userName,password} = req.body;
    const user = await User.findByIdAndUpdate(id,
    {
        $set: {userName,password}
    }, {
        new: true,
        runValidators: true,
        omitUndefined: true
    });
    res.status(200).json(user)
})

router.delete('/:id',authenticationmiddleWare, async (req, res, next) => {
    const id= req.user.id;
    // const id= req.params.id;
    const user = await User.findByIdAndDelete(id);
    res.status(200).json(user)
})
router.get('/:id',async(req,res,next)=>{
    const id = req.params.id;
    const user = await User.findById(id);
    res.status(200).json(user);
})