<template>
  <div class="demo">
    <!-- 内容 -->
    <div class="content">
      <div class="for_layout"></div>
      <div class="profile_content">
        <!-- 内容标题 -->
        <div class="profile_title">
          <p>品牌简介</p>
          <div class="splitline"></div>
        </div>
        <!-- 品牌简介 -->
        <div class="profile_intro">
          <p>在遥远的几千年前，中国古人用自己的双眼不断观察世界，他们怀着对自然的敬畏，展开了对人类奥秘最早的探索与思考“仰则观象于天，俯则观法于地”，学会用自然之法不断挖掘着自身的智慧。 他们相信人类拥有着巨大的潜在能量，可以去被唤醒。</p>
          <p>古人对广袤宙宇的探索，让中国文化向科学迈进了一大步，春秋时期，中医就开始探索人体的生理病理的潜在能量。</p>
          <p>战国时期，人们学会用眼睛判断，一项有趣的游戏“投壶”一直在温文儒雅的士大夫中盛行。投壶把箭向壶里投掷，投中多的为胜，因其形式高雅、注重礼仪，“投壶礼”被流传至后代，其蕴含着治心，修身，为国的教育意义也成为中国文的一部分。到了唐代，投壶得到发扬光大，成为童叟皆可参与的娱乐运动。每一次细心的“判断”到投掷的完成，锻炼了双眼的准确度和判断力。</p>
          <div class="imgBox">
            <img src="@/img/3_serve/brandprofile/1.png" alt />
            <img src="@/img/3_serve/brandprofile/2.png" alt />
          </div>
          <p>3000年后的今天，亮瞳视界在中医研究的基础上重新审视了投壶运动，这样的“判断”让视角在变化中形成了物理性的锻炼，它认为“运睛”让眼部肌肉在一张一弛中得到最自然原始的视力恢复训练。亮瞳视界要将这一发现，开创性的运用人类视力恢复治疗中，这个初衷成为它不断探索研究的原动力。</p>
          <p>人的每只眼睛拥有1亿3000万个光接收器，能在不到1秒钟的时间内，以超级精度对一幅含有10亿个信息的景物进行解码，基于这些原始数据的分析，每一个人的视力都有着巨大的提升限度，亮瞳视界要让这样的潜在能力得以唤醒。在历经50万次的眼部实验，11万次的临床验证后，亮瞳视界在人类眼睛视力治疗领域开创了“生理潜能训练”理论，高效与安全成为它的首要特点。</p>
          <div class="imgBox">
            <img src="@/img/3_serve/brandprofile/3.png" alt />
            <img src="@/img/3_serve/brandprofile/4.png" alt />
          </div>
          <p>先进的VR技术让人体视觉潜能在交互与传感中不断提升。瞳距训练在一幅幅逼真的画面变幻中自然生成肌肉刺激，和 投壶运动异曲同工。图像激发的视觉神经传输给治疗带来最物理和安全的效果。</p>
          <p>亮瞳视界立足中华医学的护眼学说的自然之道：“动中取静”“不妄作劳” “守神全形”“保形全神”，更是首次将中医自然之法与现代黑科技手段结合运用，在现代大健康的理念中达到高效、便捷的成效。</p>
          <p>回看古人望穿宇宙的一刹那，同一个世界被科学不断的解开无限的奥秘，亮瞳视界遵循生态的大健康理念，为人类打开了另一扇光明之窗。</p>
          <p>亮瞳视界为视力恢复创造了真正的童话世界。</p>
          <p>亮瞳视界，让孩子的眼睛更有爱！</p>
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
        width: 87%;
        p {
          margin-top: 30px;
          text-indent: 32px;          
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
          line-height: 30px;
        }
        .imgBox {
          margin-top: 30px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          img {
            display: block;
          }
          img:first-child{
            width: 387px;
            height: 234px;
          }
          img:nth-child(2){
            width: 312px;
            height: 234px;
          }
        }
        .imgBox:nth-child(2) {
          img:first-child{
            width: 297;
            height: 214px;
          }
          img:nth-child(2){
            width: 390px;
            height: 214px;
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