<template>
  <div class="join">
    <!-- 广告展示图 -->
    <div class="banner" id="banner"></div>
    <!-- 我们的优势 -->
    <div id="advantage" style="height:40px;background:#ffffff;"></div>
    <div class="advantage"></div>
    <!-- 品牌六大服务 -->
    <div class="serve" id="serve"></div>
    <!-- 加盟流程 -->
    <div class="process" id="process"></div>
    <!-- 加盟政策 -->
    <div class="policy" id="policy"></div>
    <!-- 案例展厅 -->
    <div id="case" style="height:18px;"></div>
    <div class="case"></div>
    <!-- 市场扶持 -->
    <div class="support" id="support"></div>
    <!-- 门店形象展示 -->
    <div id="store" style="height:22px;background:#feefd6;"></div>
    <div class="store"></div>
    <!-- 办公环境 -->
    <div class="office" id="office">
      <img class="office_title" src="@/img/4_join/office_title.png" alt />
      <div class="office_navs">
        <div
          class="office_nav"
          :class="{office_nav_select:item.id == office_select}"
          v-for="(item,index) in officeList"
          :key="index"
          @click="onSelect(item.id)"
        >{{item.title}}</div>
      </div>
      <div class="office_img" v-if="office_select!=0">
        <img :src="officeList[office_select].img" alt />
      </div>
      <div class="office_img" v-else>
        <el-carousel trigger="click" :interval="5000" height="670px" arrow="never">
          <el-carousel-item>
            <img :src="officeList[office_select].img[0]" alt />
          </el-carousel-item>
          <el-carousel-item>
            <img :src="officeList[office_select].img[1]" alt />
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <!-- 全国市场情况 -->
    <div id="market" style="height:5px;"></div>
    <div class="market"></div>
    <div class="affiliate_telphone">
      <div class="title">
        <img src="@/img/4_join/phone.png" alt />
        加盟电话
      </div>
      <div class="content">400-881-9698</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      select: "banner", //用于监听锚点跳转nav
      office_select: 0, //当前展示办公环境，0前台区（默认），1会议室，2培训室，3综合办公室
      officeList: [
        {
          id: 0,
          title: "前台区",
          img: [
            "http://ltsj-public.oss-cn-hangzhou.aliyuncs.com/upload/20200611/123343728cd1056b5f3e7a62f5b494ad149f04dc.png",
            "http://ltsj-public.oss-cn-hangzhou.aliyuncs.com/upload/20200611/fdff8f77b76a35d0b7ea769f56755eec11bc6e24.png"
          ]
        },
        {
          id: 1,
          title: "会议室",
          img: "http://ltsj-public.oss-cn-hangzhou.aliyuncs.com/upload/20200611/fe55ed73994ad543c58b3709e53b0abc8128d12e.png"
        },
        {
          id: 2,
          title: "培训室",
          img: "http://ltsj-public.oss-cn-hangzhou.aliyuncs.com/upload/20200611/f8f5cb5ebe85ec1f08b6a27343a8ababafed829e.png"
        },
        {
          id: 3,
          title: "综合办公室",
          img: "http://ltsj-public.oss-cn-hangzhou.aliyuncs.com/upload/20200611/1ef06ff8f45d117f271894dfa27c5cdd70bef92a.png"
        }
      ],
      newVal: ""
    };
  },
  watch: {},
  computed: {},
  methods: {
    onSelect(id) {
      this.office_select = id;
    },
    // 获取本地存储的锚点值
    goAnchor() {
      let anchorElement = document.getElementById(this.select);
      // 若这个值存在
      if (anchorElement) {
        anchorElement.scrollIntoView();
      }
    }
  },
  created() {
    // 实时监听 锚点值的变化 方法写在main.js，传值写在app.vue
    window.addEventListener("setItem", () => {
      this.select = sessionStorage.getItem("join_anchor");
      this.goAnchor();
    });
  },
  mounted() {
    this.$nextTick(function() {
      window.addEventListener("scroll", this.handleScroll);
    });
  }
};
</script>
<style lang="less" scoped>
.join {
  position: relative;
  min-width: 1200px;
  background-color: #f5f6f8;
  div {
    width: 100%;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }
  // 广告展示图
  .banner {
    height: 354px;
    background-image: url("http://ltsj-public.oss-cn-hangzhou.aliyuncs.com/upload/20200611/863f7634ce53413457513e88693dada4bddd66ee.png");
  }
  // 我们的优势
  .advantage {
    height: 1549px;
    background-image: url("http://ltsj-public.oss-cn-hangzhou.aliyuncs.com/upload/20200611/6bbbbfb43c3ca1adc2b5d285a990034c004fb72d.png");
  }
  // 品牌六大服务
  .serve {
    height: 746px;
    background-image: url("http://ltsj-public.oss-cn-hangzhou.aliyuncs.com/upload/20200611/fcfd2f8b82dd2e16276ceac593aa660461edc149.png");
  }
  // 加盟流程
  .process {
    height: 702px;
    background-image: url("http://ltsj-public.oss-cn-hangzhou.aliyuncs.com/upload/20200611/beacacc58c507d5611619bc204da188b38a21bed.png");
  }
  // 加盟政策
  .policy {
    height: 627px;
    background-image: url("http://ltsj-public.oss-cn-hangzhou.aliyuncs.com/upload/20200611/e1f89a69e23d540eb975b81068af9fe2f0ba272d.png");
  }
  // 案例展厅
  .case {
    height: 860px;
    background-image: url("http://ltsj-public.oss-cn-hangzhou.aliyuncs.com/upload/20200611/691a3345cc20a183050e9124756e517d392489e6.png");
  }
  // 市场扶持
  .support {
    height: 1106px;
    background-image: url("http://ltsj-public.oss-cn-hangzhou.aliyuncs.com/upload/20200611/83761ccfb0b9f07a1b60d5ff39a1aff2a5267d04.png");
  }
  // 门店形象展示
  .store {
    height: 504px;
    background-image: url("http://ltsj-public.oss-cn-hangzhou.aliyuncs.com/upload/20200611/cb12f384a812bb6c9f9c95cfca69ddc157bee21f.png");
  }
  // 办公环境
  .office {
    width: 100%;

    padding: 150px 0;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .office_title {
      display: block;
    }
    .office_navs {
      margin-top: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      .office_nav {
        cursor: pointer;
        width: 251px;
        height: 90px;
        text-align: center;
        line-height: 90px;
        margin: 4px 2px;
        background: #f5c649;
        color: #ffffff;
        font-weight: 700;
        font-size: 28px;
        &:hover {
          background: #ff8500;
        }
      }
      .office_nav_select {
        background: #ff8500;
      }
    }
    .office_img {
      width: 53%;
      img {
        width: 100%;
        height: 100%;
        display: block;
        margin: 0 auto;
      }
    }
  }
  // 全国市场情况
  .market {
    height: 934px;
    background-image: url("http://ltsj-public.oss-cn-hangzhou.aliyuncs.com/upload/20200611/805aa839b7502c5d2a35383566878ebb3bbfe8ce.png");
  }
  // 加盟电话
  .affiliate_telphone {
    position: fixed;
    right: 0;
    top: 40%;
    width: 280px;
    height: 165px;
    background: #f08437;
    border-radius: 12px;
    border: 3px solid #f08437;

    .title {
      height: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      font-size: 24px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 33px;

      img {
        display: block;
        width: 55px;
        height: 55px;
        margin-right: 16px;
      }
    }
    .content {
      border-radius: 0 0 12px 12px;
      height: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #ffffff;

      font-size: 32px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #f08437;
      line-height: 45px;
    }
  }
}
</style>