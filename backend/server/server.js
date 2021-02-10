//app initialization
const express = require('express');
const app = express();
//paths
const path = require('path');
const publicPath = path.join(__dirname, '..','..','build');
const port = process.env.PORT || 8080;
//tools
const axios = require('axios');
const cors = require('cors');
const btoa = require('btoa');
//variables
const key = require('./data/keys');
const package = btoa(key.token + ':' + key.pwd)
const endPoints = require('./data/endpoints');
const whiteList = ['http://localhost:3000', 'https://everythingnba.herokuapp.com'];
const corsOptions = {
    origin: whiteList,
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
}

app.use(express.static(publicPath));
app.use(cors(corsOptions));

app.listen(port, () => {
    console.log('listening on port ', port);
})

//main route
// app.get('*', (req, res) => {
//     res.sendFile(path.join(publicPath, 'index.html'));
// })

//actionable routes
app.get('/getTeams', (req, res) => {
    axios.get(endPoints.standings, {headers: {Authorization: `Basic ${package}`}})
    .then(result => {
        res.json(result.data);
    }).catch(err => console.log(err))

})

app.get('/getGames', (req, res) => {
    axios.get(endPoints.games, {headers: {Authorization: `Basic ${package}`}})
    .then(result => {
        res.json(result.data);
    }).catch(err => console.log(err))
})
