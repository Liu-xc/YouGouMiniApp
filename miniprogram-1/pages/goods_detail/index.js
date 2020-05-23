// pages/goods_detail/index.js
import {request} from "../../request/index/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id} = options
    this.getGoodsDetail(goods_id)
  },

  // 获取商品的详情数据
  async getGoodsDetail(goods_id){
    const goodsObj = await request({url: "/goods/detail", data:{goods_id}})
    this.setData({
      goodsObj:{
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        // iphone部分机型不是被webp格式图片
        // 最好找后台修改
        // 实在不行自己修改 前提是确保后台有其他格式图片
        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: goodsObj.pics
      }
    })
  }
})