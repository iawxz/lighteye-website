<template>
  <div class="demo">
    <!-- 内容 -->
    <div class="content">
      <div class="for_layout"></div>
      <div class="profile_content">
        <!-- 内容标题 -->
        <div class="profile_title">
          <p>企业简介</p>
          <div class="splitline"></div>
        </div>
        <!-- 公司介绍 -->
        <div class="profile_intro">
          <img class="title_intro" src="@/img/1_home/profile/title_intro.png" alt />

          <p>杭州亮瞳视界科技有限公司（ 以下简称“ 亮瞳视界”），是华园教育科技集团旗下，专注视力健康、校园视力防控领域的高科技公司。公司致力于全国青少年儿童近视防控技术体系和视光中心连锁品牌的建设与运营。</p>
          <p>“亮瞳视界”依托华园教育集团在近视筛查平台、健康校园平台、眼科医院以及眼视光专家等生态资源，本着“ 用心呵护孩子的眼睛，让他们的世界更明亮、更精彩！” 的使命和“打造公信力国民品牌，树立视保行业标杆！”为愿景， 构建“一店一生态”赋助力能新实体。</p>
          <p>团队具有十几年近视防控领域连锁品牌的专业运营经验，发挥自身专利技术产品优势， 利用人工智能、互联网、物联网等先进技术，对视觉训练过程进行数据采集及分析，实现视觉训练智慧大数据化， 为青少年儿童提供“一站式视力健康”个性化精准服务解决方案。</p>
          <img class="exterior" src="@/img/1_home/profile/exterior.png" alt />
        </div>
        <!-- 公司环境 -->
        <div class="profile_office">
          <img class="title_office" src="@/img/1_home/profile/title_office.png" alt />
          <img class="office" src="@/img/1_home/profile/office.png" alt />
        </div>
        <!-- 公司文化 -->
        <div class="profile_culture">
          <img class="title_culture" src="@/img/1_home/profile/title_culture.png" alt />
          <div class="cultures" v-for="(item,index) in cultures" :key="index">
            <p class="culture_title">{{item.title}}</p>
            <p class="culture_content" v-if="index != 2">{{item.content}}</p>
            <p
              class="culture_content"
              v-else
              v-for="(item_,index_) in item.content"
              :key="index_"
            >{{item_}}</p>
          </div>
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
      isorder: false, // 判断是否为在线预约状态
      isFixed: true, // 用于控制infoBox是否以固定定位展示,默认以固定定位展示
      cultures: [
        {
          title: "企业使命",
          content: "用心呵护孩子的眼睛，让他们的世界更明亮、更精彩！"
        },
        {
          title: "愿景",
          content: "打造公信力国民品牌，树立视保行业标杆！"
        },
        {
          title: "价值观",
          content: [
            "决心——专注专业",
            "行动——勇于创新",
            "态度——诚实守信",
            "文化——谦和有爱"
          ]
        },
        {
          title: "口号",
          content: "亮瞳有爱，明心视界！"
        },
        {
          title: "广告语",
          content: "让孩子的眼睛更有爱！"
        }
      ]
    };
  },
  watch: {},
  computed: {},
  methods: {
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
  created() {},
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
    .profile_content {
      position: relative;
      width: 85%;
      padding-left: 60px;
      margin-bottom: 54px;
      // 内容标题
      .profile_title {
        p {
          font-size: 24px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #ff8500;
          margin: 22px 0;
        }
        .splitline {
          width: 90%;
          height: 2px;
          background: #ff8500;
        }
      }
      // 公司介绍
      .profile_intro {
        img {
          display: block;
        }
        .title_intro {
          margin-top: 30px;
          margin-bottom: 15px;
          width: 128px;
          height: 54px;
        }
        p {
          text-indent: 32px;
          width: 87%;
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
          line-height: 30px;
        }
        .exterior {
          margin-top: 40px;
          width: 257px;
          height: 428px;
        }
      }
      // 公司环境
      .profile_office {
        margin-top: 40px;
        img {
          display: block;
        }
        .tittle_office {
          width: 128px;
          height: 54px;
          margin-bottom: 30px;
        }
        .office {
          width: 100%;
          height: 100%;
          margin-left: -40px;
        }
      }
      // 公司文化
      .profile_culture {
        margin-top: 40px;
        img {
          display: block;
          width: 128px;
          height: 54px;
        }
        .cultures {
          margin-bottom: 30px;
          .culture_title {
            font-size: 18px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #3d2929;
            margin-bottom: 10px;
          }
          .culture_content {
            font-size: 16px;
            color: #3d2929;
            margin-bottom: 5px;
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