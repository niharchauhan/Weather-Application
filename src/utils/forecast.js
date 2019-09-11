const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/a44ddbc7bc5b1b8a613ff0a8224e4200/' + latitude + "," + longitude + '?units=si';

    //Using shorthand syntax and destructuring response object
    //request({ url, json:true }, (error, { body }) => {
    request({ url: url, json:true }, (error,response) => {
        if(error)
        {
            callback('Unable to connect to weather service!', undefined)
        }
        //else if(body.error)
        else if(response.body.error)
        {
            callback('Unable to find the location!', undefined)
        }
        else{
            //callback(undefined, body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degrees out. There is a " + body.currently.precipProbability + "% chance of rain.")
            callback(undefined, response.body.daily.data[0].summary + " It is currently " + response.body.currently.temperature + " degrees out. There is a " + response.body.currently.precipProbability + "% chance of rain.")
        }
    })
}

module.exports = forecast;