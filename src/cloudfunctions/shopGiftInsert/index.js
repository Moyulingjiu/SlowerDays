// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  let name = event.name
  let place = evetn.place
  let comments = event.comments

  let data = await db.collection("Shop").where({
    _id: "example"
  }).get()
  data = data.data[0]

  // 分配id
  let nowId = await db.collection("System").where({
    _id: "id"
  }).get()
  nowId = nowId.data[0]
  shopGiftId = nowId.shopGiftId
  nowId.shopGiftId += 1
  await db.collection("System").where({
    _id: "id"
  }).update({
    data: nowId
  })

  data.gift.append({
    id: shopGiftId,
    name: name,
    place: place,
    comments: comments,
  })
  await db.collection("Shop").where({
    _id: "example"
  }).update({
    data: data
  })
  return true
}