const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
//geocode and forecast import
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')
//paths
const dynamicPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../template/views')
const partialPath = path.join(__dirname, '../template/partials')

app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

app.use(express.static(dynamicPath))

app.get('',(req,res) => {
    res.render('index',{
        title: 'this is home page',
        name: 'mahmoud taalab'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'this is about page',
        name: 'mahmoud taalab'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'this is help page',
        name: 'mahmoud taalab'
    })
})
app.get('/weather', (req,res) => {
    if(!req.query.address || req.query.address == ""){
        return res.send({
            error:"enter your address plz"
        })
    }

    //geoCode and forecast
    geoCode(req.query.address,(error,{place}) => {
        if(error){
            return res.send({
                error
            })
        }
        forecast(place,(error,forecastData) => {
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastData,
                location: place,
                address: req.query.address
            })        
        })
    })
  
})
app.get('/product',(req,res) => {
    if(!req.query.search || req.query.search == ""){
        return res.send({error:'sorry but must enter search value'})
    }
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res) => {
    res.render('404', {
        title: 'this help page not found'
    })
})

app.get('*',(req,res) => {
    res.render('404', {
        title: 'this is 404 page'
    })
})

app.listen(3000,() => {
    console.log('app is running')
})