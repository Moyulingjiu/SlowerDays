// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  let id = event.id
  let money = event.money // 充值的数额

  let data = await db.collection("UserInfor").where({
    id: id
  }).get()
  data = data.data[0]

  await db.collection("User").where({
    id: id
  }).update({
    data: {
      wallet: data.wallet + money
    }
  })

  return true
}