const fetch = require('node-fetch');

exports.run = async (client, message, args) => {
    let res = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${args}&appid=${client.config.weather_token}`);
    let jsonData = await  res.json();
    console.log(jsonData);



    message.reply(`Hello ${message.author.username}`);
}