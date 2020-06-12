<template>
  <div class="demo">
    <!-- 内容 -->
    <div class="content">
      
    </div>
    <!-- 相关信息内容 -->
    <div class="infoBox">
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
      isorder: false
    };
  },
  watch: {},
  computed: {},
  methods: {
    // 打开/关闭 预约内容
    goOrder() {
      this.isorder = !this.isorder;
    }
  },
  created() {},
  mounted() {}
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
    width: 1113px;
    background: #ffffff;
    position: relative;
  }
  // 相关信息内容
  .infoBox {
    position: fixed;
    top: 125px;
    left: 60%;
    margin-left: 47px;
  }
}
</style>