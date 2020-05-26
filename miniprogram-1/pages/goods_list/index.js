// pages/goods_list/index.js
// 用户上滑滚动条触底事件 加载下一页数据
  // 找到滚动条事件
  // 判断有没有下一条数据
    // 获取总页数  只有总条数
      // 利用页容量计算总页数
    // 获取当前页码 pagenum
    // 判断是否超出总页数
  // 如果没有下一页数据了就弹出提示框
  // 有的话就加载下一页数据
    // 当前页码++
    // 重新请求
    // 数组拼接

// 下拉刷新
// 重置数组
import {request} from "../../request/index/index.js"
Page({
  data: {
    tabs:[
      {
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 0,
        value: "价格",
        isActive: false
      }
    ],
    goodsList: []
  },

  // 接口要的参数
  QueryParams:{
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },

  //总页数
  totalPages: 1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid || ""
    this.QueryParams.query = options.query || ""

    this.getGoodsList()
  },

  // 获取商品列表数据
  async getGoodsList(){
    const res = await request({url: "/goods/search", data: this.QueryParams})
    const total = res.total;
    this.totalPages = Math.ceil(total / this.QueryParams.pagesize)
    this.setData({
      goodsList: [...this.data.goodsList, ...res.goods]
    })
  },
  
  // 滚动条触底事件
  onReachBottom(){
    // 判断还有没有下一页
    if(this.QueryParams.pagenum >= this.totalPages){
      // 没有下一页
      wx.showToast({
        title: '没有下一页数据了',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false
      });
    } else {
      // 还有下一页
      this.QueryParams.pagenum++
      this.getGoodsList()
    }
  }, 
  // 标题点击事件
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

  // 下拉刷新
  onPullDownRefresh(){
    // 重置数组
    this.setData({
      goodsList: []
    })
    // 重置页码
    this.QueryParams.pagenum = 1
    // 发送请求
    this.getGoodsList()
    // 手动关闭等待效果
    wx.stopPullDownRefresh()
  }
})