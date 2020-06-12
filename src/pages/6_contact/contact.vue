<template>
  <div class="demo">
    <div class="demo_contnet">
      <p class="title">联系我们</p>
      <div class="content">
        <!-- 广告展示图 -->
        <img src="@/img/0_common/banner.png" alt />
        <!-- 相关联系信息 -->
        <div class="contact_info">
          <div class="contact_con">
            <div class="contact_address">
              <div class="contact_title">亮瞳视界总部联系方式</div>
              <div class="address_info">
                公司全称：
                <div class="address_info_con">
                  杭州亮瞳视界科技有限公司
                  <p>Hangzhou Bright Pupil Vision Technology Co.LTD</p>
                </div>
              </div>
              <div class="address_info">
                亮瞳视界总部联系方式：
                <div class="address_info_con">400-881-9698</div>
              </div>
              <div class="address_info">
                <p style="width:50px;">地址：</p>
                
                <div class="address_info_con">
                  浙江省杭州市江干区下沙七格北路459号和达高科生命科技中心18F
                  <p>No. 459, Xiasha Qige North Road, Jianggan District, Hangzhou City, Zhejiang Province</p>
                </div>
              </div>
              <div class="traffic_info">
                乘车路线：
                <div class="address_info_con">320路、264路到幸福桥，298路到邵逸夫下沙院区地铁1号线到下沙西</div>
                
              </div>
            </div>
            <div class="contact_phone">
              <div class="contact_title">咨询热线</div>
              <p>400-881-9698</p>
            </div>
          </div>

          <!-- 导航地图 -->
          <div class="contact_map"></div>
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
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
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
      height: 1110px;
      margin-bottom: 30px;
      background: #ffffff;
      // 广告展示图
      img {
        width: 100%;
        height: 354px;
        display: block;
      }
      .contact_info {
        margin-top: 39px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        // 联系信息内容
        .contact_con {
          width: 1077px;
          display: flex;
          justify-content: flex-start;
          .contact_title {
            font-size: 24px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #ff8500;
          }
          // 地址信息
          .contact_address {
            .contact_title {
              margin-bottom: 32px;
            }
            .address_info {
              display: flex;
              align-items: flex-start;
              justify-content: flex-start;
              width: 460px;
              margin-bottom: 12px;
              font-size: 14px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #666666;
              .address_info_con {
                color: #222222;
                font-weight: 700;
                p{
                  color: #666666;
                  font-size: 10px;
                  font-weight: 400;
                }
              }
            }
            .traffic_info{
              width: 455px;
              margin-bottom: 25px;
              font-size: 14px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #666666;
              .address_info_con {
                display: inline;
                color: #222222;
                font-weight: 700;
              }
            }
          }
          // 咨询热线
          .contact_phone {
            margin-left: 82px;
            .contact_title {
              margin-bottom: 22px;
            }
            font-size: 32px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #222222;
          }
        }
        // 导航地图
        .contact_map {
          width: 1077px;
          height: 380px;
          background: url('../../img/6_contact/map.png') no-repeat center top;background-size: 100%;
        }
      }
    }
  }
}
</style>