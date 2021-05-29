// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  let id = event.id
  let goodsId = event.paperId

  let data = await db.collection("Shop").where({
    _id: "example"
  }).get()
  data = data.data[0]
  var len = data.paper.length
  let index = -1
  for(var i = 0; i < len; i++) {
    if (data.paper[i].id == goodsId) {
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

  if (user.wallet > data.paper[i].price) {
    warehouse = await db.collection("WareHouse").where({
      id: id
    }).get()
    warehouse = warehouse.data[0]
    warehouse.paper.append(goodsId) // 添加物品

    user.wallet -= data.paper[i].price // 付钱
    data.paper[i].volume += 1 // 销售量加一

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