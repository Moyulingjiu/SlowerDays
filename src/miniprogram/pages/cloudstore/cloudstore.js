//滚筒播放照片是否需要上传云端的问题未解决
Component({
  /**
   * 组件的属性列表
   */
  /**
   * 组件的初始数据
   */
  data: {
    swiperCurrent: 0,
    indicatordots: true,/*加入图标指示点*/
    autoplay: true,/*自动切换图片开关*/
    interval: 1000,
    indexList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],

  },
  /**
   * 组件的方法列表
   */
  methods: {
    onDot(e) {
      this.setData({
        swiperCurrent: e.currentTarget.dataset.i
      })
      console.log(e)
  },
  swiperChange: function(e) {
    // console.log(e)
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  
  onChange(e) {
    this.setData({
      value: e.detail,
    });
  },
  onSearch() {
    Toast('搜索' + this.data.value);
  },
  onClick() {
    Toast('搜索' + this.data.value);
  },
  
  
}
})
