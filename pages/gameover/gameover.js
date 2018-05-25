// pages/gameover/gameover.js
const app = getApp()
let MD5 = require('../../utils/md5.js');
let sign = require('../../utils/sign.js');
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
    coin: 0,//页面显示的金币的变动
    is_box:false,//刚开始星星的view没有出现
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 将主页面的时间传入
    var setdata = options;
    this.setData({
      m: options.m,
      s: options.s
    })
    //发送游戏数据
    this._game_setData(setdata);
    // 将游戏主页面的金币传入
    this.setData({
      coin: options.coin_num
    })
    // 调试
    // setTimeout(() => {
    //   if (this.data.coin < 100) {
    //     var coin_timer = setInterval(() => {
    //       var cha = this.data.coin + 1
    //       if (cha >= this.data.coin_num) {
    //         clearInterval(coin_timer)
    //       }
    //       this.data.coin = this.data.coin + 1
    //       this.setData({
    //         coin: this.data.coin
    //       })
    //     }, 50)
    //   }
      // 金币大于100小于1000的情况
      // if (100<this.data.coin < 1000) {
      //   var coin_timer = setInterval(() => {
      //     var cha = this.data.coin + this.data.coin_num / 10
      //     if (cha == this.data.coin_num) {
      //       clearInterval(coin_timer)
      //     }
      //     this.data.coin = this.data.coin + this.data.coin_num / 10
      //     this.setData({
      //       coin: this.data.coin
      //     })
      //   }, 50)
      // }
      // // 金币大于1000的情况
      // if (this.data.coin>1000) {
      //   var coin_timer = setInterval(() => {
      //     var cha = this.data.coin + this.data.coin_num / 100
      //     if (cha == this.data.coin_num) {
      //       clearInterval(coin_timer)
      //     }
      //     this.data.coin = this.data.coin + this.data.coin_num / 100
      //     this.setData({
      //       coin: this.data.coin
      //     })
      //   }, 50)
      // }

    // }, 2000)

    setTimeout(() => {
      this.setData({
        slip_cat: false
      })
    }, 1000)
    // 1s之后设置星星的view为true
    setTimeout(() => {
      this.setData({
        is_box: true
      })
    }, 500)
    setTimeout(() => {
      this.setData({
        opacity_num: 1
      })
    }, 2000)
    // 音效
    // 抓木板
    if (app.globalData.music == true) {
      //抓木板声音
      app.AppMusic1.src = app.globalData.http + 'Public/music/mq_music/zmb.mp3'
      app.AppMusic1.loop = false
      //星星点亮
      setTimeout(() => {
        app.AppMusic2.src = app.globalData.http + 'Public/music/mq_music/xxs.mp3'
        app.AppMusic2.loop = false;
      }, 3500)
    } else {
      app.AppMusic1.pause()
    }
    // 星星的透明度变为1
    setTimeout(() => {
      this.setData({
        star_opacity: 1,
      })
    }, 3800)




  },
  go_billboard() {
    if (app.globalData.effect == true) {
      app.bgm.play()
    } else {
      app.bgm.pause()
    }
    wx.redirectTo({
      url: '../../pages/billboard/billboard'
    })
  },
  go_startgame() {
    if (app.globalData.effect == true) {
      app.bgm.play()
    } else {
      app.bgm.pause()
    }
    wx.redirectTo({
      url: '../../pages/start_game2/start_game2'
    })
  },
  //发送游戏数据FN
  _game_setData(e) {
    console.log(e);
    var integral = e.coin_num;
    var start_time = e.start_time.toString().substr(0, 10);
    var end_time = e.end_time.toString().substr(0, 10);
    var use_time = end_time - start_time;
    // console.log(app.globalData.http + 'index.php?m=Mq&c=Data&a=setData&use_time=' + use_time
    //       + '&start_time=' + start_time
    //       +'&end_time=' + end_time
    //       +'&integral=' + integral
    //       +'&user_id=' + app.globalData.uid
    //       )
    wx.request({
      url: app.globalData.http + 'index.php?m=Mq&c=Data&a=setData',
      data: {
        use_time: use_time,
        start_time: start_time,
        end_time: end_time,
        integral: integral,
        user_id: app.globalData.uid,
        sign: sign.sign({
          user_id: app.globalData.uid,
          use_time: use_time,
          start_time: start_time,
          end_time: end_time,
          integral: integral
        }, app.globalData.API_CODE),
        API_CHANNEL: app.globalData.API_CHANNEL,
        API_SECRET: app.globalData.API_SECRET,
        API_ROLE: app.globalData.API_ROLE[1],
        API_VER: '1.0',
        API_CODE: app.globalData.API_CODE,
      },
      success: res => {
        console.log(res);
        this.setData({
          star_num: res.data.info.star,
        });
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
  onShareAppMessage: function (e) {
    var text = null;
    var sub = parseInt(Math.random() * 5)
    text = this.data.share[sub]
    return {
      title: text,
      path: '/pages/start_game/start_game?friend_id=' + app.globalData.uid,
      imageUrl: '../../imgs/share/ace.png',
    }
  }
})