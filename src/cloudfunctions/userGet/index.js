// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  let id = event.id

  let data = db.collection("UserInfor").where({
    id: id
  }).get()
  data = data.data[0]

  return {
    id: data.id,
    baseInformation: data.baseInformation,
    credit: (credit < 80 ? true : false)
  }
}