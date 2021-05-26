// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  let treeholeId = event.treeholeId

  let data = await db.collection("TreeHole").where({
    id: treeholeId
  })
  if (data.data.length == 0)
    return {}
  data = data.data[0]

  if (data.isVailable) {
    return data
  } else {
    return {}
  }
}