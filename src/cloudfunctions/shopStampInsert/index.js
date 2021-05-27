// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  let place = evetn.place
  let price = event.price
  let theme = event.theme
  let type = event.type
  let comments = event.comments
  let volume = 0

  let data = await db.collection("Shop").where({
    _id: "example"
  }).get()
  data = data.data[0]

  // 分配id
  let nowId = await db.collection("System").where({
    _id: "id"
  }).get()
  nowId = nowId.data[0]
  shopStampId = nowId.shopStampId
  nowId.shopStampId += 1
  await db.collection("System").where({
    _id: "id"
  }).update({
    data: nowId
  })

  data.stamp.append({
    id: shopStampId,
    place: place,
    price, price,
    theme: theme,
    type: type,
    comments: comments,
    volume: volume
  })
  await db.collection("Shop").where({
    _id: "example"
  }).update({
    data: data
  })
  return true
}