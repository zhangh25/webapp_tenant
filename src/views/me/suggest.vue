<template>
  <div class="connent">
    <textarea v-model="ideaString" class="textarea" placeholder="写下你对城宿租房建议或期待"></textarea>
    <Button type="primary" class="btn" style="margin-top: 20px" @click.native="submit">提交</Button>
  </div>
</template>

<script>
import { Button, Toast } from 'mint-ui'
import {saveSysFeedback} from '@/api/user'
export default {
  data () {
    return {
      ideaString: ''
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
    }
  },
  components: {
    Button
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
.connent{
  padding: 15px;
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
}
</style>
