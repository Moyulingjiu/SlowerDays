// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  let conversationId = event.conversationId
  let relationship = event.relationship

  await db.collection("Conversation").where({
    id: conversationId
  }).update({
    data: {
      relationship: relationship
    }
  })

  return true
}