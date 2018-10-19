<template>
  <div class="deatils">
    <csheader class="head">消息详情</csheader>
    <div class="con">
      <div class="title">{{message.fileTitle}}</div>
      <div class="label">{{message.content}}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import csheader from '@/components/header'
import {usersReadMessage} from '@/api/message'
export default {
  computed: {
    ...mapGetters(['message'])
  },
  created () {
    console.log(this.message)
  },
  mounted () {
    usersReadMessage(this.message.id).then(res => {
      if (res.code === 1) {
        // console.log(res, '读取成功')
        // let idx = this.list.indexOf(item)
        // item.status = 1
      }
    })
  },
  components: {
    csheader
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
.head {
  text-align: center;
  font-size: 17px;
}
.con{
  padding-top: 15px;
  background-color: #fff;
}
.title{
    font-size: 14px;
    padding: 0 15px;
  }
  .label{
    line-height: 18px;
    padding: 15px;
    color: @gray;
  }
</style>
