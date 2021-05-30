// miniprogram/pages/personalPage/personalPage.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    nickname: '',
    sex: '',
    signature: '',
    protrait: '',
    id: '',
    wallet: 0,
    active: 2,
  },

  onChange(event) {
    // event.detail 的值为当前选中项的索引
    this.setData({ active: event.detail });
    if(event.detail == 0){
      wx.redirectTo({
        url: '../index/index',
      })
    }
    else if(event.detail == 1){
      wx.redirectTo({
        url: '../cloudstore/cloudstore',
      })
    }
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
        protrait: e.result.baseInformation.protrait,
        wallet: e.result.wallet,
        id: app.globalData.id
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
  onsetting(){
    wx.redirectTo({
      url: '../personalSettings/personalSettings',
    })
  }
})