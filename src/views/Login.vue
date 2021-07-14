<template>
	<div class="login-register">
		<div class="contain">
			<div class="big-box" :class="{active:isLogin}">
				<div class="big-contain" v-if="isLogin">
					<div class="btitle">账户登录</div>
					<div class="bform">
						<input type="phone" placeholder="电话号码" v-model="form.userphone">
						<span class="errTips" v-if="IDError">* 用户ID填写错误 *</span>
						<input type="password" placeholder="密码" v-model="form.userpwd">
						<span class="errTips" v-if="IDError">* 密码填写错误 *</span>
					</div>
					<button class="bbutton" @click="login">登录</button>
				</div>
			
				<div class="big-contain" v-else>
					<div class="btitle">创建账户</div>
					<div class="bform">
						<input type="text" placeholder="用户名" v-model="register_form.name">
						<span class="errTips" v-if="existed">* 用户名已经存在！ *</span>
						<input type="phone" placeholder="手机号" v-model="register_form.phone">
						<input type="password" placeholder="密码" v-model="register_form.pwd">
					</div>
					<button class="bbutton" @click="register">注册</button>
				</div>
			</div>
			<div class="small-box" :class="{active:isLogin}">
				<div class="small-contain" v-if="isLogin">
					<div class="stitle">你好，朋友!</div>
					<p class="scontent">开始注册，和我们一起进入电影中的世界</p>
					<button class="sbutton" @click="changeType">注册</button>
				</div>
				<div class="small-contain" v-else>
					<div class="stitle">欢迎回来!</div>
					<p class="scontent">查看特制的电影个性化推荐，请登录你的账户</p>
					<button class="sbutton" @click="changeType">登录</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script scope>
	//import axios from 'axios';
	//axios.defaults.headers.post['Content-Type'] = 'application/json';
	export default{
		name:'login-register',
		data(){
			return {
				LoginResult:null,
				isLogin:false,
				IDError: false,
				//isRegister:false,
				passwordError: false,
				existed: false,
				RegisterResult:null,
				form:{
					username:'',
					userID:'',
					userphone:'',
					userpwd:'',
					//userPwd:''
				},
				register_form:{
					// userREGname:'',
					// userREGphone:'',
					// userREGpwd:'',
					name:'',
					phone:'',
					pwd:'',
				}
			}
		},
		methods:{
			changeType() {
				this.isLogin = !this.isLogin
				this.form.username = ''
				this.form.userphone = ''
				this.form.userID = ''
				this.form.userpwd = ''
				this.form.userPwd = ''
			},
			login() {
				const self = this;
				if(self.form.userphone.length!=11)
                        {
                            alert("请输入长度为11的手机号！")
                            exit
                        }
				if (self.form.userphone != "" && self.form.userpwd != "") {
					self.$axios({
						method:'get',
						url:'http://localhost:8081/movieager/user/loginByPhone/phone='+self.form.userphone+'&&pwd='+self.form.userpwd,
	
					})
					.then( res => {
						console.log(res);
						console.log(res.data.uid);
						this.LoginResult=res.data
						console.log(this.LoginResul);

						if(this.LoginResult === 'fail'){
							this.IDError = false;
							alert("登陆失败！");
						}
						   else{
							alert("登陆成功！");
							this.IDError = true;
						 	// this.$router.push({
          				 	// name: 'index',
       						// })
							sessionStorage.setItem('uid',res.data.uid)
							sessionStorage.setItem('isLogin',true)
							sessionStorage.setItem('pwd',res.data.pwd)
							sessionStorage.setItem('phone',res.data.phone)
							// var sess = sessionStorage.getItem('isLogin')
							// console.log('测试用的'+sess)
							this.$router.push({
              					path:'/user',
              					query:{//query是刷新后还在，params刷新后消失
								  	uid:res.data.uid,
                 					name:res.data.name,
									phone:res.data.phone,
									pwd:res.data.pwd,
									tag:res.data.tags,
             					 }
       						})
						}
					})
					.catch( err => {
						console.log(err);
					})
				} else{
					alert("填写不能为空！");
				}
			},
			chooseTags(){
			this.$router.push({
          	name: 'tags',
        	})
			},

			register(){
				const self = this;
				 if(self.register_form.phone.length!=11)
                        {
                            alert("请输入长度为11的手机号！")
                            exit
                        }
				if(self.register_form.name != "" && self.register_form.phone != "" && self.register_form.pwd != ""){

					self.$axios({
						headers:{
							'Content-Type':'application/json;'
						},
						method:'post',
						url: 'http://localhost:8081/movieager/user/addUser',

						transformRequest:[function(data){
							data = JSON.stringify(data);
							return data;
						}],
						
						data:{
							user:{
								'name':self.register_form.name,
								'phone':self.register_form.phone,
								'pwd':self.register_form.pwd
							}
						},
						
						
					})
					.then( res => {
						console.log(res.data);
						this.RegisterResult=res.data
						//console.log(this.RegisterResul);

						if(this.RegisterResult === ''){
							//this.IDError = false;还没有验证失败的情况
							alert("注册失败！");
						}
						   else{
							//alert("注册成功！");
							//this.IDError = true;
							sessionStorage.setItem('uid',res.data.uid)
							sessionStorage.setItem('isLogin',true)
							sessionStorage.setItem('pwd',res.data.pwd)
							sessionStorage.setItem('phone',res.data.phone)
							
						 	this.$router.push({
              					path:'/tags',
              					query:{//query是刷新后还在，params刷新后消失
								  	id:res.data.uid,
                 					name:res.data.name,
									phone:res.data.phone,
									pwd:res.data.pwd,
             					 }
       							})
						   }						   
					})
					.catch( err => {
						console.log(err);
					})
				} else {
					alert("填写不能为空！");
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.login-register{
		width: 100vw;
		height: 100vh;
		box-sizing: border-box;
	}
	.contain{
		width: 60%;
		height: 60%;
		position: relative;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		background-color: #fff;
		border-radius: 20px;
		box-shadow: 0 0 3px #f0f0f0,
					0 0 6px #f0f0f0;
	}
	.big-box{
		width: 70%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 30%;
		transform: translateX(0%);
		transition: all 1s;
	}
	.big-contain{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.btitle{
		font-size: 1.5em;
		font-weight: bold;
		color: #a9a9a9;
	}
	.bform{
		width: 100%;
		height: 40%;
		padding: 2em 0;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}
	.bform .errTips{
		display: block;
		width: 50%;
		text-align: left;
		color: red;
		font-size: 0.7em;
		margin-left: 1em;
	}
	.bform input{
		width: 50%;
		height: 30px;
		border: none;
		outline: none;
		border-radius: 10px;
		padding-left: 2em;
		background-color: #f0f0f0;
	}
	.bbutton{
		width: 20%;
		height: 40px;
		border-radius: 24px;
		border: none;
		outline: none;
		background-color:#a9a9a9;
		color: #fff;
		font-size: 0.9em;
		cursor: pointer;
	}
	.small-box{
		width: 30%;
		height: 100%;
		background: linear-gradient(135deg,#B2B9BE,#2F4052);
		position: absolute;
		top: 0;
		left: 0;
		transform: translateX(0%);
		transition: all 1s;
		border-top-left-radius: inherit;
		border-bottom-left-radius: inherit;
	}
	.small-contain{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.stitle{
		font-size: 1.5em;
		font-weight: bold;
		color: #fff;
	}
	.scontent{
		font-size: 0.8em;
		color: #fff;
		text-align: center;
		padding: 2em 4em;
		line-height: 1.7em;
	}
	.sbutton{
		width: 60%;
		height: 40px;
		border-radius: 24px;
		border: 1px solid #fff;
		outline: none;
		background-color: transparent;
		color: #fff;
		font-size: 0.9em;
		cursor: pointer;
	}
	
	.big-box.active{
		left: 0;
		transition: all 0.5s;
	}
	.small-box.active{
		left: 100%;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
		border-top-right-radius: inherit;
		border-bottom-right-radius: inherit;
		transform: translateX(-100%);
		transition: all 1s;
	}
</style>