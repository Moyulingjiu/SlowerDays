// miniprogram/pages/personalSettings/personalSettings.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: 'cloud://cloud1-9g6mp0559beaec2a.636c-cloud1-9g6mp0559beaec2a-1305792439/portrait/伊蕾娜头像.jpeg',
    nickname: '',
    sex: '选择',
    signature: '',
    tel: '',
    birthday: '',
    sexlist: ['男', '女', '未知'],
    achievementChecked: true,
    birthdayChecked: false,
    penpalsChecked: false,
    treeholeChecked: true,
    show: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.cloud.callFunction({
      name: 'userGet',
      data: {
        id:app.globalData.id
      }
    }).then(function(e){
      that.setData({
        nickname: e.result.baseInformation.nickname,
        sex: e.result.baseInformation.sex,
        signature: e.result.baseInformation.signature,
        avatarUrl: e.result.baseInformation.protrait,
        tel: e.result.baseInformation.tel
      })
      wx.cloud.callFunction({
        name: 'userGetPrivacy',
        data: {
          id:app.globalData.id
        }
      }).then(function(event){
        that.setData({
          achievementChecked: event.result.privacy.achievement,
          birthdayChecked: event.result.privacy.birthday,
          penpalsChecked: event.result.privacy.friends,
          treeholeChecked: event.result.privacy.treeHole,
        })
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  onChange(event) {
    if(event.currentTarget.dataset.cell == "nickname"){
      this.setData({
        nickname: event.detail
      })
    }else if(event.currentTarget.dataset.cell == "signature"){
      this.setData({
        signature: event.detail
      })
    }else if(event.currentTarget.dataset.cell == "tel"){
      this.setData({
        tel: event.detail
      })
    }
  },

  onCheck(detail) {
    console.log(detail)
    if(detail.currentTarget.dataset.switch == "achievementChecked"){
      this.setData({
        achievementChecked: detail.detail
      })
    }else if(detail.currentTarget.dataset.switch == "birthdayChecked"){
      this.setData({
        birthdayChecked: detail.detail
      })
    }else if(detail.currentTarget.dataset.switch == "penpalsChecked"){
      this.setData({
        penpalsChecked: detail.detail
      })
    }else if(detail.currentTarget.dataset.switch == "treeholeChecked"){
      this.setData({
        treeholeChecked: detail.detail
      })
    }
  },

  changesex(){
    this.setData({
      show: true
    })
  },

  onConfirm(e){
    console.log(e.detail.value)
    this.setData({
      sex: e.detail.value,
      show: false
    })
  },

  onsubmit(){
    var that = this
    wx.cloud.callFunction({
      name: 'userChangeBaseInformation',
      data: {
        id:app.globalData.id,
        nickname: that.data.nickname,
        protrait: that.data.avatarUrl,
        sex: that.data.sex,
        signature: that.data.signature,
        tel: that.data.tel,
        birthday: ''
      }
    }).then(
      wx.cloud.callFunction({
        name: 'userChangePrivacy',
        data: {
          id:app.globalData.id,
          achievement: that.data.achievementChecked,
          birthday: that.data.birthdayChecked,
          friends: that.data.penpalsChecked,
          treeHole: that.data.treeholeChecked
        }
      }).then(
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 2000
        }),
        setTimeout(function () {
          wx.redirectTo({
            url: '../index/index',
          })
        }, 1000)
      )
    )
  }
})