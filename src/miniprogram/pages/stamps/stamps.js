// pages/envelope/envelope.js
Page({
  /**
   * 组件的属性列表
   */

  /**
   * 组件的初始数据
   */
  data: {
    stamp: []
  },

  onLoad(){
    var that = this
    wx.cloud.callFunction({
      name: 'shopGet'
    }).then(function(e){
      console.log(e.result)
      that.setData({
        stamp: e.result.stamp
      })
    })
  },

  goToPage:function(param){
    wx.navigateTo({
      url: '../shopDetail/shopDetail?type='+param.currentTarget.dataset.type+"&index="+param.currentTarget.dataset.index,
    })
  },
  
})
