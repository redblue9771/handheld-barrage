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
    colorIndex: 0,
    speedIndex: 1,
    setSpeed: 5,
    animation: {},
    hintText: "(ﾉ◕ヮ◕)ﾉ点击非输入区域即可隐藏/显示界面哦！",
    sizeIndex: 2,
    sizeArr: [{
      name: "超大",
      value: 500,
      active: false
    }, {
      name: "大",
      value: 400,
      active: false
    }, {
      name: "正常",
      value: 200,
      active: true
    }, {
      name: "小",
      value: 100,
      active: false
    }],
    speedArr: [{
        name: "快",
        value: 3,
        active: false
      },
      {
        name: "正常",
        value: 5,
        active: true
      },
      {
        name: "慢",
        value: 7,
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
      wh: wx.getSystemInfoSync().windowHeight
    })

  },
  changeColor: function(e) {


    var after = 'colorArr[' + parseInt(e.currentTarget.dataset.index) + '].active',
      before = 'colorArr[' + this.data.colorIndex + '].active';
    this.setData({
      Scorll: this.data.animation.export(),
      colorIndex: parseInt(e.currentTarget.dataset.index),
      [before]: false,
      [after]: true
    })
    this.scorllFuc();
  },
  changeSpeed: function(e) {
    clearTimeout(timer)
    var strlen = wx.createContext();
    strlen.setFontSize(this.data.sizeArr[this.data.sizeIndex].value);
    var temp = [3, 5, 7];
    this.data.animation.translate3d(0, 0, 0).step({
      duration: 0
    });
    var after = 'speedArr[' + parseInt(e.currentTarget.dataset.index) + '].active',
      before = 'speedArr[' + this.data.speedIndex + '].active';
    this.setData({
      Scorll: this.data.animation.export(),
      setSpeed: ((strlen.measureText(this.data.displayText).width / 2) * (this.data.sizeArr[this.data.sizeIndex].value / 200) + (this.data.wh * 2) * (this.data.wh / 667)) / (((this.data.sizeArr[this.data.sizeIndex].value * 2) * (this.data.sizeArr[this.data.sizeIndex].value / 200) + (this.data.wh * 2) * (this.data.wh / 667)) / temp[parseInt(e.currentTarget.dataset.index)]),
      speedIndex: parseInt(e.currentTarget.dataset.index),
      [before]: false,
      [after]: true
    })
    this.scorllFuc();
  },
  changeSize: function(e) {
    clearTimeout(timer)
    var temp = [3, 5, 7],
      strlen = wx.createContext(),
      temp_ = [500, 400, 200, 100];
    this.data.animation.translate3d(0, 0, 0).step({
      duration: 0
    })

    strlen.setFontSize(temp_[parseInt(e.currentTarget.dataset.index)]);
    var after = 'sizeArr[' + parseInt(e.currentTarget.dataset.index) + '].active',
      before = 'sizeArr[' + this.data.sizeIndex + '].active';

    this.setData({
      Scorll: this.data.animation.export(),
      sizeIndex: parseInt(e.currentTarget.dataset.index),
      setSpeed: ((strlen.measureText(this.data.displayText).width / 2) * (temp_[parseInt(e.currentTarget.dataset.index)] / 200) + (this.data.wh * 2) * (this.data.wh / 667)) / (((temp_[parseInt(e.currentTarget.dataset.index)] * 2) * (temp_[parseInt(e.currentTarget.dataset.index)] / 200) + (this.data.wh * 2) * (this.data.wh / 667)) / temp[this.data.speedIndex]),
      textLen: strlen.measureText(this.data.displayText).width / 2,
      [before]: false,
      [after]: true
    })
    console.log(this.data.speedIndex)
    this.scorllFuc();
  },
  textInput: function(e) {
    var strlen = wx.createContext();
    clearTimeout(timer)
    this.data.animation.translate3d(0, 0, 0).step({
      duration: 0
    })



    strlen.setFontSize(this.data.sizeArr[this.data.sizeIndex].value)

    var temp = [3, 5, 7];
    // if (strlen > this.data.wh) {
    this.setData({
      Scorll: this.data.animation.export(),
      textLen: strlen.measureText(e.detail.value).width * 0.5,
      displayText: e.detail.value,
      speedIndex: ((strlen.measureText(e.detail.value).width / 2) * (this.data.sizeArr[this.data.sizeIndex].value / 200) + (this.data.wh * 2) * (this.data.wh / 667)) / (((this.data.sizeArr[this.data.sizeIndex].value * 2) * (this.data.sizeArr[this.data.sizeIndex].value / 200) + (this.data.wh * 2) * (this.data.wh / 667)) / temp[this.data.speedIndex])
    })

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
  },
  toabout: function() {
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