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
    return false
  data = data.data[0]

  let contact = await db.collection("User_TreeHole").where({
    id: id
  }).get()
  contact = contact.data[0]
  let index = contact.treeHole.indexOf(treeholeId)
  if (index == -1)
    return false
  
  await db.collection("TreeHole").where({
    id: treeholeId
  }).remove({
    success: res => {
      return true // 删除成功
    },
    fail: err => {
      return false // 删除失败
    }
  })
}