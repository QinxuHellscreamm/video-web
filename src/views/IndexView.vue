<script setup lang="ts">
import { ref, watch } from "vue";
const activeKey = ref("1");
import { useRouter } from "vue-router";
const router = useRouter();
watch(activeKey, (newValue) => {
  console.log(newValue);
  switch (newValue) {
    case "1":
      router.push({ path: "/index/video" });
      break;
    case "2":
      router.push({ path: "/index/upload" });
      break;
    case "3":
      router.push({ path: "/index/video" });
      break;
    case "4":
      router.push({ path: "/index/video" });
      break;
    default:
      break;
  }
});
</script>

<template>
  <div class="index-wrapper">
    <div class="router-view">
      <router-view />
    </div>
    <a-tabs v-model:activeKey="activeKey" type="line">
      <a-tab-pane key="1" tab="视频"></a-tab-pane>
      <a-tab-pane key="2" tab="上传" force-render></a-tab-pane>
      <a-tab-pane key="3" tab="Tab 3"></a-tab-pane>
      <a-tab-pane key="4" tab="Tab 4"></a-tab-pane>
    </a-tabs>
  </div>
</template>

<style scoped lang="scss">
.index-wrapper {
  height: 100%;
  .router-view {
    height: calc(100% - 46px);
  }
  ::v-deep .ant-tabs-nav {
    margin-bottom: 0;
  }
  ::v-deep .ant-tabs-nav-wrap {
    width: 100%;
    display: block;
    .ant-tabs-tab {
      flex: 1;
      margin: 0 22px;
      padding-left: 10px;
    }
  }
}
</style>
