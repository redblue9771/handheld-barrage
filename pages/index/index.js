// pages/index/index.js
var timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    displayText: "手持弹幕",
    flagPanel: false,
    flagBar: true,
    textLen: 400,
    setSpeed: 5,
    _setSpeed: 1,
    animation: {},
    hintText: "(ﾉ◕ヮ◕)ﾉ点击非输入区域即可隐藏/显示界面哦！",
    setSize: 200,
    sizeArr: [
      "超大",
      "大",
      "正常",
      "小"
    ],
    speedArr: [
      "快",
      "正常",
      "慢"
    ],
    colorArr: [
      "#fff",
      "#f00",
      "#DA70D6",
      "#FFFFE0",
      "#00FFFF",
      "#1E90FF",
      "#F0FFFF",
      "#00FF00"
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    this.setData({
      wh: wx.getSystemInfoSync().windowHeight
    })

  },
  changeColor: function(e) {
    clearTimeout(timer)
    this.data.animation.translate3d(0, 0, 0).step({
      duration: 0
    })
    this.setData({
      Scorll: this.data.animation.export(),
      colorName: this.data.colorArr[parseInt(e.currentTarget.dataset.index)]
    })
    this.scorllFuc();
  },
  changeSpeed: function(e) {
    var strlen = wx.createContext();
    strlen.setFontSize(this.data.setSize);
    var temp = [3, 5, 7];
    clearTimeout(timer)
    this.data.animation.translate3d(0, 0, 0).step({
      duration: 0
    })
    this.setData({
      Scorll: this.data.animation.export(),

      setSpeed: ((strlen.measureText(this.data.displayText).width / 2) * (this.data.setSize / 200) + (this.data.wh * 2) * (this.data.wh / 667)) / (((this.data.setSize * 2) * (this.data.setSize / 200) + (this.data.wh * 2) * (this.data.wh / 667)) / temp[e.currentTarget.dataset.index]),
      _setSpeed: parseInt(e.currentTarget.dataset.index)
    })
    console.log(this.data.setSpeed)
    this.scorllFuc();
  },
  changeSize: function(e) {


    var temp = [3, 5, 7],
      strlen = wx.createContext(),
      temp_ = [500, 400, 200, 100];
    clearTimeout(timer)
    this.data.animation.translate3d(0, 0, 0).step({
      duration: 0
    })

    strlen.setFontSize(temp_[parseInt(e.currentTarget.dataset.index)])
    this.setData({
      Scorll: this.data.animation.export(),
      setSize: temp_[parseInt(e.currentTarget.dataset.index)],
      setSpeed: ((strlen.measureText(this.data.displayText).width / 2) * (temp_[parseInt(e.currentTarget.dataset.index)] / 200) + (this.data.wh * 2) * (this.data.wh / 667)) / (((temp_[parseInt(e.currentTarget.dataset.index)] * 2) * (temp_[parseInt(e.currentTarget.dataset.index)] / 200) + (this.data.wh * 2) * (this.data.wh / 667)) / temp[this.data._setSpeed]),
      textLen: strlen.measureText(this.data.displayText).width / 2
    })
    console.log(this.data.setSpeed)
    this.scorllFuc();
  },
  textInput: function(e) {
    var strlen = wx.createContext();
    clearTimeout(timer)
    this.data.animation.translate3d(0, 0, 0).step({
      duration: 0
    })



    strlen.setFontSize(this.data.setSize)

    var temp = [3, 5, 7];
    // if (strlen > this.data.wh) {
    this.setData({
      Scorll: this.data.animation.export(),
      textLen: strlen.measureText(e.detail.value).width * 0.5,
      displayText: e.detail.value,
      setSpeed: ((strlen.measureText(e.detail.value).width / 2) * (this.data.setSize / 200) + (this.data.wh * 2) * (this.data.wh / 667)) / (((this.data.setSize * 2) * (this.data.setSize / 200) + (this.data.wh * 2) * (this.data.wh / 667)) / temp[this.data._setSpeed])
    })

    //  (strlen.measureText(e.detail.value).width / 2 * this.data.setSize / 200 + this.data.wh * 2 * this.data.wh / 667)/(this.data.setSize * 2 * this.data.setSize / 200 + this.data.wh * 2 * this.data.wh / 667) / temp[this.data._setSpeed]
    // (strlen.measureText(e.detail.value).width * this.data.setSize / 400 + 333.5 * this.data.wh * this.data.wh)/( (this.data.setSize * this.data.setSize / 100 + 333.5 * this.data.wh * this.data.wh) / temp[this.data._setSpeed])

    this.scorllFuc();
  },
  changerA: function() {
    if (this.data.displayPanel === "inherit")
      this.setData({
        toggleUI
      })
    else
      this.setData({
        displayPanel: "inherit"
      })
  },
  scorllFuc: function() { //动画控制
    var animation = wx.createAnimation({
        timingFunction: 'linear'
      }),
      scorllH = this.data.wh * 2 + this.data.textLen
    this.data.animation = animation;
    animation.translate3d(-scorllH, 0, 0).step({
      duration: this.data.setSpeed * 1000
    })
    animation.translate3d(0, 0, 0).step({
      duration: 0
    })
    this.setData({
      Scorll: animation.export()
    })

    var Countdown = () => {
      timer = setTimeout(() => {
        animation.translate3d(-scorllH, 0, 0).step({
          duration: this.data.setSpeed * 1000
        })
        animation.translate3d(0, 0, 0).step({
          duration: 0
        })
        this.setData({
          Scorll: animation.export()
        })
        Countdown();
        console.log(1)
      }, this.data.setSpeed * 1000 + 500);
    };
    Countdown();
  },
  togglePanel: function() {
    if (this.data.flagBar) {
      this.setData({
        barAmt: 100,
        flagBar: false,
      })
    } else {
      this.setData({
        barAmt: 0,
        flagBar: true,
      })
    }
    if (this.data.flagPanel) {
      this.setData({
        panelAmt: 100,
        flagPanel: false
      })
    } else {
      this.setData({
        panelAmt: 0,
        flagPanel: true
      })
    }
  },
  toggleBar: function() {
    if (this.data.flagBar) {
      this.setData({
        barAmt: 100,
        flagBar: false,
        flagPanel: false,
        panelAmt: 100
      })
    } else {
      this.setData({
        barAmt: 0,
        flagBar: true,
        flagPanel: false,
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
  }, toabout: function () {
    wx.navigateTo({
      url: '../about/about'
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