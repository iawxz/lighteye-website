<template>
  <div class="demo">
    <!-- 内容 -->
    <div class="content">
      <div class="for_layout"></div>
      <div class="QandAMore_content">
        <!-- 内容标题 -->
        <div class="QandAMore_title">
          <p>专题问答</p>
          <div class="splitline"></div>
        </div>
        <div class="essaies_lists">
          <div
            class="essaies_list"
            v-for="(item,index) in essaies"
            :key="index"
            @click="goQandADetail(item.id)"
          >
            <div class="essaies_Q">
              <img src="../../img/2_train/icon_Q.png" alt />
              <p>{{item.ask}}</p>
            </div>
            <div class="essaies_A">
              <img src="../../img/2_train/icon_A.png" alt />
              <p v-html="item.answer"></p>
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
      isorder: false, // 判断是否为在线预约状态
      isFixed: true, // 用于控制infoBox是否以固定定位展示,默认以固定定位展示
      essaies: [
        // {
        //   ask: "孩子经常眯眼睛会加深弱视？",
        //   answer:
        //     "原本已经弱视的眼睛，如果配的眼镜度数不符，或者习惯性的眯着眼睛，所以弱视还是不断加深。原本已经弱视的眼睛，如果配的眼镜度数不符，或者习惯性的眯着眼睛，所以弱视还是不断加深。"
        // },{
        //   ask: "孩子经常眯眼睛会加深弱视？",
        //   answer:
        //     "原本已经弱视的眼睛，如果配的眼镜度数不符，或者习惯性的眯着眼睛，所以弱视还是不断加深。原本已经弱视的眼睛，如果配的眼镜度数不符，或者习惯性的眯着眼睛，所以弱视还是不断加深。"
        // },{
        //   ask: "孩子经常眯眼睛会加深弱视？",
        //   answer:
        //     "原本已经弱视的眼睛，如果配的眼镜度数不符，或者习惯性的眯着眼睛，所以弱视还是不断加深。原本已经弱视的眼睛，如果配的眼镜度数不符，或者习惯性的眯着眼睛，所以弱视还是不断加深。"
        // },{
        //   ask: "孩子经常眯眼睛会加深弱视？",
        //   answer:
        //     "原本已经弱视的眼睛，如果配的眼镜度数不符，或者习惯性的眯着眼睛，所以弱视还是不断加深。原本已经弱视的眼睛，如果配的眼镜度数不符，或者习惯性的眯着眼睛，所以弱视还是不断加深。"
        // },{
        //   ask: "孩子经常眯眼睛会加深弱视？",
        //   answer:
        //     "原本已经弱视的眼睛，如果配的眼镜度数不符，或者习惯性的眯着眼睛，所以弱视还是不断加深。原本已经弱视的眼睛，如果配的眼镜度数不符，或者习惯性的眯着眼睛，所以弱视还是不断加深。"
        // },{
        //   ask: "孩子经常眯眼睛会加深弱视？",
        //   answer:
        //     "原本已经弱视的眼睛，如果配的眼镜度数不符，或者习惯性的眯着眼睛，所以弱视还是不断加深。原本已经弱视的眼睛，如果配的眼镜度数不符，或者习惯性的眯着眼睛，所以弱视还是不断加深。"
        // },{
        //   ask: "孩子经常眯眼睛会加深弱视？",
        //   answer:
        //     "原本已经弱视的眼睛，如果配的眼镜度数不符，或者习惯性的眯着眼睛，所以弱视还是不断加深。原本已经弱视的眼睛，如果配的眼镜度数不符，或者习惯性的眯着眼睛，所以弱视还是不断加深。"
        // },
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
    // 获取更多问答数据
    getInfo() {
      var data = {};
      data.cate = Number(this.navselect) + 1;

      data.per_page = this.per_page;
      data.page = this.page;
      this.$axios({
        method: "post",
        url: "https://api.ltsjdx.com/website/Special/index",
        data: data
      })
        .then(res => {
          var data = res.data.data;
          this.essaies = data.data;
          this.total = data.total;
          console.log(data);
        })
        .catch(err => {
          console.log(err); //请求失败返回的数据
        });
    },
    // 跳转到更多问答详情页面
    goQandADetail(id) {
      this.$router.push({
        path: "QandADetail",
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
    .QandAMore_content {
      position: relative;
      width: 85%;
      padding-left: 60px;
      margin-bottom: 54px;
      // 内容标题
      .QandAMore_title {
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
        min-height: 500px;
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
          img {
            display: block;
            width: 24px;
            height: 24px;
            margin-right: 16px;
          }
          .essaies_Q {
            width: 100%;
            display: flex;
            margin-bottom: 24px;

            font-size: 18px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #333333;

            p {
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
            }
          }
          .essaies_A {
            width: 100%;
            display: flex;

            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #666666;

            p {
              overflow: hidden;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
              display: -webkit-box;
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