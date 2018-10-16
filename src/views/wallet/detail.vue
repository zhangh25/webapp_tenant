<template>
  <div class="">
    <csheader>余额明细</csheader>
    <div class="nav">
      <div class="item" v-for="item in navTxt" :key="item.id" :class="{active: item.id==active}" @click="navClick(item.id)"><span class="txt">{{item.name}}</span></div>
    </div>
  </div>
</template>

<script>
import csheader from '@/components/header'
export default {
  data () {
    return {
      navTxt: [
        {name: '全部', id: 'one'},
        {name: '收入', id: 'two'},
        {name: '支付', id: 'three'}
      ],
      active: 'one'
    }
  },
  methods: {
    navClick (id) {
      this.active = id
    }
  },
  components: {
    csheader
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
.nav {
  display: flex;
  background-color: #fff;
  border-bottom: 1px solid #f1f1f1;
  .item {
    flex: 1;
    text-align: center;
    font-size: 14px;
    .txt{
      display: inline-block;
      height: 40px;
      line-height: 40px;
      padding: 0 10px;
      border-bottom: 2px solid transparent;
    }
    &.active {
      .txt {
        border-color: @themeColor;
      }
    }
  }
}
</style>
