import Parse from 'parse'

export const LOCAL_JAVASCRIPT_KEY = `${process.env.LOCAL_APP_ID}`
export const LOCAL_APP_ID = `${process.env.REACT_APP_JAVASCRIPT_KEY}`
export const LOCAL_SERVER_URL = `${process.env.LOCAL_SERVER_URL}`
export const LOCAL_APP_WSS_SERVER_URL = undefined


const User = Parse.User.extend('User')
const Voucher = Parse.Object.extend('Voucher')
const VoucherTemplate = Parse.Object.extend('VoucherTemplate')

export const initializeParse = () => {
  Parse.initialize(LOCAL_APP_ID, LOCAL_JAVASCRIPT_KEY)
  Parse.serverURL = LOCAL_SERVER_URL;
  
  if(LOCAL_APP_WSS_SERVER_URL && LOCAL_APP_WSS_SERVER_URL !== "undefined"){
    Parse.liveQueryServerURL  = LOCAL_APP_WSS_SERVER_URL;
  }

  Parse.Object.registerSubclass('User', User)
  Parse.Object.registerSubclass('Voucher', Voucher)
  Parse.Object.registerSubclass('VoucherTemplate', VoucherTemplate)
}

