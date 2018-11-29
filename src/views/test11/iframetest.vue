<template>
  <div>
    <div class="">eee</div>
    <button @click="open">open</button>
    <img :src="testUrl" alt="">
    <!-- <corp  :img="imgurl" :clipper-img-width="250" :clipper-img-height="250" @cancel="cancel" @ok="sure"></corp> -->
    <input type="file" @change="fileChange">
    <corp :visible.sync="visible" :imgurl="imgurl" @ok="sure"></corp>
      <button @click="finish">确定</button>
      <div>111{{url}}</div>
    <!-- <button @click="">相机</button> -->
    <!-- <iframe src="http://tool.chinaz.com/pagestatus/" frameborder="0" name="hetong" class="iframe" ref="iframe" @change="ichange"></iframe> -->
  </div>
</template>

<script>
import corp from 'components/crop'
// console.log(vueCropper)
// console.log(corp)
export default {

  data () {
    return {
      testUrl: '',
      visible: false,
      imgurl: '',
      option: {
        img: '',
        size: 1,
        full: false,
        outputType: 'png',
        canMove: true,
        fixedBox: true,
        original: false,
        canMoveBox: true,
        centerBox: true,
        autoCrop: true
      },
      previews: {},
      url: ''
    }
  },
  mounted () {
    // this.$refs.iframe.onload = function () {
    //   console.log('load')
    // }
    const appid = 'wx388ad7a1a03663df'
    const url = window.location.href
    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${url}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`
  },
  methods: {
    ichange () {
      console.log('change')
    },
    open () {
      /* eslint-disable */ 
      navigator.camera.getPicture(imageurl => {
        this.imgurl = imageurl
        this.visible = true
        // this.option.img = imageurl
        
      }, msg => {

      }, {
        quality: 50,                                            // 相片质量是50
        // sourceType: Camera.PictureSourceType.PHOTOLIBRARY,            // 设置从摄像头拍照获取
        destinationType: Camera.DestinationType.FILE_URI,        // 以文件路径返回
        correctOrientation: true
      })
      // window.location.href = 'http://yokoo.free.idcfengye.com/link/sign/redirect'
      /* eslint-disable */ 
      // let ref = cordova.InAppBrowser.open('http://yokoo.free.idcfengye.com/link/sign/redirect', '_blank', 'location=no')
      // ref.addEventListener('loadstart', function (ev) {
      //   alert(ev.url)
      //   // ref.executeScript({file: "myscript.js"});
      // })
    },
    fileChange (e) {
      this.visible = true
      let file = e.target.files[0]
      var reader = new FileReader()
				reader.onload = (e) => {
					let data
					if (typeof e.target.result === 'object') {
						// 把Array Buffer转化为blob 如果是base64不需要
						data = window.URL.createObjectURL(new Blob([e.target.result]))
					} else {
						data = e.target.result
          }
          this.imgurl = data
        }
        
        reader.readAsArrayBuffer(file)
    },
    sure (dataurl) {
      // alert(dataurl)
      this.testUrl = window.URL.createObjectURL(dataurl)
      // this.visible = false
    },
    cancel () {
      this.visible = false
    },
    realTime (data) {
      this.previews = data
    },
    finish () {
      this.$refs.cropper.getCropData((data) => {
        this.visible = false
						this.testUrl = data
					})
    }
  },
  components: {corp}
}
</script>

<style lang="less" scoped>
.crop {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  .top {
    display: flex;
    height: 44px;
    line-height: 44px;
    width: 100%;
    text-align: center;
    .btn{
      flex: 1;
    }
  }
  .v-corp {
    height: calc(100vh - 44px);
  }
}

</style>
