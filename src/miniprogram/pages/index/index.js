// miniprogram/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "伊蕾娜",
    active: 0,
    bottom1: "12%",
    bottom2: "12%",
    portraitURL: "cloud://cloud1-9g6mp0559beaec2a.636c-cloud1-9g6mp0559beaec2a-1305792439/portrait/伊蕾娜头像.jpeg",
    isPlus: "plus",
    frelationshipLength: "20px",
    show: false,
    writeShow: false,
    lettersdetailshow: false
  },
  onChange(event) {
    // event.detail 的值为当前选中项的索引
    this.setData({ active: event.detail });
  },
  onLettersDetail(){
    this.setData({ lettersdetailshow: true });
  },
  onClose() {
    this.setData({ lettersdetailshow: false });
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
      frelationshipLength: (that.data.username.length-1)*15+20 + "px"

  
 

  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          avatarUrl: res.userInfo.avatarUrl,
          userInfo: res.userInfo,
          hasUserInfo: true,
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

  tapCollapseMenu: function(){
    if(this.data.bottom1 != "12%"){
      this.setData({
        bottom1: "12%",
        bottom2: "12%",
        isPlus: "plus",
        show:false
       })
    }
    else{
      this.setData({
        bottom1: "20%",
        bottom2: "28%",
        isPlus: "cross",
        show:true
       })
    }
  },

  onWrite(){
    this.setData({ writeShow: true });
  },

  onNewFriend(){
    wx.navigateTo({
      url: '../writePage/writePage',
    })
  }
})