<script setup lang="ts">
import { onMounted, getCurrentInstance, reactive, ref } from "vue";
const { proxy } = getCurrentInstance();
const pageSet = reactive({
  pageNum: 1,
  pageSize: 10,
});
const videoList = ref([]);
onMounted(() => {
  proxy.$api("get", "/video/list", pageSet).then((res) => {
    videoList.value = res.videoList;
    console.log(res);
  });
});
</script>

<template>
  <ul>
    <li v-for="video in videoList">
      <a-card hoverable style="width: 300px">
        <template #cover>
          <img alt="example" :src="video.cover" />
        </template>
        <a-card-meta :title="video.title" :description="video.description">
          <template #avatar>
            <a-avatar :src="video.user.cover" />
            <span></span>
          </template>
        </a-card-meta>
      </a-card>
    </li>
  </ul>

</template>

<style scoped></style>
