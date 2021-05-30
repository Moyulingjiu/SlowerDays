// miniprogram/pages/writePage/writePage.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    friendlist: [],
    recipient: "一位有缘的陌生人",
    text: '',
    date: '',
    arrivalTime: '',
    form: app.globalData.id,
    to: '',
    state: 0,
    type: '',
    accident: '',
    envelope: 0,
    paper: 0,
    stamp: 0,
    giftEnvelope: 0,
    giftPaper: 0,
    giftStamp: 0,
    gift: '',
    recipientPageshow: false,
    stampPageshow: false,
    popupName: "None"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if(options.isNew == "true"){
      this.setData({
        recipient: "一位有缘的陌生人",
        type: 0
      })
      wx.cloud.callFunction({
        name: 'userGetNowId'
      }).then(function(e){
        var num = Math.floor(Math.random() * e.result ) + 1
        if(num != app.globalData.id){
          that.setData({
            to: num
          })
        }else if(num != 1){
          that.setData({
            to: num-1
          })
        }else{
          that.setData({
            to: num+1
          })
        }
      })
    }else{
      this.setData({
        recipient: "点击选择收件人",
        type: 1
        })
    }
    wx.cloud.callFunction({
      name: 'mailboxGet',
      data: {
        id:app.globalData.id,
      }
    }).then(console.log)
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

  inputtext(e){
    this.setData({
      text: e.detail.value
    })
  },

  onClose() {
    this.setData({ 
      recipientPageshow: false,
      stampPageshow: false
     });
  },

  onChangeRecipient(){
    this.setData({ recipientPageshow: true });
  },

  changeRecipient(e){
    console.log(e)
  },

  changeStampPage(event){
    var that = this
    if(event.detail == 0){
      this.setData({ 
        stampPageshow: true,
        popupName: "选择邮票"
       });
    }
    else if(event.detail == 1){
      this.setData({ 
        stampPageshow: true,
        popupName: "选择信纸"
       });
    }
    else if(event.detail == 2){
      this.setData({ 
        stampPageshow: true,
        popupName: "选择伴手礼"
       });
    }
    else if(event.detail == 3){
      var d = new Date()
      var date = d
      d.setHours(d.getHours()+ Math.floor(Math.random() * 12 ) + 3)
      that.setData({
        date: date,
        arrivalTime: d
      })
      wx.cloud.callFunction({
        name: 'userGetNowId'
      }).then(console.log)
      wx.cloud.callFunction({
        name: 'mailInsert',
        data: {
          text: that.data.text,
          date: that.data.date,
          arrivalTime: that.data.arrivalTime,
          form: that.data.form,
          to: that.data.to,
          state: that.data.state,
          type: that.data.type,
          accident: that.data.accident,
          envelope: that.data.envelope,
          paper: that.data.paper,
          stamp: that.data.stamp,
          giftEnvelope: that.data.giftEnvelope,
          giftPaper: that.data.giftPaper,
          giftStamp: that.data.giftStamp,
          gift: that.data.gift,
        }
      }).then(wx.reLaunch({
        url: '../sendConfirmationPage/sendConfirmationPage',
      }))
    }
  }
})