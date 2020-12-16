var express = require('express');
var request = require('request-promise');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended : true}));

async function getWeather(city) {
    var weather_data = [];

        var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=cd12d16b8c0769bd62545a5a6dd2b04e`;

        var response_body = await request(url);

        var weather_json = JSON.parse(response_body);

        var weather = {
            city : city,
            temperature : Math.round(weather_json.main.temp),
            description : weather_json.weather[0].description,
            icon : weather_json.weather[0].icon
        };

        weather_data.push(weather);
    

    return weather_data;
}

async function getW(cities) {
    var weather_data = [];

    for (var city_obj of cities) {
        var city = city_obj;
        var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=cd12d16b8c0769bd62545a5a6dd2b04e`;

        var response_body = await request(url);

        var weather_json = JSON.parse(response_body);

        var weather = {
            city : city,
            temperature : Math.round(weather_json.main.temp),
            description : weather_json.weather[0].description,
            icon : weather_json.weather[0].icon
        };

        weather_data.push(weather);
    }

    return weather_data;
}
app.get('/', function(req, res) {

        var cities =['mumbai','kalyan','ahmedabad','bharuch','dhule'];
        // var city ='mumbai';
        getW(cities).then(function(results) {

            var weather_data = {weather_data : results};

            res.render('weather', weather_data);

        });
               

});

app.post('/', function(req, res) {

    var city =req.body.city_name;
        getWeather(city).then(function(results) {

            var weather_data = {weather_data : results};

            res.render('weather', weather_data);

        });

    // res.redirect('/');

});

app.listen(8000);