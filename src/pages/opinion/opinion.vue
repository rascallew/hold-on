<template>
  <div>
    <div class="contain">
      <div class="row">
        <label class="name">意见与反馈</label>
      </div>
      <div class="row text">
        <div>
          <textarea v-model="opinion" maxlength="200" placeholder="点击这里输入您的建议" class="input"></textarea>
          <label class="word-count">{{word_count}}/200</label>
        </div>
      </div>
      <div class="row">
        <div>
          <label class="name">相关截图（选填）</label>
          <label for="">{{img_count}}/2</label>
        </div>
        <label v-for="(item,index) in src" :key="index">
          <img :src="item" class="img">
        </label>
        <label v-if="img_count<2" @click="uploadPicture">
          <img class="add-img" src="/static/images/addimage.png" alt="">
        </label>
      </div>
      <div class="row">
        <div class="name">
          微信号（选填）
        </div>
        <input v-model="wechat"
         maxlength="20"
          placeholder="如果想要详细交流，点击这里留下微信号哦~"
          class="wechat-input"/>
      </div>
    </div>
    <button @click="submmit">提交</button>
  </div>
</template>

<script>
import {post, showModel} from "@/util"
export default {
  data() {
    return{
      opinion:"",
      word_count:0,
      src:[],
      img_count:0,
      wechat:""
    }
  },
  //监控opinion的字数以及照片的张数
  watch: {
    opinion() {
      this.word_count = this.opinion.length
    },
    src() {
      this.img_count = this.src.length
    }
  },
  methods:{
    //从本地相册选择图片
    uploadPicture() {
      let that = this
      wx.chooseImage({
      count: 2,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.src.push(tempFilePaths)
        console.log("图片路径",that.src);
        }
      })
    },
    //异步向后端请求数据
    async submmit() {
      if(this.word_count > 0){
        const data = {
              opinion:this.opinion,
              src:this.src.join(','),
              wechat:this.wechat,
              openid: wx.getStorageSync('userinfo').openId
            }
          try {
            const res = await post('/weapp/ceateopinion', data)
            console.log("从后端返回的执行的正确信息是：",res);
            showModel('提交成功','已经将您的反馈提交给了开发者~')
          } catch (error) {
            console.log("从后端返回的错误信息是：",error);
            showModel("提交失败","服务器出了一点问题，请稍后再试~")
          }
      }else {
        showModel("提交失败","反馈信息不能为空~")
      }
    
  
  },
  //清除记录
  
  },
  
}
</script>

<style lang="scss">
  .contain{
  background:#FFFFFF;
  font-size:15px;
  .text {
    height: 110px;
  }
  .row{
    border-bottom: 1px #E8E8E8 solid;
    padding: 5px 15px;
    .name {
      width:80%;
      height: 40px;
      line-height: 40px;
    }
    .input {
      width:100%;
      height:85px;
      font-size:14px;
      padding-top:5px;
    }
    .word-count {
      float:right;
      color: #808080;
    }
    .img-count {
      float:right;
      line-height: 40px;
      color: #808080;
    }
    .add-img {
      width:80px;
      height:80px;
    }
    .img {
      width:66px;
      height:66px;
      margin-bottom:7px;
      margin-right: 10px;
    }
    .wechat-input{
      font-size:14px;
    }
  }
}  
button {
  margin:20px auto;
  width:90%;
  border-radius: 5px;
  background:#EA5149;
  font-size:16px;
  color:#FFFFFF;
  font-weight:bold;
}
</style>