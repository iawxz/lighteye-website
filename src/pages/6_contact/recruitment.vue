<template>
  <div class="demo">
    <div class="demo_contnet">
      <p class="title">招贤纳才</p>
      <div class="content">
        <img src="@/img/0_common/banner.png" alt />
        <div class="recruitment_content">
          <!-- 招聘信息 -->
          <div class="recruitment_info">
            <div class="table">
              <div>岗位类别</div>
              <div>岗位名称</div>
              <div>工作地点</div>
              <div>薪资待遇</div>
              <div>投递简历</div>
              <div>岗位职责</div>
            </div>
            <div class="table table_th" v-for="(item,index) in infos" :key="index">
              <div class="table_td">{{item.category}}</div>
              <div class="table_td">{{item.name}}</div>
              <div class="table_td">{{item.address}}</div>
              <div class="table_td">{{item.salary}}</div>
              <div class="table_td">
                <div class="goSubmit" @click="goSubmit(item.id)">投递岗位</div>
              </div>
              <div class="table_td">
                <div
                  class="goDetail"
                  :class="{goDetail_select:index==isDetail}"
                  @click="goDetail(index)"
                >
                  查看详情
                  <img v-if="index!=isDetail" src="@/img/6_contact/pulldown.png" alt />
                  <img v-else src="@/img/6_contact/pulldown_select.png" alt />
                </div>
              </div>
              <div class="table_detail" v-if="index == isDetail">
                <div class="detail_line" :class="[index%2==0 ? 'gray' : 'white']"></div>岗位职责
                <br />
                {{item.content}}
              </div>
            </div>
          </div>
          <!-- 页码 -->
          <div class="Pagination">
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
    </div>
    <!-- 投简历弹窗 -->
    <div class="resume" v-if="isSubmit">
      <div class="icon"></div>
      <div class="text">
        <p>请上传您的简历</p>
        <p>支持DOC、DOCX、PDF格式简历文件</p>
        <p>文件大小不超过8M</p>
        <input
          style="width:196px;"
          type="file"
          single
          @change="getFile($event)"
        />
        <div class="button button_sub" @click="resumeSubmit">立即上传</div>
        <div class="button button_clo" @click="backSubmit">取消</div>
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
      file: null, //上传的文件
      rid: null, //岗位id
      isDetail: 0, //第几项正在查看详情
      isSubmit: false, //是否在提交简历界面
      infos: [
        // {
        //   category: "实习生", //岗位类别
        //   name: "产品运营", //岗位名称
        //   address: "浙江/杭州/下沙", //工作地点
        //   salary: "3000", //薪资待遇
        //   content:
        //     "1、拥护企业品牌，认可企业文化和经营模式；2、具有公司法人资格，守法经营、信誉良好；3、有良好的现金流保障和健全的财务管理制度；4、熟悉代理区域市场行情，有良好的渠道资源；5、有组建团队经验和团队管理、培训经验；6、服从总部管理，维护品牌形象，积极进行市场开发，规范经营；" //岗位指责
        // },
        // {
        //   category: "实习生", //岗位类别
        //   name: "产品运营", //岗位名称
        //   address: "浙江/杭州/下沙", //工作地点
        //   salary: "3000", //薪资待遇
        //   content:
        //     "1、拥护企业品牌，认可企业文化和经营模式；2、具有公司法人资格，守法经营、信誉良好；3、有良好的现金流保障和健全的财务管理制度；4、熟悉代理区域市场行情，有良好的渠道资源；5、有组建团队经验和团队管理、培训经验；6、服从总部管理，维护品牌形象，积极进行市场开发，规范经营；" //岗位指责
        // },
        // {
        //   category: "实习生", //岗位类别
        //   name: "产品运营", //岗位名称
        //   address: "浙江/杭州/下沙", //工作地点
        //   salary: "3000", //薪资待遇
        //   content:
        //     "1、拥护企业品牌，认可企业文化和经营模式；2、具有公司法人资格，守法经营、信誉良好；3、有良好的现金流保障和健全的财务管理制度；4、熟悉代理区域市场行情，有良好的渠道资源；5、有组建团队经验和团队管理、培训经验；6、服从总部管理，维护品牌形象，积极进行市场开发，规范经营；" //岗位指责
        // },
        // {
        //   category: "实习生", //岗位类别
        //   name: "产品运营", //岗位名称
        //   address: "浙江/杭州/下沙", //工作地点
        //   salary: "3000", //薪资待遇
        //   content:
        //     "1、拥护企业品牌，认可企业文化和经营模式；2、具有公司法人资格，守法经营、信誉良好；3、有良好的现金流保障和健全的财务管理制度；4、熟悉代理区域市场行情，有良好的渠道资源；5、有组建团队经验和团队管理、培训经验；6、服从总部管理，维护品牌形象，积极进行市场开发，规范经营；" //岗位指责
        // },
        // {
        //   category: "实习生", //岗位类别
        //   name: "产品运营", //岗位名称
        //   address: "浙江/杭州/下沙", //工作地点
        //   salary: "3000", //薪资待遇
        //   content:
        //     "1、拥护企业品牌，认可企业文化和经营模式；2、具有公司法人资格，守法经营、信誉良好；3、有良好的现金流保障和健全的财务管理制度；4、熟悉代理区域市场行情，有良好的渠道资源；5、有组建团队经验和团队管理、培训经验；6、服从总部管理，维护品牌形象，积极进行市场开发，规范经营；" //岗位指责
        // },
        // {
        //   category: "实习生", //岗位类别
        //   name: "产品运营", //岗位名称
        //   address: "浙江/杭州/下沙", //工作地点
        //   salary: "3000", //薪资待遇
        //   content:
        //     "1、拥护企业品牌，认可企业文化和经营模式；2、具有公司法人资格，守法经营、信誉良好；3、有良好的现金流保障和健全的财务管理制度；4、熟悉代理区域市场行情，有良好的渠道资源；5、有组建团队经验和团队管理、培训经验；6、服从总部管理，维护品牌形象，积极进行市场开发，规范经营；" //岗位指责
        // },
        // {
        //   category: "实习生", //岗位类别
        //   name: "产品运营", //岗位名称
        //   address: "浙江/杭州/下沙", //工作地点
        //   salary: "3000", //薪资待遇
        //   content:
        //     "1、拥护企业品牌，认可企业文化和经营模式；2、具有公司法人资格，守法经营、信誉良好；3、有良好的现金流保障和健全的财务管理制度；4、熟悉代理区域市场行情，有良好的渠道资源；5、有组建团队经验和团队管理、培训经验；6、服从总部管理，维护品牌形象，积极进行市场开发，规范经营；" //岗位指责
        // },
        // {
        //   category: "实习生", //岗位类别
        //   name: "产品运营", //岗位名称
        //   address: "浙江/杭州/下沙", //工作地点
        //   salary: "3000", //薪资待遇
        //   content:
        //     "1、拥护企业品牌，认可企业文化和经营模式；2、具有公司法人资格，守法经营、信誉良好；3、有良好的现金流保障和健全的财务管理制度；4、熟悉代理区域市场行情，有良好的渠道资源；5、有组建团队经验和团队管理、培训经验；6、服从总部管理，维护品牌形象，积极进行市场开发，规范经营；" //岗位指责
        // },
        // {
        //   category: "实习生", //岗位类别
        //   name: "产品运营", //岗位名称
        //   address: "浙江/杭州/下沙", //工作地点
        //   salary: "3000", //薪资待遇
        //   content:
        //     "1、拥护企业品牌，认可企业文化和经营模式；2、具有公司法人资格，守法经营、信誉良好；3、有良好的现金流保障和健全的财务管理制度；4、熟悉代理区域市场行情，有良好的渠道资源；5、有组建团队经验和团队管理、培训经验；6、服从总部管理，维护品牌形象，积极进行市场开发，规范经营；" //岗位指责
        // },
        // {
        //   category: "实习生", //岗位类别
        //   name: "产品运营", //岗位名称
        //   address: "浙江/杭州/下沙", //工作地点
        //   salary: "3000", //薪资待遇
        //   content:
        //     "1、拥护企业品牌，认可企业文化和经营模式；2、具有公司法人资格，守法经营、信誉良好；3、有良好的现金流保障和健全的财务管理制度；4、熟悉代理区域市场行情，有良好的渠道资源；5、有组建团队经验和团队管理、培训经验；6、服从总部管理，维护品牌形象，积极进行市场开发，规范经营；" //岗位指责
        // },
        // {
        //   category: "实习生", //岗位类别
        //   name: "产品运营", //岗位名称
        //   address: "浙江/杭州/下沙", //工作地点
        //   salary: "3000", //薪资待遇
        //   content:
        //     "1、拥护企业品牌，认可企业文化和经营模式；2、具有公司法人资格，守法经营、信誉良好；3、有良好的现金流保障和健全的财务管理制度；4、熟悉代理区域市场行情，有良好的渠道资源；5、有组建团队经验和团队管理、培训经验；6、服从总部管理，维护品牌形象，积极进行市场开发，规范经营；" //岗位指责
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
    // 获取上传的文件数据
    getFile(event) {
      this.file = event.target.files[0];
      // console.log(this.file);
    },

    // 获取招贤纳才信息
    getInfo() {
      var data = {};
      data.per_page = this.per_page;
      data.page = this.page;
      this.$axios({
        method: "post",
        url: "https://api.ltsjdx.com/index.php/website/WebsiteRecruit/index",
        data: data
      })
        .then(res => {
          var data = res.data.data;
          this.infos = data.data;
          this.total = data.total;
          // console.log(data);
        })
        .catch(err => {
          console.log(err); //请求失败返回的数据
        });
    },
    // 查看详情
    goDetail(index) {
      this.isDetail = index;
    },
    // 简历投递
    goSubmit(id) {
      this.isSubmit = true;
      this.rid = id;
    },
    // 关闭简历投递窗口
    backSubmit() {
      this.isSubmit = false;
    },
    // 简历上传
    resumeSubmit() {
      var formData = new FormData();
      formData.append("file", this.file);
      formData.append("rid", this.rid);
      this.$axios({
        method: "post",
        url:
          "https://api.ltsjdx.com/index.php/website/WebsiteRecruitInfo/upload",
        data: formData
      })
        .then(res => {
          var data = res.data;
          if (data.code === 200) {
            this.$message({
              message: data.msg,
              type: "success"
            });
            this.isSubmit = false;
          } else {
            this.$message.error(data.msg);
          }
        })
        .catch(err => {
          console.log(err); //请求失败返回的数据
        });
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
  mounted() {}
};
</script>
<style lang="less" scoped>
.demo {
  position: relative;
  background: #f5f6f8;
  display: flex;
  align-items: center;
  justify-content: center;
  .demo_contnet {
    width: 1255px;

    .title {
      margin: 30px 0;
      font-size: 24px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(255, 133, 0, 1);
    }
    .content {
      position: relative;
      padding-bottom: 30px;
      margin-bottom: 30px;
      background: #ffffff;
      // 广告图展示
      img {
        width: 100%;
        height: 354px;
      }
      // 招聘内容
      .recruitment_content {
        margin-top: 30px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        // 招聘信息
        .recruitment_info {
          width: 1177px;
          border-radius: 1px;
          box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.1);
          .table {
            position: relative;
            border-radius: 1px;
            width: 100%;
            background: #e5e9ee;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            div {
              width: 186px;
              height: 54px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 16px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: #222222;
            }
          }
          .table_th {
            background: #ffffff;
            .table_td {
              font-size: 14px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #222222;
              // 提交简历
              .goSubmit {
                cursor: pointer;
                width: 96px;
                height: 28px;
                background: #ffb902;
                border-radius: 2px;
                font-size: 14px;
                color: #ffffff;
              }
              // 查看详情
              .goDetail {
                cursor: pointer;
                width: 113px;
                height: 28px;
                background: #ffffff;
                border-radius: 2px;
                border: 1px solid #d0d0d0;

                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #666666;
                img {
                  width: 12px;
                  height: 12px;
                  margin-left: 10px;
                }
              }
              .goDetail_select {
                border: 1px solid #ff8500;
                color: #ff8500;
              }
            }

            .table_detail {
              width: 100%;
              height: auto;
              text-align: left;
              padding: 10px 60px 20px;

              font-size: 12px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #222222;
              line-height: 28px;
              display: flex;
              flex-wrap: wrap;
              .detail_line {
                position: absolute;
                top: 54px;
                left: 0;
                width: 1177px;
                height: 2px;
              }
              .gray {
                background: #f7f7f7;
              }
              .white {
                background: #ffffff;
              }
            }
          }
          .table_th:nth-child(2n + 1) {
            background: #f7f7f7;
          }
        }
        // 页码
        .Pagination {
          margin: 50px 0 80px;
        }
      }
    }
  }
  .resume {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;

    width: 760px;
    height: 520px;
    border-radius: 12px;
    background: url("../../img/6_contact/resume_back.jpg") no-repeat center top;
    background-size: 100%;
    .icon {
      display: block;
      width: 204px;
      height: 233px;
      margin-right: 58px;
      background-image: url("../../img/6_contact/resume_submit.png");
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
    }

    .text {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      color: #222222;
      font-family: PingFangSC-Regular, PingFang SC;
      p:nth-child(1) {
        font-size: 24px;
        margin-bottom: 27px;
      }
      p:nth-child(2) {
        font-size: 14px;
        margin-bottom: 8px;
      }
      p:nth-child(3) {
        font-size: 14px;
        color: #f08437;
        margin-bottom: 43px;
      }
      .button {
        cursor: pointer;
        width: 324px;
        height: 45px;
        text-align: center;
        line-height: 45px;
        font-size: 16px;
      }
      .button_sub {
        background: #ffaf23;
        color: #ffffff;
        margin: 16px 0;
      }
      .button_clo {
        background: #efefef;
        color: #b0b0b0;
      }
    }
  }
}
</style>
<style lang="less">
// .el-pagination.is-background .el-pager li:not(.disabled).active{
//   background-color: #ff8500;
// }
// .el-pager li.active{
//   color: #ff8500;
// }
</style>