// pages/cart/index.js
/*
  1 从缓存中获取购物车数据 渲染到页面中
    这些数据的checked必须为true
  2 微信支付
    1 哪些人，哪些账号可以实现微信支付
      1 企业账号
      2 企业账号的小程序后台中必须给开发者添加白名单
        1 一个appID可以绑定多个开发者
*/

import {getSetting, chooseAddress, openSetting, showMoal, showToast} from "../../utils/asyncWx.js"

Page({
  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },

  onShow(){
    // 获取缓存中的收货地址信息
    const address = wx.getStorageSync("address");
    // 获取缓存中的购物车数据
    let cart = wx.getStorageSync("cart") || [];
    // 过滤后的购物车数组
    cart = cart.filter(v=>v.checked) 

    let totalPrice = 0;
    let totalNum = 0
    cart.forEach(v=>{
        totalPrice += v.goods_price * v.num
        totalNum += v.num
    })
    
    this.setData({
      cart,
      totalNum,
      totalPrice,
      address
    })
  }
  }
)