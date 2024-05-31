<template>
  <div class="publish-flex">
    <div class="publish-main">
      发布页面
    </div>
  </div>
  <div class="bg">

  </div>
</template>

<script setup>

</script>

<style scoped>
.publish-flex {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  width: 100%;
  flex-direction: column;
  margin-top: 20px;
}

.publish-main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
  width: 1000px;
  background-color: #fff;
  border-radius: 8px;
}

.bg {
  position: absolute;
  width: calc(100% - 240px);
  height: 100%;
  background: #DCDFE6;
  z-index: -999;
}
</style>