const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_show: true,//控制页面的是否显示的开关
    animate1: {
      style: 'gradual_show',
      time: '3s',
      freq: '1',
    },//开始游戏的动画
    start_trump: false,
    start_notice: false,
    is_dark: true,//是否打开背景变暗
    is_loading: false,//是否显示加载图标
    loading_width: 50,//初始化进度条的长度
    pro_text: 40,//初始化进度多少
    is_press_trump: false,//喇叭按下
    is_press_notice: false,//游戏须知按下
    yx_control: true,//初始化音效
    yy_control: true,//初始化音乐
    logo_show:true,//初始化显示喵趣logo
    share: [
      ' 喂什么猫粮，一起撸鱼吧......',
      '这只猫为了抓鱼简直逆天了，快来围观......',
      '这只猫为了吃鱼竟然进了丛林......',
      '劳资就是饿死，死外边，也决不自个抓鱼！好多鱼，喵~',
      '还不把小鱼干交出来，我都看见了~',
      '来人呐！赶紧给它摁住了，别让跑咯'
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      is_show: false
    })
    this.start_voice();
  },

  // 方法组：
  go_index() {
    // 将喵趣的logo去掉
    this.setData({
      logo_show: false
    })
    if (app.globalData.music == true) {
      app.AppMusic2.src = 'http://192.168.1.250:8301/Public/music/mq_music/mq_bt.mp3'
    } else {
      app.AppMusic1.pause()
      app.AppMusic2.pause()
    }
    this.setData({
      is_show: true
    })
    this.setData({
      is_loading: true
    })
    // 滚动条动画
    // 时间待调整
    if (this.data.is_loading == true) {
      var timer = setInterval(() => {
        this.setData({
          loading_width: this.data.loading_width + 4.2
        })
        this.setData({
          pro_text: this.data.pro_text + 10
        })
        // 关闭定时器
        if (this.data.pro_text == 100) {
          clearInterval(timer)
        }
      }, 400)
    }
    setTimeout(() => {
      wx.redirectTo({
        url: '../index/index'
      })
    }, 3000)
  },
  trump() {
    if (app.globalData.effect == true && app.globalData.music == true) {
      app.AppMusic3.src = 'http://192.168.1.250:8301/Public/music/mq_music/mq_bt.mp3'
      app.AppMusic3.loop = false
    }
    this.setData({
      start_trump: true
    })
    this.setData({
      is_dark: false
    })
    this.setData({
      is_press_trump: true
    })
    // 一段时间之后恢复
    setTimeout(() => {
      this.setData({
        is_press_trump: false
      })
    }, 600)
  },
  notice() {
    if (app.globalData.effect == true && app.globalData.music == true) {
      app.AppMusic3.src = 'http://192.168.1.250:8301/Public/music/mq_music/mq_bt.mp3'
      app.AppMusic3.loop = false
    }
    this.setData({
      start_notice: true
    })
    this.setData({
      is_dark: false
    })
    // 点击按下的动画
    this.setData({
      is_press_notice: true
    })
    // 一段时间之后恢复
    setTimeout(() => {
      this.setData({
        is_press_notice: false
      })
    }, 600)
  },
  // 关闭
  close_trump() {
    if (app.globalData.effect == true && app.globalData.music == true) {
      app.AppMusic3.src = 'http://192.168.1.250:8301/Public/music/mq_music/mq_bt.mp3'
      app.AppMusic3.loop = false
    }
    this.setData({
      start_trump: false
    })
    this.setData({
      is_dark: true
    })
    console.log(22222)
  },
  close_notice() {
    if (app.globalData.effect == true && app.globalData.music == true) {
      app.AppMusic3.src = 'http://192.168.1.250:8301/Public/music/mq_music/mq_bt.mp3'
      app.AppMusic3.loop = false
    }
    this.setData({
      start_notice: false
    })
    this.setData({
      is_dark: true
    })
  },
  // 音效
  start_voice() {
    if (app.globalData.music == true) {
      app.AppMusic1.src = 'http://192.168.1.250:8301/Public/music/mq_music/mq_bg.mp3'
      app.AppMusic2.src = 'http://192.168.1.250:8301/Public/music/mq_music/mj2.mp3'
      app.AppMusic3.src = 'http://192.168.1.250:8301/Public/music/mq_music/sy1.mp3'
      app.AppMusic2.loop = false
    } else {
      app.AppMusic1.pause()
      app.AppMusic2.pause()
    }
  },
  // 音效改变的方法
  yx_change() {
    this.setData({
      yx_control: !this.data.yx_control
    })
    // 真正控制音效的关闭
    // 音效的开关
    if (app.globalData.effect == true) {
      app.globalData.effect = false
      this.setData({
        effect: app.globalData.effect
      })
    } else {
      app.globalData.effect = true
      this.setData({
        effect: app.globalData.effect
      })
    }
  },
  // 音乐改变的方法
  yy_change() {
    this.setData({
      yy_control: !this.data.yy_control
    })
    // 音乐的开关
    if (app.globalData.music == true) {
      app.globalData.music = false
      this.setData({
        music: app.globalData.music
      })
    } else {
      app.globalData.music = true
      this.setData({
        music: app.globalData.music
      })
    }
    this.start_voice()
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
  
  }
})