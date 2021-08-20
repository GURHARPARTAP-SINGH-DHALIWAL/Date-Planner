const express=require('express');
const router=express.Router();

console.log('In the file');


// all requests for api are handled in api/index
router.use('/api',require('./api/index'));


module.exports=router;