import express from "express";
import randomstring from "randomstring"

const client_id = process.env.SPOTIFY_CLIENT_ID
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI
const client_secret = process.env.SPOTIFY_CLIENT_SECRET

const start = () => {

  const app = express();
  const port = 3000
  app.get('/login', function (req, res) {

    const state = randomstring.generate(16);
    const scope = 'user-read-playback-state';

    const paramsObj = {
      response_type: 'code',
      'client_id': client_id,
      scope: scope,
      'redirect_uri': redirect_uri,
      state: state
    }

    let searchParams = new URLSearchParams(paramsObj);
    res.redirect('https://accounts.spotify.com/authorize?' + searchParams);
  })


  app.get('/callback', async function (req, res) {

    const code = req.query.code || null;
    const state = req.query.state || null;

    if (state === null) {
      res.redirect('/#' +
        querystring.stringify({
          error: 'state_mismatch'
        }));
    } else {
      const params = new URLSearchParams({
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      });

      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: params,
        headers: {
          'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64')
        }
      });
      const data = await response.json();
    }
  });

  app.listen(port, () => {
    console.log(`Auth with Spotify at http://localhost:${port}/login`)
  })
}

export default start
