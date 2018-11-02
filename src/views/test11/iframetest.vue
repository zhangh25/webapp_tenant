<template>
  <div>
    <iframe src="http://tool.chinaz.com/pagestatus/" frameborder="0" name="hetong" class="iframe" ref="iframe" @change="ichange"></iframe>
  </div>
</template>

<script>
export default {
  mounted () {
    this.$refs.iframe.onload = function () {
      console.log('load')
    }
  },
  methods: {
    ichange () {
      console.log('change')
    }
  }
}
</script>

<style lang="less" scoped>
.iframe {
  position: fixed;
  width: 100%;
  height: 100%;
}
</style>
