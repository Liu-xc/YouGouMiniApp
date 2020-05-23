export const request = (params)=>{
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
      }
    })
  })
}