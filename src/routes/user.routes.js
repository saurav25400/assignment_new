const express=require('express');
const {signup,signin,getUserInfo}=require('../controllers/user.controller.js');
const router=express.Router();

router.post('/signup',signup);
router.post('/signin',signin);
router.get("/get-all",getUserInfo);

module.exports=router;