const request = require('request')

const geocode = (address, callback)=>{
    var geoCodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic213YW5raGFkZSIsImEiOiJjandhcno0ZmcwYTJkNDl0bHY1cjBka25kIn0.NGz0mMS-KSfM2hLMDH3wfw&limit=1'
    request({ url: geoCodeUrl, json: true }, function (error, response) {
        if (error) {
            callback('Unable to connect',undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find the location. Try another search.', undefined)
        } else {
            const data = {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location:response.body.features[0].place_name
            }
            callback(undefined, data)
        }
    });
}

module.exports = geocode

