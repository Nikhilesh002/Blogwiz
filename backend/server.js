// create express app
const exp=require('express');
const app=exp();
const cors = require('cors')
require('dotenv').config();   // adds .env content to process obj, which is a global obj like document,window in browser

// import mongodb
const mongoClient=require('mongodb').MongoClient;

app.use(cors(
  {
      origin: ["https://blogwiz.vercel.app"],
      methods: ["POST", "GET", "PUT", "DELETE"],
      credentials: true
  }
));

const path=require('path');
// deploy react build in this server
app.use(exp.static(path.join(__dirname,'../client/dist')));


// connect to db
mongoClient.connect(process.env.DB_URL)
.then(client=>{
  // get db obj, get collObj, share collObj with express app
  const blogdb=client.db('blogdb');
  // usersCollection
  const usersCollection=blogdb.collection('usersCollection');
  app.set('usersCollection',usersCollection);
  // articlesCollection
  const articlesCollection=blogdb.collection('articlesCollection');
  app.set('articlesCollection',articlesCollection);
  // authorsCollection
  const authorsCollection=blogdb.collection('authorsCollection');
  app.set('authorsCollection',authorsCollection);
  console.log('DB connected successfully...');
})
.catch(err=>console.log('Error in DB connection'))

// body parser middleware
app.use(exp.json());

// import apis
const userApp=require('./APIs/user-api');
const authorApp = require('./APIs/author-api');
const adminApp = require('./APIs/admin-api');

// send reqs to respective apis acc to paths
app.use('/user-api',userApp);
app.use('/author-api',authorApp);
app.use('/admin-api',adminApp);


// if we refresh, we get error so add this middleware
// deals page refreshes
// checks all above links of middlewares, as they dont match, it searches index.html of client
// app.use((req,res,next)=>{
//   res.sendFile(path.join(__dirname,'../client/dist/index.html'))
// })



// express error handler
// it can only deal with synchronous errors
app.use((err,req,res,next)=>{
  res.send({message:'error',payload:err.message});
})


const port=process.env.PORT || 5000;
app.listen(port,()=>console.log(`http server started on ${port}...`));
