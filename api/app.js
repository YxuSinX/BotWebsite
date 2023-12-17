const express = require('express');
const { JSDOM } = require('jsdom');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const request = require('request');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'ejs');

// Error Handler
app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

function toolExtractHWID(url) {
  const match = url.match(/HWID=([\w\d]+)/);
  return match ? match[1] : null;
}

function toolBypass(hwid) {
  const baseUrl = `https://fluxteam.net/android/checkpoint/start.php?HWID=${hwid}`;
  const referrer = {
    Referer: 'https://linkvertise.com/',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36',
  };

  const session = request.defaults({ jar: true });
  session.get({ url: baseUrl, headers: { Referer: 'https://fluxteam.net/' } });
  sleep(1000);
  session.get({ url: 'https://fluxteam.net/android/checkpoint/check1.php', headers: referrer });
  sleep(1000);
  const response = session.get({ url: 'https://fluxteam.net/android/checkpoint/main.php', headers: referrer });
  sleep(1000);

  const dom = new JSDOM(response.body);
  const key = dom.window.document.querySelector('body > main > code').textContent.replace(/\s+/g, '');

  return key;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Routes Handler
app.route('/')
  .all((req, res) => {
    let generatedKey = null;
    const referer = req.headers.referer;
    const fhwid = req.cookies.fhwid;

    if (req.method === 'POST') {
      const form = req.body.fluxus_url;
      const extracted = toolExtractHWID(form);
      if (extracted) {
        const resp = res.render('redirect.html');
        resp.cookie('fhwid', extracted);
        return resp;
      }
    }

    if (referer === 'https://linkvertise.com/' && fhwid) {
      generatedKey = toolBypass(fhwid);
      const timeNow = new Date();
      const expiration = new Date(timeNow.getTime() + 24 * 60 * 60 * 1000);
      const expirationStr = expiration.toLocaleString('en-US', { timeZone: 'UTC' });

      return res.render('index.html', { generatedKey, expirationStr });
    }

    return res.render('index.html', { generatedKey });
  });

app.route('/invite').get((req, res) => {
  res.redirect('https://discord.com/oauth2/authorize?client_id=1110091771985272852&permissions=8&scope=bot');
});

app.route('/verify').get((req, res) => {
    res.redirect('verify.html')
})

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});