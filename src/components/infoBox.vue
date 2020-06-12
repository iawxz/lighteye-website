<template>
  <!-- 相关信息盒子 -->
  <div class="info_box">
    <!-- 相关工具 -->
    <div class="info_tools">
      <div class="info_order" @click="openOrder">
        <img src="@/img/0_common/order.png" alt />在线预约
      </div>
      <div class="info_position" @click="goMaps">
        <img src="@/img/0_common/position.png" alt />门店导航
      </div>
    </div>
    <!-- 相关新闻 -->
    <div class="info_news">
      <el-carousel :interval="3000" height="6.2rem" trigger="click" indicator-position="none">
        <el-carousel-item v-for="(item,index) in banners" :key="index">
          <div class="info_news_box">
            <div class="info_news_img" :style="{backgroundImage:'url('+ item.media +')'}"></div>
            <div class="info_news_title">{{item.title}}</div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      banners: []
    };
  },
  watch: {},
  computed: {},
  methods: {
    // 获取首页数据
    getInfo() {
      this.$axios({
        method: "post",
        url: "https://api.ltsjdx.com/index.php/website/Index/index",
        data: ""
      })
        .then(res => {
          var data = res.data.data;
          this.banners = data.top;
          for (var i in this.banners) {
            if (this.banners[i].media == "") {
              this.banners[i].media = require("../img/0_common/textBoxS.png")
            }
          }
        })
        .catch(err => {
          console.log(err); //请求失败返回的数据
        });
    },
    // 打开在线预约
    openOrder() {
      this.$emit("openOrder");
    },
    // 前往门店导航
    goMaps() {
      this.$router.push("/maps");
    }
  },
  created() {
    this.getInfo();
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
// 相关内容
.info_box {
  // 相关工具
  .info_tools {
    width: 408px;
    height: 110px;
    margin-bottom: 18px;

    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #fd8500;

    display: flex;
    align-items: center;
    justify-content: space-between;

    div {
      cursor: pointer;
      width: 203px;
      height: 110px;
      background: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      img {
        width: 54px;
        height: 54px;
      }
    }
  }
  // 相关新闻
  .info_news {
    width: 408px;
    position: relative;
    .info_news_img {
      width: 100%;
      height: 154px;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
    }
    .info_news_title {
      width: 393px;
      height: 42px;
      background: #ffffff;
      padding-left: 15px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #fd8500;
      line-height: 42px;
    }
  }
}
</style>