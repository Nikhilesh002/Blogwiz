// create adminApp mini express app
const exp=require('express');
const adminApp=exp.Router();

adminApp.get('/test-admin',(req,res)=>{
  res.send({message:'Test admin'});
})




module.exports=adminApp;