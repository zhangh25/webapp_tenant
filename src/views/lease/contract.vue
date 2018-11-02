<template>
  <div>
    <csheader>
      <div class="t">查看合同</div>

    </csheader>
    <div class="content">
      <div class="box" v-for="(item, i) in list" :key="i" @click="detail(item)">
        <div class="wrapper">
          <img src="./icon/icon_qianyuehetong@2x.png" width="36" alt="">
        </div>
        <div class="txt">签约合同</div>
      </div>
      <div class="box" v-if="list.length===0" @click="detail(null)">
        <div class="wrapper">
          <img src="./icon/icon_qianyuehetong@2x.png" width="36" alt="">
        </div>
        <div class="txt">签约合同</div>
      </div>
      <div class="box" @click="alert('暂无续租合同')">
        <div class="wrapper">
          <img src="./icon/icon_xuzuhetong@2x.png" width="36" alt="">
        </div>
        <div class="txt">续租合同</div>
      </div>
    </div>
  </div>
</template>

<script>
import csheader from '@/components/header'
import {userLeaseViews} from '@/api/appoint'
import {Toast} from 'mint-ui'
export default {
  data () {
    return {
      list: [],
      toast: null
    }
  },
  mounted () {
    userLeaseViews().then(res => {
      // console.log(res)
      if (res.code === 1) {
        this.list = res.data
      }
    })
  },
  methods: {
    detail (item) {
      if (!item) {
        this.alert('暂无签约合同')
      } else if (item.licenceType === 1) {
        // this.$router.replace(item.pactReviewUrl)
        window.location.href = item.pactReviewUrl
      } else if (item.licenceType === 2) {
        this.$store.dispatch('setlicence', item.licences)
        this.$router.push('/contdetail')
      } else {

      }
    },
    alert (str) {
      if (this.toast) {
        this.toast.close()
      }
      this.toast = Toast(str)
    }
  },
  components: {
    csheader
  }
}
</script>

<style lang="less" scoped>
.box {
  float: left;
  margin-left: 20px;
  margin-top: 20px;
  text-align: center;
  .wrapper {
    width: 83px;
    height: 83px;
    background-color: #ffffff;
    box-shadow: 0px 3.5px 4px 0px rgba(226, 226, 226, 0.32);
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      // vertical-align: middle;
    }

  }.txt {
      padding-top: 20px;
    }
}
</style>
