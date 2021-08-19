const express=require('express');
const router=express.Router();

console.log('In the file');



router.use('/api',require('./api/index'));


module.exports=router;