<template>
<!-- 在线预约内容 -->
  <div class="order_content">
    <div class="order_title">
        <p>在线预约</p>
        <img src="@/img/0_common/close.png" @click="closeOrder" alt />
      </div>
      <div class="order_code">
        <img src="@/img/0_common/orderCode.png" alt />
        <p>请前往亮瞳视界小程序进行在线预约</p>
      </div>
  </div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
    }
  },
  watch:{},
  computed:{},
  methods:{
    closeOrder(){
      this.$emit('closeOrder')
    }
  },
  created(){},
  mounted(){}
}
</script>
<style lang="less" scoped>
// 在线预约
  .order_content {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
    border-radius: 10px;

    width: 414px;
    height: 460px;
    background: #f5f6f8;
    box-shadow: 0px 0px 20px #666666;
    .order_title {
      border-top-right-radius: 10px;
      border-top-left-radius: 10px;
      font-size: 18px;
      padding: 0 14px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      line-height: 48px;
      background: #ffffff;
      img{
        cursor: pointer;
      }
    }
    .order_code {
      height: 412px;
      display: flex;
      font-size: 18px;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      p {
        color: #fd8500;
        margin-top: 40px;
      }
    }
  }
</style>