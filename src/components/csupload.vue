<template>
<div>
  <input ref="upload" id="upload" type="file" class="realfilebt" style="display: none;">
  <Actionsheet :actions="photoActions" v-model="photoVisible" :font-size="14"></Actionsheet>
  <crop :visible.sync="cropVisible" :imgurl="imgurl" @ok="sure" :fixedNumber="[3,2]"></crop>
  </div>
</template>

<script>
// import {getQiniuToken} from '@/api/user'
import axios from 'axios'
import {Actionsheet, Indicator} from 'mint-ui'
import crop from 'components/crop'
// import {} from '@/api/' headers:{'Content-Type':'multipart/form-data'}
const axiosInstance = axios.create({
  'Content-Type': 'multipart/form-data'
})

export default {
  data () {
    return {
      token: '',
      photoActions: [],
      photoVisible: false,
      cropVisible: false,
      imgurl: ''
    }
  },
  created () {
    this.photoActions = [{
      name: '拍照',
      method: this.takePhoto
    }, {
      name: '相册',
      method: this.openAlbum
    }]
  },
  mounted () {
    const self = this
    // getQiniuToken().then(res => {
    //   if (res.code === 1) {
    //     console.log(res)
    //     this.token = res.data
    //   }
    // })
    // console.log('dddd')
    this.$store.dispatch('getQiniuToken').then(token => {
      this.token = token
      // console.log(token)
    })
    this.$refs.upload.addEventListener('change', function () {
      console.log(this.files)
      self.uploadImg(this.files[0])
    })
  },
  methods: {
    upload () {
      if (navigator.camera) {
        this.photoVisible = true
      } else {
        this.$refs.upload.click()
      }
    },
    uploadImg (file) {
      let self = this
      var data = new FormData()
      // if (!self.token) return
      console.log('token', self.token)
      data.append('token', self.token)
      data.append('file', file)
      // data.
      Indicator.open()
      axiosInstance({
        method: 'POST',
        // url: 'https://img.chengsu.vip/',
        url: 'http://upload-z2.qiniup.com/',
        data: data,
        onUploadProgress: function (progressEvent) {
          // var percentCompleted = Math.round(progressEvent.loaded * 100 / progressEvent.total)
          console.log(progressEvent)
          // 对应上传进度条
          // self.progress = percentCompleted
        }
      }).then(function (res) {
        console.log(res)
        Indicator.close()
        self.$emit('changeFile', {code: 1, url: `https://img.chengsu.vip/${res.data.key}`})
      })
        .catch(function (err) {
          self.$emit('changeFile', {code: 0})
          console.log('err', err)
          Indicator.close()
        })
    },
    sure (file) {
      this.uploadImg(file)
    },
    takePhoto () {
      /* eslint-disable */
      this.openCamera(Camera.PictureSourceType.Camera)
    },
    openAlbum () {
      /* eslint-disable */
      this.openCamera(Camera.PictureSourceType.SAVEDPHOTOALBUM)
    },
    openCamera (type) {
      this.photoVisible = false
      let _this = this
      /* eslint-disable */ 
      navigator.camera.getPicture(imageurl => {
        this.imgurl = imageurl
        this.cropVisible = true
        // getImgToBase64(imageurl, base64 => {
        //   this.testUrl = base64
          
        // })
      }, msg => {

      }, {
        quality: 50,                                            // 相片质量是50
        sourceType: type,            // 设置从摄像头拍照获取
        destinationType: Camera.DestinationType.FILE_URI,        // 以文件路径返回
        correctOrientation: true
      })
    }
  },
  components: {
    Actionsheet, crop
  }
}
</script>

<style>

</style>
