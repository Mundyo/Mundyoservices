const express = require('express')
const Invoice = require('../models/article')
const article = require('../models/article')
const morgan= require('morgan');
const axios = require('axios');
const ejs = require('ejs');
const fs = require('fs');
// const DOMPurify = require('dompurify');
const router = express.Router();
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
 

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);



router.get('/Heating',  async(req, res) => {
  
  res.render('mundyo/Heating', { article: new Invoice() })
})

router.get('/About',  async(req, res) => {
  
  res.render('mundyo/About', { article: new Invoice() })
})



router.get('/AirConditioning',  async(req, res) => {
  
  res.render('mundyo/AirConditioning', { article: new Invoice() })
})


router.get('/new', async (req, res) =>{
   
  res.render('mundyo/new' ,{articles : new Invoice() });
});

router.get('/Generalmaintenance',  async(req, res) => {
  
  res.render('mundyo/Generalmaintenance', { article: new Invoice() })
})
router.get('/Electrical',  async(req, res) => {
  
  res.render('mundyo/Electrical', { article: new Invoice() })
})
router.get('/Plumbing',  async(req, res) => {
  
  res.render('mundyo/Plumbing', { article: new Invoice() })
})
router.get('/invoice', async(req, res) =>{

  res.render('mundyo/Invoice', {article: new Invoice() })
})
 






router.get('/invoice/:id', async (req, res) => {
  try {
   
    const invoice = await Invoice.findById(req.params.id);
    console.warn(invoice);

    res.render('mundyo/Invoice', { invoice} );
  } catch (error) {
   
    console.error(error);
   
    res.status(500).send('An error occurred');
  }
});


router.post('/new', async (req, res, next) => {
  try {
    const invoiceData = req.body;

    const sanitizedHtml = DOMPurify.sanitize(invoiceData.description);

    
    const invoice = new Invoice({
      title: invoiceData.title,
      name: invoiceData.name,
      email:invoiceData.email,
      address: invoiceData.address,
      phone: invoiceData.phone,
      description: invoiceData.description,
      sanitizedHtml: sanitizedHtml, 
    });

    await invoice.save();
    console.log(req.body);
    console.warn(invoice);
    
    res.redirect(`/Invoice/${invoice._id}`);
  } catch (error) {
    
    next(error);
  }
});






module.exports = router

