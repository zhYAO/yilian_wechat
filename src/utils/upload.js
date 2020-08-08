import Taro from '@tarojs/taro'
import { showModal, showToast } from '@crossplatform/apiservice/toast'

const url = `http://106.54.202.8:8080/e-link-api`

export const doUpload = (type = 'company') => {
  return new Promise(resolve => {
    Taro.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera']
    }).then(res => {
      const path = res.tempFilePaths[0]
      showToast({
        icon: 'loading',
        title: '正在上传'
      })
      Taro.uploadFile({
        url: url + '/upload/image',
        filePath: path,
        name: 'image',
        header: { 'Content-Type': 'multipart/form-data' },
        formData: {
          type
        }
      })
        .then(data => {
          if (data.statusCode != 200) {
            showModal({
              title: '提示',
              content: '上传失败',
              showCancel: false
            })
            resolve({ status: false })
          } else {
            showToast({
              title: '上传成功！'
            })
            const res = JSON.parse(data.data)
            let imageUrl = res && res.data
            resolve({ status: true, url: imageUrl })
          }
        })
        .catch(ex => {
          showToast({
            title: '上传失败！'
          })
        })
    })
  })
}
