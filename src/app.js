const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');
const path = require('path')
const express = require('express');
const hbs = require('hbs');


const app = express()
const port = process.env.PORT || 8000;
// Added path config 
const publicDir = path.join(__dirname, '../public')
const viewsDir = path.join(__dirname, '../templates/views')
const partialsDir = path.join(__dirname, '../templates/partials')

// Set hbs engine and views
app.set('view engine', 'hbs')
app.set('views', viewsDir)
hbs.registerPartials(partialsDir)

// Set public folder for static content
app.use(express.static(publicDir))


app.get('', (req, res)=>{
    res.render('index',{
        title:'Weather',
        author:'Sachin'
    })
})

app.get('/about', (req, res)=>{
    res.render('about',{
        title:'About Me',
        message:'This is the site to be used for checking Weather',
        author:'Sachin'
    })
})


app.get('/help', (req, res)=>{
    res.render('help',{
        title:'Help Page',
        message:'This is help message to be used.',
        author:'Sachin'
    })
})

app.get('/help/*', (req, res)=>{
    res.render('error-404',{
        title:'404',
        errorMessage:'Help article not found.',
        author:'Sachin'
    })
})

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide a search term'
        });
    }
   
        geocode(req.query.address,(error, {latitude, longitude, location}={})=>{
            if(error){
                return res.send({
                    error
                });
            }
            forecast(latitude,longitude, (error, {forecast, temperature, precipProbability}) => {
                
                if(error){
                    return res.send({
                        error
                    });
                }
                //res.send(location)
                res.send({
                    address:req.query.address,
                    location,
                    forecast
                    //temperature
                })
                
            })
            
        })
    
})

app.get('*', (req, res)=>{
    res.render('error-404',{
        title:'404',
        errorMessage:'404 Page not found.',
        author:'Sachin'
    })
})

app.listen(port, () =>{
    console.log('Server started successfully and listening to port ' + port);
})