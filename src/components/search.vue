<template>
  <div class="search">
    <div class="header">
      <div class="left"><input type="text" class="input" v-model="keyWord" placeholder="你想住哪儿" @keyup.enter="submit"></div> <div class="cancel" @click="cancel">取消</div>
    </div>
    <div class="item" >
      <div class="title">热门标签</div>
      <div class="list">
        <span v-for="(item, i) in tagList" :key="i" class="btn" @click="search(item)">{{item}}</span>
      </div>
    </div>
    <div class="item" style="border-top: 1px solid #e5e5e5" v-if="history.length>0">
      <div class="title">历史记录 <div class="clear" @click="clearHistory">清空</div> </div>
      <div class="list">
        <span v-for="(item, i) in reverseData" :key="i" class="btn" @click="search(item)">{{item}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['history']),
    reverseData () {
      let arr = this.history
      return arr.reverse()
    }
    // reverseData () {
    //   // return this.history.reverse()
    // }
  },
  data () {
    return {
      tagList: ['民治', '坂田', '杨美'],
      keyWord: ''
      // history: ['xx', 'sae']
    }
  },
  methods: {
    cancel () {
      this.$parent.$parent.searchVisible = false
      // if ()
      this.$router.go(-1)
    },
    search (val) {
      console.log(val)
      this.addHistory(val)
      // this.$emit('csearch', val)
      this.$store.dispatch('setCondition', {content: val})
      this.$router.push({
        path: '/list'
      })
      // this.$store.dispatch('addHistory', val)
    },
    submit () {
      // console.log(this.keyWord)
      this.search(this.keyWord)
    },
    addHistory (word) {
      this.$store.dispatch('addHistory', word)
    },
    clearHistory () {
      this.$store.dispatch('clearHistory')
    }
  }
}
</script>

<style lang="less" scoped>
@import '../styles/mixin.less';
.header{
  display: flex;
  padding: 15px;
  background-color: #fff;
  border: 1px solid #f1f1f1;
  .left{
    flex: 1;
    height: 30px;
    background-color: #fff;
    box-shadow: 0px 1px 10px 1px#eceaea;
    border-radius: 15px;
    border: 1px solid #eceaea;
    padding: 6px;
  }
  .input{
    width: 100%;
    border: none;
    outline: none;
    padding-left: 20px;
    // background-image: url(./icon/icon_sousuo@2x.png);
    // background-repeat: no-repeat;

  }
  .cancel{
    // flex: 0 0 60px;
    // width: 30px;
    line-height: 30px;
    text-align: center;
    padding-left: 15px;
  }

}
.item {
  padding: 15px;
  padding-right: 0;
  .title{
    color: @gray;
  }
  .list{
    .btn{
      display: inline-block;
      background-color: #fff;
      color: #393939;
      border-radius: 4px;
      padding: 7px 10px;
      margin-right: 15px;
      margin-top: 15px;
      // line-height: 18px;
    }
  }
  .clear{
    float: right;
    padding-right: 15px;
  }
}
</style>
