const express = require("express");
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/product');
const Farm = require('./models/farm')
const methodOverride = require('method-override')
const flash = require("connect-flash")

mongoose.connect('mongodb://127.0.0.1:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use(flash())

//farm
app.get('/farm',async(req,res)=>{
    const farm = await Farm.find({})
    res.render('farms/index',{farm})
})
//new farms add page
app.get('/farm/new',(req,res)=>{
    res.render('farms/new',{Farm })

})
//submit new farms add page
app.post('/farm', async (req,res)=> {
        const newFarms = new Farm(req.body);
        await  newFarms.save();
        req.flash('success', 'new added product')
        res.redirect(`/farm/${newFarms._id}`)
})
// inside the farms page
app.get('/farm/:id', async (req,res)=>{
   const { id } = req.params;
   const farm = await Farm.findById(id)
   res.render('farms/show', {farm})
})
//update the farms 
app.get('/farm/:id/update',async(req,res)=>{
   const {id} = req.params;
   const farm = await Farm.findById(id)
   res.render('farms/update', {farm})
})
//update the page
app.put('/farm/:id',async(req,res)=>{
   const {id} = req.params;
   const farm =await Farm.findByIdAndUpdate(id, req.body , {runValidators: true , new:true} )
   console.log(req.body);
   res.redirect(`/farm/${farm._id}`)
})
//delete page
app.delete('/farm/:id',async(req,res)=>{
   const {id} = req.params;
   await Farm.findByIdAndDelete(id);
   res.redirect('/farm')
})










//products
//product index page
app.get('/product', async(req , res)=>{
    const product = await Product.find({})
       res.render('products/index',{product})
})
//new product add page
app.get('/product/new',(req,res)=>{
     res.render('products/new')
})
//submit new product add page
app.post('/product', async (req,res)=> {
         const newProduct = new Product(req.body);
         await  newProduct.save();
         res.redirect(`/product/${newProduct._id}`)
})
// inside the product page
app.get('/product/:id', async (req,res)=>{
    const { id } = req.params;
    const product = await Product.findById(id)
    res.render('products/show', {product})
})
//update the product 
app.get('/product/:id/update',async(req,res)=>{
    const {id} = req.params;
    const product = await Product.findById(id)
    res.render('products/update', {product})
})
//update the page
app.put('/product/:id',async(req,res)=>{
    const {id} = req.params;
    const product =await Product.findByIdAndUpdate(id, req.body , {runValidators: true , new:true} )
    console.log(req.body);
    res.redirect(`/product/${product._id}`)
})
//delete page
app.delete('/product/:id',async(req,res)=>{
    const {id} = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/product')
})

app.listen(3000, ()=>{
    console.log("the server is working")
})