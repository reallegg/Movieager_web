<template>
	<div class="login-register">
		<div class="contain">
			<div class="big-box">
				
				<div class="big-contain">
					<div class="btitle">请选择你感兴趣的标签</div>
					<div class="bform">
					<div class="tagline">		
					<b-row align-v="center" slot="header" >
       				<b-col sm="3">
  					<b-button variant="outline-secondary" 
					  @click="chooseTag_1()"
					  :pressed.sync="fanzui" >犯罪</b-button>
					</b-col>

					<b-col sm="1"></b-col>
					
					<b-col sm="3">
  					<b-button variant="outline-success"  
					  @click="chooseTag_2()"
					  :pressed.sync="dongzuo">动作</b-button>
					</b-col>
					
					<b-col sm="1"></b-col>
					
					<b-col sm="3">
 					<b-button variant="outline-danger" 
					 @click="chooseTag_3()"
					  :pressed.sync="aiqing">爱情</b-button>
					</b-col>
					</b-row>
					</div>

					<div class="tagline">
					<b-row align-v="center" slot="header" >
       				<b-col sm="3">
					<b-button variant="outline-warning"  
					@click="chooseTag_4()"
					:pressed.sync="xiju">喜剧</b-button>
					</b-col>

					<b-col sm="1"></b-col>
					
					<b-col sm="3">
  					<b-button variant="outline-info"  
					  @click="chooseTag_5()"
					  :pressed.sync="kehuan">科幻</b-button>
					</b-col>

					<b-col sm="1"></b-col>
					
					<b-col sm="3">
  					<b-button variant="outline-dark" 
					  @click="chooseTag_6()"
					  :pressed.sync="jinsong">惊悚</b-button>
					</b-col>
					</b-row>
					</div>
					</div>
					<button class="bbutton" @click="touser()">确认</button>
				</div>
			</div>
			<div class="small-box">
				
				<div class="small-contain">
					<div class="stitle">注册成功!</div>
					<p class="scontent">请选择你喜爱的标签，我们将为您生成的电影个性化推荐</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script scope>
	export default{
	data() {
      return {
        aiqing:false,
		dongzuo:false,
		kehuan:false,
		jinsong:false,
		xiju:false,
		fanzui:false,
		name:'tags',
		id:'',
		userid:'',
		username:'',
		userphone:'',
		userpwd:'',
		tags:'',

	// 	buttons: [
    //       { caption: '爱情', state: true },
    //       { caption: '动作', state: false },
    //       { caption: '科幻', state: true },
    //       { caption: '惊悚', state: false },
	// 	  { caption: '喜剧', state: false },
	// 	  { caption: '犯罪', state: false }
    // ]
	}
	},
	computed: {
     
    },
	methods:{
	touser(){
		const self = this
		let routerQuery_1 = self.$route.query.id
		let routerQuery_2 = self.$route.query.name
		let routerQuery_3 = self.$route.query.phone
		let routerQuery_4 = self.$route.query.pwd
		self.userid = routerQuery_1
		self.username = routerQuery_2
		self.userphone = routerQuery_3
		self.userpwd = routerQuery_4

		console.log(self.userid)
		console.log(self.username)
		console.log(self.userphone)
		console.log(self.userpwd)

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
					'uid':self.userid,
					'name':self.username,
					'phone':self.userphone,
					'pwd':self.userpwd,
					'tags':self.tags
				}
			},

		})
		.then(res => {
			console.log(res.data);
			self.$router.push({
          		path: '/user',
			  	query:{//query是刷新后还在，params刷新后消失
					uid:res.data.uid,
                 	name:res.data.name,
					phone:res.data.phone,
					pwd:res.data.pwd,
					tags:res.data.tags
             	}
        	})
			
		})
		.catch(err => {
			console.log(err);
		})
			
		},
		chooseTag_1(){
			this.tags += '犯罪'
			console.log(this.tags)
		},
		chooseTag_2(){
			this.tags += '动作'
			console.log(this.tags)
		},
		chooseTag_3(){
			this.tags += '爱情'
			console.log(this.tags)
		},
		chooseTag_4(){
			this.tags += '喜剧'
			console.log(this.tags)
		},
		chooseTag_5(){
			this.tags += '科幻'
			console.log(this.tags)
		},
		chooseTag_6(){
			this.tags += '惊悚'
			console.log(this.tags)
		}
	},
	mounted(){
		
	}
	}
</script>


<style scoped="scoped">
.tagline{
	display:inline-block;
	margin-left: 20px;
}
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