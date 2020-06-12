<template>
  <div class="demo">
    <!-- 内容 -->
    <div class="content">
      <div class="for_layout"></div>
      <div class="QandADetail_content">
        <!-- 问 -->
        <div class="Q">
          <div class="Q_content">
            <img src="../../img/2_train/icon_Q.png" alt />
            <p>{{QandA.ask}}</p>
          </div>
          <div class="splitline"></div>
        </div>
        <!-- 答 -->
        <div class="A">
          <img src="../../img/2_train/icon_A.png" alt />
          <div class="answer_content" v-html="QandA.answer"></div>
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
      QandA: {
        // id: 1,
        // ask: "儿童散瞳后多久恢复？儿童散瞳后注意事项",
        // answer:
        //   "儿童散瞳有四大原因：1、眼睑病变（如血管瘤、霰粒肿、上睑下垂）所致；2、翼状胬肉所致；3、圆锥角膜；4、外伤 / 白内障术后角膜创口愈合所致。突然出现异常的眼镜度数加深，不能只是简单的追加度数，更换眼镜，还要及时发现，处理其连带的眼部甚至全身问题，尤其要警惕其背后可能深藏的重大隐患！在日常的生活中，可以通过以下物质补充来达到增强眼睛防御力的功效：注意事项：1、补充蛋白质很多人之所以会出现眼睛散光的问题，其中的原因除了一些先天性的原因之外，多半都是后天造成，比如营养摄入不均衡同样会导致眼睛散光问题的出现。生活中含有蛋白质的食物有很多，其中最为长见的有鱼、肉、奶、蛋等，在这些食物中不仅仅含有优质的蛋白，并且这些蛋白都非常容易被人体所吸收。2、钙质与磷质人体内如果缺乏一些矿物质的话会同样影响到眼睛的健康，从而导致散光等病症的出现。比如像钙、磷两种矿物质，因此在日常生活中，患者应该多吃一些富含矿物质的食物。3、锌与铬经过研究发现，大部分患有散光以及近视的患者普遍都存在有缺锌、铬的情况，如果长期如此的话，很有可能会因此导致眼睛视力的急剧下降。"
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    // 获取训练详细信息
    getDetail() {
      var data = {};
      data.id = this.id;
      this.$axios({
        method: "post",
        url: "https://api.ltsjdx.com/website/Special/content",
        data: data
      })
        .then(res => {
          var data = res.data.data;
          this.QandA = data
          console.log(data);
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
    // console.log(this.id)
    this.getDetail();
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
    .QandADetail_content {
      position: relative;
      width: 85%;
      padding-left: 60px;
      margin-bottom: 54px;
      // 问题
      .Q {
        width: 90%;
        .Q_content {
          padding: 35px 0 30px;
          display: flex;
          align-items: flex-start;

          img {
            display: block;
            width: 36px;
            height: 36px;
            margin-right: 16px;
          }
          p {
            font-size: 32px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #222222;
          }
        }
        .splitline {
          width: 100%;
          height: 1px;
          background: #d0d0d0;
        }
      }
      // 回答
      .A {
        width: 90%;
        min-height: 500px;
        margin-top: 40px;
        display: flex;
        img {
          width: 36px;
          height: 36px;
          margin-right: 16px;
        }
        .answer_content{
          margin-top: 10px;
          width: 713px;
          height: 870px;
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
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