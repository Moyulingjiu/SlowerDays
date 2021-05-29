// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  let id = event.id
  
  let conversation = await db.collection("Mail").where({
    id: id
  }).get()
  if (conversation.data.length == 0) {
    return false
  }
  
  return conversation.data[0]
}