// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  let id = evnet.id
  
  warehouse = await db.collection("WareHouse").where({
    id: id
  }).get()
  if (warehouse.data.length == 0)
    return {}
  warehouse = warehouse.data[0]
  return warehouse
}