// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  let id = event.id
  let achievement = event.achievement // 是否能看见用户成就
  let birthday = event.birthday // 是否能看见用户生日
  let friends = event.friends // 是否能看见用户笔友数量
  let treeHole = event.treeHole // 是否能看见该用户发的树洞
  
  await db.collection("User").where({
    id: id
  }).update({
    data: {
      privacy: {
        achievement: achievement,
        birthday: birthday,
        friends: friends,
        treeHole: treeHole
      }
    }
  })

  return true
}