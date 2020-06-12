<template>
  <div class="demo">
    <!-- 内容 -->
    <div class="content">
      <div class="for_layout"></div>
      <div class="trainMore_content">
        <!-- 内容标题 -->
        <div class="trainMore_title">
          <p>{{navname[navselect]}}</p>
          <div class="splitline"></div>
        </div>
        <div class="essaies_lists">
          <div class="essaies_textBox1" v-if="essaies.length>0">
            <div
              class="essaies_textBox_img"
              :style="{backgroundImage:'url('+ essaies[0].media +')'}"
            ></div>
            <div class="essaies_textBox_con">
              <p>{{essaies[0].title}}</p>
              <!-- <p>{{essaies[0].content}}</p> -->
              <div class="goDetail" @click="goDetail(essaies[0].id)">详情</div>
            </div>
          </div>
          <div class="essaies_textBox2" v-if="essaies.length>1">
            <div class="essaies_textBox2_con">
              <div
                class="essaies_textBox_img"
                :style="{backgroundImage:'url('+ essaies[1].media +')'}"
              ></div>
              <div class="essaies_textBox_con">
                <p>{{essaies[1].title}}</p>
                <!-- <p>{{essaies[1].content}}</p> -->
                <div class="goDetail" @click="goDetail(essaies[1].id)">详情</div>
              </div>
            </div>
            <div class="essaies_textBox2_con">
              <div
                class="essaies_textBox_img"
                :style="{backgroundImage:'url('+ essaies[2].media +')'}"
              ></div>
              <div class="essaies_textBox_con">
                <p>{{essaies[2].title}}</p>
                <!-- <p>{{essaies[2].content}}</p> -->
                <div class="goDetail" @click="goDetail(essaies[2].id)">详情</div>
              </div>
            </div>
          </div>
          <div
            class="essaies_list"
            v-for="(item,index) in essaies"
            :key="index"
            v-if="index>2 && essaies.length>3"
            @click="goDetail(item.id)"
          >
            <div class="essaies_title">
              <p>{{item.title}}</p>
              <p>{{item.create_time}}</p>
            </div>
            <!-- <p class="essaies_content">{{item.content}}</p> -->
            <div class="essaies_issure">
              <p>发布人：{{item.issued_by}}</p>
              <p>|</p>
              <p>浏览次数：{{item.visits}}</p>
            </div>
          </div>
        </div>
        <!-- 页码 -->
        <div class="pagination" style="margin-top:30px;">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[5,10,15]"
            :page-size="5"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
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
      navselect: this.$route.query.navselect, //选中的是什么训练方式
      navname: [
        "弱视训练",
        "斜视训练",
        "远视训练",
        "屈光不正训练",
        "假性近视训练",
        "真性低度近视控制训练"
      ],
      // 页码
      total: 0, //要展示的数据总数

      page: 1, // 当前页数
      per_page: 5, //每页展示几条数据
      essaies: [
        // {
        //   title: "弱视需要戴眼镜的，眼睛甚至也会变形",
        //   content:
        //     "《下沙网》“小小视光师”公益行，学生老师一起宣传护眼知识，大家都非常的积极投入到减肥的时刻拉德斯基的克赖斯基地方撒开啦地方睡觉",
        //   media: require("@/img/2_train/trainMore/1.png")
        // },{
        //   title: "弱视需要戴眼镜的，眼睛甚至也会变形",
        //   content:
        //     "《下沙网》“小小视光师”公益行，学生老师一起宣传护眼知识，大家都非常的积极投入到减肥的时刻拉德斯基的克赖斯基地方撒开啦地方睡觉",
        //   media: require("@/img/2_train/trainMore/2.png")
        // },{
        //   title: "弱视需要戴眼镜的，眼睛甚至也会变形",
        //   content:
        //     "《下沙网》“小小视光师”公益行，学生老师一起宣传护眼知识，大家都非常的积极投入到减肥的时刻拉德斯基的克赖斯基地方撒开啦地方睡觉",
        //   media: require("@/img/2_train/trainMore/3.png")
        // },{
        //   title: "弱视需要戴眼镜的，眼睛甚至也会变形",
        //   content:
        //     "《下沙网》“小小视光师”公益行，学生老师一起宣传护眼知识，大家都非常的积极投入到减肥的时刻拉德斯基的克赖斯基地方撒开啦地方睡觉",
        //   media: require("@/img/2_train/trainMore/3.png")
        // },{
        //   title: "弱视需要戴眼镜的，眼睛甚至也会变形",
        //   content:
        //     "《下沙网》“小小视光师”公益行，学生老师一起宣传护眼知识，大家都非常的积极投入到减肥的时刻拉德斯基的克赖斯基地方撒开啦地方睡觉",
        //   media: require("@/img/2_train/trainMore/3.png")
        // },{
        //   title: "弱视需要戴眼镜的，眼睛甚至也会变形",
        //   content:
        //     "《下沙网》“小小视光师”公益行，学生老师一起宣传护眼知识，大家都非常的积极投入到减肥的时刻拉德斯基的克赖斯基地方撒开啦地方睡觉",
        //   media: require("@/img/2_train/trainMore/3.png")
        // }
      ],
      isorder: false, // 判断是否为在线预约状态
      isFixed: true // 用于控制infoBox是否以固定定位展示,默认以固定定位展示
    };
  },
  watch: {},
  computed: {},
  methods: {
    // 获取训练项目数据
    getTrainInfo() {
      var data = {};
      data.cate = Number(this.navselect) + 1;
      data.per_page = this.per_page;
      data.page = this.page;
      this.$axios({
        method: "post",
        url: "https://api.ltsjdx.com/website/training_program/index",
        data: data
      })
        .then(res => {
          var data = res.data.data;          
          this.total = data.total;
          this.essaies = data.data;
          //若展示图不存在 则展示占位图
          if(this.essaies[0].media == ""){
            this.essaies[0].media = require("../../img/0_common/textBoxL.png")
          }
          if(this.essaies[1].media == ""){
            this.essaies[1].media = require("../../img/0_common/textBoxS.png")
          }
          if(this.essaies[2].media == ""){
            this.essaies[2].media = require("../../img/0_common/textBoxS.png")
          }
        })
        .catch(err => {
          console.log(err); //请求失败返回的数据
        });
    },
    // 查看详情
    goDetail(id) {
      this.$router.push({
        path: "trainDetail",
        query: {
          id: id
        }
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
    },
    // 页码:每页展示几条数据
    handleSizeChange(val) {
      this.per_page = val;
      this.getTrainInfo();
    },
    // 页码:当前是第几页
    handleCurrentChange(val) {
      this.page = val;
      this.getTrainInfo();
    }
  },
  created() {
    this.getTrainInfo(5, 0);
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
    // 更多训练内容
    .trainMore_content {
      position: relative;
      width: 85%;
      padding-left: 60px;
      margin-bottom: 54px;
      // 内容标题
      .trainMore_title {
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
      // 内容列表
      .essaies_lists {
        .goDetail {
          cursor: pointer;
          width: 63px;
          height: 28px;
          text-align: center;
          line-height: 28px;
          background: #ff8501;
          border-radius: 4px;

          font-size: 16px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #ffffff;
        }
        .essaies_textBox1 {
          width: 90%;
          display: flex;
          align-items: center;
          // justify-content: space-between;
          border: 1px solid #e7e7e7;
          margin-top: 25px;
          margin-bottom: 6px;
          .essaies_textBox_img {
            width: 49%;
            height: 328px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
          }
          .essaies_textBox_con {
            width: 52%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;

            color: #222222;
            font-family: PingFangSC-Medium, PingFang SC;
            p {
              margin-bottom: 30px;
            }
            p:nth-child(1) {
              width: 283px;
              font-size: 20px;
              font-weight: 500;
              line-height: 28px;
            }
            p:nth-child(2) {
              width: 283px;
              font-size: 14px;
              font-weight: 400;
              line-height: 24px;
              overflow: hidden;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              display: -webkit-box;
            }
            .goDetail {
              margin-right: 220px;
            }
          }
        }
        .essaies_textBox2 {
          width: 90%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .essaies_textBox2_con {
            width: 49%;
            height: 380px;
            background: #ffffff;
            border: 1px solid #e7e7e7;

            color: #222222;
            font-family: PingFangSC-Medium, PingFang SC;

            display: flex;
            align-items: center;
            flex-direction: column;
            .essaies_textBox_img {
              width: 100%;
              height: 163px;
              background-repeat: no-repeat;
              background-position: center;
              background-size: cover;
            }
            p:nth-child(1) {
              margin-top: 25px;
              width: 322px;
              font-size: 20px;

              font-weight: 500;
              line-height: 28px;
            }
            p:nth-child(2) {
              margin-top: 10px;
              width: 322px;
              font-size: 14px;
              font-weight: 400;
              line-height: 24px;

              overflow: hidden;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              display: -webkit-box;
            }
            .goDetail {
              margin-top: 20px;
            }
          }
        }
        .essaies_list {
          cursor: pointer;
          width: 90%;
          height: 170px;
          margin-top: 10px;
          border-bottom: 1px solid #e5e5e5;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;

          .essaies_title {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 16px;
            p:first-child {
              font-size: 18px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: #333333;
            }
            p:nth-child(2) {
              font-size: 14px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: #999999;
            }
          }
          .essaies_content {
            width: 100%;
            margin-bottom: 16px;
            font-size: 14px;
            font-family: PingFangSC-Light, PingFang SC;
            font-weight: 300;
            color: #666666;

            overflow: hidden;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            display: -webkit-box;
          }
          .essaies_issure {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-start;

            font-size: 14px;
            font-family: PingFangSC-Light, PingFang SC;
            font-weight: 300;
            color: #333333;
            line-height: 22px;

            p:nth-child(2) {
              margin: 0 20px;
            }
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