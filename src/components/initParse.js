import Parse from 'parse'

export const LOCAL_JAVASCRIPT_KEY = `masterKey`
export const LOCAL_APP_ID = `Z4nEXPFgTTcJNvQ84WucVrYdtN81Yhv4CNu9FPoL`
export const LOCAL_SERVER_URL = `http://localhost:1337/parse`
export const LOCAL_APP_WSS_SERVER_URL = undefined


const User = Parse.User.extend('User')
const Voucher = Parse.Object.extend('Voucher')
const VoucherTemplate = Parse.Object.extend('VoucherTemplate')

export const initializeParse = () => {
    debugger
  Parse.initialize(LOCAL_APP_ID, LOCAL_JAVASCRIPT_KEY)
  Parse.serverURL = LOCAL_SERVER_URL;
  
  if(LOCAL_APP_WSS_SERVER_URL && LOCAL_APP_WSS_SERVER_URL !== "undefined"){
    Parse.liveQueryServerURL  = LOCAL_APP_WSS_SERVER_URL;
  }

  Parse.Object.registerSubclass('User', User)
  Parse.Object.registerSubclass('Voucher', Voucher)
  Parse.Object.registerSubclass('VoucherTemplate', VoucherTemplate)
}
