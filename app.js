require('dotenv').config()
const express = require("express");
// const https = require("https");
const https = require('node:https');
// const http = require('http');
const app = express();
const requestIp = require('request-ip');
app.set("view engine","ejs");



app.use(requestIp.mw({ attributeName : 'clientIp' }));
app.get("/",function(req,res){
    // let url = process.env.URL;
    // var city = '';
    // var country = '';
    // var region = '';
    var ip = req.clientIp;
    ip = "152.57.223.112";
    // // url = url + "apiKey=" + process.env.apiKey + "&" + ip ;
    // url = process.env.URL1 + ip;
    console.log(ip);
    const options = {
        path: '/' + ip + '/json/',
        host: 'ipapi.co',
        port: 443,
        headers: { 'User-Agent': 'nodejs-ipapi-v1.02' }
      };
      console.log(options);
      https.get(options, function(resp){
          var body = ''
          resp.on('data', function(data){
              body += data;
          });
      
          resp.on('end', function(){
              var loc = JSON.parse(body);
              const city = loc.city;
              const country = loc.country_name;
              const region = loc.region;
              res.render("index",{ip:ip,city:city,country:country,region:region});
          });
          
      });
    console.log(ip);
    });



app.listen(3000, function () {
    console.log('Server is running on port 3000')
    });