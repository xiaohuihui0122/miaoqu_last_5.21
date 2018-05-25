// pages/splash_page/splash_page.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index_page:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        this.setData({
          index_page:app.globalData.index_page
        })
        // 4秒之后闪屏结束
        setTimeout(() => {
          app.globalData.index_page = false;
          this.setData({
            index_page: app.globalData.index_page
          })
        },4000)

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