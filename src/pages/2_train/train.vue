<template>
  <div class="train">
    <p class="title">{{navlists[navselect].title}}</p>
    <div class="banner"></div>
    <div class="navlists">
      <div class="navlist" v-for="(item,index) in navlists" @click="navSelect(index)">
        <img :src="item.img" alt />
        <p :class="{selecttext:index == navselect}">{{item.title}}</p>
        <div class="selectline" v-show="index == navselect"></div>
      </div>
    </div>
    <div class="content">
      <!-- 相关信息 -->
      <div class="infos">
        <!-- 相关文章 -->
        <div class="essaies">
          <div class="essaies_title">
            <div class="essaies_name">
              {{navlists[navselect].title.slice(0, navlists[navselect].title.length - 2)}}
              <p>训练</p>
              <img src="@/img/2_train/title.png" alt />
            </div>
            <div class="essaies_more" @click="goTrainMore">更多 ></div>
            <div class="splitline"></div>
          </div>
          <div class="essaies_content">
            <div
              class="textbox"
              v-if="essaies.length>0"
              :style="{backgroundImage:'url('+ essaies[0].media +')'}"
              @click="goTrainDetail(essaies[0].id)"
            >
              <div class="texttitle">{{essaies[0].title}}</div>
            </div>
            <div class="textlists">
              <div
                class="textlist"
                v-for="(item,index) in essaies"
                :key="index"
                v-if="index > 0"
                @click="goTrainDetail(item.id)"
              >
                <div class="spot"></div>
                <p class="texttitle">{{item.title}}</p>
                <p class="texttime">{{item.create_time}}</p>
              </div>
            </div>
          </div>
        </div>
        <!-- 相关案例 -->
        <div class="case">
          <div class="splitline"></div>
          <p>我们都选择亮瞳</p>
          <div class="case_content"></div>
        </div>
      </div>

      <!-- 专题问答 -->
      <div class="QandA">
        <div class="QandA_title">
          <div class="QandA_name">
            专题
            <p>问答</p>
            <img src="@/img/2_train/title.png" alt />
          </div>
          <div class="QandA_more" @click="goQandAMore">更多 ></div>
          <div class="splitline"></div>
        </div>
        <div class="QandA_content">
          <div
            class="QandA_list"
            v-for="(item,index) in QandA"
            :key="index"
            v-if="index<7"
            @click="goQandADetail(item.id)"
          >
            <div class="Q">
              <img src="../../img/2_train/icon_Q.png" alt />
              <p>{{item.ask}}</p>
            </div>
            <div class="A">
              <img src="../../img/2_train/icon_A.png" alt />
              <p>{{item.answer}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      navselect: sessionStorage.getItem("train_nav"),
      navlists: [
        {
          title: "弱视训练",
          img: require("@/img/2_train/0_amblyopia.png")
        },
        {
          title: "斜视训练",
          img: require("@/img/2_train/1_squint.png")
        },
        {
          title: "远视训练",
          img: require("@/img/2_train/2_hyperopia.png")
        },
        {
          title: "屈光不正训练",
          img: require("@/img/2_train/3_astigmatism.png")
        },
        {
          title: "假性近视训练",
          img: require("@/img/2_train/4_pseudomyopia.png")
        },
        {
          title: "真性低度近视控制训练",
          img: require("@/img/2_train/5_lowmyopia.png")
        }
      ],
      // 相关文章模块标题
      essaies: [
        // {
        //   title: "弱视的护理方法",
        //   media: require("../../img/2_train/textboxBack.png")
        // },
        // {
        //   title: "弱视需要戴眼镜吗，眼睛好像也会变形",
        //   media: ""
        // },
        // {
        //   title:
        //     "弱视平时护理的方法，打发时间来看书就困了就阿东方斯卡拉的飞机上看了撒娇的快速了解阿萨德看了电视剧啊啊理解的反馈啦地方就是里卡多方式",
        //   media: ""
        // },
        // {
        //   title: "弱视了，孩子不听劝还是喜欢看电子设备",
        //   media: ""
        // },
        // {
        //   title: "弱视的六大原因",
        //   media: ""
        // },
        // {
        //   title:
        //     "将风口浪尖的是快乐的方式加快了就阿东方斯卡拉肌肤的斯库拉多夫上就困了就阿发生的考拉三等奖",
        //   media: ""
        // },
        // {
        //   title: "弱视的护理方法",
        //   media: ""
        // }
      ],
      QandA: [
        // {
        //   ask: "儿童弱视多久恢复，法律框架的反馈啦大煞风景卢卡斯大家阿斯科利",
        //   answer:
        //     "很多家长初次验光的时候，放得开了巨大逢山开路大家快来点击打开了巨大是快乐的肌肤发达的时代的风水大师大师赛的发生的打发等待撒范德萨阿法地方撒都是负担"
        // },
        // {
        //   ask: "儿童弱视多久恢复，法律框架的反馈啦大煞风景卢卡斯大家阿斯科利",
        //   answer:
        //     "很多家长初次验光的时候，放得开了巨大逢山开路大家快来点击打开了巨大是快乐的肌肤发达的时代的风水大师大师赛的发生的打发等待撒范德萨阿法地方撒都是负担"
        // },
        // {
        //   ask: "儿童弱视多久恢复，法律框架的反馈啦大煞风景卢卡斯大家阿斯科利",
        //   answer:
        //     "很多家长初次验光的时候，放得开了巨大逢山开路大家快来点击打开了巨大是快乐的肌肤发达的时代的风水大师大师赛的发生的打发等待撒范德萨阿法地方撒都是负担"
        // },
        // {
        //   ask: "儿童弱视多久恢复，法律框架的反馈啦大煞风景卢卡斯大家阿斯科利",
        //   answer:
        //     "很多家长初次验光的时候，放得开了巨大逢山开路大家快来点击打开了巨大是快乐的肌肤发达的时代的风水大师大师赛的发生的打发等待撒范德萨阿法地方撒都是负担"
        // },
        // {
        //   ask: "儿童弱视多久恢复，法律框架的反馈啦大煞风景卢卡斯大家阿斯科利",
        //   answer:
        //     "很多家长初次验光的时候，放得开了巨大逢山开路大家快来点击打开了巨大是快乐的肌肤发达的时代的风水大师大师赛的发生的打发等待撒范德萨阿法地方撒都是负担"
        // },
        // {
        //   ask: "儿童弱视多久恢复，法律框架的反馈啦大煞风景卢卡斯大家阿斯科利",
        //   answer:
        //     "很多家长初次验光的时候，放得开了巨大逢山开路大家快来点击打开了巨大是快乐的肌肤发达的时代的风水大师大师赛的发生的打发等待撒范德萨阿法地方撒都是负担"
        // },
        // {
        //   ask: "儿童弱视多久恢复，法律框架的反馈啦大煞风景卢卡斯大家阿斯科利",
        //   answer:
        //     "很多家长初次验光的时候，放得开了巨大逢山开路大家快来点击打开了巨大是快乐的肌肤发达的时代的风水大师大师赛的发生的打发等待撒范德萨阿法地方撒都是负担"
        // }
      ]
    };
  },
  watch: {
    // 监听nav选项的变化
    navselect: function(newval, oldval) {
      // 给相关文章模块标题重新赋值
      this.getTrainInfo();
      this.getQandAInfo();
    }
  },
  computed: {},
  methods: {
    // 获取训练项目数据
    getTrainInfo() {
      var data = {};
      data.cate = Number(this.navselect) + 1;
      data.per_page = 7;
      data.page = 0;
      this.$axios({
        method: "post",
        url: "https://api.ltsjdx.com/website/training_program/index",
        data: data
      })
        .then(res => {
          var data = res.data.data;
          this.essaies = data.data;
          //若展示图不存在 则展示占位图
          if(this.essaies[0].media == ""){
            this.essaies[0].media = require("../../img/0_common/textBoxL.png")
          }
        })
        .catch(err => {
          console.log(err); //请求失败返回的数据
        });
    },
    // 查看详情
    goTrainDetail(id) {
      this.$router.push({
        path: "trainDetail",
        query: {
          id: id
        }
      });
    },
    // 获取问答数据
    getQandAInfo() {
      var data = {};
      data.cate = Number(this.navselect) + 1;
      data.per_page = 7;
      data.page = 0;
      this.$axios({
        method: "post",
        url: "https://api.ltsjdx.com/website/Special/index",
        data: data
      })
        .then(res => {
          var data = res.data.data;
          this.QandA = data.data;
          // console.log(data)
        })
        .catch(err => {
          console.log(err); //请求失败返回的数据
        });
    },
    // 导航选中
    navSelect(index) {
      this.navselect = index;
    },
    // 跳转到更多训练方法页面
    goTrainMore() {
      this.$router.push({
        path: "trainMore",
        query: {
          navselect: this.navselect
        }
      });
    },
    // 跳转到更多问答方法页面
    goQandAMore() {
      this.$router.push({
        path: "QandAMore",
        query: {
          navselect: this.navselect
        }
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
    }
  },
  created() {
    // 实时监听 nav值的变化 方法写在main.js，传值写在app.vue
    window.addEventListener("setItem", () => {
      this.navselect = sessionStorage.getItem("train_nav");
    });
    this.getTrainInfo();
    this.getQandAInfo();
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.train {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #f5f6f8;
  .title {
    width: 1254px;
    font-size: 24px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #ff8500;
    margin: 21px 0 18px;
  }
  .banner {
    width: 1254px;
    height: 298px;
    background-image: url("../../img/2_train/banner.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    margin-bottom: 30px;
  }
  .navlists {
    width: 1254px;
    display: flex;
    justify-content: space-between;
    .navlist {
      cursor: pointer;
      position: relative;
      width: 192px;
      height: 148px;
      background: #ffffff;
      border-radius: 4px;
      border: 1px solid #e7e7e7;

      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      img {
        display: block;
        width: 68px;
        height: 68px;
        margin-bottom: 10px;
      }

      p {
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #222222;
      }

      .selectline {
        width: 194px;
        height: 6px;
        background: #fb8b01;
        position: absolute;
        left: -1px;
        bottom: -1px;
      }
    }
  }
  .content {
    width: 1254px;
    margin-top: 30px;
    background: #ffffff;
    display: flex;
    justify-content: space-between;
    padding-bottom: 110px;
    .infos {
      width: 752px;
      padding: 0 30px;
      // 相关文章
      .essaies {
        padding-top: 25px;
        .essaies_title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          .essaies_name {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #222222;
            p {
              color: #ffc023;
            }
            img {
              width: 31px;
              height: 17px;
            }
          }
          .essaies_more {
            cursor: pointer;
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #666666;
          }
          .splitline {
            width: 100%;
            height: 2px;
            background: #fb8b01;
            margin: 8px 0 17px;
          }
        }
        .essaies_content {
          display: flex;
          justify-content: space-between;
          // 图文栏
          .textbox {
            cursor: pointer;
            width: 333px;
            height: 250px;

            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            position: relative;
            .texttitle {
              width: 321px;
              height: 32px;
              line-height: 32px;
              padding-left: 12px;
              background: rgba(0, 0, 0, 0.4);

              position: absolute;
              left: 0;
              bottom: 0;

              font-size: 14px;
              font-weight: 400;
              color: #ffffff;
            }
          }
          // 文章标题列表
          .textlists {
            width: 401px;
            .textlist {
              cursor: pointer;
              height: 40px;
              line-height: 40px;
              display: flex;
              align-content: center;
              justify-content: space-between;
              border-bottom: 1px dashed #d4d4d4;
              .spot {
                width: 5px;
                height: 5px;
                margin: auto 0;
                background: #5b5b5b;
                border-radius: 50%;
                margin-right: 10px;
              }
              .texttitle {
                width: 294px;
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #222222;

                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                &:hover {
                  color: #ff8500;
                }
              }
              .texttime {
                width: 82px;
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #666666;
              }
            }
          }
        }
      }
      // 相关案例
      .case {
        .splitline {
          width: 100%;
          height: 2px;
          background: #ff9828;
          margin-top: 24px;
        }
        p {
          font-size: 18px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #ff8500;
          margin: 20px 0;
        }
        .case_content {
          width: 738px;
          height: 738px;
          background-image: url("../../img/2_train/case.png");
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
        }
      }
    }
    .QandA {
      width: 404px;

      padding-top: 25px;
      padding-right: 30px;
      .QandA_title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        .QandA_name {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #222222;
          p {
            color: #ffc023;
          }
          img {
            width: 31px;
            height: 17px;
          }
        }
        .QandA_more {
          cursor: pointer;
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;
        }
        .splitline {
          width: 100%;
          height: 2px;
          background: #fb8b01;
          margin: 8px 0 17px;
        }
      }
      .QandA_content {
        .QandA_list {
          cursor: pointer;
          width: 404px;
          height: 140px;
          background: #f7f7f7;
          border-radius: 8px;
          margin-bottom: 16px;

          display: flex;
          align-items: flex-start;
          justify-content: center;
          flex-direction: column;

          img {
            width: 24px;
            height: 24px;
            display: block;
            margin: 0 16px;
          }

          .Q {
            display: flex;
            font-size: 18px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #333333;
            margin-bottom: 20px;
            p {
              width: 310px;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
            }
          }
          .A {
            display: flex;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #666666;
            p {
              width: 330px;
              overflow: hidden;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              display: -webkit-box;
            }
          }
        }
      }
    }
  }
}
</style>