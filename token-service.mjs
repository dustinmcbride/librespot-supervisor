import fetch from 'node-fetch'
import logger from './logger.mjs'

const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN
const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET

let accessTokenData = {
  token: null,
  expiresAt: null,
}

const getToken = async () => {
  if (isTokenExpired(accessTokenData)) {
    const tokenResponse = await fetchToken()
    logger.info('Updating token', tokenResponse)
    accessTokenData.expiresAt = (tokenResponse.expires_in * 1000) + Date.now()
    accessTokenData.token = tokenResponse.access_token
  }
  return accessTokenData.token
}

const isTokenExpired = (tokenData) => {
  if (!tokenData.expiresAt) return true
  if (Date.now() >= tokenData.expiresAt) return true
  return false
}

const fetchToken = async () => {
  const params = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken
  });

  let response
    response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      body: params,
      headers: {
        'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64')
      }
    });
  const data = await response.json();
  return data
}

export default getToken
