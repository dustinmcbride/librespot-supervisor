# Librespot-supervisor

A half finished, quick and dirty supervisor for librespot. The idea is to monitor your list
of spotify connect devices using the spotify API. Then when the librespot
instance is no longer available, do something -- like restart your snapcast server

## TODO
- the do something part

## Set up (getting your refresh token)

### Spotify Dev Account
- Create account
- Get client id and secret
- Setup your call back url

### Start ngrok
```
ngrok http 3000 -host-header="localhost:3000"
```

### Create .env file
```
SPOTIFY_REFRESH_TOKEN="XXX" // You will not have a value for this yet
SPOTIFY_CLIENT_ID="XXX"
SPOTIFY_REDIRECT_URI="https://XXX.ngrok.io/callback"
SPOTIFY_CLIENT_SECRET="XXX"
SPOTIFY_DEVICE_NAME="MultiRoom"
LOAD_LOGIN=true
```

### Start App
```
npm start
```

### Login
Go to `http://localhost:3000/login`
Observe console output and copy the refresh_token into the .env

### You are ready to monitor
Restart the app
```
npm start
```
