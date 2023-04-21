<script setup lang="ts">
import { reactive, getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
import { useRouter } from "vue-router";
const router = useRouter();
const formState = reactive({
  email: "",
  password: "",
});
const login = () => {
  console.log(proxy.$api);
  proxy
    .$api("post", "/user/login", formState)
    .then((res) => {
      console.log(res);
      localStorage.token = "Bearer " + res.token;
      router.push({ path: "/index/video" });
    })
    .catch((err) => {
      console.log(err);
      if (err.code == "ERR_BAD_REQUEST") {
        console.log(proxy.$message);
        proxy.$message.error(err.response.data);
      }
    });
};

const toRegister = () => {
  router.push({ path: "/register" });
};
</script>

<template>
  <a-form>
    <a-form-item label="邮箱">
      <a-input v-model:value="formState.email" />
    </a-form-item>
    <a-form-item label="密码">
      <a-input v-model:value="formState.password" type="password" />
    </a-form-item>
    <a-form-item>
      <a-button type="link" @click="toRegister">注册</a-button>
      <a-button type="primary" @click="login">登录</a-button>
    </a-form-item>
  </a-form>
</template>

<style scoped></style>
