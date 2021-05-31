// pages/envelope/envelope.js
Page({
  /**
   * 组件的属性列表
   */

  /**
   * 组件的初始数据
   */
  data: {
    paper: []
  },

  onLoad(){
    var that = this
    wx.cloud.callFunction({
      name: 'shopGet'
    }).then(function(e){
      console.log(e.result)
      that.setData({
        paper: e.result.paper
      })
    })
  },

  goToPage:function(param){
    wx.navigateTo({
      url: '../shopDetail/shopDetail?type='+param.currentTarget.dataset.type+"&index="+param.currentTarget.dataset.index,
    })
  },
  
})
