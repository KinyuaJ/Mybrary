if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require ("express")
const app = express()
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')
const expressLayouts = require('express-ejs-layouts')
const indexRouter = require('./routes/index')

app.set("view engine", "ejs")
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

mongoose.connect(process.env.DATABASE_URL,{useNewUrlPArser: true})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open',()=>{console.log('Connected to the database');})





app.use('/', indexRouter)



app.listen(PORT, (req,res,err)=>{
    console.log(`Server is listening at port ${PORT}`);
    if (err) throw error;
})