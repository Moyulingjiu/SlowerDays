// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  let data = await db.collection("System").where({
    _id: "carousel"
  }).get()
  data = data.data[0]
  return {
    carousel: data.carousel
  }
}