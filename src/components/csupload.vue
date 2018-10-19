<template>
  <input ref="upload" id="upload" type="file" class="realfilebt" style="display: none;">
</template>

<script>
// import {getQiniuToken} from '@/api/user'
import axios from 'axios'
// import {} from '@/api/' headers:{'Content-Type':'multipart/form-data'}
const axiosInstance = axios.create({
  'Content-Type': 'multipart/form-data'
})
export default {
  data () {
    return {
      token: ''
    }
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
      var data = new FormData()
      // if (!self.token) return
      console.log('token', self.token)
      data.append('token', self.token)
      data.append('file', this.files[0])
      // data.
      axiosInstance({
        method: 'POST',
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
        self.$emit('changeFile', {code: 1, url: `http://pba3kbxrz.bkt.clouddn.com/${res.data.key}`})
      })
        .catch(function (err) {
          self.$emit('changeFile', {code: 0})
          console.log('err', err)
        })
    })
  },
  methods: {
    upload () {
      this.$refs.upload.click()
    }
  }
}
</script>

<style>

</style>
