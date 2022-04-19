const DEBUG = 'DEBUG'
const INFO = 'INFO'
const ERROR ='ERROR'

const timeStamp = () => `${new Date()}`
const base = (level) => `${timeStamp()} ${level}:`

export default {
  error: (msg, e) => console.log(`${base(ERROR)} ${msg}`, e || ''),
  info: (msg, e) => console.log(`${base(INFO)} ${msg}`, e || ''),
  debug: (msg, e) => console.log(`${base(DEBUG)} ${msg}`, e|| '')
}
