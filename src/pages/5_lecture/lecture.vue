<template>
  <div class="demo">
    <!-- 内容 -->
    <div class="content">
      <div class="for_layout"></div>
      <div class="lecture_content">
        <!-- 内容标题 -->
        <div class="lecture_title">
          <p>护眼讲堂</p>
          <div class="splitline"></div>
        </div>
        <div class="essaies_lists">
          <div
            class="essaies_textBox"
            v-for="(item,index) in essaies"
            :key="index"
            v-if="index<=1"
            @click="goLectureDetail(item.id)"
          >
            <video v-if="item.type == 1" :src="item.media" controls="controls"></video>
            <img v-else-if="item.type == 2" :src="item.media" alt />
            <img v-else src="../../img/0_common/textBoxS.png" alt="">
            <div class="essaies_textBox_con">
              <div class="essaies_textBox_title">
                <p>{{item.title}}</p>
                <p>{{item.create_time}}</p>
              </div>
              <!-- <p class="essaies_textBox_content">摘要：{{item.content}}</p> -->
              <div class="essaies_issure">
                <p>发布人：亮瞳视界</p>
                <p>|</p>
                <p>浏览次数：{{item.visits}}</p>
              </div>
            </div>
          </div>
          <div
            class="essaies_list"
            v-for="(item,index) in essaies"
            :key="index"
            v-if="index>1"
            @click="goLectureDetail(item.id)"
          >
            <div class="essaies_title">
              <p>{{item.title}}</p>
              <p>2020-04-25</p>
            </div>
            <!-- <p class="essaies_content">摘要：{{item.content}}</p> -->
            <div class="essaies_issure">
              <p>发布人：亮瞳视界</p>
              <p>|</p>
              <p>浏览次数：2999</p>
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
      isorder: false, // 判断是否为在线预约状态
      isFixed: true, // 用于控制infoBox是否以固定定位展示,默认以固定定位展示
      essaies: [
        // {
        //   title: "亮瞳开学公益护眼小讲堂开课啦",
        //   content:
        //     "当远视训练结束那一刻，五保户老人家李明笑容绽放：自己仅仅花了一点成本就把自己的眼部疾病治好了，感谢亮瞳视界",
        //   media: require("@/img/5_lecture/1.png")
        // },
        // {
        //   title: "专业眼部护理老师来亮瞳开讲座",
        //   content:
        //     "当远视训练结束那一刻，五保户老人家李明笑容绽放：自己仅仅花了一点成本就把自己的眼部疾病治好了，感谢亮瞳视界",
        //   media: require("@/img/5_lecture/2.png")
        // },
        // {
        //   title: "专业眼部护理老师来亮瞳开讲座",
        //   content:
        //     "当远视训练结束那一刻，五保户老人家李明笑容绽放：自己仅仅花了一点成本就把自己的眼部疾病治好了，感谢亮瞳视界",
        //   media: require("@/img/5_lecture/2.png")
        // },
        // {
        //   title: "专业眼部护理老师来亮瞳开讲座",
        //   content:
        //     "当远视训练结束那一刻，五保户老人家李明笑容绽放：自己仅仅花了一点成本就把自己的眼部疾病治好了，感谢亮瞳视界",
        //   media: require("@/img/5_lecture/2.png")
        // },
        // {
        //   title: "专业眼部护理老师来亮瞳开讲座",
        //   content:
        //     "当远视训练结束那一刻，五保户老人家李明笑容绽放：自己仅仅花了一点成本就把自己的眼部疾病治好了，感谢亮瞳视界",
        //   media: require("@/img/5_lecture/2.png")
        // },
        // {
        //   title: "专业眼部护理老师来亮瞳开讲座",
        //   content:
        //     "当远视训练结束那一刻，五保户老人家李明笑容绽放：自己仅仅花了一点成本就把自己的眼部疾病治好了，感谢亮瞳视界",
        //   media: require("@/img/5_lecture/2.png")
        // }
      ],

      // 页码
      total: 0, //要展示的数据总数
      page: 1, // 当前页数
      per_page: 5 //每页展示几条数据
    };
  },
  watch: {},
  computed: {},
  methods: {
    // 获取讲堂信息
    getInfo() {
      var data = {};
      data.per_page = this.per_page;
      data.page = this.page;
      this.$axios({
        method: "post",
        url: "https://api.ltsjdx.com/website/Lecture/index",
        data: data
      })
        .then(res => {
          var data = res.data.data;
          this.total = data.total;
          this.essaies = data.data;
        })
        .catch(err => {
          console.log(err); //请求失败返回的数据
        });
    },
    // 打开/关闭 预约内容
    goOrder() {
      this.isorder = !this.isorder;
    },
    goLectureDetail(id) {
      this.$router.push({
        path: "lectureDetail",
        query: {
          id: id
        }
      });
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
      this.getInfo();
    },
    // 页码:当前是第几页
    handleCurrentChange(val) {
      this.page = val;
      this.getInfo();
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
  min-height: 500px;
  min-width: 1200px;
  background: #f5f6f8;
  display: flex;
  .content {
    width: 60%;
    background: #ffffff;
    display: flex;
    align-items: flex-start;
    padding-bottom: 30px;
    .for_layout {
      width: 15%;
    }
    // 更多训练内容
    .lecture_content {
      position: relative;
      width: 85%;
      padding-left: 60px;
      margin-bottom: 54px;
      // 内容标题
      .lecture_title {
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
        .essaies_textBox {
          cursor: pointer;
          width: 90%;
          display: flex;
          padding: 20px 0 10px;
          border-bottom: 1px solid #e5e5e5;
          img {
            display: block;
            width: 45%;
            height: 195px;
            margin-right: 30px;
            object-fit: cover;
          }
          video {
            width: 45%;
            height: 195px;
            margin-right: 30px;
            object-fit: cover;
          }
          .essaies_textBox_con {
            display: flex;
            align-items: center;
            flex-direction: column;

            margin-top: 20px;
            .essaies_textBox_title {
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-bottom: 16px;
              p:first-child {
                width: 300px;
                height: 25px;
                font-size: 20px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #333333;
                line-height: 25px;

                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
              }
              p:nth-child(2) {
                font-size: 16px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #999999;
              }
            }
            .essaies_textBox_content {
              margin-bottom: 16px;

              width: 412px;
              font-size: 14px;
              font-family: PingFangSC-Light, PingFang SC;
              font-weight: 300;
              color: #666666;
              line-height: 22px;

              overflow: hidden;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              display: -webkit-box;
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
        }
        .essaies_issure {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-start;

          font-size: 12px;
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