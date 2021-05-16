// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  let id = event.id
  let color = event.color
  let text = event.text
  let date = new Date()

  let data = await db.collection("UserInfor").where({
    id: id
  }).get()
  data = data.data[0]
  let like = {
    numer: 1,
    user: []
  }

}