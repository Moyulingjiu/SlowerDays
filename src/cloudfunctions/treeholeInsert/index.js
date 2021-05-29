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
  let data = await db.collection("User").where({
    id: id
  }).get()
  data = data.data[0] //用户数据
  isVailable = data.privacy.treeHole

  let like = {
    numer: 1,
    user: []
  }

  // 分配id
  let nowId = await db.collection("System").where({
    _id: "id"
  }).get()
  nowId = nowId.data[0]
  treeholeId = nowId.treeHoleId
  nowId.treeHoleId += 1
  delete nowId._id
  await db.collection("System").where({
    _id: "id"
  }).update({
    data: nowId
  })

  await db.collection("TreeHole").add({
    data: {
      id: treeholeId,
      color: color,
      date: date,
      like: like,
      text: text,
      isVailable: isVailable
    }
  })

  let contact = await db.collection("User_TreeHole").where({
    id: id
  }).get()
  contact = contact.data[0]
  contact.treeHole.push(treeholeId)
  delete contact._id
  await db.collection("User_TreeHole").where({
    id: id
  }).update({
    data: contact
  })

  return true
}