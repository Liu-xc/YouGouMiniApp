// pages/cart/index.js
/*
  1 获取用户收货地址
    1 绑定点击事件
    2 使用微信内置api
  2 获取用户对小程序授予的获取地址权限状态 authSetting scope
    1 假设用户点击收货地址的提示框确定
      scope的值位true 直接调用获取地址
    2 假设用户点击了取消
      scope的值为false
      1 诱导用户自己打开授权设置
      2 获取收获地址
    3 假设用户从来没有调用过这个api
      scope值为undefined 直接调用获取地址
  3 页面加载完毕
   0 onload onshow
   1 获取本地存储中的数据
   2 把数据设置给data中的一个变量
  4 onshow
    1 获取缓存中的购物车数组
    2 把购物车数据填充到data中
*/
import {getSetting, chooseAddress, openSetting} from "../../utils/asyncWx.js"

Page({
  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: []
  },

  onShow(){
    // 获取缓存中的收货地址信息
    const address = wx.getStorageSync("address");
    // 获取缓存中的购物车数据
    const cart = wx.getStorageSync("cart");

    // 给data赋值
    this.setData({
      address,
      cart
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  
    // 点击获取收货地址
    async handleChooseAddress(){
      try {
        // 获取权限状态
        const res1 = await getSetting()
        const scopeAddress = res1.authSetting["scope.address"]
        // 判断权限状态
        if(scopeAddress === false){
          // 引导用户打开设置
          await openSetting()
        }
        // 调用获取收货地址的api
        const address = await chooseAddress()
        address.all = address.provinceName+address.cityName+address.countyName+address.detailInfo
        // 存入缓存
        wx.setStorageSync("address", address);
      } catch (error) {
        console.log(error)
      }
    }

    // 获取权限状态
    // wx.getSetting({
    //   success: (result)=>{
    //     // 获取权限状态
    //     const scopeAddress = result.authSetting["scope.address"]
    //     if(scopeAddress === true || scopeAddress === undefined){
    //       wx.chooseAddress({
    //         success: (res1)=>{
    //           console.log(res1);
    //         }
    //       });
    //     } else {
    //       // 用户曾经拒绝过授予权限 要引导用户打开权限
    //       wx.openSetting({
    //         success: (res2)=>{
    //           // 可以调用获取收获地址
    //           wx.chooseAddress({
    //             success: (res3)=>{
    //               console.log(res3);
    //             }
    //           });
    //         }
    //       });
    //     }
    //   },
    //   fail: ()=>{},
    //   complete: ()=>{}
    // });
  }
)