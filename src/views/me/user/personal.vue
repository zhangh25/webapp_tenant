<template>
  <div class="personal">
    <Field class="head">
      <div class="flex">
        <div class="headImg"><div class="box"><img v-if="userInfo.imageurl" width="60" height="60"><i v-else class="bg"></i></div></div>
        <div class="btn">修改头像</div>
      </div>
    </Field>
    <Field label="昵称" placeholder="" v-model="userInfo.nickname" disableClear></Field>
    <Field label="性别" placeholder="" v-model="sex" disableClear></Field>
    <Field label="手机号" placeholder="" v-model="userInfo.phone" disableClear></Field>
  </div>
</template>

<script>
import {Field} from 'mint-ui'
import {getUserInfo, updateCsUsers} from '@/api/user'
export default {
  data () {
    return {
      userInfo: {
        nickname: ''
      },
      sex: ''
    }
  },
  created () {
    this._getUserInfo()
  },
  computed: {
    mysex (val) {
      let value = ''
      switch (val) {
        case 1:
          value = '男'
          break
        case 2:
          value = '女'
          break
        default:
          value = '保密'
          break
      }
      return value
    }
  },
  methods: {
    _getUserInfo () {
      getUserInfo().then(res => {
        console.log(res)
        if (res.code === 1) {
          this.userInfo = res.data
          this.setSex()
        }
      })
    },
    _updateCsUsers () {
      updateCsUsers(this.userInfo).then(res => {})
    },
    setSex () {
      let value = ''
      switch (this.userInfo.sex) {
        case 1:
          value = '男'
          break
        case 2:
          value = '女'
          break
        default:
          value = '保密'
          break
      }
      this.sex = value
    }
  },
  components: {
    Field
  }
}
</script>

<style lang="less" scoped>
.personal {
  .box{
    float: left;
    width: 60px;
    height: 60px;
    overflow: hidden;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 0px 4px 16px 0px rgba(232, 232, 232, 0.61);
    text-align: center;
    img{
      width: 100%;
      height: 100%;
    }
    .bg{
      display: inline-block;
      width: 34px;
      height: 50px;
      background-image: url(../img/icon_logo@2x.png);
      background-size: contain;
      background-repeat: no-repeat;
      margin-top: 7px;
    }
  }
  .flex{
    display: flex;
    .headImg{
      margin-top: 50px;
      flex: 0 0 105px;
      margin-bottom: 15px;
    }
    .btn{
      flex: 1;
      margin-top: 50px;
      padding-top: 20px;
      font-size: 14px;
      color: #848484;
    }
  }
}
</style>
