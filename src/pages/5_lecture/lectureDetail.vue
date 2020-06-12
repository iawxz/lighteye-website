<template>
  <div class="demo">
    <!-- 内容 -->
    <div class="content">
      <div class="for_layout"></div>
      <div class="socialDetail_content">
        <!-- 标题 -->
        <div class="titleBox">
          <p class="detail_title">{{detail.title}}</p>
          <div class="splitline"></div>
        </div>
        <!-- 内容 -->
        <div class="contentBox">
          <div class="videoBox" v-if="detail.type!=0">
            <iframe v-if="detail.type==1" :src="detail.media" frameborder="0" allowfullscreen></iframe>
            <img v-if="detail.type == 2" :src="detail.media" alt />
          </div>
          <!-- <p class="detail_content">{{detail.content}}</p> -->
          <div class="detail_content" v-html="detail.content"></div>
        </div>
      </div>
    </div>
    <!-- 相关信息内容 -->
    <div :class="[isFixed?'infoBox_fixed':'infoBox_absolute']">
      <InfoBox @openOrder="goOrder"></InfoBox>
    </div>
    <!-- 在线预约内容 -->
    <OrderContent @closeOrder="goOrder" v-if="isorder"></OrderContent>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      id: this.$route.query.id,
      isorder: false, // 判断是否为在线预约状态
      isFixed: true, // 用于控制infoBox是否以固定定位展示,默认以固定定位展示
      detail: {
        // id: 1,
        // title: "亮瞳开学公益护眼小讲堂开课了",
        // content:
        //   "  《亮瞳视界：通过高效管理帮助千百万中国人获得清晰视力》。视频课程全面介绍了亮瞳视界的医疗实践，包括商业模式、先进技术、优质护理、核心价值观以及公益慈善模式。报告认为，通过不断的实践与探索，亮瞳视界成功探索出符合中国国情的分级连锁医院发展模式，迅速成为百姓信赖的眼科品牌，已累计为全国数千万患者解除了眼疾的困扰，有力地推动中国眼科医疗事业向前发展。亮瞳视界小讲堂开课了！"
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    // 获取讲堂数据
    getInfo() {
      var data = {};
      data.id = this.id;
      this.$axios({
        method: "post",
        url: "https://api.ltsjdx.com/website/Lecture/content",
        data: data
      })
        .then(res => {
          var data = res.data.data;
          this.detail = data;
        })
        .catch(err => {
          console.log(err); //请求失败返回的数据
        });
    },
    // 打开/关闭 预约内容
    goOrder() {
      this.isorder = !this.isorder;
    },
    // 获取滚动高度，以此控制固定定位的infoBox
    scroll() {
      let page_Height = document.documentElement.scrollHeight; // 滚动条高度
      let page_Top = document.documentElement.scrollTop; // 当前滚动位置到滚动条头部的高度
      let page_clientH = document.documentElement.clientHeight; // 目前显示的高度
      let page_Bottom = page_Height - page_Top - page_clientH; // 离页面底部的高度
      if (page_Bottom <= 140) {
        // 若离页面底部只剩140px，即停止固定定位
        this.isFixed = false;
      } else {
        this.isFixed = true;
      }
    }
  },
  created() {
    this.getInfo();
  },
  mounted() {
    // 窗口新添监听鼠标滚动事件
    window.addEventListener("scroll", this.scroll);
  },
  destroyed() {
    // 退出页面后销毁监听鼠标滚动事件
    window.removeEventListener("scroll", this.scroll);
  }
};
</script>
<style lang="less" scoped>
.demo {
  position: relative;
  width: 100%;
  height: 100%;
  min-width: 1200px;
  background: #f5f6f8;
  display: flex;
  .content {
    width: 60%;
    background: #ffffff;
    display: flex;
    align-items: center;
    padding-bottom: 30px;
    .for_layout {
      width: 15%;
    }
    // 企业简介内容
    .socialDetail_content {
      position: relative;
      width: 85%;
      padding-left: 60px;
      margin-bottom: 54px;
      // 问题
      .titleBox {
        width: 90%;
        .detail_title {
          margin: 36px 0;

          font-size: 32px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #222222;
          line-height: 45px;
        }
        .splitline {
          width: 100%;
          height: 1px;
          background: #d0d0d0;
        }
      }
      // 回答
      .contentBox {
        width: 90%;
        .videoBox {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 30px auto 20px;
          iframe {
            width: 740px;
            height: 441px;
          }
          img {
            width: 740px;
            height: 441px;
            object-fit: cover;
          }
        }
        .detail_content {
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
          line-height: 30px;
          /deep/ p {
            width: 100%;
          }
          /deep/ img {
            width: 100%;
          }
        }
      }
    }
  }
  // 相关信息内容
  .infoBox_fixed {
    position: fixed;
    top: 125px;
    left: 60%;
    margin-left: 47px;
  }
  .infoBox_absolute {
    position: absolute;
    bottom: 125px;
    left: 60%;
    margin-left: 47px;
  }
}
</style>