//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isPeace: true, // 水花的下标变化
    splashIndex: 1, // 溅水花的样式是否显示
    isSplash1: false,// 防止定时器重复工作，生成不一样的水花
    isSplash2: false,
    isSplash3: false,
    isSplash4: false,
    isSplash5: false,
    isSplash6: false,
    isSplash7: false,
    isSplash8: false,
    isSplash9: false,


    startInter: false,   // 小鱼原来的动画
    delay_time: {},// 随机小鱼跳出的延迟时间
    //小鱼的位置信息的二维数组
    boss_open: false,//boss开关
    boss_warter_index: 1,//boss水花
    boss_warter: false,//水花开关
    boss_jump: false,//boss动画
    animationData: {},//点击动画
    click_btn: false,//boss按钮显示
    boss_btn: false,//boss下方按钮
    boss_number: 3,//boss攻击次数
    gameover: false,//游戏结束可用于关闭所有开关.
    n: 0,//秒数
    lose: 0,// 游戏输了的进入次数
    sf_list: [
      {
        smallfishT: '17%', smallfishL: '17%', sub: 1, sf_category: 1,
        start_animation: true, is_go_fishbox: false, go_fishbox: {}, jump: 'before_catch 2s infinite 0.3s'
      },
      {
        smallfishT: '17%', smallfishL: '1%', sub: 2, sf_category: 2,
        start_animation: true, is_go_fishbox: false, go_fishbox: {}, jump: 'before_catch 2s infinite 0.2s'
      },
      {
        smallfishT: '17%', smallfishL: '29%', sub: 3, sf_category: 3,
        start_animation: true, is_go_fishbox: false, go_fishbox: {}, jump: 'before_catch 2s infinite 0.1s'
      },

      {
        smallfishT: '39%', smallfishL: '20%', sub: 4, sf_category: 3,
        start_animation: true, is_go_fishbox: false, go_fishbox: {}, jump: 'before_catch 2s infinite 0.5s'
      },
      {
        smallfishT: '38%', smallfishL: '42%', sub: 5, sf_category: 2,
        start_animation: true, is_go_fishbox: false, go_fishbox: {}, jump: 'before_catch 2s infinite 0.9s'
      },
      {
        smallfishT: '36%', smallfishL: '62%', sub: 6, sf_category: 1,
        start_animation: true, is_go_fishbox: false, go_fishbox: {}, jump: 'before_catch2 2s infinite 0.77s'
      },

      {
        smallfishT: '62%', smallfishL: '44%', sub: 7, sf_category: 2,
        start_animation: true, is_go_fishbox: false, go_fishbox: {}, jump: 'before_catch 2s infinite 0.3s'
      },
      {
        smallfishT: '58%', smallfishL: '64%', sub: 8, sf_category: 3,
        start_animation: true, is_go_fishbox: false, go_fishbox: {}, jump: 'before_catch2 2s infinite 0.2s'
      },
      {
        smallfishT: '54%', smallfishL: '74%', sub: 9, sf_category: 1,
        start_animation: true, is_go_fishbox: false, go_fishbox: {}, jump: 'before_catch2 2s infinite 0.1s'
      },
    ],
    show_sf_list: [],//页面中显示的小鱼
    // 9个点随机2,3个出现圆圈
    circle_list: [
      { cT: '19%', cL: '19%' },
      { cT: '19%', cL: '5%', },
      { cT: '19%', cL: '33%' },

      { cT: '40%', cL: '24%' },
      { cT: '38%', cL: '42%' },
      { cT: '36%', cL: '62%' },

      { cT: '63%', cL: '53%' },
      { cT: '58%', cL: '68%' },
      { cT: '53%', cL: '83%' },
    ],
    show_circle_list: [],//页面中的圆圈
    // start_animation:true,// 小鱼显示原来的动画
    // go_fishbox:{},//小鱼跳进水娄的动画
    // is_go_fishbox:false,//是否跳进鱼篓的动画的开关
    screen_width: {},// 使用的手机屏幕的宽度/高度
    screen_height: {},
    m: '00',
    s: '00',
    rect_x: 0,//鱼落入的地点
    rect_y: 0,
    go_fishbox: {},// 测试小方块的路径
    share: [
      ' 喂什么猫粮，一起撸鱼吧......',
      '这只猫为了抓鱼简直逆天了，快来围观......',
      '这只猫为了吃鱼竟然进了丛林......',
      '劳资就是饿死，死外边，也决不自个抓鱼！好多鱼，喵~',
      '还不把小鱼干交出来，我都看见了~',
      '来人呐！赶紧给它摁住了，别让跑咯'
    ],
    tap_start1: false,//点击1位置处的小鱼是否显示
    tap_start2: false,
    tap_start3: false,
    tap_start4: false,
    tap_start5: false,
    tap_start6: false,
    tap_start7: false,
    tap_start8: false,
    tap_start9: false,
    sf_category: {},//产生的新小鱼的路径
    new_fishT: {},//新小鱼的top
    new_fishL: {},
    coin: 0,//金币的数量
    rotat: '0deg',  //旋转的角度
    bar_start: false,//能量条的是否显示
    bar_width: 300,//能量条的长度
    fish_timer: {},//小鱼出现的定时器
  },

  onLoad: function () {
    var me = this
    this.fish_time();

    // 获得使用的手机屏幕的宽度/高度
    wx.getSystemInfo({
      success: function (res) {
        me.setData({
          screen_width: res.screenWidth,
          screen_height: res.screenHeight,
        })
      }
    })



    //获得水的高度
    wx.createSelectorQuery().select('#the-id').boundingClientRect((rect) => {
      console.log(rect);
      var x = rect.left + rect.width / 2
      var y = rect.top
      this.setData({
        rect_x: x
      })
      this.setData({
        rect_y: y
      })
    }).exec()




    // 页面右上角的定时器
    function toDub(n) {
      return n < 10 ? "0" + n : "" + n;
    }
    // clearInterval(timer);
    var n = 0;
    var index_time = setInterval(() => {
      if (this.data.gameover) {
        clearInterval(index_time);
        return false;
      }
      n++;
      var m1 = parseInt(n / 60);
      var s1 = parseInt(n % 60);
      me.data.m = toDub(m1)
      me.data.s = toDub(s1)
      me.setData({
        m: this.data.m,
      })
      me.setData({
        s: this.data.s,
      })
      me.setData({
        n: n
      })
      // console.log(n)
    }, 1000);



    // 页面中9个圆圈
    var index_round = setInterval(() => {
      this.data.show_circle_list = [];
      // 随机选取跳出来哪个0-8下标
      let sf_number = Math.random() > 0.5 ? 2 : 3;
      for (var i = 0; i < sf_number; i++) {
        let sf_index = parseInt(Math.random() * 9);
        this.data.show_circle_list.push(this.data.circle_list[sf_index])
      }
      this.setData({
        show_circle_list: this.data.show_circle_list
      })
    }, 4000)




    // 获取用户信息保存到app中
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }


    // 水桶中的水波动变化
    var warter = setInterval(() => {
      this.setData({
        isPeace: !this.data.isPeace
      })
    }, 500)



    // 游戏主页面的声音播放控制
    if (app.globalData.music == true) {
      // 河流声音，鸟叫声音
      app.AppMusic1.src = 'http://192.168.1.250:8301/Public/music/mq_music/hl.mp3'
    }
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  fish_time() {
    var fish_timer = setInterval(() => {
      this.random_boss();

      if (this.data.boss_open || this.data.gameover) {
        clearInterval(fish_timer);
        return false;
      }
      var me = this
      this.data.show_sf_list = [];
      // 随机选取跳出来哪个0-8下标的函数
      //得到随机3个数的函数
      function f1() {
        var arr_3 = new Array()
        function getRandom(min, max) {

          var random = Math.random() * (max - min) + min;

          random = Math.floor(random);

          if (arr_3.length < 3) {
            for (i = 0; i <= arr_3.length; i++) {
              if (random == arr_3[i]) {
                break;
              }
              else {
                if (i == arr_3.length)
                { arr_3.push(random); break; }
              }
            };
            getRandom(0, 8);
          }

        }
        getRandom(0, 8);
        return arr_3;
      }
      var arr3 = f1();
      var new_str = arr3.join('')
      let sf_number = Math.random() > 0.5 ? 2 : 3;
      for (var i = 0; i < sf_number; i++) {
        // 小鱼的下标      
        let sf_index = new_str[i]
        this.data.show_sf_list.push(this.data.sf_list[sf_index])
      }
      // 遍历挑选出数组中的小鱼，延时放入显示数组中
      for (var j = 0; j < this.data.show_sf_list.length; j++) {
        let sf_index = parseInt(Math.random() * 9);
        let a = Math.random() * (1 - 0 + 0) + 0;
        (function (a) {
          setTimeout(() => {
            me.setData({
              show_sf_list: me.data.show_sf_list
            })
          }, a * 1000)
        })(j)
      }
    }, 4000)
  },


  // 用户抓到鱼之后的函数
  getFish1(e) {
    var me = this
    setTimeout(() => {
      // 先控制将水花的图片显示
      me.setData({
        isSplash1: true
      })
      // 先将水花的下标置为1，控制水花的动态的变化
      if (me.data.splashIndex > 1) {
        me.setData({
          splashIndex: 1
        })
      };
      var splash_timer = setInterval(function () {
        if(splash_water){
            return
        }
        var splash_water = 1;
        // splash_timer = 1;
        me.setData({
          splashIndex: me.data.splashIndex + 1
        })

        // 在定时器中判断水花消失，下标置为1
        if (me.data.splashIndex==12){
          clearInterval(splash_timer);
          me.setData({
            splashIndex: 1,
            isSplash1: false,
          })
        }
      }, 100);
    }, 2200)


    // 将被点击的小鱼删除
    var tmp = this.data.show_sf_list
    // 创建一个获得下标的函数
    function get_i() {
      for (var i = 0; i < tmp.length; i++) {
        if (tmp[i].sub == e.target.dataset.sub)
          //  删掉数组中第i个元素
          // tmp.splice(i, 1)
          return i
      }
    }
    var i = get_i()
    tmp.splice(i, 1)
    this.setData({
      show_sf_list: tmp
    })
    //  获得点击小鱼的图片路径
    var sub = e.target.dataset.sub
    var category = this.data.sf_list[sub - 1].sf_category
    this.setData({
      sf_category: category
    })
    //  保存点击位置，将点击位置处的小鱼激活
    // var new_l = (e.detail.x-50)/this.data.screen_width*100+'%'
    // var new_t = (e.detail.y-37)/this.data.screen_height*100+'%'
    // var new_t = e.target.offsetTop * 2 - 170 + 'rpx'
    // var new_l = e.target.offsetLeft * 2 + 'rpx'
    var new_t = e.target.offsetTop - 80 + 'px'
    var new_l = e.target.offsetLeft + 50 + 'px'    
    
    this.setData({
      new_fishT1: new_t
    })
    this.setData({
      new_fishL1: new_l
    })
    // 设置旋转的角度
    setTimeout(() => {
      this.setData({
        rotat1: '30deg'
      })

    }, 400)
    // 3s之后设置top和left为水桶处
    setTimeout(() => {
      this.setData({
        new_fishT1: '46%'
      })
      this.setData({
        new_fishL1: '13%'
      })
      this.setData({
        rotat1: '70deg'
      })
    }, 800)
    // 设置小鱼入水桶加金币的音效
    if (app.globalData.music == true) {
      setTimeout(() => {
        app.AppMusic3.src = 'http://192.168.1.250:8301/Public/music/mq_music/xycs.mp3'
        app.AppMusic3.loop = false;
        app.AppMusic3.volume = 1;
      }, 2000)
    }

    // 将新建得小鱼显示
    this.setData({
      tap_start1: true
    })
    setTimeout(() => {
      this.setData({
        tap_start1: false
      })
      // 根据鱼的种类判断加分
      if (this.data.sf_category == 1) {
        this.data.coin += 100
        this.setData({
          coin: this.data.coin
        })
      }
      if (this.data.sf_category == 2) {
        this.data.coin += 200
        coin: this.data.coin
      }
      if (this.data.sf_category == 3) {
        this.data.coin += 300
        coin: this.data.coin
      }
      // console.log(this.data.coin)
    }, 2500)

 

  },
  //2
  getFish2(e) {
    var me = this
    setTimeout(() => {
      // 先控制将水花的图片显示
      me.setData({
        isSplash2: true
      })
      // 先将水花的下标置为1，控制水花的动态的变化
      if (me.data.splashIndex > 1) {
        me.setData({
          splashIndex: 1
        })
      };
      var splash_timer = setInterval(function () {
        if (splash_water) {
          return
        }
        var splash_water = 1;
        // splash_timer = 1;
        me.setData({
          splashIndex: me.data.splashIndex + 1
        })

        // 在定时器中判断水花消失，下标置为1
        if (me.data.splashIndex == 12) {
          clearInterval(splash_timer);
          me.setData({
            splashIndex: 1,
            isSplash2: false,
          })
        }
      }, 100);
    }, 2200)


    // 将被点击的小鱼删除
    var tmp = this.data.show_sf_list
    // 创建一个获得下标的函数
    function get_i() {
      for (var i = 0; i < tmp.length; i++) {
        if (tmp[i].sub == e.target.dataset.sub)
          //  删掉数组中第i个元素
          // tmp.splice(i, 1)
          return i
      }
    }
    var i = get_i()
    tmp.splice(i, 1)
    this.setData({
      show_sf_list: tmp
    })
    //  获得点击小鱼的图片路径
    var sub = e.target.dataset.sub
    var category = this.data.sf_list[sub - 1].sf_category
    this.setData({
      sf_category: category
    })
    //  保存点击位置，将点击位置处的小鱼激活
    var new_t = e.target.offsetTop - 80 + 'px'
    var new_l = e.target.offsetLeft + 60 + 'px'
    this.setData({
      new_fishT2: new_t
    })
    this.setData({
      new_fishL2: new_l
    })
    // 设置旋转的角度
    setTimeout(() => {
      this.setData({
        rotat2: '30deg'
      })
    }, 400)
    // 3s之后设置top和left为水桶处
    setTimeout(() => {
      this.setData({
        new_fishT2: '46%'
      })
      this.setData({
        new_fishL2: '13%'
      })
      this.setData({
        rotat2: '70deg'
      })
    }, 800)
    // 设置小鱼入水桶加金币的音效
    if (app.globalData.music == true) {
      setTimeout(() => {
        app.AppMusic3.src = 'http://192.168.1.250:8301/Public/music/mq_music/xycs.mp3'
        app.AppMusic3.loop = false;
        app.AppMusic3.volume = 1;
      }, 2000)
    }

    // 将新建得小鱼显示
    this.setData({
      tap_start2: true
    })
    setTimeout(() => {
      this.setData({
        tap_start2: false
      })
      // 根据鱼的种类判断加分
      if (this.data.sf_category == 1) {
        this.data.coin += 100
        this.setData({
          coin: this.data.coin
        })
      }
      if (this.data.sf_category == 2) {
        this.data.coin += 200
        coin: this.data.coin
      }
      if (this.data.sf_category == 3) {
        this.data.coin += 300
        coin: this.data.coin
      }
      // console.log(this.data.coin)
    }, 2500)
  },

  getFish3(e) {
    var me = this
    setTimeout(() => {
      // 先控制将水花的图片显示
      me.setData({
        isSplash3: true
      })
      // 先将水花的下标置为1，控制水花的动态的变化
      if (me.data.splashIndex > 1) {
        me.setData({
          splashIndex: 1
        })
      };
      var splash_timer = setInterval(function () {
        if (splash_water) {
          return
        }
        var splash_water = 1;
        // splash_timer = 1;
        me.setData({
          splashIndex: me.data.splashIndex + 1
        })

        // 在定时器中判断水花消失，下标置为1
        if (me.data.splashIndex == 12) {
          clearInterval(splash_timer);
          me.setData({
            splashIndex: 1,
            isSplash3: false,
          })
        }
      }, 100);
    }, 2200)


    // 将被点击的小鱼删除
    var tmp = this.data.show_sf_list
    // 创建一个获得下标的函数
    function get_i() {
      for (var i = 0; i < tmp.length; i++) {
        if (tmp[i].sub == e.target.dataset.sub)
          //  删掉数组中第i个元素
          // tmp.splice(i, 1)
          return i
      }
    }
    var i = get_i()
    tmp.splice(i, 1)
    this.setData({
      show_sf_list: tmp
    })
    //  获得点击小鱼的图片路径
    var sub = e.target.dataset.sub
    var category = this.data.sf_list[sub - 1].sf_category
    this.setData({
      sf_category: category
    })
    //  保存点击位置，将点击位置处的小鱼激活
    var new_t = e.target.offsetTop - 80 + 'px'
    var new_l = e.target.offsetLeft + 50 + 'px'
    this.setData({
      new_fishT3: new_t
    })
    this.setData({
      new_fishL3: new_l
    })
    // 设置旋转的角度
    setTimeout(() => {
      this.setData({
        rotat3: '30deg'
      })
    }, 400)
    // 3s之后设置top和left为水桶处
    setTimeout(() => {
      this.setData({
        new_fishT3: '46%'
      })
      this.setData({
        new_fishL3: '13%'
      })
      this.setData({
        rotat3: '70deg'
      })
    }, 800)
    // 设置小鱼入水桶加金币的音效
    if (app.globalData.music == true) {
      setTimeout(() => {
        app.AppMusic3.src = 'http://192.168.1.250:8301/Public/music/mq_music/xycs.mp3'
        app.AppMusic3.loop = false;
        app.AppMusic3.volume = 1;
      }, 2000)
    }

    // 将新建得小鱼显示
    this.setData({
      tap_start3: true
    })
    setTimeout(() => {
      this.setData({
        tap_start3: false
      })
      // 根据鱼的种类判断加分
      if (this.data.sf_category == 1) {
        this.data.coin += 100
        this.setData({
          coin: this.data.coin
        })
      }
      if (this.data.sf_category == 2) {
        this.data.coin += 200
        coin: this.data.coin
      }
      if (this.data.sf_category == 3) {
        this.data.coin += 300
        coin: this.data.coin
      }
    }, 2500)


  },
  getFish4(e) {
    var me = this
    setTimeout(() => {
      // 先控制将水花的图片显示
      me.setData({
        isSplash4: true
      })
      // 先将水花的下标置为1，控制水花的动态的变化
      if (me.data.splashIndex > 1) {
        me.setData({
          splashIndex: 1
        })
      };
      var splash_timer = setInterval(function () {
        if (splash_water) {
          return
        }
        var splash_water = 1;
        // splash_timer = 1;
        me.setData({
          splashIndex: me.data.splashIndex + 1
        })

        // 在定时器中判断水花消失，下标置为1
        if (me.data.splashIndex == 12) {
          clearInterval(splash_timer);
          me.setData({
            splashIndex: 1,
            isSplash4: false,
          })
        }
      }, 100);
    }, 2200)


    // 将被点击的小鱼删除
    var tmp = this.data.show_sf_list
    // 创建一个获得下标的函数
    function get_i() {
      for (var i = 0; i < tmp.length; i++) {
        if (tmp[i].sub == e.target.dataset.sub)
          //  删掉数组中第i个元素
          // tmp.splice(i, 1)
          return i
      }
    }
    var i = get_i()
    tmp.splice(i, 1)
    this.setData({
      show_sf_list: tmp
    })
    //  获得点击小鱼的图片路径
    var sub = e.target.dataset.sub
    var category = this.data.sf_list[sub - 1].sf_category
    this.setData({
      sf_category: category
    })
    //  保存点击位置，将点击位置处的小鱼激活
    var new_t = e.target.offsetTop - 80 + 'px'
    var new_l = e.target.offsetLeft + 50 + 'px'
    this.setData({
      new_fishT4: new_t
    })
    this.setData({
      new_fishL4: new_l
    })
    // 设置旋转的角度
    setTimeout(() => {
      this.setData({
        rotat4: '30deg'
      })
    }, 400)
    // 3s之后设置top和left为水桶处
    setTimeout(() => {
      this.setData({
        new_fishT4: '46%'
      })
      this.setData({
        new_fishL4: '13%'
      })
      this.setData({
        rotat4: '70deg'
      })
    }, 800)
    // 设置小鱼入水桶加金币的音效
    if (app.globalData.music == true) {
      setTimeout(() => {
        app.AppMusic3.src = 'http://192.168.1.250:8301/Public/music/mq_music/xycs.mp3'
        app.AppMusic3.loop = false;
        app.AppMusic3.volume = 1;
      }, 2000)
    }

    // 将新建得小鱼显示
    this.setData({
      tap_start4: true
    })
    setTimeout(() => {
      this.setData({
        tap_start4: false
      })
      // 根据鱼的种类判断加分
      if (this.data.sf_category == 1) {
        this.data.coin += 100
        this.setData({
          coin: this.data.coin
        })
      }
      if (this.data.sf_category == 2) {
        this.data.coin += 200
        coin: this.data.coin
      }
      if (this.data.sf_category == 3) {
        this.data.coin += 300
        coin: this.data.coin
      }
    }, 2500)


  },
  getFish5(e) {
    var me = this
    setTimeout(() => {
      // 先控制将水花的图片显示
      me.setData({
        isSplash5: true
      })
      // 先将水花的下标置为1，控制水花的动态的变化
      if (me.data.splashIndex > 1) {
        me.setData({
          splashIndex: 1
        })
      };
      var splash_timer = setInterval(function () {
        if (splash_water) {
          return
        }
        var splash_water = 1;
        // splash_timer = 1;
        me.setData({
          splashIndex: me.data.splashIndex + 1
        })

        // 在定时器中判断水花消失，下标置为1
        if (me.data.splashIndex == 12) {
          clearInterval(splash_timer);
          me.setData({
            splashIndex: 1,
            isSplash5: false,
          })
        }
      }, 100);
    }, 2200)


    // 将被点击的小鱼删除
    var tmp = this.data.show_sf_list
    // 创建一个获得下标的函数
    function get_i() {
      for (var i = 0; i < tmp.length; i++) {
        if (tmp[i].sub == e.target.dataset.sub)
          //  删掉数组中第i个元素
          // tmp.splice(i, 1)
          return i
      }
    }
    var i = get_i()
    tmp.splice(i, 1)
    this.setData({
      show_sf_list: tmp
    })
    //  获得点击小鱼的图片路径
    var sub = e.target.dataset.sub
    var category = this.data.sf_list[sub - 1].sf_category
    this.setData({
      sf_category: category
    })
    //  保存点击位置，将点击位置处的小鱼激活
    var new_t = e.target.offsetTop - 80 + 'px'
    var new_l = e.target.offsetLeft + 50 + 'px'
    this.setData({
      new_fishT5: new_t
    })
    this.setData({
      new_fishL5: new_l
    })
    // 设置旋转的角度
    setTimeout(() => {
      this.setData({
        rotat5: '30deg'
      })
    }, 400)
    // 3s之后设置top和left为水桶处
    setTimeout(() => {
      this.setData({
        new_fishT5: '46%'
      })
      this.setData({
        new_fishL5: '13%'
      })
      this.setData({
        rotat5: '70deg'
      })
    }, 800)
    // 设置小鱼入水桶加金币的音效
    if (app.globalData.music == true) {
      setTimeout(() => {
        app.AppMusic3.src = 'http://192.168.1.250:8301/Public/music/mq_music/xycs.mp3'
        app.AppMusic3.loop = false;
        app.AppMusic3.volume = 1;
      }, 2000)
    }

    // 将新建得小鱼显示
    this.setData({
      tap_start5: true
    })
    setTimeout(() => {
      this.setData({
        tap_start5: false
      })
      // 根据鱼的种类判断加分
      if (this.data.sf_category == 1) {
        this.data.coin += 100
        this.setData({
          coin: this.data.coin
        })
      }
      if (this.data.sf_category == 2) {
        this.data.coin += 200
        coin: this.data.coin
      }
      if (this.data.sf_category == 3) {
        this.data.coin += 300
        coin: this.data.coin
      }
      // console.log(this.data.coin)
    }, 2500)

  },
  getFish6(e) {
    var me = this
    setTimeout(() => {
      // 先控制将水花的图片显示
      me.setData({
        isSplash6: true
      })
      // 先将水花的下标置为1，控制水花的动态的变化
      if (me.data.splashIndex > 1) {
        me.setData({
          splashIndex: 1
        })
      };
      var splash_timer = setInterval(function () {
        if (splash_water) {
          return
        }
        var splash_water = 1;
        // splash_timer = 1;
        me.setData({
          splashIndex: me.data.splashIndex + 1
        })

        // 在定时器中判断水花消失，下标置为1
        if (me.data.splashIndex == 12) {
          clearInterval(splash_timer);
          me.setData({
            splashIndex: 1,
            isSplash6: false,
          })
        }
      }, 100);
    }, 2200)


    // 将被点击的小鱼删除
    var tmp = this.data.show_sf_list
    // 创建一个获得下标的函数
    function get_i() {
      for (var i = 0; i < tmp.length; i++) {
        if (tmp[i].sub == e.target.dataset.sub)
          //  删掉数组中第i个元素
          // tmp.splice(i, 1)
          return i
      }
    }
    var i = get_i()
    tmp.splice(i, 1)
    this.setData({
      show_sf_list: tmp
    })
    //  获得点击小鱼的图片路径
    var sub = e.target.dataset.sub
    var category = this.data.sf_list[sub - 1].sf_category
    this.setData({
      sf_category: category
    })
    //  保存点击位置，将点击位置处的小鱼激活
    var new_t = e.target.offsetTop - 80 + 'px'
    var new_l = e.target.offsetLeft + 50 + 'px'
    this.setData({
      new_fishT6: new_t
    })
    this.setData({
      new_fishL6: new_l
    })
    // 设置旋转的角度
    setTimeout(() => {
      this.setData({
        rotat6: '30deg'
      })
    }, 400)
    // 3s之后设置top和left为水桶处
    setTimeout(() => {
      this.setData({
        new_fishT6: '46%'
      })
      this.setData({
        new_fishL6: '13%'
      })
      this.setData({
        rotat6: '70deg'
      })
    }, 800)
    // 设置小鱼入水桶加金币的音效
    if (app.globalData.music == true) {
      setTimeout(() => {
        app.AppMusic3.src = 'http://192.168.1.250:8301/Public/music/mq_music/xycs.mp3'
        app.AppMusic3.loop = false;
        app.AppMusic3.volume = 1;
      }, 2000)
    }

    // 将新建得小鱼显示
    this.setData({
      tap_start6: true
    })
    setTimeout(() => {
      this.setData({
        tap_start6: false
      })
      // 根据鱼的种类判断加分
      if (this.data.sf_category == 1) {
        this.data.coin += 100
        this.setData({
          coin: this.data.coin
        })
      }
      if (this.data.sf_category == 2) {
        this.data.coin += 200
        coin: this.data.coin
      }
      if (this.data.sf_category == 3) {
        this.data.coin += 300
        coin: this.data.coin
      }

    }, 2500)


  },
  getFish7(e) {
    var me = this
    setTimeout(() => {
      // 先控制将水花的图片显示
      me.setData({
        isSplash7: true
      })
      // 先将水花的下标置为1，控制水花的动态的变化
      if (me.data.splashIndex > 1) {
        me.setData({
          splashIndex: 1
        })
      };
      var splash_timer = setInterval(function () {
        if (splash_water) {
          return
        }
        var splash_water = 1;
        // splash_timer = 1;
        me.setData({
          splashIndex: me.data.splashIndex + 1
        })

        // 在定时器中判断水花消失，下标置为1
        if (me.data.splashIndex == 12) {
          clearInterval(splash_timer);
          me.setData({
            splashIndex: 1,
            isSplash7: false,
          })
        }
      }, 100);
    }, 2200)


    // 将被点击的小鱼删除
    var tmp = this.data.show_sf_list
    // 创建一个获得下标的函数
    function get_i() {
      for (var i = 0; i < tmp.length; i++) {
        if (tmp[i].sub == e.target.dataset.sub)
          //  删掉数组中第i个元素
          // tmp.splice(i, 1)
          return i
      }
    }
    var i = get_i()
    tmp.splice(i, 1)
    this.setData({
      show_sf_list: tmp
    })
    //  获得点击小鱼的图片路径
    var sub = e.target.dataset.sub
    var category = this.data.sf_list[sub - 1].sf_category
    this.setData({
      sf_category: category
    })
    //  保存点击位置，将点击位置处的小鱼激活
    var new_t = e.target.offsetTop - 80 + 'px'
    var new_l = e.target.offsetLeft + 50 + 'px'
    this.setData({
      new_fishT7: new_t
    })
    this.setData({
      new_fishL7: new_l
    })
    // 设置旋转的角度
    setTimeout(() => {
      this.setData({
        rotat7: '30deg'
      })
    }, 400)
    // 3s之后设置top和left为水桶处
    setTimeout(() => {
      this.setData({
        new_fishT7: '46%'
      })
      this.setData({
        new_fishL7: '13%'
      })
      this.setData({
        rotat7: '70deg'
      })
    }, 800)
    // 设置小鱼入水桶加金币的音效
    if (app.globalData.music == true) {
      setTimeout(() => {
        app.AppMusic3.src = 'http://192.168.1.250:8301/Public/music/mq_music/xycs.mp3'
        app.AppMusic3.loop = false;
        app.AppMusic3.volume = 1;
      }, 2000)
    }

    // 将新建得小鱼显示
    this.setData({
      tap_start7: true
    })
    setTimeout(() => {
      this.setData({
        tap_start7: false
      })
      // 根据鱼的种类判断加分
      if (this.data.sf_category == 1) {
        this.data.coin += 100
        this.setData({
          coin: this.data.coin
        })
      }
      if (this.data.sf_category == 2) {
        this.data.coin += 200
        coin: this.data.coin
      }
      if (this.data.sf_category == 3) {
        this.data.coin += 300
        coin: this.data.coin
      }
    }, 2500)
  },
  getFish8(e) {
    var me = this
    setTimeout(() => {
      // 先控制将水花的图片显示
      me.setData({
        isSplash8: true
      })
      // 先将水花的下标置为1，控制水花的动态的变化
      if (me.data.splashIndex > 1) {
        me.setData({
          splashIndex: 1
        })
      };
      var splash_timer = setInterval(function () {
        if (splash_water) {
          return
        }
        var splash_water = 1;
        // splash_timer = 1;
        me.setData({
          splashIndex: me.data.splashIndex + 1
        })

        // 在定时器中判断水花消失，下标置为1
        if (me.data.splashIndex == 12) {
          clearInterval(splash_timer);
          me.setData({
            splashIndex: 1,
            isSplash8: false,
          })
        }
      }, 100);
    }, 2200)


    // 将被点击的小鱼删除
    var tmp = this.data.show_sf_list
    // 创建一个获得下标的函数
    function get_i() {
      for (var i = 0; i < tmp.length; i++) {
        if (tmp[i].sub == e.target.dataset.sub)
          //  删掉数组中第i个元素
          // tmp.splice(i, 1)
          return i
      }
    }
    var i = get_i()
    tmp.splice(i, 1)
    this.setData({
      show_sf_list: tmp
    })
    //  获得点击小鱼的图片路径
    var sub = e.target.dataset.sub
    var category = this.data.sf_list[sub - 1].sf_category
    this.setData({
      sf_category: category
    })
    //  保存点击位置，将点击位置处的小鱼激活
    var new_t = e.target.offsetTop - 80 + 'px'
    var new_l = e.target.offsetLeft + 50 + 'px'
    this.setData({
      new_fishT8: new_t
    })
    this.setData({
      new_fishL8: new_l
    })
    // 设置旋转的角度
    setTimeout(() => {
      this.setData({
        rotat8: '30deg'
      })
    }, 400)
    // 3s之后设置top和left为水桶处
    setTimeout(() => {
      this.setData({
        new_fishT8: '46%'
      })
      this.setData({
        new_fishL8: '13%'
      })
      this.setData({
        rotat8: '70deg'
      })
    }, 800)
    // 设置小鱼入水桶加金币的音效
    if (app.globalData.music == true) {
      setTimeout(() => {
        app.AppMusic3.src = 'http://192.168.1.250:8301/Public/music/mq_music/xycs.mp3'
        app.AppMusic3.loop = false;
        app.AppMusic3.volume = 1;
      }, 2000)
    }

    // 将新建得小鱼显示
    this.setData({
      tap_start8: true
    })
    setTimeout(() => {
      this.setData({
        tap_start8: false
      })
      // 根据鱼的种类判断加分
      if (this.data.sf_category == 1) {
        this.data.coin += 100
        this.setData({
          coin: this.data.coin
        })
      }
      if (this.data.sf_category == 2) {
        this.data.coin += 200
        coin: this.data.coin
      }
      if (this.data.sf_category == 3) {
        this.data.coin += 300
        coin: this.data.coin
      }
    }, 2500)
  },
  getFish9(e) {
    var me = this
    setTimeout(() => {
      // 先控制将水花的图片显示
      me.setData({
        isSplash9: true
      })
      // 先将水花的下标置为1，控制水花的动态的变化
      if (me.data.splashIndex > 1) {
        me.setData({
          splashIndex: 1
        })
      };
      var splash_timer = setInterval(function () {
        if (splash_water) {
          return
        }
        var splash_water = 1;
        // splash_timer = 1;
        me.setData({
          splashIndex: me.data.splashIndex + 1
        })

        // 在定时器中判断水花消失，下标置为1
        if (me.data.splashIndex == 12) {
          clearInterval(splash_timer);
          me.setData({
            splashIndex: 1,
            isSplash9: false,
          })
        }
      }, 100);
    }, 2200)


    // 将被点击的小鱼删除
    var tmp = this.data.show_sf_list
    // 创建一个获得下标的函数
    function get_i() {
      for (var i = 0; i < tmp.length; i++) {
        if (tmp[i].sub == e.target.dataset.sub)
          //  删掉数组中第i个元素
          // tmp.splice(i, 1)
          return i
      }
    }
    var i = get_i()
    tmp.splice(i, 1)
    this.setData({
      show_sf_list: tmp
    })
    //  获得点击小鱼的图片路径
    var sub = e.target.dataset.sub
    var category = this.data.sf_list[sub - 1].sf_category
    this.setData({
      sf_category: category
    })
    //  保存点击位置，将点击位置处的小鱼激活
    var new_t = e.target.offsetTop - 80 + 'px'
    var new_l = e.target.offsetLeft + 50 + 'px'
    this.setData({
      new_fishT9: new_t
    })
    this.setData({
      new_fishL9: new_l
    })
    // 设置旋转的角度
    setTimeout(() => {
      this.setData({
        rotat9: '30deg'
      })
    }, 400)
    // 3s之后设置top和left为水桶处
    setTimeout(() => {
      this.setData({
        new_fishT9: '46%'
      })
      this.setData({
        new_fishL9: '13%'
      })
      this.setData({
        rotat9: '70deg'
      })
    }, 800)
    // 设置小鱼入水桶加金币的音效
    if (app.globalData.music == true) {
      setTimeout(() => {
        app.AppMusic3.src = 'http://192.168.1.250:8301/Public/music/mq_music/xycs.mp3'
        app.AppMusic3.loop = false;
        app.AppMusic3.volume = 1;
      }, 2000)
    }

    // 将新建得小鱼显示
    this.setData({
      tap_start9: true
    })
    setTimeout(() => {
      this.setData({
        tap_start9: false
      })
      // 根据鱼的种类判断加分
      if (this.data.sf_category == 1) {
        this.data.coin += 100
        this.setData({
          coin: this.data.coin
        })
      }
      if (this.data.sf_category == 2) {
        this.data.coin += 200
        coin: this.data.coin
      }
      if (this.data.sf_category == 3) {
        this.data.coin += 300
        coin: this.data.coin
      }
    }, 2500)

  },

  // 页面中开始跳出鱼,3s
  fish_time() {
    this.data.fish_timer = setInterval(() => {
      // 为调试暂时注释掉
      this.random_boss();
      if (this.data.boss_open || this.data.gameover) {
        clearInterval(this.data.fish_timer);
        return false;
      }
      var me = this
      this.data.show_sf_list = [];
      // 随机选取跳出来哪个0-8下标的函数
      //得到随机3个数的函数
      function f1() {
        var arr_3 = new Array()
        function getRandom(min, max) {

          var random = Math.random() * (max - min) + min;

          random = Math.floor(random);

          if (arr_3.length < 3) {
            for (i = 0; i <= arr_3.length; i++) {
              if (random == arr_3[i]) {
                break;
              }
              else {
                if (i == arr_3.length)
                { arr_3.push(random); break; }
              }
            };
            getRandom(0, 8);
          }

        }
        getRandom(0, 8);
        return arr_3;
      }
      var arr3 = f1();
      var new_str = arr3.join('')
      let sf_number = Math.random() > 0.5 ? 2 : 3;
      for (var i = 0; i < sf_number; i++) {
        // 小鱼的下标      
        let sf_index = new_str[i]
        this.data.show_sf_list.push(this.data.sf_list[sf_index])
      }
      // 遍历挑选出数组中的小鱼，延时放入显示数组中
      for (var j = 0; j < this.data.show_sf_list.length; j++) {
        let sf_index = parseInt(Math.random() * 9);
        let a = Math.random() * (1 - 0 + 0) + 0;
        (function (a) {
          setTimeout(() => {
            me.setData({
              show_sf_list: me.data.show_sf_list
            })
          }, a * 1000)
        })(j)
      }
    }, 4000)
  },
  onShareAppMessage: function (e) {
    var text = null;
    var sub = parseInt(Math.random() * 5)
    text = this.data.share[sub]
    return {
      title: text,
      path: '/pages/index/index',
      imageUrl: '../../imgs/share/ace.png'
    }
  },
  random_boss() {
    var this_num = this.data.n;
    if (this_num >= 30) { this_num = 30 };
    var boss_open_random = Math.floor(Math.random() * (100 - 1 + 1) + 1);
    if (boss_open_random < this_num) {
      console.log('boss出来了');
      //清空鱼库（未做）
      // boss攻击时候页面的小鱼清空
      this.setData({
        show_sf_list: []
      })
      setTimeout(() => {
        this.fish_time();
      }, 200)

      this.setData({
        boss_open: true,      //开启boss模式    //关闭刷鱼的计时器。  //打开红色背景
        boss_warter_bo: true,         //开启大波纹效果。
      });
      // 水花效果
      setTimeout(() => {
        this.setData({
          boss_warter: true,//开启大浪
          boss_warter_bo: false,//关闭水波纹   
        });
        var warter = setInterval(() => {
          this.setData({
            boss_warter_index: this.data.boss_warter_index + 1,
          });
          if (this.data.boss_warter_index == 12) {
            clearInterval(warter);
            this.setData({
              boss_warter: false,//关闭大浪
              boss_warter_index: 1,//初始化大浪
            });
            //boss出水音效

            if (app.globalData.music == true) {
              app.AppMusic3.src = 'http://192.168.1.250:8301/Public/music/mq_music/dyls.mp3'
              app.AppMusic3.loop = false;
            }
            this.setData({
              boss_jump: true,//出水动画，游戏界面显示
            });
            //开始攻击函数
            setTimeout(() => {
              this.boss_pk();
            }, 2000);
          }
        }, 100)
      }, 4000);


    }
  },
  //boss攻击函数
  boss_pk(this_num) {
    console.log('进入bosspk函数')
    this.setData({
      animationData: {},
      click_btn: false,
    })
    //判断速度
    var speed_num = this.data.n;
    console.log(speed_num);
    var boss_number = this.data.boss_number;
    var speed = (75 / speed_num);

    var animation = wx.createAnimation({
      duration: speed * 1000,
      timingFunction: 'ease-in',
    });
    animation.scale(1).step();
    this.setData({
      click_btn: true,
    });
    setTimeout(() => {
      this.setData({
        animationData: animation.export(),
      })
    }, 1000)
    var click_btn = setTimeout(() => {
      if (this.data.boss_btn) {
        console.log('我点中了');
        // 躲避boss的音效
        //boss出水音效

        this.setData({
          boss_number: this.data.boss_number - 1,
          boss_btn: false,//重置选择开关
        });
        if (this.data.boss_number == 0) {
          //关闭boss开关，打开随机鱼的方法。
          this.setData({
            boss_number: 3,
            boss_btn: false,//重置选择开关
            boss_jump: false,
            boss_open: false,
            click_btn: false,
          });
          //开始计时器
          this.fish_time();
          return false;
        }
        this.boss_pk();
      } else {
        if (this.data.lose == 1) {
          return
        }
        console.log('我输了')
        this.data.lose = 1;
        // 关闭小鱼的定时器
        clearInterval(this.data.fish_timer);
        // 将页面的总金币和时间传递给gameover页面
        console.log(this.data.m)
        console.log(this.data.s)
        //失败音效（未做）
        //关闭本页面所有的定时器
        this.setData({
          gameover: true,
          boss_jump: false,
          boss_open: false,
          click_btn: false,
        });
        // 跳转时候将结束的时间传递给gameover页面
        // console.log("跳入游戏结束页面")
        wx.redirectTo({
          url: '../gameover/gameover?m=' + this.data.m + '&s=' + this.data.s + '&coin_num=' + this.data.coin
        })
      }
    }, (speed * 1000) + 1000);

  },
  click_self() {
    this.setData({
      boss_btn: true,
    });
  },
  /**
 * 生命周期函数--监听页面隐藏
 */
  onHide: function () {
    clearInterval(this.data.fish_timer);
  },





})

