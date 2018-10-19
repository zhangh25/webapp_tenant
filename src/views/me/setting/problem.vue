<template>
  <div style="padding-top: 44px">
    <csheader>常见问题</csheader>
    <div class="proplem">
      <div v-for="(item, i) in faq" :key="i" class="list">
        <div class="title">{{item.title}}</div>
        <div class="content">{{item.content}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import csheader from '@/components/header'
export default {
  data () {
    return {
      faq: [
        {
          title: 'Q : 你们租房的房源都是真实的吗？',
          content: 'A : 城宿租房上的房源大部分都是由品牌公寓或小区物业发布的，这类房源都有认证标签,100%真实可靠。为了给用户提供更多的选择,城宿租房也允许个人房东免费发布房源。个人房源都会由人工审核,并通过大数据对发布人身份进行筛查,经举报发布虚假信息的发布人将会被永久封号。'
        },
        {
          title: 'Q : 请问预约看房的流程是怎么样的？',
          content: 'A : 在房源页点击预约看房，选择房型与时间后,预约信息会被推送给公寓、物业管理员或房东。对方会尽快与您联系，确认看房时间后,按约定的时间去看房就可以。预约后关注城宿网微信公众号可以查看公寓、物管理员或房东联系方式，并实时接收预约确认通知，点击预约通知或房源页的地图链接，还可以直接导航。预约和看房的过程中有任何问题，都可以拨打服务热线(0755-82462229)与我们的客服联系。'
        },
        {
          title: 'Q : 请问通过你们城宿租房会收取中介费吗？',
          content: 'A : 城宿租房不会向租客收取任何费用。公寓和写字楼房源基本上都是免佣金的，由物业发布的房源，物业可能会向租客收取服务费，请在预约后与物业管理员确认。'
        },
        {
          title: 'Q : 请问城宿租房和其它租房的房源有什么区别？',
          content: 'A :“城宿租房”App改变了住房租赁方式，引领移动互联网时代现代化租赁方式。“城宿”的诞生更是改变了传统住房信息服务市场格局，颠覆了付费才能获取房源信息的概念，利用移动互联网特点，将租客大数据与房源大数据相融合，从房源大数据到租客大数据，画出一个紧密相连的O2O完美闭环，最大限度优化房源与客源的交互体验，改变了传统的信息对流方式，节约用户沟通成本，降低房源空置率。'
        }
      ]
    }
  },
  components: {
    csheader
  }
}
</script>

<style lang="less" scoped>
@import '../../../styles/mixin.less';
.proplem{
  padding: 0 15px;
}
.list{
  padding-top: 30px;
  .title{
    font-size: 15px;
    color: @themeColor;
  }
  .content{
    font-size: 15px;
    padding-top: 15px;
    line-height: 24px;
  }
}
</style>
