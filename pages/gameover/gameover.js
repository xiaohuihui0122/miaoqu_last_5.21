// pages/gameover/gameover.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    slip_cat: true,//是否滑动猫
    opacity_num: 0,//刚开始透明度
    share: [
      ' 喂什么猫粮，一起撸鱼吧......',
      '这只猫为了抓鱼简直逆天了，快来围观......',
      '这只猫为了吃鱼竟然进了丛林......',
      '劳资就是饿死，死外边，也决不自个抓鱼！好多鱼，喵~',
      '还不把小鱼干交出来，我都看见了~',
      '来人呐！赶紧给它摁住了，别让跑咯'
    ],
    m: '00',
    s: '00',
    coin_num: 0,
    star_opacity: 0,//传入的得到的金币的总数量
    coin:0,//页面显示的金币的变动
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 将主页面的时间传入
    this.setData({
      m: options.m,
      s: options.s
    })
    // 将游戏主页面的金币传入
    this.setData({
      coin_num: options.coin_num
    })
    // 延时显示金币的变化
    setTimeout(()=>{
      var coin_timer = setInterval(() => {
        if (this.data.coin == this.data.coin_num) {
          clearInterval(coin_timer)
        }
        this.data.coin = this.data.coin + this.data.coin_num / 100
        this.setData({
          coin: this.data.coin
        })
      }, 20)
    },2000)

    setTimeout(() => {
      this.setData({
        slip_cat: false
      })
    }, 1000)
    setTimeout(() => {
      this.setData({
        opacity_num: 1
      })
    }, 2000)
    // 音效
    // 抓木板
    if (app.globalData.music == true) {
      //抓木板声音
      app.AppMusic1.src = 'http://192.168.1.250:8301/Public/music/mq_music/zmb.mp3'
      app.AppMusic1.loop = false
      //星星点亮
      setTimeout(() => {
        app.AppMusic2.src = 'http://192.168.1.250:8301/Public/music/mq_music/xxs.mp3'
        app.AppMusic2.loop = false;
      }, 3500)
    } else {
      app.AppMusic1.pause()
    }
    // 星星的透明度变为1
    setTimeout(()=>{
      this.setData({
        star_opacity:1,
      })
    },3800)




  },
  go_billboard() {
    wx.navigateTo({
      url: '../../pages/billboard/billboard'
    })
  },
  go_startgame() {
    wx.navigateTo({
      url: '../../pages/start_game/start_game?start=1'
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
  onShareAppMessage: function (e) {
    var text = null;
    var sub = parseInt(Math.random() * 5)
    text = this.data.share[sub]
    return {
      title: text,
      path: '/pages/index/index',
      imageUrl: '../../imgs/share/ace.png'
    }
  }
})