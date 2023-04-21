<script setup lang="ts">
import { ref, getCurrentInstance, reactive } from "vue";
const { proxy } = getCurrentInstance();
import { PlusOutlined } from "@ant-design/icons-vue";

let file = ref(null);
let fileContent = ref(null);

const formState = reactive({
  title: "",
  description: "",
});
const fileChange = (e) => {
  const userData = '{"Vod":"11","Title":"123"}';
  console.log(e.target.files);
  file.value = e.target.files[0];
  uploader.addFile(file.value, null, null, null, userData);
  uploader.startUpload();
};
const uploaderFun = () => {
  const obj = new window.AliyunUpload.Vod({
    timeout: 60000,
    partSize: 1048576,
    parallel: 5, //上传分片数
    retryCount: 3, // 网络失败重试次数
    retryDuration: 2, // 网络失败重试间隔
    region: "cn-beijing", // 地区
    userId: "1538537828132699", // 用户id
    // 添加文件成功
    addFileSuccess: (uploadInfo) => {
      console.log(uploadInfo);
    },
    onUploadstarted: (uploadInfo) => {
      console.log(uploadInfo);
      proxy.$api("get", "/video/getvod").then((data) => {
        console.log(data);
        let uploadAuth = data.vod.UploadAuth;
        let uploadAddress = data.vod.UploadAddress;
        let videoId = data.vod.VideoId;
        let blob = new Blob([uploadInfo.file]);
        fileContent.value = URL.createObjectURL(blob);

        uploader.setUploadAuthAndAddress(
          uploadInfo,
          uploadAuth,
          uploadAddress,
          videoId
        );
        proxy.$api("post", "/video/createVideo").then((res) => {});
      });
    },
  });
  return obj;
};
const uploader = uploaderFun();

console.log(uploader);
</script>

<template>
  <div>
    <label tabindex="0" class="ant-upload" role="button" for="fileUpload">
      <div class="upload">
        <input
          type="file"
          capture="false"
          style="display: none"
          id="fileUpload"
          accept="video/mp4"
          @change="fileChange($event)"
        />
        <video :src="fileContent" v-if="fileContent" style="width: 100%;height: 100%"></video>
        <plus-outlined :style="{ fontSize: '20px', lineHeight: '104px' }" v-else/>
      </div>

    </label>
    <a-form
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      :model="formState"
    >
      <a-form-item label="邮箱">
        <a-input v-model:value="formState.title" />
      </a-form-item>
      <a-form-item label="密码">
        <a-input v-model:value="formState.description" type="password" />
      </a-form-item>
      <a-form-item>
        <!--        <a-button type="link" @click="toRegister">注册</a-button>-->
        <!--        <a-button type="primary" @click="login">登录</a-button>-->
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped lang="scss">
.upload {
  width: 104px;
  height: 104px;
  margin-right: 8px;
  margin-bottom: 8px;
  text-align: center;
  vertical-align: top;
  background-color: #fafafa;
  border: 1px dashed #d9d9d9;
  border-radius: 2px;
  cursor: pointer;
  transition: border-color 0.3s;
}
</style>
