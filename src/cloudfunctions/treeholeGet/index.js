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
    return {}
  data = data.data[0]

  
  let contact = await db.collection("User_TreeHole").where({
    id: id
  }).get()
  contact = contact.data[0]
  let index = contact.treeHole.indexOf(treeholeId)

  if (data.isVailable) { // 树洞可见
    return data
  } else if (index != -1) { // 是树洞的拥有者
    return data
  } else { // 不可见还不是拥有者
    return {}
  }
}