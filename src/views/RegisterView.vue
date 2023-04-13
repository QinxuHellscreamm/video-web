<script setup lang="ts">
import { reactive, getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
import { useRouter } from "vue-router";
const router = useRouter();
const formState = reactive({
  username: "",
  email: "",
  password: "",
  phone: "",
});
const register = () => {
  console.log(proxy.$api);
  proxy
    .$api("post", "/user/register", formState)
    .then((res) => {
      proxy.$message.success("注册成功");
      router.go(-1);
    })
    .catch((err) => {
      console.log(err);
      if (err.code == "ERR_BAD_REQUEST") {
        console.log(proxy.$message);
        proxy.$message.error(err.response.data.error.errors[0].msg);
      }
    });
};
</script>

<template>
  <a-form>
    <a-form-item label="用户名">
      <a-input :value="formState.username" />
    </a-form-item>
    <a-form-item label="邮箱">
      <a-input :value="formState.email" />
    </a-form-item>
    <a-form-item label="密码">
      <a-input :value="formState.password" type="password" />
    </a-form-item>
    <a-form-item label="手机号">
      <a-input :value="formState.phone" />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" @click="register">注册</a-button>
    </a-form-item>
  </a-form>
</template>

<style scoped></style>
