const request = require('request')		//npm library request

const geocode = (address, callback) => {
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibmloYXIwOSIsImEiOiJjanp6dXZxbm0yMjBoM2VtamtwNHlmZHV6In0.B7D3P79Wn5u579bjGrF0xQ';

	//Using shorthand syntax and destructing response object
	//request({url, json: true }, (error, { body }) => {
	request({url: url , json: true }, (error, response) => {
		if(error)
		{
			callback('Unable to connect location services!', undefined)
		}
		//else if(body.features.length == 0) 
		else if(response.body.features.length == 0) 
		{
			callback('Unable to find location. Try another search', undefined)
		}
		else
		{
			callback(undefined, {
				latitude: response.body.features[0].center[1],
				longitude: response.body.features[0].center[0],
				location: response.body.features[0].place_name
			})
			// callback(undefined, {
			// 	latitude: body.features[0].center[1],
			// 	longitude: body.features[0].center[0],
			// 	location: body.features[0].place_name
			// })
		}
	})
}

module.exports = geocode