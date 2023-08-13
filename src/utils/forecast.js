const request = require('request')

const forecast = (place,callback) => {
    const url = 'http://api.weatherapi.com/v1/current.json?key=cb6686ac10d7430d8a0235303230608&q='+place
    
    request({url, json: true}, (error,response) => {
        if(error) {
            callback("this is error",undefined)
        }else if(response.body.error) {
            callback("this is wrong value",undefined)
        }else {
            callback(undefined,"it's currently "+ response.body.current.temp_c +" degree out. there is "+ response.body.current.precip_in +"% chance for rain and the city is: "+ place+".")
        }
    })

}

module.exports = forecast