// pages/index/index.js
let app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    cha_over: false,
    boss_over: false,
    //============控制重复跳转两次=========//
    is_loading: true,
    loading_width: 50,
    pro_text: 50,
    //===========loading页面的数据==================//
    c: 10,
    cat_w: 113,//图片宽度,
    cat_h: 109,//图片高度
    coin: 0,
    gameover: false,
    kill_all_show: false,
    kill_all_num: 1,
    kill_all_active: 1,
    kill_all_animate: false,//飞叉动画
    c_y: 547,
    //==============fish=================//
    fish_list: [

      {
        url: '../../imgs/game/1_r.gif', x: -410, y: 250, dir: 0, score: 1,
        currX: -410, sub: 1, z_index: 3,
      },
      {
        url: '../../imgs/game/1_r.gif', x: 480, y: 250, dir: 0, score: 1,
        currX: 480, sub: 2, z_index: 3,
      },
      {
        url: '../../imgs/game/1_l.gif', x: -677, y: 310, dir: 1, score: 1,
        currX: -677, sub: 3, z_index: 3,
      },

      {
        url: '../../imgs/game/1_l.gif', x: 810, y: 310, dir: 1, score: 1,
        currX: 810, sub: 4, z_index: 3,
      },
      {
        url: '../../imgs/game/1_r.gif', x: -110, y: 370, dir: 0, score: 1,
        currX: -110, sub: 5, z_index: 3,
      },

      {
        url: '../../imgs/game/1_r.gif', x: 705, y: 370, dir: 0, score: 1,
        currX: 705, sub: 6, z_index: 3,
      },

      {
        url: '../../imgs/game/1_l.gif', x: 25, y: 430, dir: 1, score: 1,
        currX: 25, sub: 7, z_index: 3,
      },

      {
        url: '../../imgs/game/1_l.gif', x: 568, y: 430, dir: 1, score: 1,
        currX: 568, sub: 8, z_index: 3,
      },
      {
        url: '../../imgs/game/1_l.gif', x: -437, y: 430, dir: 1, score: 1,
        currX: -437, sub: 9, z_index: 3,
      },
      //  二分鱼
      {
        url: '../../imgs/game/2_r.gif', x: -555, y: 250, dir: 0, score: 2,
        currX: -555, sub: 10, z_index: 1,
      },

      {
        url: '../../imgs/game/2_r.gif', x: 830, y: 250, dir: 0, score: 2,
        currX: 830, sub: 11, z_index: 1,
      },

      {
        url: '../../imgs/game/2_l.gif', x: 400, y: 310, dir: 1, score: 2,
        currX: 400, sub: 12, z_index: 1,
      },

      {
        url: '../../imgs/game/2_r.gif', x: 716, y: 370, dir: 0, score: 2,
        currX: 716, sub: 13, z_index: 1,
      },

      {
        url: '../../imgs/game/2_l.gif', x: 333, y: 430, dir: 1, score: 2,
        currX: 333, sub: 14, z_index: 1,
      },

      //  三分鱼
      {
        url: '../../imgs/game/3_r.gif', x: -650, y: 250, dir: 0, score: 3,
        currX: -650, sub: 15, z_index: 4,
      },

      {
        url: '../../imgs/game/3_l.gif', x: -40, y: 310, dir: 1, score: 3,
        currX: -40, sub: 16, z_index: 4,
      },

      {
        url: '../../imgs/game/3_l.gif', x: 940, y: 310, dir: 1, score: 3,
        currX: 940, sub: 17, z_index: 4,
      },

      {
        url: '../../imgs/game/3_r.gif', x: 369, y: 370, dir: 0, score: 3,
        currX: 369, sub: 18, z_index: 4,
      },

      {
        url: '../../imgs/game/3_l.gif', x: 90, y: 430, dir: 1, score: 3,
        currX: 90, sub: 19, z_index: 4,
      },
      //  五分鱼
      {
        url: '../../imgs/game/5_r.gif', x: -40, y: 250, dir: 0, score: 5,
        currX: -40, sub: 20, z_index: 2,
      },
      {
        url: '../../imgs/game/5_l.gif', x: 360, y: 430, dir: 1, score: 5,
        currX: -360, sub: 22, z_index: 2,
      },
      {
        url: '../../imgs/game/5_l.gif', x: 670, y: 370, dir: 1, score: 5,
        currX: 670, sub: 23, z_index: 2,
      },
    ],
    speed_1: 5,// 一分鱼移动的速度
    speed_2: 6,//二分鱼的速度
    speed_3: 10,//三分鱼的速度
    speed_5: 30,//五分鱼的速度
    speed_boss: 8,//大boss的速度
    //================boss的样式=============//
    bossL: -700,
    bossT: 0,//220~430

    show_fish: [],
    is_touzhi: 0,
    //==========动态金币==============//
    coin_list: [
      { top: 0, left: -200, sub: 0, score: 1 }
    ],//小鱼变成金币数组
    //===========boss==============//
    swim_boss: true,
    stand_boss: false,
    boss_timer: {},
    //=============游戏时间==========//
    m: '00',
    s: '00',
    //=============金币==========//
    all_jb: '',
    //==========gif路径==========//
    boss1: '',
    boss2: '',
    //===========结印==========//
    mudra: false,
    user_id: '',
    fish_timer: {},//小鱼的定时器
    // gameover页面的数据
    is_gameover: false,
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
    star_opacity: 0,//传入的得到的金币的总数量
    is_box: false,//刚开始星星的view没有出现
    //===================最后一个叉子=========//
    last_cha: false,
    //=================任务板刷新（初次进入）==============//
    one_fish:20,
    two_fish:10,
    three_fish:7,
    five_fish:8,
    //抓到的鱼的数量
    get_one:0,
    get_two:0,
    get_three:0,
    get_five:0,
    //=======倒计时===========//
    count_down:30,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  again_hide() {
    this.setData({
      again: false,
    });
    var fish_timer = setInterval(() => {
      if (this.data.gameover) {
        clearInterval(fish_timer);
      }
      this._fish_FN();
      this._boss_FN();
    }, 150)
  },
  onLoad: function (options) {
    if (app.globalData.music == true) {
      app.AppMusic1.src = app.globalData.http + 'Public/music/mq_music/hl.mp3'
    }
    if (app.globalData.again != 0) {
      this.setData({
        again: true,
      });
    } else {
      var fish_timer = setInterval(() => {
        if (this.data.gameover) {
          clearInterval(fish_timer);
        }
        this._fish_FN();
        this._boss_FN();
      }, 150)
    }
    this.cat_ctx = wx.createCanvasContext('cat_Canvas');
    wx.getSystemInfo({
      success: res => {
        this.setData({
          w_h: res.windowHeight,
          w_w: res.windowWidth,
          cat_y: res.windowHeight - this.data.cat_h,
          cat_x: res.windowWidth / 2 - this.data.cat_w / 2,
          top_end: res.windowHeight - res.windowHeight * 0.7,
          start_time: new Date().getTime(),
        });
        this.cat_ctx.drawImage('../../imgs/cat3.png', this.data.cat_x, this.data.cat_y, this.data.cat_w, this.data.cat_h);
        this.cat_ctx.draw();      
      }
    })

    wx.downloadFile({
      url: app.globalData.http + 'Public/img/mq_gif/all_cz.gif',
      success: res1 => {
        this.setData({
          all_cz: res1.tempFilePath,
        })
      }
    })
    wx.downloadFile({
      url: app.globalData.http + 'Public/music/mq_music/jjb.mp3',
      success: res => {
        this.setData({
          all_jb: res.tempFilePath,
        })
      }
    })
    //============游戏时间的计算===============//

    function toDub(n) {
      return n < 10 ? "0" + n : "" + n;
    }
    var n = 0;
    var index_time = setInterval(() => {
      var count_down = this.data.count_down
      if (this.data.gameover) {
        clearInterval(index_time);
        return false;
      }
      n++;
      this.setData({
        m: toDub(parseInt(n / 60)),
        s: toDub(parseInt(n % 60)),
        n: n,
        count_down:count_down-1,
      })
    }, 1000);

  },
  //=============鱼的函数==============// 
  _fish_FN() {
    var fish_list = this.data.fish_list
    var count_down = this.data.count_down
    var get_one = this.data.get_one
    var get_two = this.data.get_two
    var get_three = this.data.get_three
    var get_five = this.data.get_five
    var one_fish = this.data.one_fish
    var two_fish = this.data.two_fish
    var three_fish = this.data.three_fish
    var five_fish = this.data.five_fish
    for (let i = 0; i < fish_list.length; i++) {
      //==========一分的鱼============//
      if (fish_list[i].score == 1) {
        if (fish_list[i].dir == 0) {//向右边移动的鱼        
          if (fish_list[i].currX >= 1050) {
            fish_list[i].currX = -700
          }
          fish_list[i].currX += this.data.speed_1
        } else {//向左边移动的鱼
          if (fish_list[i].currX <= -700) {
            fish_list[i].currX = 1050
          }
          fish_list[i].currX -= this.data.speed_1
        }
      }

      //===========二分的鱼==========//
      if (fish_list[i].score == 2) {
        if (fish_list[i].dir == 0) {//向右边移动的鱼        
          if (fish_list[i].currX >= 1050) {
            fish_list[i].currX = -700
          }
          fish_list[i].currX += this.data.speed_2

        } else {//向左边移动的鱼
          if (fish_list[i].currX <= -700) {
            fish_list[i].currX = 1050
          }
          fish_list[i].currX -= this.data.speed_2
        }
      }

      //===========三分的鱼==========//
      if (fish_list[i].score == 3) {
        if (fish_list[i].dir == 0) {//向右边移动的鱼        
          if (fish_list[i].currX >= 1050) {
            fish_list[i].currX = -700
          }
          fish_list[i].currX += this.data.speed_3

        } else {//向左边移动的鱼
          if (fish_list[i].currX <= -700) {
            fish_list[i].currX = 1050
          }
          fish_list[i].currX -= this.data.speed_3

        }
      }
      // ===========五分的鱼==========//
      if (fish_list[i].score == 5) {
        if (fish_list[i].dir == 0) {//向右边移动的鱼        
          if (fish_list[i].currX >= 1050) {
            fish_list[i].currX = -700
          }
          fish_list[i].currX += this.data.speed_5

        } else {//向左边移动的鱼
          if (fish_list[i].currX <= -700) {
            fish_list[i].currX = 1050
          }
          fish_list[i].currX -= this.data.speed_5
        }
      }
    }
    this.setData({
      fish_list,
    })
    //==============定时刷新任务是否完成============//
    // 1，时间到了任务没有完成，跳向gameover页面
    if(count_down==0){
          this.gogameover()
    }
    // //2,任务完成跳进游戏结束页面
    if(get_one >= one_fish && get_two >= two_fish && get_three>= three_fish && get_five >= five_fish ){
      this.game_over()
    }
  },

  skill_card() {
    if (this.data.last_cha == true) {
      return
    }
    //关闭飞叉
    var tmp_list = this.data.fish_list;
    this.setData({
      mudra: true,

    })
    setTimeout(() => {
      //      增加叉子数量
      var old_c = this.data.c;
      var set_c = setInterval(() => {
        this.setData({
          c: old_c++,
        });
        if (old_c > 10) {
          clearInterval(set_c);
        }
      }, 100);
      //====================增加叉子数量到10=================//
      var tmp_coin = 0;
      var fish_list = this.data.fish_list;
      var this_list = [];
      for (var k = 0; k < fish_list.length; k++) {
        if (fish_list[k].currX > -120 && fish_list[k].currX < 420) {
          // 计算视图范围内小鱼的金币总量计算
          tmp_coin += fish_list[k].score
        }
        var co_top = fish_list[k].y
        var co_left = fish_list[k].currX
        var sub = fish_list[k].sub
        var score = fish_list[k].score
        var new_coin = {}
        new_coin.top = co_top + 36;
        new_coin.left = co_left;
        new_coin.sub = sub;
        new_coin.score = score;
        this_list.push(new_coin);
        fish_list[k].currX = fish_list[k].x;
      }
      //=============两秒钟之后将金币的数组清空剩下一个===========//    
      this.setData({
        kill_all_show: false,
        kill_all_num: this.data.kill_all_num - 1,
        kill_all_animate: true,
        mudra: false,
        coin: this.data.coin + tmp_coin,
        coin_list: this_list,
        // 将大boss的位置移到最远处
        bossL: -400,
        fish_list: [],
      });
      setTimeout(() => {
        for (var k = 0; k < fish_list.length; k++) {
          if (fish_list[k].currX > -120 && fish_list[k].currX < 500) {
            fish_list[k].currX -= 500
          }
        }
        this.setData({
          fish_list, coin_list: [], kill_all_animate: false,
        })
      }, 3000)
    }, 2500)
  },
  //========================猫的函数========================//
  touchstart() {
    if (this.data.again == true) {
      return
    }
    this.cat_ctx.drawImage('../../imgs/cat1.png', this.data.cat_x, this.data.cat_y, this.data.cat_w, this.data.cat_h);
    this.cat_ctx.drawImage('../../imgs/wo_cha.png', this.data.cat_x + this.data.cat_w - 18, this.data.cat_y - 22, 70 / 3, 402 / 3);
    this.cat_ctx.draw();
  },
  bindtouchmove(e) {
    if (this.data.again == true) {
      return
    }
    var cat_x = null;
    var w_w = this.data.w_w;
    var cat_w = this.data.cat_w;
    var cat_y = this.data.cat_y;
    var cat_h = this.data.cat_h;
    if (e.changedTouches[0].x < cat_w) {
      cat_x = 0
    } else if (e.changedTouches[0].x > w_w - (cat_w / 2) - 15) {
      cat_x = w_w - cat_w - 15;
    } else {
      cat_x = e.changedTouches[0].x - (cat_w / 2);
    }
    this.setData({
      cat_x,
    });
    this.cat_ctx.drawImage('../../imgs/cat1.png', cat_x, cat_y, cat_w, cat_h);
    this.cat_ctx.drawImage('../../imgs/wo_cha.png', cat_x + cat_w - 18, cat_y - 22, 70 / 3, 402 / 3);
    this.cat_ctx.draw();

  },
  _clear_c() {
    //=========防止叉子的数量可能变为负的=========//
    if (this.data.c <= 0) {
      return
    }
    this.setData({
      c: this.data.c - 1,
    });
    if (this.data.c == 1) {
      this.setData({
        last_cha: true,
      })
    }
    if (this.data.c <= 1 && this.data.kill_all_num != 0) {
      this.setData({
        kill_all_show: true,
      });
    }
    this.gogameover();
  },
  gogameover() {
    if (this.data.c == 0) {
      //游戏失败
      app.globalData.again = 0;
      this.setData({
        gameover: true,
      });
      var end_time = new Date().getTime();
      if (this.data.boss_over == false) {
        this.setData({
          cha_over: true,
        })
        this.game_over();
      }

    }
    return false;
  },
  bindtouchend(e) {
    if (this.data.again == true) {
      return
    }
    this.gogameover();
    var c_start_x = this.data.cat_x + this.data.cat_w / 2;
    var c_strat_y = this.data.cat_y;
    var c_y = c_strat_y;
    // 音效
    if (app.globalData.music == true) {
      app.AppMusic3.src = '/imgs/cz.mp3'
      app.AppMusic3.loop = false;
      app.AppMusic3.play()
    }
    this._c_FN(c_y, c_start_x, c_strat_y, e);//投掷函数
    //判断技能卡是否显示
  },
  //======================投掷=======================//
  _c_FN(c_y, c_start_x, c_strat_y, e) {
    var c_y = c_y;
    var cx = this.data.cat_x + this.data.cat_w - 15;
    var fish_list = this.data.fish_list;
    var w_w = this.data.w_w;
    var cat_x = this.data.cat_x;
    var cat_y = this.data.cat_y;
    var cat_w = this.data.cat_w;
    var cat_h = this.data.cat_h;
    var top_end = this.data.top_end;
    var get_one = this.data.get_one
    var get_two = this.data.get_two
    var get_three = this.data.get_three
    var get_five = this.data.get_five
    // 抓到鱼的个数
    var c_setInt = setInterval(() => {
      c_y = c_y - 55;
      //  ================小鱼的碰撞检测================//
      for (var k = 0; k < fish_list.length; k++) {
        if (fish_list[k].currX > -120 && fish_list[k].currX < w_w + 120) {
          if (fish_list[k].currX < cx && fish_list[k].currX + 60 > cx && fish_list[k].y + 50 < c_y && fish_list[k].y + 100 > c_y) {
            var sub = fish_list[k].sub//获得被点击到的鱼的下标值
            var score = fish_list[k].score//获得点击小鱼的金币数
            //=======页面统计抓到小鱼的个数===========//
            if(score = 1){
              get_one += 1
            }else if(score = 2){
              get_two += 1
            }else if(score = 3){
              get_three += 1
            }else if(score = 5){
              get_five += 1
            }
            //============生成动态金币==========//
            //======音效===================//
            if (app.globalData.music == true) {
              app.AppMusic2.src = this.data.all_jb
              app.AppMusic2.loop = false;
              app.AppMusic2.play()
            }
            var coin_left = fish_list[k].currX
            var coin_top = fish_list[k].y
            var coin_list = this.data.coin_list;
            var new_coin = {}
            new_coin.top = coin_top + 36
            new_coin.left = coin_left
            new_coin.sub = sub
            new_coin.score =  score
            coin_list.push(new_coin);
            this.setData({
              coin_list,
              get_one,
              get_two,
              get_three,
              get_five,
            })
            // 几秒钟之后循环数组，将金币消失
            setTimeout(() => {
              var coin_list = this.data.coin_list;
              for (var t = 0; t < coin_list.length; t++) {
                if (coin_list[t].sub == sub) {
                  coin_list.splice(t, 1)
                  this.setData({
                    coin_list,
                  })
                }
              }
            }, 1000)
            //将被点击的鱼的横坐标变回到原来的x值
            // 获得鱼的原来的left值
            if (fish_list[k].x > -120 && fish_list[k].x < w_w + 120) {
              fish_list[k].currX = fish_list[k].x
            } else {
              fish_list[k].currX = -700
            }
            this.setData({
              fish_list,
            })
            clearInterval(c_setInt);
            //判断鱼的得分、
            // 投掷中的动作
            this.cat_ctx.drawImage('../../imgs/cat1.png', cat_x, cat_y, cat_w, cat_h);
            this.cat_ctx.draw();
            setTimeout(() => {
              // 投掷结束的动作
              this.cat_ctx.drawImage('../../imgs/cat3.png', cat_x, cat_y, cat_w, cat_h);
              this.cat_ctx.draw();
            }, 150);
            this.setData({
              coin: this.data.coin + fish_list[k].score,
            });
            return false;
          }
        }
      }


      //==================大boss的碰撞检测=============//
      if (this.data.bossL + 100 < cx && this.data.bossL + 300 > cx && this.data.bossT < c_y && this.data.bossT + 200 > c_y) {
        // 音效
        if (app.globalData.music == true) {
          app.AppMusic2.src = '../../imgs/dz.mp3'
          app.AppMusic2.loop = false;
          app.AppMusic2.play()
        }
        // 新建一张大鱼出现的图片
        this.setData({
          swim_boss: false,
          stand_boss: true,
          boss_over: true,
        })
        // 几秒钟之后将Boss图片消失跳向游戏结束页面

        // 将大鱼的定时器关闭

        clearInterval(c_setInt);
        // 投掷中的动作
        this.cat_ctx.drawImage('../../imgs/cat1.png', cat_x, cat_y, cat_w, cat_h);

        this.cat_ctx.draw();
        setTimeout(() => {
          // 投掷结束的动作
          this.cat_ctx.drawImage('../../imgs/cat3.png', cat_x, cat_y, cat_w, cat_h);
          this.cat_ctx.draw();
          setTimeout(() => {
            this.setData({
              stand_boss: false
            })
            var end_time = new Date().getTime();
            if (this.data.cha_over == false) {
              this.setData({
                boss_over: true
              })
             this.game_over();
            }

          }, 3000)
        }, 150);
        return false;
      }
      this.cat_ctx.drawImage('../../imgs/cat1.png', cat_x, cat_y, cat_w, cat_h);
      if (c_y < top_end) {
        c_y = top_end
      }
      this.cat_ctx.drawImage('../../imgs/cz.png', cat_x + cat_w - 15, c_y, 70 / 5, 402 / 5);
      this.cat_ctx.draw();
      if (c_y <= top_end) {
        //减矛的方法
        this._clear_c();
        clearInterval(c_setInt);
        // 投掷中的动作
        this.cat_ctx.drawImage('../../imgs/cat1.png', cat_x, cat_y, cat_w, cat_h);
        this.cat_ctx.drawImage('../../imgs/2.png', cat_x + cat_w - 15 - 10, c_y, 42, 22);
        this.cat_ctx.draw();
        setTimeout(() => {
          // 投掷结束的动作
          this.cat_ctx.drawImage('../../imgs/cat3.png', cat_x, cat_y, cat_w, cat_h);
          this.cat_ctx.draw();
        }, 150);
      }
    }, 50);
  },
  //=======================boss的函数=======================//
  _boss_FN() {
    this.setData({
      bossL: this.data.bossL - 20
    })
    if (this.data.bossL < -700) {
      this.setData({
        bossT: Math.random() * (430 - 220) + 220,
        bossL: Math.random() * (1400 - 1050) + 1050,
      })
    }
  },
  //==========================gameover页面的函数===================//
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
  //发送游戏数据FN，在gameover页面
  _game_setData() {
    var integral = this.data.coin;
    var start_time = this.data.start_time.toString().substr(0, 10);
    var end_time = thi.data.end_time.toString().substr(0, 10);
    var use_time = this.data.end_time - this.data.start_time;
    var view_time = parseInt(use_time) / 1000;
    this.setData({
      view_time,
    });
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
  // gameover页面显示
  game_over() {
    this.setData({
      is_gameover: true,
    })
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
      app.AppMusic3.src = app.globalData.http + 'Public/music/mq_music/zmb.mp3'
      app.AppMusic3.loop = false
      //星星点亮(获得星星的情况下)
      if (this.data.star_num >= 1) {
        setTimeout(() => {
          app.AppMusic2.src = app.globalData.http + 'Public/music/mq_music/xxs.mp3'
          app.AppMusic2.loop = false;
        }, 3500)
      } else {
        app.AppMusic1.pause()
      }
    }

    // 星星的透明度变为1
    setTimeout(() => {
      this.setData({
        star_opacity: 1,
      })
    }, 3800)
  },
  //====关闭最后一个叉子=//
  close_lastcha() {
    this.setData({
      last_cha: false
    })
  },
  //=========重置任务板的函数=============//
  task(){
    this.setData({
      first_fish:0,
      two_fish:0,
      three_fish:0,
      five_fish:0,
    })
  },









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
    wx.redirectTo({
      url: '../start_game2/start_game2'
    })
    app.globalData.again = false;
    //  控制说明框的不显示

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
    text = app.globalData.share[sub]
    return {
      title: text,
      path: '/pages/start_game/start_game?friend_id=' + app.globalData.uid,
      imageUrl: '../../imgs/share/ace.png',
      success: res => {
        if (res.errMsg && this.data.kill_all_active == 1) {
          this.setData({
            kill_all_num: this.data.kill_all_num + 1,
            kill_all_active: this.data.kill_all_active - 1,
          });
          if (this.data.c == 1) {
            this.setData({
              kill_all_show: true,
            });
          }
        }
      }
    }

  }
})