// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.data

// 云函数入口函数
exports.main = async (event, context) => {
  let text = event.text // 正文

  let date = event.date // 寄出时间
  let arrivalTime = event.arrivalTime // 到达时间
  let form = event.form // 寄件人
  let to = event.to // 收件人
  let state = event.state // 信件状态（0：未送达，1：已送达，2：已回复）
  let type = event.type // 信件类型（0：新人信件，1：普通信件，2：建立关系，3：诀别信）
  let accident = event.accident // 路上的意外（字符串）

  let envelope = event.envelope // 信封id（外观）
  let paper = event.paper // 信纸id（外观）
  let stamp = event.stamp // 邮票id（外观）

  let giftEnvelope = event.giftEnvelope // 信封id数组（礼物）
  let giftPaper = event.giftPaper // 信封id数组（礼物）
  let giftStamp = event.giftStamp // 邮票id数组（礼物）
  let gift = event.gift // 伴手礼

  // 获取id
  let nowId = await db.collection("System").where({
    _id: "id"
  }).get()
  nowId = nowId.data[0]
  mailId = nowId.mailId
  nowId.mailId += 1

  let mailBox1 = await db.collection("MailBox").where({
    id: form
  }).get()
  mailBox1 = mailBox1.data[0]
  let mailBox2 = await db.collection("MailBox").where({
    id: to
  }).get()
  mailBox2 = mailBox2.data[0]

  let len1 = mailBox1.conversation.length
  let len2 = mailBox2.conversation.length
  let conversationId = -1
  for (var i = 0; i < len1; i++) {
    for (var j = 0; j < len2; j++) {
      if (mailBox1.conversation[i] == mailBox2.conversation[j]) {
        conversationId = mailBox1.conversation[i]
      }
    }
  }
  if (conversationId == -1) {
    conversationId = nowId.conversationId
    nowId.conversationId += 1
    await db.collection("Conversation").add({
      data: {
        id: conversationId,
        mail: [],
        mailBox1: mailBox1.id,
        mailBox2: mailBox2.id
      }
    })
    mailBox1.conversation.append(conversationId)
    mailBox2.conversation.append(conversationId)
  }
  
  delete mailBox1._id
  await db.collection("MailBox").where({
    id: form
  }).update({
    data: mailBox1
  })
  delete mailBox2._id
  await db.collection("MailBox").where({
    id: to
  }).update({
    data: mailBox2
  })

  // 保存id
  delete data._id
  await db.collection("System").where({
    _id: "id"
  }).update({
    data: nowId
  })

  // 添加信件
  let conversation = await db.collection("Conversation").where({
    id: conversationId
  }).get()
  conversation = conversation.data[0]
  conversation.mail.append(mailId)
  
  delete conversation._id
  await db.collection("System").where({
    id: conversationId
  }).update({
    data: conversation
  })

  await db.collection("Mail").add({
    data: {
      id: mailId,
      baseInformation: {
        accident: accident,
        date: date,
        arrivalTime: arrivalTime,
        from: from,
        to: to,
        state: state,
        type: type
      },
      text: text,
      appearance: {
        envelope: envelope,
        paper:paper,
        stamp: stamp
      },
      gift: {
        envelope: giftEnvelope,
        paper:giftPaper,
        stamp: giftStamp,
        gift: gift
      }
    }
  })
  return true
}