const express = require('express');
const { JSDOM } = require('jsdom');
const request = require('request');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'ejs');

app.get('/invite', (req, res) => {
  res.redirect('https://discord.com/oauth2/authorize?client_id=1110091771985272852&permissions=8&scope=bot');
});

app.get('/verify', (req, res) => {
  res.redirect('verify.html')
})

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});