// miniprogram/pages/index/index.js
import Notify from '../miniprogram_npm/@vant/weapp/notify/notify';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    touchStartTime: 0,   // 触摸开始时间
    touchEndTime: 0,    // 触摸结束时间
    lastTapTime: 0,    // 最后一次单击事件点击发生时间
    treeHoleBackground: "white",
    treeHoleText: '',
    treeHoleId: '',
    friendname: "伊蕾娜",
    portraitURL: "cloud://cloud1-9g6mp0559beaec2a.636c-cloud1-9g6mp0559beaec2a-1305792439/portrait/伊蕾娜头像.jpeg",
    active: 0,
    transferStatusCardHeight: "100px",
    bottom1: "12%",
    bottom2: "12%",
    bottom3: "12%",
    isPlus: "plus",
    frelationshipLength: "20px",
    show: false,
    writeShow: false,
    lettersdetailshow: false,
    collapseMenuShow: false,
    treeholeshow: false,
    taskShow: false,
    relationshipshow: false
  },
  /// 按钮触摸开始触发的事件
  touchStart: function(e) {
    this.touchStartTime = e.timeStamp
  },
  
  /// 按钮触摸结束触发的事件
  touchEnd: function(e) {
    this.touchEndTime = e.timeStamp
  },
    
  onChange(event) {
    // event.detail 的值为当前选中项的索引
    this.setData({ active: event.detail });
    if(event.detail == 1){
      wx.redirectTo({
        url: '../cloudstore/cloudstore',
      })
    }
    else if(event.detail == 2){
      wx.redirectTo({
        url: '../personalPage/personalPage',
      })
    }
  },
  onLettersDetail(){
    this.setData({ lettersdetailshow: true });
  },
  onClose() {
    this.setData({ 
      lettersdetailshow: false,
      bottom1: "12%",
      bottom2: "12%",
      bottom3: "12%",
      isPlus: "plus",
      show:false,
      collapseMenuShow: false,
      treeholeshow: false,
      relationshipshow: false
    });
  },
  onClickHide() {
    this.setData({ writeShow: false });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      frelationshipLength: (that.data.friendname.length-1)*15+20 + "px",
      // transferStatusCardHeight: 
      })
      wx.cloud.callFunction({
        name: 'treeholeGetNewId'
      }).then(function(e){
        that.setData({
          treeHoleId: Math.floor(Math.random() * e.result ) + 1,
        })
        wx.cloud.callFunction({
          name: 'treeholeGet',
          data:{
            treeholeId: that.data.treeHoleId,
            id:app.globalData.id
          }
        }).then(function(data){
          that.setData({
            treeHoleBackground: data.result.color,
            treeHoleText: data.result.text
          })
        })
        wx.cloud.callFunction({
          name: 'userTaskGet',
          data: {
            id:app.globalData.id
          }
        }).then()
      })
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

  tapCollapseMenu: function(){
    if(this.data.bottom1 != "12%"){
      this.setData({
        bottom1: "12%",
        bottom2: "12%",
        bottom3: "12%",
        isPlus: "plus",
        show:false,
        collapseMenuShow: false
       })
    }
    else{
      this.setData({
        bottom1: "20%",
        bottom2: "28%",
        bottom3: "36%",
        isPlus: "cross",
        show:true,
        collapseMenuShow: true
       })
    }
  },

  onFriendsPage(){
    wx.redirectTo({
      url: '../friendsPage/friendsPage',
    })
  },

  onrelationship(){
    this.setData({ relationshipshow: true });
  },

  onWrite(){
    this.setData({ writeShow: true });
  },

  onTask(){
    this.setData({ taskShow: true });
  },

  onTreeHoleWrite(){
    wx.navigateTo({
      url: '../treeHoleWrite/treeHoleWrite',
    })
  },

  onTaskClose() {
    this.setData({ 
      taskShow: false
    });
  },

  onNewFriend(){
    wx.navigateTo({
      url: '../writePage/writePage?isNew=true',
    })
  },

  onOldFriend(){
    wx.navigateTo({
      url: '../writePage/writePage?isNew=false',
    })
  },

  onLetterDetail(){
    wx.navigateTo({
      url: '../letterDetail/letterDetail',
    })
  },

  onTreeHoleTap(e){
    var that = this
    if (that.touchEndTime - that.touchStartTime < 350) {
      // 当前点击的时间
      var currentTime = e.timeStamp
      var lastTapTime = that.lastTapTime
      // 更新最后一次点击时间
      that.lastTapTime = currentTime
      if (currentTime - lastTapTime < 300) {
        // 成功触发双击事件时，取消单击事件的执行
        clearTimeout(that.lastTapTimeoutFunc);
        Notify({
          message: '树洞作者已收到你的喜欢❤',
          color: '#ad0000',
          background: '#ffe1e1',
        })
        wx.cloud.callFunction({
          name: 'treeholeLike',
          data:{
            treeholeId: that.data.treeHoleId,
            id:app.globalData.id
          }
        })
      } else {
        // 单击事件延时300毫秒执行，这和最初的浏览器的点击300ms延时有点像。
        that.lastTapTimeoutFunc = setTimeout(function () {
          that.setData({
            treeholeshow: true
          })
        }, 300);
      }
    } 
  }
})