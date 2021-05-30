// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  // 获取基本信息
  let id = event.id
  let likeTreehole = event.likeTreehole // 点赞一个树洞 
  let sign = event.sign // 签到
  let writeLetter = event.writeLetter // 写一封信
  let writeTreeHole = event.writeTreeHole // 写一个树洞
  
  await db.collection("User").where({
    id: id
  }).update({
    data: {
      achievement: {
        task: {
          likeTreehole: likeTreehole,
          sign: sign,
          writeLetter: writeLetter,
          writeTreeHole: writeTreeHole
        }
      }
    }
  })

  return true
}