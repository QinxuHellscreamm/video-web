<script setup lang="ts">
import { onMounted, getCurrentInstance, reactive, ref } from "vue";
const { proxy } = getCurrentInstance();
import { useRouter } from "vue-router";
const router = useRouter();
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

const videoPlay = (video) => {
  console.log(video);
  router.push({
    path: "/video/videoDetail",
    query: { id: video._id },
  });
};
</script>

<template>
  <div class="wrapper">
    <ul>
      <li v-for="video in videoList" @click="videoPlay(video)">
        <a-card hoverable style="">
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
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  padding: 1rem;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  //justify-content: space-between;
  align-items: center;
  li {
    margin-top: 0.8rem;
  }
}
</style>
