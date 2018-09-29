<template>
  <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
    <Loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
        <ul class="page-loadmore-list">
          <li v-for="item in list" class="page-loadmore-listitem" :key="item">{{ item }}</li>
        </ul>
        <div slot="bottom" class="mint-loadmore-bottom">
          <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
          <span v-show="bottomStatus === 'loading'">
            <Spinner type="snake"></Spinner>
          </span>
        </div>
      </Loadmore>
  </div>
</template>

<script>
import {Loadmore, Spinner} from 'mint-ui'
export default {
  components: {
    Loadmore, Spinner
  },
  data () {
    return {
      list: [],
      allLoaded: false,
      bottomStatus: '',
      wrapperHeight: 0
    }
  },
  methods: {
    handleBottomChange (status) {
      this.bottomStatus = status
    },
    loadBottom () {
      setTimeout(() => {
        let lastValue = this.list[this.list.length - 1]
        if (lastValue < 40) {
          for (let i = 1; i <= 10; i++) {
            this.list.push(lastValue + i)
          }
        } else {
          this.allLoaded = true
        }
        this.$refs.loadmore.onBottomLoaded()
      }, 1500)
    }
  },
  created () {
    console.log('ddd')
    for (let i = 1; i <= 20; i++) {
      this.list.push(i)
    }
  },
  mounted () {
    this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top
    console.log(this.wrapperHeight)
  }
}
</script>

<style lang="less" scoped>
ul {
  padding: 0;
  margin: 0;
  li{
    list-style-type: none;
  }
}
.page-loadmore-listitem{
  height: 50px;
  line-height: 50px;
  border-bottom: solid 1px #eee;
  text-align: center;
  &:first-child {
    border-top: solid 1px #eee;
  }
}
.page-loadmore-wrapper {
  overflow: scroll;
}
.mint-loadmore-bottom {
    span {
      display: inline-block;
      transition: .2s linear;
      vertical-align: middle;
      .is-rotate {
        transform: rotate(180deg);
      }
    }
  }
</style>
