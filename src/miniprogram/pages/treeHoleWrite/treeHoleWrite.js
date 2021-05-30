// miniprogram/pages/treeHoleWrite/treeHoleWrite.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backgroundcolor: "white",
    text: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  changelettercolor(e){
    this.setData({
      backgroundcolor: e.currentTarget.dataset.color
    })
  },

  inputtext(e){
    this.setData({
      text: e.detail.value
    })
  },

  sendContent(){
    var that = this
    wx.cloud.callFunction({
      name: 'treeholeInsert',
      data:{
        id: app.globalData.id,
        color: that.data.backgroundcolor,
        text: that.data.text
      }
    }).then(
      function(e){
        console.log(e)
        wx.showToast({
          title: '已投入树洞',
          icon: 'success',
          duration: 2000
        }),
        setTimeout(function () {
          wx.reLaunch({
            url: '../index/index',
          })
        }, 400)
      }
    )
  }
})