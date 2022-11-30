// Skip to content
// Search or jump to…
// Pull requests
// Issues
// Codespaces
// Marketplace
// Explore
 
// @Chinmayd2112 
// omkarae
// /
// Visitor-Profiling
// Public
// Code
// Issues
// Pull requests
// Actions
// Projects
// Security
// Insights
// Visitor-Profiling/app.js /
// @omkarae
// omkarae 2nd API
// Latest commit 5c15f2c 8 minutes ago
//  History
//  1 contributor
// 37 lines (32 sloc)  1.02 KB
require('dotenv').config();

const express = require("express");
const { NOTIMP } = require('node:dns');
// const https = require("https");
const https = require('node:https');

const app = express();
// const IP = require('ip'); 
// var net = require('net');
const requestIp = require('request-ip');
app.set("view engine","ejs");



app.use(requestIp.mw({ attributeName : 'clientIp' }));
app.get("/",function(req,res){
    let url = process.env.URL;
    let city = "unknown";
    let country = "unknown";
    let region = "unknown";
    var ip = req.clientIp;
    url = url + ip + "/json/";
    console.log(url);
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const ipData = JSON.parse(data);
            city = ipData.city;
            country = ipData.country;
            region = ipData.regionName;
        });
    });   
    res.render("index",{ip:ip,city:city,country:country,region:region});
    console.log(ip);
    });    
   


app.listen(3000, function () {
    console.log('Server is running on port 3000')
    });
// Footer
// © 2022 GitHub, Inc.
// Footer navigation
// Terms
// Privacy
// Security
// Status
// Docs
// Contact GitHub
// Pricing
// API
// Training
// Blog
// About
// Visitor-Profiling/app.js at main · omkarae/Visitor-Profiling