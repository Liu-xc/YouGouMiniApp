// pages/category/index.js
import {request} from "../../request/index/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧的菜单数据
    leftMenuList: [],
    // 右侧的商品数据
    rightContent: [],
    // 被点击的左侧菜单
    currentIndex: 0,
    // 右侧内容的滚动条位置
    scrollTop: 0
    
  },
  // 接口的返回数据
  Cates: [],

  onLoad: function(){
    // web中的本地存储与小程序的本地存储的不同：
    // 代码不一样
    // 存的时候有没有类型转换（web中转换成String，小程序中不进行类型转换）

    // 先判断本地有没有旧的数据
    // 没有就发送请求
    // 有的话查看有没有过期
    // 过期也发送请求
    // this.getCates()

    // 获取本地存储中的数据
    const Cates = wx.getStorageSync("cates");
    // 判断
    if(!Cates){
      // 不存在
      this.getCates()
    } else {
      // 有旧的数据
      // 判断有没有过期
      // 定义过期时间
      if(Date.now() - Cates.time > 1000 * 300){
        this.getCates()
      } else {
        // 可以使用旧的数据
        this.Cates = Cates.data
        // 构造左侧的大菜单数据
        let leftMenuList = this.Cates.map(v=>v.cat_name)
        // 构造右侧的商品数据
        let rightContent = this.Cates[0].children
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },

  async getCates(){
    // 使用async和await发送异步请求
    const res = await request({url: "/categories"})

    this.Cates=res
    // 将获取到的数据存入本地存储中
    wx.setStorageSync("cates", {time: Date.now(), data: this.Cates});

    // 构造左侧的大菜单数据
    let leftMenuList = this.Cates.map(v=>v.cat_name)
    // 构造右侧的商品数据
    let rightContent = this.Cates[0].children
    this.setData({
      leftMenuList,
      rightContent
    })
    // request({
    //   url: "/categories",
    //   method: 'GET'
    // }).then((res)=>{
    
    // })
  },

  // 左侧菜单点击事件
  handleItemTap(e){
    // 获取被点击的标题上的索引
    // 给currentIndex赋值
    const {index} = e.currentTarget.dataset
    let rightContent = this.Cates[index].children
    // 重新设置右侧内容的scroll-view的top

    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop: 0
    })
    
  }
})