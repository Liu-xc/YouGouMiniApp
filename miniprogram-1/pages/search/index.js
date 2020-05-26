// pages/search/index.js

/*
  1 输入框值改变事件
    获取输入的值
    对值进行合法性判断
    通过检验就将值发送到后台
    将返回的值打印到页面
  2 防抖
*/
import {request} from "../../request/index/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    isFocus: false,
    inputvalue: ''
  },

  Timeid: -1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 输入框值改变事件
  handleInput(e){
    const {value} = e.detail
    // 检验合法性
    if (!value.trim()){
      // 非法值
      this.setData({
      isFocus: false,
      goods: []
      })
      return
    }
    this.setData({
      isFocus: true
    })
    clearTimeout(this.Timeid)
    this.Timeid = setTimeout(()=>{
      this.qsearch(value)
    }, 500)

  },

  // 发送请求获取搜索数据
  async qsearch(query){
    const res = await request({url: "/goods/qsearch", data: {query}})
    this.setData({
      goods: res
    })
  },

  // 点击取消按钮
  handleCancle(){
    this.setData({
      inputValue: '',
      isFocus: false,
      goods: []
    })
  }
})