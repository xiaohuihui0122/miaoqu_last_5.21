// pages/start_game/start_game.js
const app = getApp();
//app.js
let MD5 = require('../../utils/md5.js');
let sign = require('../../utils/sign.js');
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
    loading_width: 0,//初始化进度条的长度
    pro_text: 0,//初始化进度多少
    is_press_trump: false,//喇叭按下
    is_press_notice: false,//游戏须知按下
    index_page: {}, //是否是闪屏的主页面
    cat_show: false,//首页出现的小猫
    splash_cat_show: false,//闪屏出现的小猫
    splash_fish: false,//闪屏出现的小鱼
    share: [
      ' 喂什么猫粮，一起撸鱼吧......',
      '这只猫为了抓鱼简直逆天了，快来围观......',
      '这只猫为了吃鱼竟然进了丛林......',
      '劳资就是饿死，死外边，也决不自个抓鱼！好多鱼，喵~',
      '还不把小鱼干交出来，我都看见了~',
      '来人呐！赶紧给它摁住了，别让跑咯'
    ],
    leave_show: false,//叶子显示的时间
    logo_show: false,//logo是否显示
    btnPath: '',//按钮的路径
    splash_fish_src:'',//缓存闪屏小鱼的路径
    http:"https://maoqb.5izhuan.com/",//http路径
    yy_control: true,//初始化音乐
    yx_control: true,//初始化音效
    bgdark:'',
    bgback:'',
    // 是否开启第二种音乐
    second_voice:0,
  },

  /**
   * 生命周期函数--监听页面加载*/
  bindGetUserInfo: function (e) {
    this.setData({
      getuserinfo:false,
    })
    if (e.detail.userInfo) {     
      var userInfo = e.detail.userInfo;
      wx.login({
        success: res => {
          if (res.code) {
            var code = res.code;
            wx.request({
              url: app.globalData.http + 'index.php?m=Mq&c=User&a=setUserByCode',
              data: {
                code: code,
                nickName: userInfo.nickName,
                avatarUrl: userInfo.avatarUrl,
                province: userInfo.province,
                sign: sign.sign({ code: code, avatarUrl: userInfo.avatarUrl}, app.globalData.API_CODE),
                API_CHANNEL: app.globalData.API_CHANNEL,
                API_SECRET: app.globalData.API_SECRET,
                API_ROLE: app.globalData.API_ROLE[0],
                API_VER: '1.0',
                API_CODE: app.globalData.API_CODE,
              },
              success: res => {
                console.log(res);
                app.globalData.uid = res.data.info.uid;
                wx.request({
                  url: app.globalData.http + 'index.php?m=Mq&c=Index&a=login',
                  data: {
                    uid: app.globalData.uid,
                    sign: sign.sign({ uid: app.globalData.uid }, app.globalData.API_CODE),
                    API_CHANNEL: app.globalData.API_CHANNEL,
                    API_SECRET: app.globalData.API_SECRET,
                    API_ROLE: app.globalData.API_ROLE[1],
                    API_VER: '1.0',
                    API_CODE: app.globalData.API_CODE,
                  },
                  success: res => {
                    app.globalData.userInfo = res.data.info
                  }
                })
              }
            })
          }
        }
      })
    } else {
      console.log(e.detail.errMsg);
    }
    this.go_index();
  },
  onLoad: function (options) {
    // 自动弹出用户授权
    var that = this
    // 将start_game页面的几张图片做一下缓存
    wx.downloadFile({
      url: app.globalData.http + 'Public/img/mq_gif/back.png',
      success: res1 => {
        that.setData({
          bgback: res1.tempFilePath
        })
      }
    })
    wx.downloadFile({
      url: app.globalData.http + 'Public/img/mq_gif/dark.png',
      success: res2 => {
        that.setData({
          bgdark: res2.tempFilePath
        })
      }
    })
    // 在开始闪屏之前的500内将动态gif下载到本地缓存
    wx.downloadFile({
      url: app.globalData.http + 'Public/img/mq_gif/fish.gif',
      success: res => {
        that.setData({
          splash_fish_src: res.tempFilePath
        })
        // wx.setStorage({
        //   key: "splash_fish",
        //   data: res.tempFilePath
        // })
      }
    })
    // 登录
    wx.login({
      success: res => {
        if (res.code) {
          var code = res.code;
          // 获取用户信息
          wx.getSetting({
            success: res => {
              if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                wx.getUserInfo({
                  success: res => {
                    // 可以将 res 发送给后台解码出 unionId
                    var userInfo = res.userInfo;

                    //调用接口
                    wx.request({
                      url: app.globalData.http + 'index.php?m=Mq&c=User&a=setUserByCode',
                      data: {
                        code: code,
                        nickName: userInfo.nickName,
                        avatarUrl: userInfo.avatarUrl,
                        province: userInfo.province,
                        sign: sign.sign({ code: code, avatarUrl: userInfo.avatarUrl }, app.globalData.API_CODE),
                        API_CHANNEL: app.globalData.API_CHANNEL,
                        API_SECRET: app.globalData.API_SECRET,
                        API_ROLE: app.globalData.API_ROLE[1],
                        API_VER: '1.0',
                        API_CODE: app.globalData.API_CODE,
                      },
                      success: res => {
                        console.log(res)
                        app.globalData.uid = res.data.info.uid;

                        wx.request({
                          url: app.globalData.http + 'index.php?m=Mq&c=Index&a=login',
                          data: {
                            uid: app.globalData.uid,
                            sign: sign.sign({ uid: app.globalData.uid }, app.globalData.API_CODE),
                            API_CHANNEL: app.globalData.API_CHANNEL,
                            API_SECRET: app.globalData.API_SECRET,
                            API_ROLE: app.globalData.API_ROLE[1],
                            API_VER: '1.0',
                            API_CODE: app.globalData.API_CODE,
                          },
                          success: res => {

                            app.globalData.userInfo = res.data.info;
                            if (options.friend_id) {
                              wx.request({
                                url: app.globalData.http + 'index.php?m=Mq&c=User&a=relationUser',
                                data: {
                                  user_id: app.globalData.uid,
                                  nexus_user_id: options.friend_id,
                                  sign: sign.sign({ user_id: app.globalData.uid, nexus_user_id: options.friend_id }, app.globalData.API_CODE),
                                  API_CHANNEL: app.globalData.API_CHANNEL,
                                  API_SECRET: app.globalData.API_SECRET,
                                  API_ROLE: app.globalData.API_ROLE[1],
                                  API_VER: '1.0',
                                  API_CODE: app.globalData.API_CODE,
                                },
                                success: res => {
                                  console.log(res);
                                }
                              })
                            }
                          }
                        })
                      }
                    })
                  }
                })
              } else {
                //弹出授权框。
                this.setData({
                  getuserinfo: true,
                });
                wx.request({
                  url: app.globalData.http + 'index.php?m=Mq&c=User&a=setUserByCode',
                  data: {
                    code: code,
                    sign: sign.sign({ code: code }, app.globalData.API_CODE),
                    API_CHANNEL: app.globalData.API_CHANNEL,
                    API_SECRET: app.globalData.API_SECRET,
                    API_ROLE: app.globalData.API_ROLE[1],
                    API_VER: '1.0',
                    API_CODE: app.globalData.API_CODE,
                  },
                  success: res => {
                    app.globalData.uid = res.data.info.uid;
                    wx.request({
                      url: app.globalData.http + 'index.php?m=Mq&c=Index&a=login',
                      data: {
                        uid: app.globalData.uid,
                        sign: sign.sign({ uid: app.globalData.uid }, app.globalData.API_CODE),
                        API_CHANNEL: app.globalData.API_CHANNEL,
                        API_SECRET: app.globalData.API_SECRET,
                        API_ROLE: app.globalData.API_ROLE[1],
                        API_VER: '1.0',
                        API_CODE: app.globalData.API_CODE,
                      },
                      success: res => {

                        app.globalData.userInfo = res.data.info[0];
                        if (options.friend_id || options.friend_id != undefined) {
                          wx.request({
                            url: app.globalData.http + 'index.php?m=Mq&c=User&a=relationUser',
                            data: {
                              user_id: app.globalData.uid,
                              nexus_user_id: options.friend_id,
                              sign: sign.sign({ user_id: app.globalData.uid, nexus_user_id: options.friend_id }, app.globalData.API_CODE),
                              API_CHANNEL: app.globalData.API_CHANNEL,
                              API_SECRET: app.globalData.API_SECRET,
                              API_ROLE: app.globalData.API_ROLE[1],
                              API_VER: '1.0',
                              API_CODE: app.globalData.API_CODE,
                            },
                            success: res => {
                              console.log(res);
                            }
                          })
                        }
                      }
                    })
                  }
                })
              }
            }
          })

          // 获取部分用户的信息

        }
      }
    })

    // 如果是由排行榜或者结束页面传递

      // 控制小鱼的图片的消失
      setTimeout(() => {
        // 取出小鱼的路径
        // wx.getStorage({
        //   key: 'splash_fish',
        //   success: res =>{
        //     that.setData({
        //       splash_fish: true,
        //       splash_fish_src: res.data
        //     })
        //   }
        // })
        this.setData({
          splash_fish: true,
        })
      }, 500)
      setTimeout(() => {
        this.setData({
          splash_fish: false,
        })
        // wx.getStorage({
        //   key: 'splash_fish',
        //   success: res=> {
        //     that.setData({
        //       splash_fish: false,
        //       splash_fish_src: res.data
        //     })
        //   }
        // })
      }, 2500)
      // 控制小猫的图片的显示
      setTimeout(() => {
        this.setData({
          splash_cat_show: true
        })
      }, 1500)
      // 首页的小猫显示的时间
      if (app.globalData.index_page == true) {
        setTimeout(() => {
          this.setData({
            cat_show: true
          })
        }, 4000)
        setTimeout(() => {
          this.setData({
            leave_show: true
          })
        }, 6000)
        setTimeout(() => {
          this.setData({
            logo_show: true
          })
        }, 6800)
        setTimeout(() => {
          this.setData({
            is_show: false
          })
        }, 9000)
        setTimeout(() => {
          this.data.animate1.style = 'tada'
          this.data.animate1.time = '2s'
          this.data.animate1.freq = 'infinite'
          this.setData({
            animate1: this.data.animate1
          })
        }, 5000)
      } else {
        setTimeout(() => {
          this.setData({
            cat_show: true
          })
        }, 500)
        setTimeout(() => {
          this.setData({
            leave_show: true
          })
        }, 2500)
        setTimeout(() => {
          this.setData({
            is_show: false
          })
        }, 2500)
        setTimeout(() => {
          this.data.animate1.style = 'tada'
          this.data.animate1.time = '2s'
          this.data.animate1.freq = 'infinite'
          this.setData({
            animate1: this.data.animate1
          })
        }, 1500)
      }


      // 闪屏的控制
      this.setData({
        index_page: app.globalData.index_page
      })
      // 4秒之后闪屏结束
      setTimeout(() => {
        app.globalData.index_page = false;
        this.setData({
          index_page: app.globalData.index_page
        })
      }, 3000)
      if(this.data.second_voice == 0){
     this.start_voice1()
     }else{
        this.start_voice2()
     }
      
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 方法组：
  go_index() {
    // 将喵趣的logo去掉
    this.setData({
      logo_show: false
    })
    if (app.globalData.effect == true) {
      app.bgm.play()
    }else{
      app.bgm.pause()
    }
    this.setData({
      is_show: true
    })
    this.setData({
      is_loading: true
    })
    // 滚动条动画

    var timer = setInterval(() => {
      this.setData({
        loading_width: this.data.loading_width + 2,
        pro_text: this.data.pro_text + 2
      })
      // 关闭定时器
      if (this.data.pro_text >= 100) {
        clearInterval(timer)
        this.setData({
          loading_width: 100,
          pro_text: 100
        })
        setTimeout(() => {
          this.setData({
            is_loading: false
          })
          // 跳转到游戏的主页面
          wx.redirectTo({
            url:'../index/index'
          })
        }, 1000)
      }
    }, 100)

  
  },
  trump() {
    // 点击喇叭时候的声音
    if (app.globalData.effect == true) {
      app.bgm.play()
    } else {
      app.bgm.pause()
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
    // 点击游戏说明时候的声音
    if (app.globalData.effect == true) {
      app.bgm.play()
    } else {
      app.bgm.pause()
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
    // 关闭按钮时候的声音
    if (app.globalData.effect == true) {
      app.bgm.play()
    } else {
      app.bgm.pause()
    }
    this.setData({
      start_trump: false
    })
    this.setData({
      is_dark: true
    })
  },
  close_notice() {
    if (app.globalData.effect == true) {
      app.bgm.play()
    } else {
      app.bgm.pause()
    }
    this.setData({
      start_notice: false
    })
    this.setData({
      is_dark: true
    })
  },
  // 音效刚开始的时候
  start_voice1() {
    if (app.globalData.music == true) {
      app.AppMusic1.src = app.globalData.http + 'Public/music/mq_music/mq_bg.mp3'
      app.AppMusic3.src = app.globalData.http + 'Public/music/mq_music/sy1.mp3'
      app.AppMusic2.src = app.globalData.http + 'Public/music/mq_music/mj2.mp3'
      app.AppMusic2.loop = false
      // 猫跑
      setTimeout(() => {
        app.AppMusic2.src = app.globalData.http + 'Public/music/mq_music/mp.mp3'
      }, 4000)
      // 树叶掉落
      setTimeout(() => {
        app.AppMusic2.src = app.globalData.http + 'Public/music/mq_music/tjcc.mp3'
      }, 6300)
    } else {
      app.AppMusic1.pause()
      app.AppMusic2.pause()
      app.AppMusic3.pause()
    }
  },
  // 音效关闭之后再开始的时候
  start_voice2() {
    this.data.second_voice = 1;
    if (app.globalData.music == true) {
      app.AppMusic1.src = app.globalData.http + 'Public/music/mq_music/mq_bg.mp3'
      app.AppMusic3.src = app.globalData.http + 'Public/music/mq_music/sy1.mp3'
      app.AppMusic1.play()
      app.AppMusic3.play()
    } else {
      app.AppMusic1.pause()
      app.AppMusic2.pause()
      app.AppMusic3.pause()
    }
  },
  // 音效改变的方法
  yx_change() {
    this.setData({
      yx_control: !this.data.yx_control
    })
    app.globalData.yx_con = this.data.yx_control
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
      yy_control: !this.data.yy_control,
    })
    app.globalData.yy_con = this.data.yy_control
    if (app.globalData.music == true) {
      app.globalData.music = false
      this.setData({
        music: app.globalData.music
      })
      // console.log("全局音乐的开关"+app.globalData.music)
    } else {
      app.globalData.music = true
      this.setData({
        music: app.globalData.music
      })
    }
    this.start_voice2()

  },
  start_voice3(){

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    this.setData({
      is_show: true,//控制页面的是否显示的开关
      animate1: {
        style: 'tada',
        time: '2s',
        freq: 'infinite',
      },//开始游戏的动画
      start_trump: false,
      start_notice: false,
      is_dark: true,//是否打开背景变暗
      is_loading: false,//是否显示加载图标
      loading_width: 0,//初始化进度条的长度
      pro_text: 0,//初始化进度多少
      is_press_trump: false,//喇叭按下
      is_press_notice: false,//游戏须知按下
      index_page: {}, //是否是闪屏的主页面
      cat_show: false,//首页出现的小猫
      splash_cat_show: false,//闪屏出现的小猫
      splash_fish: false,//闪屏出现的小鱼
      share: [
        ' 喂什么猫粮，一起撸鱼吧......',
        '这只猫为了抓鱼简直逆天了，快来围观......',
        '这只猫为了吃鱼竟然进了丛林......',
        '劳资就是饿死，死外边，也决不自个抓鱼！好多鱼，喵~',
        '还不把小鱼干交出来，我都看见了~',
        '来人呐！赶紧给它摁住了，别让跑咯'
      ],
      leave_show: false,//叶子显示的时间
      btnPath: '',//按钮的路径
      splash_fish_src: '',//缓存闪屏小鱼的路径
      http: "https://maoqb.5izhuan.com/",//http路径
    })
    this.start_voice2()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      is_show: true,//控制页面的是否显示的开关
      start_trump: false,
      start_notice: false,
      is_dark: true,//是否打开背景变暗
      is_loading: false,//是否显示加载图标
      loading_width: 0,//初始化进度条的长度
      pro_text: 0,//初始化进度多少
      is_press_trump: false,//喇叭按下
      is_press_notice: false,//游戏须知按下
      index_page: {}, //是否是闪屏的主页面
      cat_show: false,//首页出现的小猫
      splash_cat_show: false,//闪屏出现的小猫
      splash_fish: false,//闪屏出现的小鱼
      share: [
        ' 喂什么猫粮，一起撸鱼吧......',
        '这只猫为了抓鱼简直逆天了，快来围观......',
        '这只猫为了吃鱼竟然进了丛林......',
        '劳资就是饿死，死外边，也决不自个抓鱼！好多鱼，喵~',
        '还不把小鱼干交出来，我都看见了~',
        '来人呐！赶紧给它摁住了，别让跑咯'
      ],
      leave_show: false,//叶子显示的时间
      btnPath: '',//按钮的路径
      splash_fish_src: '',//缓存闪屏小鱼的路径
      http: "https://maoqb.5izhuan.com/",//http路径
    })
    this.onLoad();
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
      imageUrl: '../../imgs/share/ace.png'
    }
  }
})