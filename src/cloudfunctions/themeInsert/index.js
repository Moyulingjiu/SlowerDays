// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  let name = event.name
  let comments = event.comments
  let envelope = event.envelope
  let paper = event.paper
  let stamp = event.stamp

  // 分配id
  let nowId = await db.collection("System").where({
    _id: "id"
  }).get()
  nowId = nowId.data[0]
  themeId = nowId.themeId
  nowId.themeId += 1
  delete nowId._id
  await db.collection("System").where({
    _id: "id"
  }).update({
    data: nowId
  })

  await db.collection("Theme").add({
    data: {
      id: nowId,
      name: name,
      comments: comments,
      envelope: envelope,
      stamp: stamp,
      paper: paper
    }
  })
}