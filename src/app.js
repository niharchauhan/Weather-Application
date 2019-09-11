const path = require('path')        //core node module
const express = require('express')     //npm module
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000   //heroku access || local machine access  //access environmental variables

// Define Paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handle bars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))        //static here means the contents do not change

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Nihar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Nihar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is some helpful text',
        name: 'Nihar'
    })
})

// app.get('/help', (req, res) => {
    // res.send({             //JSON in form of an object
    //     name: 'Nihar',
    //     age: 19
    // })
    // res.send([{                //JSON in form of array
    //     name: 'Nihar'
    // }, {
    //     name: 'Billy'
    // }])

// })

// app.get('/about', (req, res) => {
//     res.send('About')
// })

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'        //if there is no address in url
        })
    }

    geocode(req.query.address, (error, data = {}) =>{       // {} default parameter, when address is any special character 
        if(error)
		{
			return res.send({ error })
		}
		//forecast(latitude, longitude, (error, forecastdata) => {
		forecast(data.latitude, data.longitude, (error, forecastdata) => {
			if(error)
			{
				return res.send({ error })
            }
            
            res.send({
                forecast: forecastdata,
                location: data.location,
                address: req.query.address
            })
		  })
    })
    
    // res.send({                  //if there is address in url ?address=anyaddress
    //     forecast: 'It is raining',
    //     location: 'New York',
    //     address: req.query.address
    // })
})



app.get('/products', (req, res) => {
    if(!req.query.search) {         //if there is no search term
        return res.send({           //by using return we stop the entire function execution, else it shows error 'Cannot set headers after they are sent to the client'
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)              //query string after ? http://localhost:3000/products?search=games&rating=5
    console.log(req.query.search)       // games
    res.send({
        products: {}
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Nihar',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {            // * wildcard character
    res.render('404', {
        title: '404',
        name: 'Nihar',
        errorMessage: 'Page not found'
    })
})



app.listen(port, () => {
    console.log('Server is up on port ' + port)
})