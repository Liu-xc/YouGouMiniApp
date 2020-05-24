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

// Promise形式的弹窗
export const showMoal = (content)=>{
  return new Promise((resolve, reject)=>{
    wx.showModal({
        title: '提示',
        content: content,
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success: (res) => {
          resolve(res)
        },
        fail: (err)=>{
          reject(err)
        }
      });
  })
}

// Promise形式的提示
export const showToast = (text)=>{
  wx.showToast({
    title: text,
    icon: 'none',
    image: '',
    duration: 500,
    mask: true,
    success: (res)=>{
      resolve(res)
    }
  });
}