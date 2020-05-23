// 同时发送异步请求的个数
let ajaxTimes = 0

export const request = (params)=>{
  ajaxTimes++
  // 显示加载效果
  wx.showLoading({
    title: "正在加载",
    mask: true
  });

  // 定义公共的url
  const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
  return new Promise((reslove, reject)=>{
    wx.request({
      ...params,
      url: baseUrl + params.url,
      success: (result)=>{
        reslove(result.data.message)
      },
      fail: (err)=>{
        reject(err)
      },
      complete: ()=>{
        ajaxTimes--
        if(ajaxTimes === 0) {
          wx.hideLoading();
        }
      }
    })
  })
}