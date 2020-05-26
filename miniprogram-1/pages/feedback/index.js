// pages/feedback/index.js

import { showToast } from "../../utils/asyncWx"

/*
  点击按钮触发事件
    调用小程序内部的选择图片api
    获取图片的路径
    把图片路径都存入到data中
    页面根据图片数组进行循环显示自定义组件
  点击自定义图片组件
    获取被点击的元素的索引
    获取data中的图片数组
    根据索引删除对应的元素
    将数据放回
  用户点击提交按钮之后
    获取文本域的内容
      data中定义变量表示输入框内容
      文本域绑定输入事件，事件出发的时候把输入框的值存入到data
    对内容合法性验证
    通过验证就上传图片到服务器 返回图片的外网链接
      遍历图片数组
      挨个上传
      自己再来维护图片数组  存放上传后的外网的链接
    文本域和外网的图片路径一起提交到服务器 前端的模拟，并不真实发送
    清空当前页
    返回上一页

*/ 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "商品收藏",
        isActive: true
      },
      {
        id: 1,
        value: "品牌收藏",
        isActive: false
      },
      {
        id: 2,
        value: "店铺收藏",
        isActive: false
      },
      {
        id: 3,
        value: "浏览足迹",
        isActive: false
      }
    ],
    // 被选中的图片的路径数组
    chooseImgs:[],
    // 文本
    textValue: ''
  },

  // 外网的图片的路径数组
  UpLoadImgs: [],
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

  handleChooseImg(){
    // 调用内部api
    wx.chooseImage({
      // 同时选中的图片的数量
      count: 9,
      // 图片的格式
      sizeType: ['original','compressed'],
      // 图片的来源
      sourceType: ['album','camera'],
      success: (result)=>{
        this.setData({
          // 图片数组进行拼接
          chooseImgs: [...this.data.chooseImgs, ...result.tempFilePaths]
        })
      }
    });
  },

  handleRemoveImg(e){
    // 获取被点击的组件的索引
    const {index} = e.currentTarget.dataset
    // 获取data中的图片数组
    let {chooseImgs} = this.data
    // 删除元素
    chooseImgs.splice(index, 1)
    this.setData({
      chooseImgs
    })
  },

  handleTextInput(e){
    this.setData({
      textValue: e.detail.value
    })
  },

  handleFormSub(){
    // 获取文本域内容
    const {textValue, chooseImgs} = this.data
    // 合法验证
    if(!textValue.trim()){
      // 不合法
      wx.showToast({
        title: '输入不合法',
        icon: 'none',
        image: '',
        duration: 500,
        mask: true
      });
      return
    }
    // 上传图片到服务器
    // 不支持多文件同时上传  遍历数组上传
    chooseImgs.forEach((v,i)=>{
      wx.uploadFile({
      // 图片上传到哪里
      url: 'https://images.ac.cn/Home/Index/UploadAction/',
      // 被上传的文件的路径
      filePath: v,
      // 被上传的文件的名称 一般要和后台约定  file 可以自定义
      name: "file",
      // 上传的时候顺带的文本信息
      formData: {},
      success: (result)=>{
        let url = JSON.parse(result.data)
      }
    });
    })
    
  }
}) 