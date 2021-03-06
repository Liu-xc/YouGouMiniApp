// pages/goods_detail/index.js
// 轮播图预览大图
// 给轮播图绑定点击事件
// 调用小程序的api

// 加入购物车功能
// 绑定事件
// 使用缓存处理数据保存
// 判断商品是否存在于购物车中
// 已经存在的话要增加数量，再将新的数据填回到缓存中
// 第一次添加就直接给购物车数组添加一个新元素的，更新缓存
// 弹出提示

/*
  商品收藏
    页面onshow的时候加载缓存中的收藏列表
    判断当前商品是否被收藏
      如果是就改变图标，不是就不操作
    点击收藏按钮进行收藏
      判断该商品是否在数组中
      已经存在就删除
      如果没有就添加
*/

import {request} from "../../request/index/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {},
    isCollect: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  onShow(){
    let pages =  getCurrentPages();
    let currentPage = pages[pages.length - 1]
    let options = currentPage.options

    const {goods_id} = options
    this.getGoodsDetail(goods_id)

    
  },

  // 获取商品的详情数据
  async getGoodsDetail(goods_id){
    const goodsObj = await request({url: "/goods/detail", data:{goods_id}})

    // 拿到缓存中的商品收藏
    let collect = wx.getStorageSync("collect") || [];
    // 判断当前的商品是否被收藏了
    let isCollect = collect.some(v=>v.goods_id === goodsObj.goods_id)

    this.setData({
      goodsObj:{
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        // iphone部分机型不是被webp格式图片
        // 最好找后台修改
        // 实在不行自己修改 前提是确保后台有其他格式图片
        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: goodsObj.pics,
        goods_id: goodsObj.goods_id,
        goods_small_logo: goodsObj.goods_small_logo
      },
      isCollect
    })
  },

  // 点击轮播图放大预览
  handlePreImg(e){
    // 先构造要预览的图片数组
    const urls = this.data.goodsObj.pics.map(v=>v.pics_mid)
    // 接受传递过来的url
    const currentIndex = e.currentTarget.dataset.index
    wx.previewImage({
      current: urls[currentIndex],
      urls
    });
  },

  // 点击加入购物车
  handleCartAdd(e){
    // 获取缓存中的购物车数组
    let cart = wx.getStorageSync("cart") || [];
    // 判断商品是否在购物车中
    let index = cart.findIndex(v=>v.goods_id===this.data.goodsObj.goods_id)
    console.log(this.data.goodsObj.goods_id)
    if(index === -1){
      // 第一次添加
      this.data.goodsObj.num = 1
      this.data.goodsObj.checked = true
      cart.push(this.data.goodsObj)
    } else {
      // 已经存在，执行数量增加
      cart[index].num++
    }

    // 更新缓存
    wx.setStorageSync("cart", cart);

    // 弹窗
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      duration: 600,
      mask: true,
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },

  // 点击商品收藏
  handleCollect() {
    let isCollect = false
    // 获取缓存中的商品收藏数组
    let collect = wx.getStorageSync("collect") || []
    // 判断商品是否被收藏
    let index = collect.findIndex(v=>v.goods_id === this.data.goodsObj.goods_id)
    if(index !== -1){
      // 已经收藏 删除
      collect.splice(index, 1)
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        duration: 500,
        mask: true
      });
      isCollect = false
    } else {
      // 没有收藏
      collect.push(this.data.goodsObj)
      isCollect = true
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        duration: 500,
        mask: true
      });
    }

    // 把数组存入缓存中
    wx.setStorageSync('collect', collect)
    // 修改data中的属性
    this.setData({
      isCollect
    })
  }
})