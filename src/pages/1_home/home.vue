<template>
  <div class="home">
    <!-- 宣传海报-轮播 -->
    <div class="banners">
      <el-carousel :interval="3000" 
                   height="20.31rem" 
                   arrow="never"
                   trigger="click">
        <el-carousel-item v-for="(item,index) in banners" :key="index">
          <div :style="{backgroundImage:'url('+ item.img +')'}" class="banner"></div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 内容展示 -->
    <div class="content">
      <!-- 企业相关 -->
      <div class="related">
        <!-- 企业简介 -->
        <div class="intro" @click="goProfile">
          <div class="intro_box">
            <p class="intro_title">企业简介</p>
            <p class="intro_title_EN">COMPANY PROFILE</p>
            <p class="intro_subhead">
              用心呵护孩子的眼睛，让他们的世界更明亮、更精彩！
            </p>
            <p class="intro_detail">详细内容</p>
          </div>
        </div>
        <!-- 相关信息内容 -->
        <InfoBox @openOrder="goOrder"></InfoBox>
      </div>
      <!-- 眼疾矫正训练法 -->
      <div class="trains">
        <div class="train" v-for="(item,index) in trains" :key="index">
          <div class="train_intro" :style="{backgroundImage:'url('+ item.img +')'}">
            <p class="train_title">{{item.title}}</p>
            <p class="train_title_EN">{{item.title_EN}}</p>
            <p class="train_subhead">{{item.subhead}}</p>
          </div>
          <div class="train_essaies">
            <div
              class="train_essay"
              v-for="(item_,index_) in item.essaies"
              :key="index_"
              v-if="index_<3"
              @click="goTrainDetail(item_.id)"
            >{{item_.title}}</div>
          </div>
        </div>
      </div>
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
      banners: [
        { img: "http://ltsj-public.oss-cn-hangzhou.aliyuncs.com/upload/20200611/4b17ccdf65a78e49d1a140c9e5de40b2f9ee4c95.png"},
        { img: "http://ltsj-public.oss-cn-hangzhou.aliyuncs.com/upload/20200611/1b6054e05ed59ad798c2ee9a78bc40caff2cce0e.png" }
      ],
      trains: [
        {
          title: "弱视训练",
          title_EN: "AMBLYOPIA THERAPY",
          subhead:
            "世界那么大，看得清才精彩。见证弱视恢复实例，体验高清视力矫正方案。",
          img: "http://ltsj-public.oss-cn-hangzhou.aliyuncs.com/upload/20200611/b6f3c682e6352eb7109db20f52229f48ac267390.png",
          essaies: [
            {
              title: "做弱视训练真的有那个必要吗？",
              url: "/"
            },
            {
              title: "就这样？做弱视训练需要注意什么？",
              url: "/"
            },
            {
              title: "科普！弱视人群必看的小知识",
              url: "/"
            }
          ]
        },
        {
          title: "斜视训练",
          title_EN: "STRABISMUS TRAINING",
          subhead:
            "通过光物理训练刺激，可以激活痉挛的眼外肌，使眼部重获健康新生。",
          img: "http://ltsj-public.oss-cn-hangzhou.aliyuncs.com/upload/20200611/11a9fe6219cd50d4ebb8b4fc3b09f74908fceb8c.png",
          essaies: [
            {
              title: "做斜视训练应该注意哪些问题？",
              url: "/"
            },
            {
              title: "斜视训练真的可靠吗？多久能见效",
              url: "/"
            },
            {
              title: "斜视训练小妙招",
              url: "/"
            }
          ]
        },
        {
          title: "远视训练",
          title_EN: "HYPEROPIA TRAINING",
          subhead: "调节集合训练，专业亮瞳品牌，百万眼睛的共同选择。",
          img: "http://ltsj-public.oss-cn-hangzhou.aliyuncs.com/upload/20200611/c8d3b18faeed5807d6e2b685e2cb5d93fe10e16a.png",
          essaies: [
            {
              title: "远视训练的必要性，可靠吗？",
              url: "/"
            },
            {
              title: "重大福利，贵价眼药纳入医保拉！",
              url: "/"
            },
            {
              title: "远视训练一次的时长",
              url: "/"
            }
          ]
        },
        {
          title: "屈光不正训练",
          title_EN: "ASTIGMATISM THERAPY",
          subhead: "一对一智能屈光不正训练。开启视觉新时代，眼睛“看见”更“看好”。",
          img: "http://ltsj-public.oss-cn-hangzhou.aliyuncs.com/upload/20200611/3a72c0e170a8e86d17f17400601b0a8ba19d6e34.png",
          essaies: [
            {
              title: "做屈光不正训练的注意事项",
              url: "/"
            },
            {
              title: "屈光不正训练之后的食谱有什么讲究的吗",
              url: "/"
            },
            {
              title: "科普！屈光不正人群必看的小知识",
              url: "/"
            }
          ]
        },
        {
          title: "假性近视训练",
          title_EN: "PSEUDOMYOPIA TRAINING",
          subhead:
            "近视不只是配镜，假性近视恢复训练，体验高清假性近视矫正方案。",
          img: "http://ltsj-public.oss-cn-hangzhou.aliyuncs.com/upload/20200611/dca6bdbb712a63ea710a8c363243fa1e87b972c2.png",
          essaies: [
            {
              title: "做近视训练前应该注意哪些问题？",
              url: "/"
            },
            {
              title: "近视训练的注意事项",
              url: "/"
            },
            {
              title: "假性近视训练的正确方法",
              url: "/"
            }
          ]
        },
        {
          title: "真性低度近视控制训练",
          title_EN: "CONTROL TRAINNING OF TURE LOW  MYOPIA",
          subhead:
            "守护您的心灵之窗，真性低度近视患者必备的，控制度数增长的近视防控术。",
          img: "http://ltsj-public.oss-cn-hangzhou.aliyuncs.com/upload/20200611/d9f0f0a9aeffd6b9642d8dd01afcc136f1887b79.png",
          essaies: [
            {
              title: "真性低度近视可以恢复到最开始的健康状态吗",
              url: "/"
            },
            {
              title: "需要控制多久才能恢复？",
              url: "/"
            },
            {
              title: "孩子看不清黑板，一定是近视吗？",
              url: "/"
            }
          ]
        }
      ],
      isorder: false
    };
  },
  watch: {},
  computed: {},
  methods: {
    // 打开/关闭 预约内容
    goOrder() {
      this.isorder = !this.isorder;
    },
    // 跳转到企业简介
    goProfile() {
      this.$router.push("/profile");
    },
    // 跳转到训练详情简介
    goTrainDetail(id){
      this.$router.push({
        path: "trainDetail",
        query: {
          id: id
        }
      });
    },
    // 获取首页数据
    getInfo() {
      this.$axios({
        method: "post",
        url: "https://api.ltsjdx.com/index.php/website/Index/index",
        data: ""
      })
        .then(res => {
          var data =res.data.data
          // this.banners = data.top
          for(var i in data.info){
            var essaies =  data.info[i].TrainingProgram
            this.trains[i].essaies = essaies
          }
        })
        .catch(err => {
          console.log(err); //请求失败返回的数据
        });
    },
    
  },
  created() {
    this.getInfo();
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.home {
  position: relative;
  min-width: 1200px;
  background-color: #f5f6f8;
  // 宣传海报-轮播
  .banners {
    width: 100%;
    height: 655px;
    .banner {
      width: 100%;
      // min-width: 1200px;
      height: 655px;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
    }
  }
  // 内容展示
  .content {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    // 企业相关
    .related {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 48px;
      margin-bottom: 24px;
      // 企业简介
      .intro {
        width: 840px;
        height: 324px;
        margin-right: 24px;

        background-image: url("http://ltsj-public.oss-cn-hangzhou.aliyuncs.com/upload/20200611/c17988523ab0b9f8814e4769959ef307fc18303c.png");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;

        display: flex;
        align-items: center;
        justify-content: center;

        .intro_box {
          width: 480px;
          height: 250px;
          border: 1px solid rgba(255, 255, 255, 0.6);
          color: #ffffff;
          font-size: 16px;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          p {
            margin-bottom: 15px;
          }
          p.intro_title {
            font-size: 24px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
          }
          p.intro_title_EN {
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            letter-spacing: 5px;
          }
          p.intro_subhead {
            text-align: center;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
          }
          p.intro_detail {
            cursor: pointer;

            width: 80px;
            height: 30px;
            background: #ffffff;
            border-radius: 4px;
            text-align: center;
            line-height: 30px;
            margin-top: 10px;

            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #fd8500;
          }
        }
      }
    }
    //眼疾矫正训练法
    .trains {
      width: 1296px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      margin-bottom: 36px;
      .train {
        width: 408px;
        margin: 0 12px 24px;
        background: #ffffff;
        .train_intro {
          padding-top: 26px;
          padding-left: 32px;
          height: 154px;
          color: #ffffff;
          background-repeat: no-repeat;
          background-position: center center;
          background-size: cover;
          .train_title {
            font-size: 28px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
          }
          .train_title_EN {
            font-size: 14px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
          }
          .train_subhead {
            margin-top: 16px;
            font-size: 14px;
            width: 308px;
            height: 40px;
          }
        }
        .train_essaies {
          padding: 8px 24px 20px;
          height: 122px;
          .train_essay {
            font-size: 14px;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);

            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            cursor: pointer;
            padding: 10px 0 9px;
            border-bottom: 1px dotted #c7c7c7;
            &:hover {
              color: #fd8500;
            }
          }
        }
      }
    }
  }
}
</style>