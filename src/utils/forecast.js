const request = require('request')



const forecast=(latitude,longitude,callback)=>{
    var url = 'https://api.darksky.net/forecast/4a2ab0040500872812c68737336f792d/'+latitude+','+longitude+'?units=si'
   // console.log(url)
    request({url, json: true }, function (error, response) {
        if (error) {
            callback('Unable to connect', undefined)
        } else if (response.body.error) {
            callback(response.body.error,undefined)
        } else {
            const data={
                forecast: response.body.daily.data[0].summary+' It is currently '+response.body.currently.temperature+' degrees out. The high today is ' + response.body.daily.data[0].temperatureHigh+' degrees with a low at ' + response.body.daily.data[0].temperatureLow+' degrees. There is ' + response.body.daily.data[0].precipProbability +'% chance of rain.',
                temperature: response.body.currently.temperature,
                precipProbability:response.body.daily.data[0].precipProbability
            } 
            callback(undefined, data)
        }
    });
    
}

module.exports = forecast