<template>
  <div class="morefilter">
    <div class="box">
    <!-- <div>帅选</div> -->
      <div class="list">
        <div class="title">租金</div>
        <radio class="radio-list" v-model="filterData.rent" :valueData="rentList"></radio>
      </div>
      <div class="list">
        <div class="title">房源户型</div>
        <radio class="radio-list" v-model="filterData.houseType" :valueData="houseTypeList"></radio>
      </div>
      <div class="list">
        <div class="title">房源类型</div>
        <radio class="radio-list" v-model="filterData.menuResp" :valueData="menuRespList"></radio>
      </div>
      <div class="list">
        <div class="title">朝向</div>
        <radio class="radio-list" v-model="filterData.orientation" :valueData="orientationList"></radio>
      </div>
      <div class="list">
        <div class="title">房屋配置</div>
        <radio class="radio-list" v-model="filterData.configResp" :valueData="configRespList"></radio>
      </div>
      <div class="list">
        <div class="title">房源特色</div>
        <radio class="radio-list" v-model="filterData.hotTagResp" :valueData="hotTagRespList"></radio>
      </div>
    </div>
    <div class="bottom">
      <div class="reset" @click="resetClick">重置</div>
      <div class="confirm" @click="confirm">确定</div>
    </div>
  </div>
</template>

<script>
import {filterCondition} from '@/api/house'
import radio from 'components/csradio/index'
export default {
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    confirmFilter: {
      default: null,
      type: Function
    }
  },
  watch: {
    filterData: {
      handler (val, old) {
        console.log(val)
        this.$emit('input', val)
      },
      deep: true
    }
  },
  data () {
    return {
      rentList: [
        {id: 1, min: 0, max: 1000, name: '≤1000元'},
        {id: 2, min: 1000, max: 1500, name: '1000-1500元'},
        {id: 3, min: 1000, max: 1500, name: '1500-2000元'},
        {id: 4, min: 1000, max: 1500, name: '2000-3000元'},
        {id: 5, min: 1000, max: 1500, name: '3000-5000元'},
        {id: 6, min: 1000, max: 1500, name: '5000-8000元'},
        {id: 7, min: 1000, max: 1500, name: '≥8000元'}
      ],
      configRespList: [], // 房间配置
      hotTagRespList: [], // 房间特色
      houseTypeList: [], // 户型
      menuRespList: [], // 房产类型
      orientationList: [], // 朝向
      filterData: {}
    }
  },
  created () {
    this.filterData = this.value
    this._filterCondition()
  },
  methods: {
    resetClick () {
      this.filterData.rent = {}
      this.filterData.configResp = {}
      this.filterData.hotTagResp = {}
      this.filterData.houseType = {}
      this.filterData.menuResp = {}
      this.filterData.orientation = {}
    },
    confirm () {
      console.log('ddd')
      // this.$emit('confirmFilter')

      if (this.confirmFilter) {
        this.confirmFilter()
      }
    },
    _filterCondition () {
      filterCondition().then(res => {
        console.log(res)
        if (res.code === 1) {
          this.configRespList = res.data.configRespList
          this.hotTagRespList = res.data.hotTagRespList
          this.houseTypeList = res.data.houseTypeList
          this.menuRespList = res.data.menuRespList
          this.orientationList = res.data.orientationList
        }
      })
    }
  },
  components: {
    radio
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
.morefilter {
    padding-bottom: 40px;
    .box {
      height: 340px;
      overflow-y: scroll;
    }
    .radio-list{
      padding: 10px;
    }
    .title {
      font-size: 14px;
      text-align: center;
      line-height: 24px;
      // padding: 10px;
    }
    .bottom{
      position: absolute;
      bottom: 0;
      width: 100%;
      display: flex;
      text-align: center;
      font-size: 15px;
      height: 40px;
      line-height: 40px;
      .reset{
        flex: 1;
        background-color: #f8f8f8;
      }
      .confirm{
        flex: 1;
        background-color: @themeColor;
        color: #fff;
      }
    }
  }
</style>
