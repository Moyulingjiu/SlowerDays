// miniprogram/pages/sendConfirmationPage/sendConfirmationPage.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    all:[],
    type:'',
    index:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      type: options.type,
      index: options.index
    })
    wx.cloud.callFunction({
      name: 'shopGet'
    }).then(function(e){
      var detail = e.result[that.data.type][that.data.index]
      that.setData({
        all: detail
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

  onBuy(){
    var that = this
    if(this.data.type == "envelope"){
      wx.cloud.callFunction({
        name: 'shopEnvelopeBuy',
        data: {
          id:app.globalData.id,
          goodsId: that.data.index
        }
      }).then(function(e){
        if(e){
          wx.showToast({
            title: '购买成功',
            icon: 'success',
            duration: 2000
          }),
          setTimeout(function () {
            wx.redirectTo({
              url: '../index/index',
            })
          }, 400)
        }else{
          wx.showToast({
            title: '购买失败',
            icon: 'success',
            duration: 2000
          })
        }
      })
    }else if(this.data.type == "paper"){
      wx.cloud.callFunction({
        name: 'shopPaperBuy',
        data: {
          id:app.globalData.id,
          goodsId: that.data.index
        }
      }).then(function(e){
        if(e){
          wx.showToast({
            title: '购买成功',
            icon: 'success',
            duration: 2000
          }),
          setTimeout(function () {
            wx.redirectTo({
              url: '../index/index',
            })
          }, 400)
        }else{
          wx.showToast({
            title: '购买失败',
            icon: 'success',
            duration: 2000
          })
        }
      })
    }else if(this.data.type == "stamp"){
      wx.cloud.callFunction({
        name: 'shopStampBuy',
        data: {
          id:app.globalData.id,
          goodsId: that.data.index
        }
      }).then(function(e){
        if(e){
          wx.showToast({
            title: '购买成功',
            icon: 'success',
            duration: 2000
          }),
          setTimeout(function () {
            wx.redirectTo({
              url: '../index/index',
            })
          }, 400)
        }else{
          wx.showToast({
            title: '购买失败',
            icon: 'success',
            duration: 2000
          })
        }
      })
    }
  }
})