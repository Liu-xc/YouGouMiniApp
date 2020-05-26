// pages/order/index.js
/*
  1 页面的打开的时候
    1 获取url上的参数
    2 根据type值发送请求获取响应的数据
  2 点击不同标题的时候
    1 重新发送请求来获取和渲染数据
  
*/
import {request} from '../../request/index/index.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "全部",
        isActive: true
      },
      {
        id: 1,
        value: "待付款",
        isActive: false
      },
      {
        id: 2,
        value: "待发货",
        isActive: false
      },
      {
        id: 3,
        value: "退款/退货",
        isActive: false
      }
    ]
  },

  onShow(){
    // 小程序中页面栈的最大长度为10
    // 页面数组中索引最大的就是当前数组
    let pages = getCurrentPages();
    let currentPages = pages[pages.length-1]
    const {type} = currentPages.options
    this.getOrders(type)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

 handleTabsItemChange(e){
    // 获取被点击的标题索引
    const {index} = e.detail
    // 修改原数组
    let {tabs} = this.data
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false)
    // 赋值到data
    this.setData({
      tabs
    })
  },

  // 获取订单列表的方法
  async getOrders(type){
    const res = await request({url: "/my/orders/all", data: {type}})
    console.log(res)
  }
})