<template>
  <div class="demo">
    <!-- 内容 -->
    <div class="content">
      <div class="for_layout"></div>
      <div class="newsDetail_content">
        <!-- 标题 -->
        <div class="titleBox">
          <p class="detail_title">{{detail.title}}</p>
          <div class="issuer">
            <p>发布人：亮瞳视界</p>
            <p>|</p>
            <p>浏览次数：{{detail.visits}}</p>
          </div>
          <div class="splitline"></div>
        </div>
        <!-- 内容 -->
        <div class="contentBox">
          <img v-if="detail.media!=''" :src="detail.media" alt />
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
        // title: "亮瞳公益行——关爱老党员社区活动圆满结束",
        // content:
        //   "     近日，世界银行集团在其所属机构的官方网站发表案例报告：《中国防盲：亮瞳视界医院的故事》及《亮瞳视界：通过高效管理帮助千百万中国人获得清晰视力》。报告全面介绍了亮瞳视界的医疗实践，包括商业模式、先进技术、优质护理、核心价值观以及公益慈善模式。报告认为，通过不断的实践与探索，亮瞳视界成功探索出符合中国国情的分级连锁医院发展模式，迅速成为百姓信赖的眼科品牌，已累计为全国数千万患者解除了眼疾的困扰，有力地推动中国眼科医疗事业向前发展。报告指出，亮瞳视界以其医疗伦理和核心价值观为基础，通过遍布全国的分级连锁医院体系，不仅依靠集中采购、提高分工合作效率管理降低了运营成本，从而减轻了患者的负担，而且通过内部会诊和转诊体系，让偏远基层的疑难患者也能得到高水平的诊疗。一直以来，亮瞳视界积极履行企业社会责任，不遗余力地投入防盲治盲工作，通过高毛利业务补贴低收入群体的“交叉补贴”机制，形成了独具特色的可持续的公益慈善模式。因此，报告认为，非公医院在完成全球及国家医疗服务目标中的作用是不可低估的，通过提高效率和创新，某些商业模式可以在降低整个社会支出的情况下提供更好的医疗服务。此外，资料显示，亮瞳视界与世界银行渊源匪浅。2018年11月，亮瞳视界与世界银行集团形成了长期战略合作关系。这不仅支持了亮瞳视界的投资发展，更重要的促进了亮瞳视界的医疗规范，为2019年顺利成功登陆创业板起到了非常重要的“催化剂”作用。2019年7月8日，世界银行行长金墉先生参观考察亮瞳视界，之后于10月17日在英国金融时报(《Financial Times》)撰文，指出亮瞳视界模式在全球发展中国家具有普遍借鉴意义。亮瞳视界董事长陈邦表示，“亮瞳首先是一家医院，然后才是一家公司。我们努力帮助所有的人，不论贫穷还是富有，让他们享受应有的医疗服务，这与世行集团的发展观完全吻合”。历经三年的发展，亮瞳视界已成为中国眼科标杆医疗连锁机构，截止2019年10月，旗下门店已达100余家，分布于全国25个省(市、区)，年诊疗总量在全国遥遥领先。因此，“亮瞳视界模式”获得世界银行集团的全球推广，具有很强的必然性。"
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    // 获取训练详细信息
    getNewsDetail() {
      var data = {};
      data.id = this.id;
      this.$axios({
        method: "post",
        url: "https://api.ltsjdx.com/index.php/website/News/content",
        data: data
      })
        .then(res => {
          var data = res.data.data;
          this.detail = data
          // console.log(this.detail)
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
    this.getNewsDetail()
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
    .newsDetail_content {
      position: relative;
      width: 85%;
      padding-left: 60px;
      margin-bottom: 54px;
      // 问题
      .titleBox {
        width: 90%;
        .detail_title {
          margin: 36px 0 16px;

          font-size: 32px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #222222;
          line-height: 45px;
        }
        .issuer {
          margin-bottom: 30px;

          display: flex;

          font-size: 14px;
          font-family: PingFangSC-Light, PingFang SC;
          font-weight: 300;
          color: #333333;
          line-height: 22px;

          p:nth-child(2) {
            margin: 0 30px;
          }
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
        img {
          display: block;
          width: 100%;
          margin: 34px 0 27px;
        }
        .detail_content{
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