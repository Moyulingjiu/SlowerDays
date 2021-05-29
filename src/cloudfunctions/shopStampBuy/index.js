// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  let id = event.id
  let goodsId = event.stampId
  let number = event.number

  let data = await db.collection("Shop").where({
    _id: "example"
  }).get()
  data = data.data[0]
  var len = data.stamp.length
  let index = -1
  for(var i = 0; i < len; i++) {
    if (data.stamp[i].id == goodsId) {
      index = i
      break
    }
  }

  if (index == -1)
    return false // 没有这个商品
  let user = await db.collection("User").where({
    id: id
  }).get()
  if (user.data.length == 0)
    return false // 不存在这个人
  user = user.data[0]

  if (user.wallet > data.stamp[i].price * number) {
    warehouse = await db.collection("WareHouse").where({
      id: id
    }).get()
    warehouse = warehouse.data[0]
    len = data.warehouse.length
    index = -1
    for(var i = 0; i < len; i++) {
      if (data.warehouse[i].id == goodsId) {
        index = i
        data.warehouse[i].quantity += number
        break
      }
    }
    if (index == -1) { // 不存在该邮票
      warehouse.stamp.append({
        id: goodsId,
        quantity: number
      }) // 添加物品
    }

    user.wallet -= data.stamp[i].price * number // 付钱
    data.stamp[i].volume += number // 销售量加一

    delete warehouse._id
    await db.collection("WareHouse").where({
      id: id
    }).update({
      data: warehouse
    })
    delete user._id
    await db.collection("User").where({
      id: id
    }).update({
      data: user
    })
    delete data._id
    await db.collection("Shop").where({
      _id: "example"
    }).update({
      data: data
    })
    return true
  } else {
    return false // 余额不足
  }
}