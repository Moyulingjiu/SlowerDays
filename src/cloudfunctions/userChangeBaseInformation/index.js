// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  // 获取基本信息
  let id = event.id
  let nickname = event.nickname // 昵称
  let protrait = event.protrait // 头像
  let sex = event.sex // 性别
  let signature = event.signature // 个性签名
  let tel = event.tel // 电话
  let birthday = {
    year: event.year,
    month: event.month,
    day: event.day
  } // 生日
  
  await db.collection("User").where({
    id: id
  }).update({
    data: {
      baseInformation: {
        nickname: nickname,
        protrait: protrait,
        sex: sex,
        signature: signature,
        tel: tel,
        birthday: birthday
      }
    }
  })

  return true
}