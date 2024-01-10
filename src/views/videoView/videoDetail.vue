<script setup lang="ts">
import { onMounted, getCurrentInstance, reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const route = useRoute();
const { proxy } = getCurrentInstance();
const router = useRouter();
onMounted(() => {
  proxy.$api("get", "/video/video/" + route.query.id).then((res) => {
    console.log(res);
  });
});
</script>

<template>
  <div>
    <video src=""></video>
  </div>
</template>

<style scoped></style>
