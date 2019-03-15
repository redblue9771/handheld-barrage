// pages/index/index.js
var timer;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    displayText: "手持弹幕",
    panelFlag: false,
    barFlag: true,
    colorIndex: 0,
    speedIndex: 0,
    sizeIndex: 0,
    scorllDuration: 5000,
    hintText: "(ﾉ◕ヮ◕)ﾉ点击非输入区域即可隐藏/显示界面哦！",
    textLen: 0,
    animation: {},
    currentSpeed: 0,
    sizeArr: [{
      name: "正常",
      value: 40,
      active: true
    }, {
      name: "小",
      value: 25,
      active: false
    }, {
      name: "大",
      value: 60,
      active: false
    }, {
      name: "超大",
      value: 80,
      active: false
    }],
    speedArr: [{
        name: "正常",
        value: 5000,
        active: true
      },
      {
        name: "慢",
        value: 7000,
        active: false
      }, {
        name: "快",
        value: 3000,
        active: false
      }
    ],
    colorArr: [{
      value: "#fff",
      active: true
    }, {
      value: "#f00",
      active: false
    }, {
      value: "#DA70D6",
      active: false
    }, {
      value: "#FFFFE0",
      active: false
    }, {
      value: "#00FFFF",
      active: false
    }, {
      value: "#1E90FF",
      active: false
    }, {
      value: "#F0FFFF",
      active: false
    }, {
      value: "#00FF00",
      active: false
    }]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    this.setData({
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
  },

  /**
   * 查询字幕长度
   */
  getTextLen: function() {
    var query = wx.createSelectorQuery();
    query.select('.scorll-text').boundingClientRect((obj) => {
      this.setData({
        textLen: parseInt(obj.height)
      })
    }).exec();
  },
  /**
   * 清除字幕
   */
  clearScorll: function() {
    clearInterval(timer);
    this.data.animation.translate3d(0, 0, 0).step({
      duration: 0
    })
    this.setData({
      scorll: this.data.animation.export()
    })
  },

  /**
   * 改变字体颜色
   */
  changeColor: function(e) {
    var newIndex = parseInt(e.currentTarget.dataset.index),
      after = 'colorArr[' + newIndex + '].active',
      before = 'colorArr[' + this.data.colorIndex + '].active';

    this.setData({
      colorIndex: newIndex,
      [before]: false,
      [after]: true
    })
  },

  /**
   * 改变速度
   */
  changeSpeed: function(e) {

    this.clearScorll()

    var newIndex = parseInt(e.currentTarget.dataset.index);

    var after = 'speedArr[' + newIndex + '].active',
      before = 'speedArr[' + this.data.speedIndex + '].active';
    this.setData({
      speedIndex: newIndex,
      currentSpeed: this.data.windowHeight * 2 / this.data.speedArr[newIndex].value,
      [before]: false,
      [after]: true
    })

    this.scorllFuc();
  },

  /**
   * 改变字体大小
   */
  changeSize: function(e) {

    this.clearScorll()

    // 先设置大小
    var newIndex = parseInt(e.currentTarget.dataset.index),
      currentLen = this.data.textLen,
      after = 'sizeArr[' + newIndex + '].active',
      before = 'sizeArr[' + this.data.sizeIndex + '].active';

    this.setData({
      sizeIndex: newIndex,
      [before]: false,
      [after]: true
    })

    // 刷新
    this.scorllFuc();
  },
  textInput: function(e) {

    this.clearScorll()

    this.setData({
      displayText: e.detail.value
    });


    this.scorllFuc();
  },
  /**
   * 动画控制
   */
  scorllFuc: function() {
    this.getTextLen();
    var scorllH = this.data.windowHeight * 2 + this.data.textLen;
    this.data.scorllDuration = parseInt(scorllH / this.data.currentSpeed);
    var scorllAmt = () => {
      this.data.animation.translate3d(-scorllH, 0, 0).step({
        duration: this.data.scorllDuration
      })
      this.data.animation.translate3d(0, 0, 0).step({
        duration: 0
      })
      this.setData({
        scorll: this.data.animation.export()
      })
    };
    scorllAmt();
    // 循环动画
    timer = setInterval(() => {
      scorllAmt();
    }, this.data.scorllDuration + 500);
  },
  togglePanel: function() {
    if (this.data.barFlag) {
      this.setData({
        barAmt: 100,
        barFlag: false,
      })
    } else {
      this.setData({
        barAmt: 0,
        barFlag: true,
      })
    }
    if (this.data.panelFlag) {
      this.setData({
        panelAmt: 100,
        panelFlag: false
      })
    } else {
      this.setData({
        panelAmt: 0,
        panelFlag: true
      })
    }
  },
  toggleBar: function() {
    if (this.data.barFlag) {
      this.setData({
        barAmt: 100,
        barFlag: false,
        panelFlag: false,
        panelAmt: 100
      })
    } else {
      this.setData({
        barAmt: 0,
        barFlag: true,
        panelFlag: false,
        panelAmt: 100
      })
    }

  },
  focus: function() {
    this.setData({
      hintText: "( ^ω^)回车可以改变文字呢！"

    })
  },
  onblur: function() {
    this.setData({
      hintText: "(ﾉ◕ヮ◕)ﾉ点击非输入区域即可隐藏/显示界面哦！"
    })
  },
  toAbout: function() {
    wx.showModal({
      title: 'Emmm...ლ(╹◡╹ლ)',
      content: '开发者：redblue 网站：redblue.fun',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else {
          console.log('用户点击取消')
        }

      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var animation = wx.createAnimation({
      timingFunction: 'linear'
    });
    this.data.animation = animation;

    //初始化速度
    this.data.currentSpeed = this.data.windowHeight * 2 / this.data.speedArr[this.data.speedIndex].value;

    this.scorllFuc();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})