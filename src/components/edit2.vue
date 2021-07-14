<template>
<div class="tab01">
<div>
    <div class="cardtedit"> 
    <div style="border-style: solid;
    border-width: 20px 20px;
    border-color:#f5f5f5"></div>

    <div class="cardheader">
    <b-row align-v="center" slot="header" >
       <b-col sm="1"></b-col>
      <b-col sm="2">
        <h3 class="mb-0">编辑资料</h3>
      </b-col>
      <b-col sm="4"></b-col>
      <b-col sm="2">
        <b-button variant="secondary" @click="reverse()">重置信息</b-button>
      </b-col>
      <b-col sm="2">
       <b-button variant="secondary" @click="edit()">提交编辑</b-button>
    </b-col>
    </b-row>
    </div>

    <div style="margin:20px;"></div>
    
    <!--
    <div> 
    <avatar class="fund" username="DC" background-color="#fff" :size="150"></avatar>
    </div>
    -->
    <b-container fluid class="container" >
   <h3 class="heading-small text-muted mb-4">用户信息</h3>
    <b-row class="my-1">
      <div style="margin:10px;"></div>
      <b-col sm="2">
        <label class="labeltext" >{{ '用户ID' }}</label>
         <div style="margin:30px;"></div>
        <label class="labeltext" >{{ '用户名' }}</label>
         <div style="margin:30px;"></div>
        <label class="labeltext" >{{ '邮箱' }}</label>
         <div style="margin:30px;"></div>
        <label class="labeltext" >{{ '电话' }}</label>
         <div style="margin:30px;"></div>
        <label class="labeltext" >{{ '生日' }}</label>
       
      </b-col>

      <b-col sm="9">
         <label class="labeltext">{{ form.userID }}</label>
         <div style="margin:30px;"></div>
        <b-form-input type='text'  
        v-model="form.name"></b-form-input>
         <div style="margin:30px;"></div>
        <b-form-input type='email'  
        v-model="form.email"></b-form-input>
         <div style="margin:30px;"></div>
        <b-form-input type='tel'  
        v-model="form.tel"></b-form-input>
         <div style="margin:30px;"></div>
        <b-form-input type='date'  
        v-model="form.date"></b-form-input>
      </b-col>

      <div style="margin:10px;">
      </div>
    </b-row>
   
   <div style="margin:20px;"></div>
    <b-row>
    <b-col class="labeltext" sm="2">
        <label>简介</label>
    </b-col>
    <b-col class="labeltext" sm="9">
      <b-form-textarea
          v-model="form.jianjie"
          placeholder="你的想法...."
          rows="3"
        ></b-form-textarea>
    </b-col>
    </b-row>
    <div style="margin:20px;"></div>

    <b-row>
    <b-col class="labeltext"  sm="2">
        <label>性别</label>
    </b-col>
    <b-col sm="9">
      <b-form-radio-group
          class="pt-2"
          v-model="form.sex"
          :options="['男', '女']"
        ></b-form-radio-group>
    </b-col>
    </b-row>
    <div style="margin:30px;"></div>
    
    <b-row>
    <b-col sm="5">
        <label></label>
    </b-col>
 
    </b-row>
  </b-container>
  </div>
  <div style="border-style: solid;
    border-width: 50px 20px;
    border-color:#fff"></div>

</div>
</div>
</template>


<script>
import Avatar from 'vue-avatar';
  export default {
     components:{
      Avatar
    },
    data() {
      return {
        form:{
          userID:null,
          name:null,
          email:null,
          tel:null,
          date:null,
          jianjie:null,
          sex:null
        }
      }
    },
    methods:{
      reverse(){
        //再次读取数据库
        var that = this;
        that.form.name='tom';
        that.form.email='123@165.com'
        that.form.userID='123'
        that.form.tel='13672743757'
        that.form.sex='男'
        that.form.jianjie='HELLO WORLD'

      },
      edit(){
        console.log(this.form.name)
        console.log(this.form.email)
        console.log(this.form.tel)
        console.log(this.form.date)
        console.log(this.form.jianjie)
        console.log(this.form.sex)
        alert("修改成功！");
        //连接数据库，读取信息
        //修改资料
      }
    },
    mounted:function(){
      //将用户ID和密码输入 链接数据库
      //读取资料 显示
      var that = this;
      that.form.name='tom';
      that.form.email='123@165.com'
      that.form.userID='123'
      that.form.tel='13672743757'
      that.form.sex='男'
      that.form.jianjie='HELLO WORLD'

    }
  }
</script>


<style scoped>


.labeltext{
  font-size: 1.5rem;
}

.heading-small {
    padding-top: .25rem;
    padding-bottom: .25rem;
    font-size: 1.5rem;
    letter-spacing: .04em;
    text-transform: uppercase;
}

.text-muted {
    color: #8898aa!important;
}

.mb-4, .my-4 {
    margin-bottom: 1.5rem!important;
}

.cardheader {
    padding: 1.25rem 1.5rem;
    margin-bottom: 0;
    align-items: center!important;
    border-bottom: 1px solid rgba(0,0,0,.05);
    margin: auto;
    
}

.cardtedit{
  width: 100%;
  position: relative;
  height:800px;
  background-color: #f5f5f5;

}

.fund{
  margin-top: 200px;
  margin: auto;
  width: 50%;
}

.container{
  
  width: 80%;
}

.info{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 100px;
  height: 100px;
  
}

.tab01{
	background: #222;
	margin-top: 40px;
  margin-left: 100px;
  margin-right: 100px;
	border-radius:25px;
}
</style>

