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
  5 全选实现
    获取到缓存中的购物车数组
    根据购物车中的商品数据进行计算
  6 总价格、总数量
    都需要商品呗选中才计算
    获取购物车数组
    遍历
    判断商品是否被选中
    总价格 += 商品单价 * 商品数量
    总数量 += 商品的数量
    把总价和数量设置回data
  7 商品选中功能
    绑定change事件
    获取被修改的商品对象
    商品的选中状态取反
    重新填充回data和缓存中
    重新计算全选，总价，数量
  8 全选和反选功能
    全选的复选框绑定事件
    获取data中的全选状态
    直接取反
    遍历购物车数组让里面的商品的选中状态更新
    把购物车数组和选中状态全都设置回data中和缓存中
  9 商品数量编辑
    商品数量的编辑功能
    + - 按钮绑定点击事件
    当数量为1时用户还要点击减号就弹窗询问用户是否删除
    传递被点击的商品的id
    获取data中的购物车数组  获取需要被修改的商品对象
    修改商品的数量属性
    把cart属性重新设置回缓存和data中
  10 点击结算
    判断有没有收货地址
    判断有没有选中商品
    经过以上验证就跳转到支付页面
*/
import {getSetting, chooseAddress, openSetting, showMoal, showToast} from "../../utils/asyncWx.js"

Page({
  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },

  onShow(){
    // 获取缓存中的收货地址信息
    const address = wx.getStorageSync("address");
    // 获取缓存中的购物车数据
    const cart = wx.getStorageSync("cart") || [];
    // 计算全选
    // 空数组调用every的返回值为true
    // const allChecked = cart.length === 0 ? cart.every(v=>v.checked) : false
    this.setCart(cart)
    this.setData({
      address
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
  /*获取权限状态
  wx.getSetting({
    success: (result)=>{
      // 获取权限状态
      const scopeAddress = result.authSetting["scope.address"]
      if(scopeAddress === true || scopeAddress === undefined){
        wx.chooseAddress({
          success: (res1)=>{
            console.log(res1);
          }
        });
      } else {
        // 用户曾经拒绝过授予权限 要引导用户打开权限
        wx.openSetting({
          success: (res2)=>{
            // 可以调用获取收获地址
            wx.chooseAddress({
              success: (res3)=>{
                console.log(res3);
              }
            });
          }
        });
      }
    },
    fail: ()=>{},
    complete: ()=>{}
  });*/
  },
  handleItemChange(e){
    // 获取被修改的商品的id
    const goods_id = e.currentTarget.dataset.id
    let {cart} = this.data
    // 找到被修改的商品对象
    let index = cart.findIndex(v=>v.goods_id == goods_id)
    // 选中状态取反
    cart[index].checked = !cart[index].checked
    // 把购物车数据重新设置回data和缓存中
    this.setData({
      cart
    })
    this.setCart(cart)
  },
  // 设置购物车状态，同时重新计算底部工具栏的数据
  setCart(cart){
    let allChecked = true
    let totalPrice = 0;
    let totalNum = 0
    cart.forEach(v=>{
      if(v.checked){
        totalPrice += v.goods_price * v.num
        totalNum += v.num
      } else {
        allChecked = false
      }
    })
    // 判断数组是否为空
    allChecked = cart.length !== 0 ? allChecked: false
      this.setData({
        cart,
        totalNum,
        totalPrice,
        allChecked
      })
    wx.setStorageSync("cart", cart);
  },
  // 全选按钮点击事件
  handleItemAllCheck(){
    // 获取data中的数据
    let {cart, allChecked} = this.data
    // 修改值
    allChecked = !allChecked
    // 更新商品选中状态
    cart.forEach(v=>v.checked=allChecked)
    // 数据放回
    this.setCart(cart)
  },
  // 商品数量的编辑功能
  async handleItemNumEdit(e){
    // 获取事件传递来的参数
    const {operation, id} = e.currentTarget.dataset
    // 获取购物车数组
    let {cart} = this.data
    // 找到需要被修改的商品索引
    const index = cart.findIndex(v=>v.goods_id===id)
    // 修改数量
    // 修改之前要判断是否执行删除操作
    if(cart[index].num===1 && operation===-1){
      // 弹窗提示
      const res = await showMoal("是否要从购物车中移除该商品")
      if(res.confirm){
        cart.splice(index, 1)
        this.setCart(cart)
      }
    }else{
      cart[index].num += operation
      // 放回数据
      this.setCart(cart)
    }
    
  },

  // 点击结算
  async handlePay(){
    // 判断是否有收货地址
    const {address, totalNum} = this.data
    if(!address.userName){
      await showToast("您还未选择收货地址")
      return
    }
    // 判断用户有没有选购商品
    if(!totalNum){
      await showToast("您还没有选择商品")
      return
    }
    // 跳转到支付页面
    wx.navigateTo({
      url: '/pages/pay/index'
    });
  }

  }
)