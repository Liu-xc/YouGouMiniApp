/*
  Promise形式的getSetting
*/
export const getSetting = ()=>{
  return new Promise((resolve, reject)=>{
    wx.getSetting({
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      }
    });
  })
}

/*
  Promise形式的chooseAddress
*/
export const chooseAddress = ()=>{
  return new Promise((resolve, reject)=>{
    wx.chooseAddress({
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      }
    });
  })
}

/*
  Promise形式的openSetting
*/
export const openSetting = ()=>{
  return new Promise((resolve, reject)=>{
    wx.openSetting({
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      }
    });
  })
}