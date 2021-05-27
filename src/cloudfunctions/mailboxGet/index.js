// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let id = event.id
  let mailBox = await db.collection("MailBox").where({
    id: id
  }).get()
  if (mailBox.data.length == 0) {
    return false
  }
  
  return mailBox.data[0]
}