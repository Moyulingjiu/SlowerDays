// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  let id = event.id

  let data = await db.collection("User_TreeHole_Like").where({
    id: id
  }).get()
  if (data.data.length == 0)
    return false
  return data.data[0]
}