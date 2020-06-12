<template>
  <div id="app" v-cloak>
    <div class="headerBox"></div>
    <!-- 头部导航栏 -->
    <header>
      <!-- logo标题 -->
      <div class="logo">
        <img class="logo_img" src="./img/0_common/logo.png" alt />
        <div class="logo_line"></div>
        <div class="logo_text">
          <p class="logo_text_CN">视力健康“一站式解决方案”</p>
          <p class="logo_text_EN">Vision health one stop solution</p>
        </div>
      </div>
      <!-- 导航栏列表 -->
      <div class="navlist">
        <div
          class="nav"
          :class="{nav_select:item.select}"
          v-for="(item,index) in navlist"
          :key="index"
          @click.self="navSelect(index,0)"
        >
          {{item.navname}}
          <img
            v-if="item.navchild.length!=0"
            class="nav_more"
            src="./img/0_common/more.png"
          />
          <div :class="{nav_border:item.select}"></div>
          <!-- 子导航 -->
          <div
            :class="[item.navname == '训练项目' ? 'nac_childs_train' : 'nav_childs']"
            v-if="item.navchild.length!=0"
          >
            <div
              v-for="(item_,index_) in item.navchild"
              :key="index_"
              :class="[item.navname == '训练项目' ? 'nac_child_train' : 'nav_child' , item_.select ? (item.navname == '训练项目'? 'nac_child_train_select' : 'nav_child_select') : '']"
              @click="navSelect(index,index_)"
            >
              <img :src="item_.img" v-if="item.navname == '训练项目'" />
              <p>{{item_.navchildname}}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
    <!-- 页面主体 -->
    <router-view />
    <!-- 底部链接栏 -->
    <footer>
      <!-- 链接栏&联系方式 -->
      <div class="links">
        <div class="navbottom">
          <div class="navbottom_title">便捷导航</div>
          <div class="navbottom_body">
            <div
              class="navbottom_subhead"
              v-for="(item,index) in navlist"
              :key="index"
              v-if="item.navchild.length!=0"
            >
              {{item.navname}}
              <div class="navbottom_nav">
                <p
                  v-for="(item_,index_) in item.navchild"
                  :key="index_"
                  @click="navSelect(index,index_)"
                >{{item_.navchildname}}</p>
              </div>
            </div>
            <div class="navbottom_subhead">
              扫码关注有礼
              <img
                style="display:block;"
                class="navbottom_nav"
                src="./img/0_common/QRcode.png"
                alt
              />
            </div>
          </div>
        </div>
        <div class="contact">
          <div class="contact_title">联系我们</div>
          <div class="contact_subhead">咨询热线</div>
          <div class="contact_phone">400-881-9698</div>
          <div class="contact_text">
            <p class="contact_text_CN">地址：浙江省杭州市江干区下沙七格北路459号 和达高科生命科技中心18F</p>
            <p
              class="contact_text_EN"
            >No. 459, Xiasha Qige North Road, Jianggan District, Hangzhou City, Zhejiang Province</p>
          </div>
        </div>
      </div>
      <!-- 版权信息 -->
      <div class="copyright">
        <!--  便于布局用 -->
        <div class="flex_left">
          <img class="copyright_logo" src="./img/0_common/logo.png" alt />
          <div class="copyright_text">
            <p class="copyright_body">Copyright 2020. All Rights Reserved By Bright World.</p>
            <p class="copyright_text_CN">杭州亮瞳视界科技有限公司</p>
            <p class="copyright_text_EN">HANGZHOU BRIGHT PUPIL VISION TECHNOLOGY CO.LTD</p>
          </div>
        </div>
        <!--  便于布局用 -->
        <div class="flex_right"></div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      // 导航栏列表
      navlist: [
        {
          select: true, //是否选中该导航栏，默认选中首页
          navname: "亮瞳首页",
          url: "/",
          navchild: []
        },
        {
          select: false,
          navname: "训练项目",
          url: "/train",
          navchild: [
            {
              select: false,
              navchildname: "弱视训练",
              img: require("@/img/2_train/0_amblyopia.png"),
              url: "/train"
            },
            {
              select: false,
              navchildname: "斜视训练",
              img: require("@/img/2_train/1_squint.png"),
              url: "/train"
            },
            {
              select: false,
              navchildname: "远视训练",
              img: require("@/img/2_train/2_hyperopia.png"),
              url: "/train"
            },
            {
              select: false,
              navchildname: "屈光不正训练",
              img: require("@/img/2_train/3_astigmatism.png"),
              url: "/train"
            },
            {
              select: false,
              navchildname: "假性近视训练",
              img: require("@/img/2_train/4_pseudomyopia.png"),
              url: "/train"
            },
            {
              select: false,
              navchildname: "真性低度近视控制训练",
              img: require("@/img/2_train/5_lowmyopia.png"),
              url: "/train"
            }
          ]
        },
        {
          select: false,
          navname: "亮瞳服务",
          url: "/brandprofile",
          navchild: [
            {
              select: false,
              navchildname: "品牌简介",
              url: "/brandprofile"
            },
            {
              select: false,
              navchildname: "社会公益",
              url: "/socialgood"
            },
            {
              select: false,
              navchildname: "新闻动态",
              url: "/news"
            }
          ]
        },
        {
          select: false,
          navname: "招商加盟",
          url: "/join",
          navchild: [
            {
              select: false,
              navchildname: "我们的优势",
              url: "/join",
              id: "advantage"
            },
            {
              select: false,
              navchildname: "品牌六大服务",
              url: "/join",
              id: "serve"
            },
            {
              select: false,
              navchildname: "加盟流程/政策",
              url: "/join",
              id: "process"
            },
            {
              select: false,
              navchildname: "案例展示",
              url: "/join",
              id: "case"
            },
            {
              select: false,
              navchildname: "市场扶持",
              url: "/join",
              id: "support"
            },
            {
              select: false,
              navchildname: "门店形象展示",
              url: "/join",
              id: "store"
            },
            {
              select: false,
              navchildname: "全国市场情况",
              url: "/join",
              id: "market"
            }
          ]
        },
        {
          select: false,
          navname: "护眼讲堂",
          url: "/lecture",
          navchild: [
            {
              select: false,
              navchildname: "护眼讲堂",
              url: "/lecture"
            }
            // {
            //   select: false,
            //   navchildname: "亮瞳天使",
            //   url: "/"
            // }
          ]
        },
        {
          select: false,
          navname: "联系我们",
          url: "/recruitment",
          navchild: [
            {
              select: false,
              navchildname: "招贤纳才",
              url: "/recruitment"
            },
            {
              select: false,
              navchildname: "联系我们",
              url: "/contact"
            },
            {
              select: false,
              navchildname: "门店导航",
              url: "/maps"
            }
          ]
        }
      ]
    };
  },
  methods: {
    // 导航选中
    navSelect(index, index_) {
      // 获取当前路由路径
      var url_now = this.$route.path;
      // 清空导航栏列表选中项
      for (var fatherNav of this.navlist) {
        fatherNav.select = false;
        if (fatherNav.navchild.length != 0) {
          for (var childNav of fatherNav.navchild) {
            childNav.select = false;
          }
        }
      }
      // 为当前选中的nav付上选中值,并存储要跳转的url
      this.navlist[index].select = true;
      var url_go = this.navlist[index].url;
      if (this.navlist[index].navchild.length != 0) {
        this.navlist[index].navchild[index_].select = true;
        url_go = this.navlist[index].navchild[index_].url;
      }

      // 若点击是 训练项目 的nav
      if (index == 1) {
        let train_nav = index_;
        this.resetSetItem("train_nav", train_nav); //存储train_nav.js用于nav选中，方法写在main.js
      }

      // 若点击是 招商加盟 的nav
      if (index == 3) {
        let join_anchor = this.navlist[index].navchild[index_].id;
        this.resetSetItem("join_anchor", join_anchor); //存储join_anchor用于锚点，方法写在main.js
      }

      // 跳转页面，若是跳转到当前页则刷新
      if (url_go == url_now) {
        return;
      } else {
        this.$router.push(url_go);
      }
    }
  },
  mounted() {
    // 页面刷新即返回首页
    window.addEventListener("load", () => {
      // 滚动事件变为 scroll
      if (this.$route.path !== "/") {
        // /print 表示首页
        this.$router.replace("/"); // 切换到首页
      }
    });
  }
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
[v-cloak] {
  display: none;
}
#app {
  position: relative;
  .headerBox {
    width: 100%;
    height: 80px;
  }
  /* 头部导航栏 */
  header {
    z-index: 999;

    width: 100%;
    min-width: 1200px;
    height: 80px;
    background-color: #ffffff;
    box-shadow: 0px 1px 3px 4px rgba(0, 0, 0, 0.04);
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: fixed;
    top: 0;
    left: 0;

    /* logo标题 */
    .logo {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .logo_img {
        width: 68px;
        height: 68px;
      }
      .logo_line {
        width: 2px;
        height: 49px;
        background-color: #d7d7d7;
        margin: 0 18px;
      }
      .logo_text .logo_text_CN {
        font-size: 24px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #462c24;
        // letter-spacing: 13px;
        margin: 0;
      }
      .logo_text .logo_text_EN {
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #462c24;
        margin: 0;
      }
    }
    /* 导航栏列表 */
    .navlist {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      .nav {
        width: 118px;
        height: 80px;

        display: flex;
        align-items: center;
        justify-content: center;

        font-size: 18px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #462c24;
        position: relative;

        &:hover {
          background: #f1f1f1;
        }
        &:hover .nav_childs,
        &:hover .nac_childs_train {
          visibility: visible;
        }
        .nav_more {
          widows: 16px;
          height: 16px;
          margin-left: 8px;
        }

        .nav_childs {
          visibility: hidden;
          position: absolute;
          top: 80px;
          left: 0;
          width: 185px;
          background: #ffffff;
          box-shadow: 0px 4px 5px 4px rgba(0, 0, 0, 0.04);

          .nav_child {
            width: 162px;
            height: 54px;
            padding-left: 23px;
            line-height: 54px;
            font-size: 16px;
            color: #462c24;
            &:hover {
              background: #fff9f1;
              color: #ff8500;
              font-weight: 600;
            }
          }
          .nav_child_select {
            background: #fff9f1;
            color: #ff8500;
            font-weight: 600;
          }
        }

        .nac_childs_train {
          visibility: hidden;

          width: 820px;
          height: 92px;
          background: #ffffff;
          box-shadow: 0px 4px 5px 4px rgba(0, 0, 0, 0.04);

          position: absolute;
          top: 80px;

          display: flex;
          align-items: center;
          justify-content: space-around;

          .nac_child_train {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            img {
              width: 48px;
              height: 48px;
              margin-top: 4px;
            }
            p {
              margin: 2px 11px 4px;
            }

            &:hover {
              background: #fffbf1;
              border-radius: 4px;
              border: -1px solid rgba(255, 133, 0, 0.5);
              font-size: 14px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: #ffaf23;
            }
          }
          .nac_child_train_select {
            background: #fffbf1;
            border-radius: 4px;
            border: 1px solid rgba(255, 133, 0, 0.5);
            font-size: 14px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #ffaf23;
          }
        }
      }
      .nav_select {
        background: #f1f1f1;
        position: relative;
        .nav_border {
          width: 100%;
          height: 2px;
          background: #ff8500;
          position: absolute;
          bottom: 0;
          left: 0;
        }
      }
    }
  }
  /* 底部链接栏 */
  footer {
    width: 100%;
    min-width: 1200px;
    height: 496px;
    background: #181d1f;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    // 链接栏&联系方式
    .links {
      display: flex;
      align-items: stretch;
      justify-content: space-around;
      // 链接栏
      .navbottom {
        .navbottom_title {
          font-size: 16px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .navbottom_body {
          display: flex;
          .navbottom_subhead {
            font-size: 14px;
            margin-right: 64px;
            position: relative;

            .navbottom_nav {
              position: absolute;
              cursor: pointer;
              width: 150px;
              margin-top: 26px;
              color: #828282;

              p {
                margin-bottom: 12px;

                &:hover {
                  color: #ffffff;
                }
              }
            }
          }
        }
      }
      // 联系方式
      .contact {
        .contact_title {
          font-size: 16px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
        }
        .contact_subhead {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          margin: 8px 0;
        }
        .contact_phone {
          font-size: 32px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #ff8500;
          margin-bottom: 5px;
        }
        .contact_text {
          width: 296px;
          height: 92px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #828282;
          line-height: 24px;
        }
      }
    }
    // 版权信息
    .copyright {
      margin-top: 123px;
      display: flex;
      justify-content: space-around;
      .flex_left {
        width: 748px;
        display: flex;
        align-items: center;
        .copyright_logo {
          display: block;
          width: 88px;
          height: 88px;
        }
        .copyright_text {
          .copyright_body {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
          }
          .copyright_text_CN {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            letter-spacing: 5px;
            margin: 12px 0 6px;
          }
          .copyright_text_EN {
            font-size: 8px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
          }
        }
      }
      .flex_right {
        width: 296px;
      }
    }
  }
}
</style>
