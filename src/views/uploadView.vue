<script setup lang="ts">
import { ref, getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
import { PlusOutlined } from "@ant-design/icons-vue";
let file = ref(null);
const fileChange = (e) => {
  const userData = '{"Vod":"11","Title":"123"}';
  console.log(uploader.startUpload);
  file = e.target.files[0];
  uploader.addFile(file, null, null, null, userData);
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
    onUploadstarted: function (uploadInfo) {
      console.log(uploadInfo);
      proxy.$api("get", "/video/getvod").then((data) => {
        console.log(data);
        let uploadAuth = data.vod.UploadAuth;
        let uploadAddress = data.vod.UploadAddress;
        let videoId = data.vod.VideoId;
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
const startUpload = () => {
  uploader.startUpload();
};
console.log(uploader);
</script>

<template>
  <label tabindex="0" class="ant-upload" role="button" for="fileUpload">
    <div class="upload">
      <input
        type="file"
        capture="false"
        style="display: none"
        id="fileUpload"
        @change="fileChange($event)"
      />
      <plus-outlined :style="{ fontSize: '20px', lineHeight: '104px' }" />
    </div>
    <button @click="startUpload">上传</button>
  </label>
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
