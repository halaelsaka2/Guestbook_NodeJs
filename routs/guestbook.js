const express = require('express');
const router = express.Router();
const Guestbook = require('../model/guestbook');
const authenticationmiddleWare = require('../middlewares/authentecation');
require('express-async-errors');
const _ = require('lodash')

//get all geuestbook for test 
router.get("/getall", async (req, res, next) => {
    const guestbooks = await Guestbook.find().populate("userId").populate('messages');
    res.status(200).json(guestbooks)
});

//Get GuestBook By userId Done in Front
router.get('/:userId',authenticationmiddleWare, async (req, res, next) => {
    const userId = req.params.userId;
    const guestbook = await Guestbook.findOne({userId:{$eq: userId}}).populate("userId").populate("messages");
    res.status(200).json(guestbook)
})

////////////////add empty guestbook for user who just register Done in front 
router.post('/addguestbook', authenticationmiddleWare,async (req, res, next) => {
    const userId = req.user.id;
    const guestbook = new Guestbook({userId}).populate("userId");
    await guestbook.save();
    res.json(guestbook)
})

// get all guestbook expect user which logged in
router.get("/",authenticationmiddleWare, async (req, res, next) => {
        const guestbooks = await Guestbook.find({userId:{$ne: req.user.id}}).populate("userId");
        res.status(200).json(guestbooks)
});


//Edit GuestBook => add message to guestbook
router.patch('/:id',authenticationmiddleWare,
    async (req, res, next) => {
        const {id} = req.params;
        const {message} = req.body;
        const g = await Guestbook.findById(id)
        const messages=g.messages;
        messages.push(message);
        //  const userId = req.user.id
        console.log(messages)
        const guestbook = await Guestbook.findByIdAndUpdate(id, {messages},
        {
            new: true,
            runValidators: true,
            omitUndefined: true
        }).populate("userId").populate("messages");
        res.status(200).json({
            message: "guestbook Edit Succssfully",
            guestbook
        })
})



module.exports = router;