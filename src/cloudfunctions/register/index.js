// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  // ==========================================
  // 获取基本信息
  let nickname = event.nickname // 昵称
  let protrait = event.protrait // 头像
  let sex = event.sex // 性别
  let signature = event.signature // 个性签名
  let tel = event.tel // 电话
  let birthday = {
    year: event.year,
    month: event.month,
    day: event.day
  } // 生日
  let place = event.place

  // ==========================================
  // 分配id
  let nowId = await db.collection("System").where({
    _id: "id"
  }).get()
  nowId = nowId.data[0]

  let id = nowId.userId

  nowId.userId = nowId.userId + 1
  delete nowId._id

  await db.collection("System").where({
    _id: "id"
  }).update({
    data: nowId
  })

  // ==========================================
  // 添加用户信息
  await db.collection("User").add({
    data: {
      id: id,
      baseInformation: {
        openid: wxContext.OPENID,
        nickname: nickname,
        protrait: protrait,
        sex: sex,
        signature: signature,
        tel: tel,
        birthday: birthday,
        place: place
      },
      achievement: {
        task: {
          likeTreeHole: {
            lastDate: new Date(2021, 5, 11, 18, 10, 00),
            number: 0
          },
          sign: {
            continuousDays: 0,
            lastDate: new Date(2021, 5, 11, 18, 10, 00)
          },
          writeLetter: {
            lastDate: new Date(2021, 5, 11, 18, 10, 00)
          },
          writeTreeHole: {
            lastDate: new Date(2021, 5, 11, 18, 10, 00)
          }
        }
      },
      credit: 100,
      wallet: 0,
      privacy: {
        achievement: true,
        birthday: false,
        friends: false,
        treeHole: true
      }
    }
  }
  )

  // 添加信箱
  await db.collection("MailBox").add({
    data: {
      id: id,
      conversation: []
    }
  })
  // 添加用户-树洞
  await db.collection("User_TreeHole").add({
    data: {
      id: id,
      treeHole: []
    }
  })
  // 添加用户-树洞-点赞
  await db.collection("User_TreeHole_Like").add({
    data: {
      id: id,
      like: []
    }
  })
  // 添加仓库
  await db.collection("WareHouse").add({
    data: {
      id: id,
      envelope: [],
      paper: [],
      stamp: [],
      specialty: []
    }
  })
  // 添加通知
  await db.collection("Notice").add({
    data: {
      id: id,
      new: [],
      old: []
    }
  })
  
  return true
}