// miniprogram/pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: 'cloud://cloud1-9g6mp0559beaec2a.636c-cloud1-9g6mp0559beaec2a-1305792439/portrait/伊蕾娜头像.jpeg',
    nickname: '',
    sex: '选择',
    signature: '',
    tel: '',
    birthday: '',
    sexlist: ['男', '女', '未知'],
    show: false,
  },

  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
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

  onChange(event) {
    if(event.currentTarget.dataset.cell == "nickname"){
      this.setData({
        nickname: event.detail
      })
    }else if(event.currentTarget.dataset.cell == "signature"){
      this.setData({
        signature: event.detail
      })
    }else if(event.currentTarget.dataset.cell == "tel"){
      this.setData({
        tel: event.detail
      })
    }
  },

  changesex(){
    this.setData({
      show: true
    })
  },

  onConfirm(e){
    console.log(e.detail.value)
    this.setData({
      sex: e.detail.value,
      show: false
    })
  },

  wxgetUserProfile(){
    wx.getUserProfile({
      desc: '用于完善用户资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res.userInfo)
        if(res.userInfo.gender == 0){
          var sex = '未知'
        }else if(res.userInfo.gender == 1){
          var sex = '男'
        }else{
          var sex = '女'
        }
        this.setData({
          nickname: res.userInfo.nickName,
          sex: sex,
          avatarUrl: res.userInfo.avatarUrl
        })
      }
    })
  },

  onsubmit(){
    wx.cloud.callFunction({
      name: 'register',
      data: {
        nickname: this.data.nickname,
        protrait: this.data.avatarUrl,
        sex: this.data.sex,
        signature: this.data.signature,
        tel: this.data.tel,
        birthday: ''
      }
    }).then(
      wx.showToast({
        title: '注册成功',
        icon: 'success',
        duration: 2000
      }),
      setTimeout(function () {
        wx.redirectTo({
          url: '../index/index',
        })
      }, 1000)
    )
  }
})