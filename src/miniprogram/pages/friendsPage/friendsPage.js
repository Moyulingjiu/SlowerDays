// miniprogram/pages/friendsPage/friendsPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname: '',
    sex: '',
    signature: '',
    protrait: '',
    id: 0,
    wallet: 0,
    active: 2,
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
        wallet: e.result.wallet
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

  }
})