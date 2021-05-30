// pages/envelope/envelope.js
Page({
  /**
   * 组件的属性列表
   */

  /**
   * 组件的初始数据
   */
  data: {
    imageURL:"cloud://cloud1-9g6mp0559beaec2a.636c-cloud1-9g6mp0559beaec2a-1305792439/test/images/cloudstore/paper.jpg",
    imageURL:"cloud://cloud1-9g6mp0559beaec2a.636c-cloud1-9g6mp0559beaec2a-1305792439/test/images/cloudstore/sale1.jpg",
  },
<<<<<<< Updated upstream
  goToPage:function(param){
    wx.switchTab({
      url: '../shopDetail/shopDetail',
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
   
  

   },
  
=======
  
  goToTalkPage(){
    wx.navigateTo({
      url: '../shopDetail/shopDetail',
    })
  }
>>>>>>> Stashed changes
})
