<template>
  <div>
    <csheader>查看合同</csheader>
    <div class="content">
      <img v-for="item in licence" :src="item" :key="item" alt="">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import csheader from '@/components/header'
export default {
  computed: {
    ...mapGetters(['licence'])
  },
  components: {
    csheader
  }
}
</script>

<style lang="less" scoped>
.content {
  padding: 0 15px;
  img {
    width: 100%;
  }
}
</style>
