<script setup lang="ts">
import { onMounted, getCurrentInstance, reactive } from "vue";
const { proxy } = getCurrentInstance();
const pageSet = reactive({
  pageNum: 1,
  pageSize: 10,
});
onMounted(() => {
  proxy.$api("get", "/video/list", pageSet).then((res) => {
    console.log(res);
  });
});
</script>

<template>
  <a-card hoverable style="width: 300px"></a-card>
</template>

<style scoped></style>
