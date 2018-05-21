
App({
      onLaunch: function () {
            // 展示本地存储能力
        

       







            // 音乐播放管理器1
            this.AppMusic1 = wx.createInnerAudioContext();
            this.AppMusic1.autoplay = true;
            this.AppMusic1.loop = true;
            this.AppMusic1.onPlay(() => {
                  console.log('开始播放1')
            })
            this.AppMusic1.onError((res) => {
                  console.log(res.errMsg)
                  console.log(res.errCode)
            })

            // 关闭时候直接操作app中的背景音乐pause()即可
            // 音乐播放管理器2
            this.AppMusic2 = wx.createInnerAudioContext();
            this.AppMusic2.autoplay = true;
            this.AppMusic2.loop = true;
            this.AppMusic2.onPlay(() => {
                  console.log('开始播放2')
            })
            this.AppMusic2.onError((res) => {
                  console.log(res.errMsg)
                  console.log(res.errCode)
            })
            //boss的音乐播放器3
            this.AppMusic3 = wx.createInnerAudioContext();
            this.AppMusic3.autoplay = true;
            this.AppMusic3.loop = true;
            this.AppMusic3.onPlay(() => {
                  console.log('开始播放3')
            })
            this.AppMusic3.onError((res) => {
                  console.log(res.errMsg)
                  console.log(res.errCode)
            })

      },
      globalData: {
            http: 'http://192.168.1.250:8301/',
            userInfo: null,
            index_page: true,
            music: true,
            getuserinfo:true,
            cs_http: 'http://192.168.1.250:8301/',//测试地址
            API_CODE: 'd2c01f59edb4e10583d465bb1667927a',//小程序编码 32位
            API_ROLE: ['ADMIN', 'USER'], //角色 权限
            API_SECRET: '8e54ddfe243a6ecd4e231c9cfa770bd4',//接口秘钥 
            API_CHANNEL: 'ccee5d23c7f03103ae2bdebd136fb180',//接口渠道  
      }
})