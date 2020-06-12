<template>
  <div class="demo">
    <div class="demo_contnet">
      <p class="title">门店导航</p>
      <div class="content">
        <img src="@/img/0_common/banner.png" alt />
        <div class="maps_content">
          <!-- 搜索框 -->
          <div class="search_box">
            <el-select placeholder="请选择省级地区" v-model="province" @change="getCities">
              <el-option
                v-for="(item,index) in provinces"
                :key="index"
                :label="item.title"
                :value="item.code"
              ></el-option>
            </el-select>
            <el-select placeholder="请选择市级地区" v-model="city">
              <el-option
                v-for="(item,index) in cities"
                :key="index"
                :label="item.title"
                :value="item.code"
              ></el-option>
            </el-select>
            <div class="goSearch" @click="getStorelists">查询</div>
          </div>
          <!-- 门店列表 -->
          <div class="store_lists" v-if="total>0 ">
            <div class="store_list" v-for="(item,index) in store_lists" :key="index">
              <p>{{index<10 ? "0" + (index+1) :index}}</p>
              <p class="store_title">{{item.title}}</p>
              <div
                class="detail_button"
                @click="goDetail(index)"
                :class="{goDetail_select:index==isDetail}"
              >
                查看详情
                <img v-if="index!=isDetail" src="@/img/6_contact/pulldown.png" alt />
                <img v-else src="@/img/6_contact/pulldown_select.png" alt />
              </div>
              <div class="store_detail" v-if="index == isDetail">
                <div class="store_text">
                  <p>{{item.title}}</p>
                  <p>{{item.address}}</p>
                  <p>联系方式：{{item.phone}}</p>
                </div>
                <!-- 地图 -->
                <div class="amap-wrapper" style="height:282px;width:460px;">
                  <el-amap class="amap-box" vid="map" :zoom="zoom" :center="center">
                    <el-amap-marker vid="marker" :position="center" :label="label"></el-amap-marker>
                  </el-amap>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="nostore" v-else-if="total == 0 && city">
            <img src="../../img/0_common/none.png" alt="">
            <p>暂未找到该地区的店铺信息，快来加入亮瞳视界吧</p>
            <p>400-881-9698</p>
          </div>-->
          <!-- 页码 -->
          <div class="pagination">
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
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      // 地图测试
      zoom: 16,
      center: [121.406051, 31.179695],
      label: {
        content: "钦汇园",
        offset: [10, 12]
      },
      isStoreExist: null,//是否有店铺存在
      provinces: [], //省列表
      province: null,
      cities: [], //市列表
      city: null,
      isDetail: null, //第几项正在查看详情
      store_lists: [
        // {
        //   title: "滨江京安店",
        //   phone: "4008819686",
        //   address: "杭州市滨江区长河街道666号京安大楼1幢103室",
        //   lon: "100",
        //   lat: "200"
        // },
        // {
        //   title: "滨江京安店",
        //   phone: "4008819686",
        //   address: "杭州市滨江区长河街道666号京安大楼1幢103室",
        //   lon: "100",
        //   lat: "200"
        // },
        // {
        //   title: "滨江京安店",
        //   phone: "4008819686",
        //   address: "杭州市滨江区长河街道666号京安大楼1幢103室",
        //   lon: "100",
        //   lat: "200"
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
    // 获得省的列表
    getprovinces() {
      var data = null;
      this.$axios({
        method: "post",
        url: "https://api.ltsjdx.com/index.php/website/Store/provinces",
        data: data
      })
        .then(res => {
          this.provinces = res.data.data;
          // console.log(this.provinces);
        })
        .catch(err => {
          console.log(err); //请求失败返回的数据
        });
    },
    // 获取市列表
    getCities() {
      this.city = null;
      var data = {};
      data.code = this.province;
      this.$axios({
        method: "post",
        url: "https://api.ltsjdx.com/index.php/website/Store/cities",
        data: data
      })
        .then(res => {
          this.cities = res.data.data;
        })
        .catch(err => {
          console.log(err); //请求失败返回的数据
        });
    },
    // 获取门店信息
    getStorelists() {
      if (this.province || this.city) {
        var data = {};
        data.code = this.city;
        this.$axios({
          method: "post",
          url: "https://api.ltsjdx.com/index.php/website/Store/index",
          data: data
        })
          .then(res => {
            var data = res.data.data;
            this.store_lists = data.data;
            this.total = data.total;
          })
          .catch(err => {
            console.log(err); //请求失败返回的数据
          });
      } else {
        console.log(1);
      }
    },
    // 查看详情
    goDetail(index) {
      this.isDetail = index;
      this.center = []
      this.center.push(this.store_lists[index].lon,this.store_lists[index].lat)
      this.label.content = this.store_lists[index].title
    },
    // 页码:每页展示几条数据
    handleSizeChange(val) {
      this.per_page = val;
      this.getStorelists();
    },
    // 页码:当前是第几页
    handleCurrentChange(val) {
      this.page = val;
      this.getStorelists();
    }
  },
  created() {
    this.getprovinces(); //获取省列表
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.demo {
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
      margin-bottom: 30px;
      background: #ffffff;
      // 广告图展示
      img {
        width: 100%;
        height: 354px;
      }
      .maps_content {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        // 搜索框
        .search_box {
          margin: 37px 0 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          // 下拉框
          .el-select {
            margin-right: 24px;
            width: 280px;
            height: 40px;
            box-shadow: 0px 2px 9px 0px rgba(0, 0, 0, 0.03);
            // 下拉框图标
            /deep/ .el-select__caret:before {
              content: "\e78f";
              font-size: 18px;
            }
          }
          // 查询按钮
          .goSearch {
            cursor: pointer;
            width: 68px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            background: #ffb902;
            border-radius: 4px;
            font-size: 14px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #ffffff;
          }
        }
        // 门店列表
        .store_lists {
          .store_list {
            width: 1177px;

            background: #f7f7f7;
            border-radius: 1px;

            display: flex;
            align-items: center;
            justify-content: space-around;
            flex-wrap: wrap;

            font-size: 14px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #222222;

            margin-bottom: 16px;
            .store_title {
              width: 891px;
              height: 48px;
              line-height: 48px;
            }
            .detail_button {
              cursor: pointer;
              width: 113px;
              height: 28px;
              text-align: center;
              line-height: 28px;
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
            .store_detail {
              width: 100%;
              background: #ffffff;
              padding: 30px 0 25px;
              display: flex;
              align-items: center;
              justify-content: center;
              .store_text {
                width: 310px;
                p {
                  font-size: 14px;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: #222222;
                }
                p:nth-child(1) {
                  font-size: 18px;
                  font-weight: 500;
                  margin-bottom: 32px;
                }
                p:nth-child(2) {
                  margin-bottom: 4px;
                }
              }
              .store_map {
                width: 460px;
                height: 282px;
                margin-left: 100px;
                border: 1px solid red;
              }
            }
          }
        }
        // 无店面的时候
        .nostore {
          height: 300px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          img {
            display: block;
            background: none;
            width: 600px;
          }
          p:first-child {
            font-size: 32px;
            color: #f5f5f5;
          }
          p:nth-child(2) {
            font-size: 36px;
            color: #b2b2b2;
          }
        }
        // 页码
        .pagination {
          margin: 31px 0 57px;
        }
      }
    }
  }
}
</style>