<template>
  <div class="connent">
    <csheader>意见提交</csheader>
    <div style="padding: 15px">
      <div class="box">
        <textarea v-model="ideaString" class="textarea" placeholder="写下你对城宿租房建议或期待" maxlength="200" @input="changeTxt"></textarea>
        <div class="num">{{num}}/{{total}}</div>
      </div>
      <Button type="primary" class="btn" style="margin-top: 20px" @click.native="submit">提交</Button>
    </div>
  </div>
</template>

<script>
import { Button, Toast } from 'mint-ui'
import csheader from '@/components/header'
import {saveSysFeedback} from '@/api/user'
export default {
  data () {
    return {
      ideaString: '',
      total: 200,
      num: 0
    }
  },
  methods: {
    submit () {
      console.log(this.ideaString)
      saveSysFeedback(this.ideaString).then(res => {
        console.log(res)
        if (res.code === 1) {
          Toast('提交成功')
          this.ideaString = ''
        } else {
          Toast(res.msg)
        }
      })
    },
    changeTxt () {
      this.num = this.ideaString.length
      if (this.num >= this.total) {
        this.ideaString.substring(0, 200)
      }
      console.log(this.ideaString.length)
    }
  },
  components: {
    Button, csheader
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
.connent{
  .textarea{
    width: 100%;
    height: 200px;
    background-color: #ffffff;
    border-radius: 6px;
    border:1px solid #f1f1f1;
    outline: none;
    padding: 15px;
    &::placeholder{
      color: @gray;
    }
  }
  .btn{
    width: 100%;
    background-color: @themeColor;
  }
  .box {
    position: relative;
    .num {
      position: absolute;
      right: 10px;
      bottom: 10px;
    }
  }
}
</style>
