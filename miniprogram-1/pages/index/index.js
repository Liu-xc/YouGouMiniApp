// request/index/index.js
import {request} from "../../request/index/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数组
    swiperList: [],
    // 导航数组
    cateList: [],
    // 楼层数组
    floorList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiperList()
    this.getCateList()
    this.getFloorList()
  },
  async getSwiperList(){
    const res = await request({url: "/home/swiperdata"})
    this.setData({
      swiperList: res
    })
    // request({
    //   url: "/home/swiperdata",
    //   method: 'GET'
    // }).then(result=>{
    //   this.setData({
    //     swiperList: result
    //   })
    // })
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    //   // header: {}, // 设置请求的 header
    //   success: function(res){
    //     // success
    //     _this.setData({
    //       swiperList: res.data.message
    //     })
    //   }
    // })
  },
  async getCateList(){
    const res = await request({url: "/home/catitems"})
    this.setData({
        cateList: res
      })
    // request({
    //   url: "/home/catitems",
    //   method: 'GET'
    // }).then(result=>{
    //   this.setData({
    //     cateList: result
    //   })
    // })
  },
  async getFloorList(){
    const res = await request({url: "/home/floordata"})
    this.setData({
        floorList: res
      })
    // request({
    //   url: "/home/floordata",
    //   method: 'GET'
    // }).then(result=>{
    //   this.setData({
    //     floorList: result
    //   })
    // })
  }
})