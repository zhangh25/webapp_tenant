<template>
  <div class="deatils">
    <csheader class="head">消息详情</csheader>
    <div class="con">
      <div class="title">{{message.fileTitle}}</div>
      <div class="label">{{message.content}}</div>
    </div>
    <div class="bottom" v-if="message.type !== 1">
      <Button type="primary" size="large" @click="gosee">前往查看</Button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import csheader from '@/components/header'
import {usersReadMessage} from '@/api/message'
import {Button} from 'mint-ui'
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
  methods: {
    gosee () {
      // switch()
      switch (this.message.type) {
        case 2:
          this.$router.push('/bill')
          break
        case 3:
          this.$router.push('/record')
          break
        case 4:
          this.$router.push('/leaseRecord')
          break
        default:
          break
      }
    }
  },
  components: {
    csheader, Button
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
.bottom {
  position: fixed;
  padding: 15px;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  border-top: 1px solid #f1f1f1;
}
</style>
