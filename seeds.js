//this file would help me create a database in  mongoose 
//here the first line connects to mongoose 
//next line to basic topology file 
//whenever you insert a new product directly here you need to run this seed file so as to store the data in mongoose and the work on it
const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connect('mongodb://127.0.0.1:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

// const p = new Product({
//      name: 'Ruby Grapefruit',
//      price: 1.99,
//      category: 'fruit'
//  })
//  const a = new Product({
//     name: 'R',
//     price: 19,
//     category: 'fruit'
// })
// const d = new Product({
//     name: 'Grape',
//     price: 3,
//     category: 'fruit'
// })

//  p.save()
//      .then(p => {
//          console.log(p)
//      })
//      .catch(e => {
//          console.log(e)
//      })
//      a.save()
//      .then(p => {
//          console.log(p)
//      })
//      .catch(e => {
//          console.log(e)
//      })
//      d.save()
//      .then(p => {
//          console.log(p)
//      })
//      .catch(e => {
//          console.log(e)
//      })
