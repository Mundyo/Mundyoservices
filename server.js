const express= require('express');
const app= express();
const mongoose= require('mongoose');
const Article= require('./models/article')
const MundyoRouter= require('./routes/mundyo');
const puppeteer = require('puppeteer');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require("body-parser");

const MongoDB ='mongodb+srv://deoleyo:Kasongi2014@cluster0.cb3lhdo.mongodb.net/';
console.log(MongoDB);

mongoose.set('strictQuery', true);


const connnectDB = async () => {
    await mongoose.connect(MongoDB, {
        useUnifiedTopology: true,
    });
    console.log("MongoDB is connected")
}

connnectDB();




app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended:true}));
app.use(morgan("tiny"));
// app.use('/static', express.static(path.join(__dirname,'public')));



app.get('/', async(req,res)=>{
const articles =  await Article.find().sort({
  createdAt:'desc'
});
  res.render('mundyo/index', {articles})
});

app.get('/new',  async(req, res) => {
  
  res.render('mundyo/New', { article: new Article() })
})




app.use('/', MundyoRouter);




app.listen(process.env.PORT || 3000)

