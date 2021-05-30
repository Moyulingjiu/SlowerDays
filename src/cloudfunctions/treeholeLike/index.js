// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  let treeholeId = event.treeholeId
  let id = event.id
  
  let data = await db.collection("TreeHole").where({
    id: treeholeId
  }).get()
  if (data.data.length == 0)
    return false // 不存在该树洞
  data = data.data[0]

  let contact = await db.collection("User_TreeHole_Like").where({
    id: id
  }).get()
  contact = contact.data[0]
  let index = contact.like.indexOf(treeholeId)
  if (index != -1)
    return false // 已经点过赞了

  contact.like.push(treeholeId)
  data.like.number += 1
  data.like.user.push(id)

  delete data._id
  await db.collection("TreeHole").where({ // 更新树洞本身
    id: treeholeId
  }).update({
    data: data
  })

  delete contact._id
  await db.collection("User_TreeHole_Like").where({ // 更新用户-点赞的联系
    id: id
  }).update({
    data: contact
  })

  
  let user = await db.collection("User").where({
    id: id
  }).get()
  user = user.data[0]
  likeTreehole = user.achievement.task.likeTreehole
  d = new Date()
  let year1 = likeTreehole.lastDate.getFullYear()
  let month1 = likeTreehole.lastDate.getMonth()
  let day1 = likeTreehole.lastDate.getDate()

  let year2 = d.lastDate.getFullYear()
  let month2 = d.lastDate.getMonth()
  let day2 = d.lastDate.getDate()

  if (year1 == year2 && month1 == month2 && day1 == day2) {
    likeTreehole.number += 1
  } else {
    likeTreehole.number = 0
  }

  await db.collection("User").where({
    id: id
  }).update({
    data: {
      achievement: {
        task: {
          likeTreehole: {
            lastDate: d,
            number: likeTreehole.number
          }
        }
      }
    }
  })

  return true
  
}