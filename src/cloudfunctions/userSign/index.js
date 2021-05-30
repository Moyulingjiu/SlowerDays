// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  let id = event.id

  let data = await db.collection("User").where({
    id: id
  }).get()
  data = data.data[0]

  wallet = data.wallet
  sign = data.achievement.task.sign
  d = new Date()

  const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] // 平年日期
  let year1 = sign.lastDate.getFullYear()
  let month1 = sign.lastDate.getMonth()
  let day1 = sign.lastDate.getDate()

  let year2 = d.lastDate.getFullYear()
  let month2 = d.lastDate.getMonth()
  let day2 = d.lastDate.getDate()
  
  let state = 0 // 0表示相差为1天，1表示是同一天，2表示相差很多天

  if (year1 == year2) {
    if (month1 == month2) {
      if (day2 == day1) {
        state = 1
      } else if (day2 - day1 > 1) {
        state = 2
      }
    } else if(month2 - month1 == 1) {
      if (day2 == 1) { // 只有第二个日期是月首才能相差一天
        let leap = false
        if ((year1 % 4 == 0 && year1 % 100 != 0 || year1 % 400 == 0)) {
          leap = true
        }
        if (month1 != 1 || !leap) { // 如果不是二月或者不是闰年
          if (day1 != days[month1]) {
            state = 2
          }
        } else { // 如果是闰年2月
          if (day1 != 29) {
            state = 2
          }
        }
      } else {
        state = 2
      }
    } else {
      state = 2
    }
  } else if (year2 - year1 > 1) {
    state = 2
  } else {
    if (month1 == 11 && day1 == 31 && month2 == 0 && day2 == 1) {
      state = 0
    } else {
      state = 2
    }
  }

  if (state == 0) { // 连续签到
    sign.lastDate == d
    sign.continuousDays += 1
    wallet += 1
    if (sign.continuousDays % 7 == 0) { // 每七天多加5积分
      wallet += 5
    }
  } else if (state == 2) { // 相差很多天
    sign.lastDate == d
    sign.continuousDays = 0
    wallet += 1
  }
  
  await db.collection("User").where({
    id: id
  }).update({
    data: {
      achievement: {
        task: {
          sign: sign
        }
      },
      wallet: wallet
    }
  })

  return {
    state: state,
    sign: sign
  }
}