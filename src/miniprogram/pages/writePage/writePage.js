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
    form: '',
    to: '',
    state: '',
    type: '',
    accident: '',
    envelope: '',
    paper: '',
    stamp: '',
    giftEnvelope: '',
    giftPaper: '',
    giftStamp: '',
    gift: '',
    recipientPageshow: false,
    stampPageshow: false,
    popupName: "None"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.isNew == "true"){
      this.setData({
        recipient: "一位有缘的陌生人",
        })
    }else{
      this.setData({
        recipient: "点击选择收件人",
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
      wx.reLaunch({
        url: '../sendConfirmationPage/sendConfirmationPage',
      })
    }
  }
})