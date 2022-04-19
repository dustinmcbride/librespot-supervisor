import 'dotenv/config'
import fetch from 'node-fetch'
import logger from './logger.mjs'
import getToken from './token-service.mjs'
import startSpotifyAuthService from './spotify-auth-service.mjs'

if (process.env.LOAD_LOGIN) {
  startSpotifyAuthService()
}

async function getDevices(token) {
  let response
  response = await fetch('https://api.spotify.com/v1/me/player/devices', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  const data = await response.json();
  return data.devices
}

async function go() {
  logger.info('Starting...')
  try {
  let token = await getToken()
  let devices = await getDevices(token)
  const device_name = process.env.SPOTIFY_DEVICE_NAME
  const found = devices.find(d => d.name === device_name)
  logger.info(`Device found: ${!!found}`)
  } catch (e) {
    logger.error('Error in go', e)
  }
}


go()
setInterval(() => go(), 1000*30)
