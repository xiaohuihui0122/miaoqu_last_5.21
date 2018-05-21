// pages/billboard/billboard.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo:{},
      // 模拟返回用户的数据
      bill_list:[
        {rank:1,avatar_url:'../../imgs/billboard/1.jpg',user_name:'关关是个小可爱',score:2300},
        { rank: 1, avatar_url: '../../imgs/billboard/1.jpg', user_name: '关关是个打可爱', score: 2300 },
        { rank: 1, avatar_url: '../../imgs/billboard/1.jpg', user_name: '可爱', score: 2300 },
        { rank: 1, avatar_url: '../../imgs/billboard/1.jpg', user_name: '关关可爱', score: 2300 },
        { rank: 1, avatar_url: '../../imgs/billboard/1.jpg', user_name: '关小可爱', score: 2300 },
        { rank: 1, avatar_url: '../../imgs/billboard/1.jpg', user_name: '关关是个小可爱', score: 2300 },
        { rank: 1, avatar_url: '../../imgs/billboard/1.jpg', user_name: '关关是可爱', score: 2300 },
        { rank: 1, avatar_url: '../../imgs/billboard/1.jpg', user_name: '关关是个小爱', score: 2300 },
        { rank: 1, avatar_url: '../../imgs/billboard/1.jpg', user_name: '关个小可爱', score: 2300 },
      ],
      share:[
        '什么仇什么怨，丢了喵星球的脸',
        '十年磨一爪，一捞一大把',
        '猫生没有在怕的！',
        '不说了，如鲠在喉......'
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
 
  
   
  },
 
  close_bill(){
    wx.navigateTo({
      url: '../../pages/start_game/start_game?start=1'
    })
  },
  share_bill(){

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
    if (e.from === 'button') {
      // 来自页面内转发按钮
      var text = null;
      var sub = parseInt(Math.random()*3)
      text = this.data.share[sub]
      return {
        title: text,
        path: '/pages/index/index',
        imageUrl: '../../imgs/share/ace.png',
        success: res => {
          wx.showToast({
            title: '分享成功',
            icon: 'none'
          })
        }
      }

    } else {
      var text = null;
      var sub = parseInt(Math.random() * 3)
      text = this.data.share[sub]
      return {
        title: text,
        path: '/pages/index/index',
        imageUrl: '../../imgs/share/ace.png'
      }
    }
  }
})