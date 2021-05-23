// pages/envelope/envelope.js
Component({
  /**
   * 组件的属性列表
   */
  
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    imageURL:"cloud://cloud1-9g6mp0559beaec2a.636c-cloud1-9g6mp0559beaec2a-1305792439/test/images/cloudstore/paper.jpg",
   imageURL:"cloud://cloud1-9g6mp0559beaec2a.636c-cloud1-9g6mp0559beaec2a-1305792439/test/images/cloudstore/sale1.jpg",
  },

  /**
   * 组件的方法列表
   */
  // methods: {
  // onLoad: function () {
  //   let group = this.data.group  // 获取原数据
  //   for (let i in group) {
  //     // 设置监听回调事件，当元素 .loadImg{{i}},进入页面20px内就触发回调事件，设置图片为真正的图片，通过show控制
  //     wx.createIntersectionObserver().relativeToViewport({ bottom: 20 }).observe('.loadImg' + i, (ret) => {
  //       if (ret.intersectionRatio > 0) {
  //         group[i].show = true
  //       }
  //       this.setData({ // 更新数据
  //         group
  //       })
  //     })
  //     }
  //   }
  // },
  goToTalkPage:function(param){
    wx.navigateTo({
      url: '../envelopeDetail/envelopeDetail',
    })
  }
})
