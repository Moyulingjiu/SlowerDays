// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  let data = await db.collection("UserInfor").where({
    baseInformation: {
      openid: wxContext.OPENID
    }
  }).get()
  if (data.data.length == 0) { // 如果没有注册的话
    return false
  }
  data = data.data[0]
  let credit = 0
  if (data.credit < 60)
    credit = 1
  else if (data.credit < 80)
  credit = 2

  return {
    id: data.id,
    baseInformation: data.baseInformation,
    credit: credit,
    wallet: data.wallet
  }
}