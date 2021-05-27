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

  contact.like.append(treeholeId)
  data.like.number++
  data.like.user.append(id)
  
  await db.collection("TreeHole").where({ // 更新树洞本身
    id: treeholeId
  }).update({
    data: data
  })
  await db.collection("User_TreeHole_Like").where({ // 更新用户-点赞的联系
    id: treeholeId
  }).update({
    data: contact
  })

  return true
}