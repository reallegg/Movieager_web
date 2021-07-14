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
        <h3 class="mb-0">修改密码</h3>
      </b-col>
      <b-col sm="6"></b-col>
      <b-col sm="2">
       <b-button variant="secondary" @click="edit1()">确认修改</b-button>
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
   <h3 class="heading-small text-muted mb-4">输入新旧密码</h3>
    <b-row class="my-1">
      <div style="margin:10px;"></div>
      <b-col sm="2">
        <label class="labeltext" >{{ '旧密码' }}</label>
         <div style="margin:30px;"></div>
        <label class="labeltext" >{{ '新密码' }}</label>
         <div style="margin:30px;"></div>
        <label class="labeltext" >{{ '再次确认' }}</label>
         <div style="margin:30px;"></div>
       
       
      </b-col>

      <b-col sm="9">
        <b-form-input type='password' v-model="form.psw"></b-form-input>
         <div style="margin:30px;"></div>
        <b-form-input type='password'  v-model="form.psw1"></b-form-input>
         <div style="margin:30px;"></div>
        <b-form-input type='password' v-model="form.psw2" ></b-form-input>
      </b-col>

      <div style="margin:10px;">
      </div>
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
            sex:null,
            psw:null,
            tags:null,
            psw:null,
            psw1:null,
            psw2:null,
          },
      }
    },
    mounted:function(){

       const self = this
		 // let routerQuery_1 = self.$route.query.uid
      self.form.userID = sessionStorage.getItem('uid')
      console.log(self.form.userID)
      self.$axios({
			    method:'get',
          url:'http://localhost:8081/movieager/user/getUserById/uid='+self.form.userID,
      })
		  .then(res => {
			  console.log(res.data);
        self.form.userID = res.data.uid;
        self.form.name = res.data.name;
        self.form.email = res.data.email;
        self.form.date = res.data.birth;
        self.form.tel = res.data.phone;
        self.form.sex = res.data.sex;
        self.form.jianjie = res.data.intro
        self.form.userID = res.data.id;
        // self.form.tel = res.data.phone;
        // self.form.name = res.data.name;
        // self.form.psw = res.data.pwd;
        self.form.tags = res.data.tags;
		  })
		  .catch(err => {
			  console.log(err);
		  })
      
    },
    methods:{
      edit1(){
        const self = this
		    //let routerQuery_pwd = self.$route.query.pwd
        console.log(this.form.psw)
        console.log(this.form.psw1)
        console.log(this.form.psw2)
        console.log(sessionStorage.getItem('pwd'))
        if(self.form.psw1 == self.form.psw2 && self.form.psw == sessionStorage.getItem('pwd')){
            const self = this
		        // let routerQuery_e1 = self.$route.query.uid
		        // let routerQuery_e2 = self.$route.query.name
		        // let routerQuery_e3 = self.$route.query.phone
		        // let routerQuery_e4 = self.$route.query.pwd
		        // let routerQuery_e5 = self.$route.query.tags
        
		        // self.form.userID = routerQuery_e1
		        // self.form.name = routerQuery_e2
		        // self.form.tel = routerQuery_e3
		        // self.form.psw2 = routerQuery_e4
            // self.form.tags = routerQuery_e5

      self.form.userID = sessionStorage.getItem('uid')

		  self.$axios({
			headers:{
				'Content-Type':'application/json;'
			},
			method:'post',
			url: 'http://localhost:8081/movieager/user/updateUser',

			transformRequest:[function(data){
			data = JSON.stringify(data);
			return data;
			}],
						
			data:{
				user:{
					'uid':self.form.userID,
					'name':self.form.name,
					'phone':self.form.tel,
					'pwd':self.form.psw2,
					'tags':self.form.tags,
          'email':self.form.email,
          'birth':self.form.date,
          'intro':self.form.jianjie,
          'sex':self.form.sex
				}
			},

		})
		.then(res => {
			console.log(res.data);
      alert("修改成功！");
		})
		.catch(err => {
			console.log(err);
		})
            
        }
        else{
          alert("密码输入不一致！")
        }
      },
  
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
  height:450px;
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

