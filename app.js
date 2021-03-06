
App({
      onLaunch: function () {

            // console.log(this.globalData.userInfo)

            // 展示本地存储能力
            // 音乐播放管理器1
            this.AppMusic1 = wx.createInnerAudioContext();
            this.AppMusic1.autoplay = true;
            this.AppMusic1.loop = true;
            this.AppMusic1.onError((res) => {
                  console.log(res.errMsg)
                  console.log(res.errCode)
            })

            // 关闭时候直接操作app中的背景音乐pause()即可
            // 音乐播放管理器2
            this.AppMusic2 = wx.createInnerAudioContext();
            this.AppMusic2.autoplay = true;
            this.AppMusic2.loop = true;
            this.AppMusic2.onError((res) => {
                  console.log(res.errMsg)
                  console.log(res.errCode)
            })
            //boss的音乐播放器3
            this.AppMusic3 = wx.createInnerAudioContext();
            this.AppMusic3.autoplay = true;
            this.AppMusic3.loop = true;
            this.AppMusic3.onError((res) => {
                  console.log(res.errMsg)
                  console.log(res.errCode)
            })
            // 按钮音乐放入全局变量
            wx.downloadFile({
              url: this.globalData.http + 'Public/music/mq_music/mq_bt.mp3',
              success: res => {
                this.bgm = wx.createInnerAudioContext();
                this.bgm.autoplay = true;
                this.bgm.src = res.tempFilePath;
                this.bgm.loop = false;
              }
            })



      },
      globalData: {
        // http:'http://192.168.1.250:8301/',
            http: 'https://maoqb.5izhuan.com/',
            userInfo: null,
            index_page: true,
            music: true,
            effect:true,
            uid:'',
            getuserinfo:true,
            API_CODE: 'd2c01f59edb4e10583d465bb1667927a',//小程序编码 32位
            API_ROLE: ['ADMIN', 'USER'], //角色 权限
            API_SECRET: '8e54ddfe243a6ecd4e231c9cfa770bd4',//接口秘钥 
            API_CHANNEL: 'ccee5d23c7f03103ae2bdebd136fb180',//接口渠道  
            btnPath:'',
            dark:'',
            back:'',
            yy_con:true,
            yx_con:true,
            share: [
                  ' 喂什么猫粮，一起撸鱼吧......',
                  '这只猫为了抓鱼简直逆天了，快来围观......',
                  '这只猫为了吃鱼竟然进了丛林......',
                  '劳资就是饿死，死外边，也决不自个抓鱼！好多鱼，喵~',
                  '还不把小鱼干交出来，我都看见了~',
                  '来人呐！赶紧给它摁住了，别让跑咯'
            ],
      },












})