const express = require("express");
const router = express.Router();
const Message = require("../model/message");
const authorizationMiddleWare = require("../middleWares/authorizationMessage");
const authenticationmiddleWare = require("../middlewares/authentecation");
require("express-async-errors");

module.exports = router;

router.post("/addMessage", authenticationmiddleWare, async (req, res, next) => {
  const userId = req.user.id;
  console.log(userId);
  const { value } = req.body;
  const message = new Message({ value,userId });
  await message.save();
  res.json(message);
});

router.patch("/addReply/:id",authenticationmiddleWare,async (req,res,next)=>{
  const messageId = req.params.id;
  const {reply} = req.body;
  const message=await Message.findByIdAndUpdate(messageId,{reply},{
    new: true,
    runValidators: true,
    omitUndefined: true,
  }
);
res.status(200).json({
  message: "Reply Added Succssfully",
  message,
});
});

router.delete(
  "/:id",
  authenticationmiddleWare,
  authorizationMiddleWare,
  async (req, res, next) => {
    const id = req.params.id;
    const message = await Message.findByIdAndDelete(id);
    res.status(200).json(message);
  }
);

//get all message BY userId
router.get("/",authenticationmiddleWare, async (req, res, next) => {
  const messages = await Message.find({userId:{$eq: req.user.id}}).populate("userId");
  res.status(200).json(messages);
});

router.patch(
  "/:id",
  authenticationmiddleWare,
  authorizationMiddleWare,
  async (req, res, next) => {
    const { id } = req.params;
    const  value  = req.body.value;
    const message = await Message.findByIdAndUpdate(
      id,
      { value},
      {
        new: true,
        runValidators: true,
        omitUndefined: true,
      }
    );
    res.status(200).json({
      message: "Message Edit Succssfully",
      message,
    });
  }
);
router.get('/:id',async (req,res,next)=>{
  const {id}=req.params;
  const message = await Message.findById(id);
  res.json({message})
})


