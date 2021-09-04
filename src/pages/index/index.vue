<template>
<div>
  <div v-if="showLogin">
    <login-window @changeShow="getModel(arguments)"></login-window>
  </div>
 
  <div class="show">
    <div class="button">
      <div class="btn1 right" @click="recall()">撤销</div>
      <div class="btn0" @click="reset()">清零</div>
    </div>
    <div class="mark-text">当前分数</div>
    <div class="mark">{{mark}}</div>
  </div>
  <div class="row">
    <div class="button right" @click="addMark(1)">+1</div>
     <div class="button left" @click="addMark(-1)">-1</div>
  </div>
  <div class="row">
    <div class="button right" @click="addMark(5)">+5</div>
     <div class="button left" @click="addMark(-5)">-5</div>
  </div>
</div>
</template>

<script>
import LoginWindow from '../../components/LoginWindow.vue'
import {showSuccess, showModel,post,get} from '@/util'
export default {
  components: { LoginWindow },
  data() {
    return {
      mark: 0,
      userinfo: {},
      showLogin: false
    }
  },
  methods: {
     async addMark(add) {
       try {
        const data = {
        openid: this.userinfo.openId,
        add:add
       }
        const res = await post('/weapp/createrecord',data)
        this.mark = this.mark + add
       } catch (error) {
         showModel("请求失败","请重试哦~")
         console.log("从后端返回的执行错误信息是：",error);
       }
      
    },
    getModel(val) {
      this.showLogin = val[0],
      this.userinfo = val[1],
      //每次登陆也自动读取分数
      this.getCurrentMark()
    },
    async getCurrentMark() {
      try {
        const res = await get('/weapp/getmark',{openid: this.userinfo.openId})
        //收到后端传递的分数并且更改当前分数
        this.mark = res.mark
      } catch (error) {
         showModel("请求失败","请下拉页面重试哦~")
         console.log("从后端返回的执行错误信息是：",error);
      }
    },
    //清零方法
    async resetMark() {
      if(this.mark !== 0){
        try {
          const res = await post("/weapp/resetmark",{openid:this.userinfo.openId})
          console.log("从后端传过来的信息：",res);
          this.mark = 0
        } catch (error) {
           showModel("请求失败","请重试哦~")
            console.log("从后端返回的执行错误信息是：",error);
        }
      }
    },
    reset() {
      var that = this
      wx.showModal({
        content:"确定要清零吗？",
        success: function(res){
          if(res.confirm) {
            that.resetMark()
          }
        }
      })
    },
    //撤销方法
    async recall() {
      try {
        const res = await post("/weapp/deleterecord",{openid:this.userinfo.openId})
        console.log("从后端传过来的信息：",res);
        this.mark = res.mark
        showSuccess("撤销成功")
      } catch (error) {
         showModel("失败",error.data.msg)
         console.log("从后端返回的执行错误信息是：",error);
      }
    }
  },
  mounted() {
    const userinfo = wx.getStorageSync('userinfo')
    if(userinfo.openId){
      this.userinfo = userinfo
      console.log("用户信息",this.userinfo);
    }else {
      wx.hideTabBar()
      this.showLogin = true
    }
  },
  onShow() {
    this.getCurrentMark()
  },
  //下拉刷新
  onPullDownRefresh() {
    console.log("我正在下拉刷新");
    this.getCurrentMark()
    wx.stopPullDownRefresh()
  },
  //分享
  onShareAppMessage() {
    return {
      title: "真自律",
      path: "/pages/index/main"
    }
  }
}
</script>

<style lang="scss">
  .show {
    text-align: center;
    height: 266px;
    background-color: #ea5149;
    margin-bottom: 5px;
    color: #fff;
    font-weight: 700;
    .mark-text {
      font-size: 20px;
      padding: 28px;
    }
    .mark {
      font-size: 88px;
    }
    .button{
      margin:0 10px;
      height: 30px;
      line-height:30px;
      text-align:center;
      font-size: 15px;
      font-weight:bold;
      background:#EA5149;
      .btn0{
        width: 60px;
        border-radius: 15px;
        border:1px dashed #feb600;
      }
      .btn1{
        width: 60px;
        border-radius: 15px;
        border:1px dashed #feb600;
      }
    }
  }
  .row {
    margin: 40px 56px;
    .button {
      width: 70px;
      height: 70px;
      line-height: 70px;
      border-radius: 20%;
      border: none;
      text-align: center;
      font-size: 25px;
      color: #fff;
      font-weight: 700;
    }
  }
  .right {
    background-color: #feb600;
    float: right;
  }
  .left {
    background-color: #ea5149;
    margin-right: 80px;
  }
</style>
