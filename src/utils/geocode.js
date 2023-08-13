const request = require('request')

const geoCode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?proximity=ip&access_token=pk.eyJ1IjoibWFobW91ZHRhYWxhYiIsImEiOiJjbGwyY2lib3UwMTFnM25xdGF3OW9kN3BjIn0.wwap_IPo1HAJ69rOUrgFHw'

    request({url,json:true}, (error,{body}) => {
        if(error){
            callback("this is error",undefined)
        }else if(body.features.length === 0){
            callback("this is length error", undefined)
        }else{
            callback(undefined, {
                latitude:body.features[0].center[0] ,
                longtitude: body.features[0].center[1],
                place: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode