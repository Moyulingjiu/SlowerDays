// miniprogram/pages/myTreeHole/myTreeHole.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    treeholedata: [],
    treeholeshow: false,
    detaildata: {},
  },

  onClose() {
    this.setData({ 
      treeholeshow: false
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.cloud.callFunction({
      name: 'treeholeGetMine',
      data:{
        id:app.globalData.id
      }
    }).then(function(e){
      for (const key in e.result.treeHole) {
        wx.cloud.callFunction({
          name: 'treeholeGet',
          data:{
            treeholeId: e.result.treeHole[key],
            id:app.globalData.id
          }
        }).then(function(e){
          var list = that.data.treeholedata
          var time = e.result.date
          time = time.slice(0,10)
          list.push({date:time,text:e.result.text,color:e.result.color,like:e.result.like.number})
          that.setData({
            treeholedata: list,
          })
        })
      }
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

  onTreeHoleTap(e){
    this.setData({
      detaildata: this.data.treeholedata[e.currentTarget.dataset.index]
    })
    this.setData({
      treeholeshow: true
    })
  }
})