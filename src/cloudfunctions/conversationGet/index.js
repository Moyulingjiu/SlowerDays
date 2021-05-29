// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let conversationId = event.conversationId
  let mailBox = await db.collection("Conversation").where({
    id: conversationId
  }).get()
  if (mailBox.data.length == 0) {
    return false
  }
  
  return mailBox.data[0]
}