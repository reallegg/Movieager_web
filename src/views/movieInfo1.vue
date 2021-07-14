<template>
<div>
     <div>
      <el-card class="moviecard" style="height: 240px;">
          <div style="margin: 15px 15px 15px 15px;">
        <img :src="movie.poster" class="avatar">
        <div class="introduce">
          <p class="title" style="font-weight: 700">{{movie.name}}</p>
          <p>标签：{{movie.genres}}</p>
          <p>主演：{{movie.actors}}</p>
          <p>评分：<span style="white-space: pre-wrap; font-weight: 700;font-size:18px;color:#ff9900" >{{movie.score}}</span></p>
        </div>
        <el-button v-show="isLogin" class="same1" type="danger" margin-right="10px">喜欢</el-button>
        
        
          </div>
      </el-card>

      <el-card class="moviecard">
        <div class="movieintroduce">电影简介</div>
        <div class="movieintroducet">
          <p>导演<span>:</span>{{movie.directors}}</p>
          <p>上映时间<span>:</span>{{movie.release}}<span>|</span>地区：{{movie.regions}}</p>
          <p class="same">我的评分<span>:</span>
          <el-rate v-show="isLogin"  @change="getscore()" v-model="value" text-color="#ff9900" allow-half style="display: inline-block;"></el-rate>
          <el-rate v-show="!isLogin" disabled v-model="value" text-color="#ff9900" allow-half style="display: inline-block;"></el-rate>
          {{ value2 }}</p>
        </div>
      </el-card>
        
     

      <el-card class="moviecard">
        <div class="movieintroduce">电影内容</div>  
        <div class="moviecontent">
          <p>{{ movie.storyline }}</p>
        </div>
      </el-card>


      <el-card class="moviecard">
        <div class="movieintroduce">相似电影</div>  
       <div class="cardContainx">
       <div class="wrapper-cardx">
        <div class="card" style="display: inline-flex;margin:20px 40px 20px 40px;" v-for="item in movieList" :key="item">
          <img :src="item.poster" style="height:200px;weight:20px" @click="getMovieDetail(item.mid)">
          <div>
            <p style="white-space: pre-wrap;">{{item.name}}  </p>
          </div>
        </div>
     </div>

     
        </div>
      </el-card>

      <el-card class="moviecard">
        <div class="movieintroduce">电影评论</div>
        <div class="newsContain">
          <div class="temp">
            <!--        @click="personDetail(item.id)-->
            <el-input placeholder="登录后才可以评论哟~"  maxlength="50" v-show="!isLogin"  disabled type="textarea" autosize style="margin-top: 20px">
            </el-input>
            <el-input placeholder="请输入内容"  v-model="commentInput" maxlength="50" v-show="isLogin" type="textarea" autosize style="margin-top: 20px">
            </el-input>
            <el-button v-show="!isLogin" class="combtn2"  size="small">评论</el-button>
            <el-button v-show="isLogin"  @click="postComment" class="combtn2" plain size="small">评论</el-button>
            
              <div v-show="!isLogin" class="cardContainx">
              <div class="division0">
                <a  class="a" href="/#/login">想要查看精彩评论，请先登录！</a>
              </div>
              </div>
            <div v-show="isLogin">
            <div class="newsItem" v-for="(item, key) in lcomment_List" :key="key">
              <div class="picContain" ontouchstart="this.classList.toggle('hover');">
                <meta name="referrer" content="no-referrer"/>
                <Avatar  :username="item.uname"
                background-color="#ccc"
                color="#fff"
                style=" vertical-align: middle;"
                :inline="true">
                </Avatar>
              </div>
              
              <div>
                <p style="white-space: pre-wrap; color: #66b1ff">用户：{{item.uname}}<el-divider direction="vertical"></el-divider>赞同：{{item.thumb}}<el-divider direction="vertical"></el-divider>时间：{{item.time.slice(0,10)}},{{item.time.slice(11,19)}}
                
                <p style="margin-top:25px">{{item.comment}}</p>
              </div>
            </div>
            <el-divider class="division0">以上为精选评论</el-divider>

            <div class="newsItem" v-for="(item, key) in tcomment_List" :key="key">
              <div class="picContain" ontouchstart="this.classList.toggle('hover');">
                <meta name="referrer" content="no-referrer"/>
                <Avatar  :username="item.uname"
                background-color="#ccc"
                color="#fff"
                style=" vertical-align: middle;"
                :inline="true">
                </Avatar>
              </div>

              <div>
                <p style="white-space: pre-wrap; color: #66b1ff">用户：{{item.uname}}<el-divider direction="vertical"></el-divider>赞同：{{item.thumb}}<el-divider direction="vertical"></el-divider>时间：{{item.time.slice(0,10)}},{{item.time.slice(11,19)}}
        
                <p style="margin-top:25px">{{item.comment}}</p>
              </div>
            </div>
          </div>

          </div>
        </div>
        <div v-show="isLogin">
          <el-button class="editt" @click="prePage()">上一页</el-button>
          <el-button type="primary" class="editt">{{this.count}}</el-button>
          <el-button class="editt" >{{this.count+1}}</el-button>
          <el-button class="editt" >{{this.count+2}}</el-button>
          <el-button class="editt" @click="nextPage()">下一页</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>

//import { Message, MessageBox } from 'element-ui'  //引入Message, MessageBox


import Avatar from 'vue-avatar'
import axios from 'axios'
import Lmovie from '../components/Lmovie.vue'
//import routerpage from  '../components/routerpage.vue'
import Vue from 'vue'
import { BootstrapVue, BootstrapVueIcons } from  'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
//Vue.prototype.$message = Message                //vue实例上挂载Message                
//Vue.prototype.$messagebox = MessageBox 
//Vue.use(BootstrapVueIcons)
export default({
    components:{
      Avatar,
      Lmovie,
      //routerpage,
      
  //    Bscroll
      //BootstrapVueIcons,
      //star
    },


  name:'app',
  data(){
    return{
      commentInput:null,
      flag:true,
      value:null,
      value2:null,
      value3:null,
      temptag:null,
      max:10,
      colors:['#99A9BF', '#F7BA2A', '#FF9900'],
      rcount:5,
      isLogin:null,
      movie:[],
      movieList:[],
      id:this.$route.params,
      count:1,
      form:{
        pid:null,
        uid:null,
        uname:null,
        mid:null,
        mname:null,
        rating:null,
        time:null
      },
      tcomment_List:[],
      lcomment_List:[], 
    }
    
  },
  mounted(){
    var that = this;
    const self = this
    const id = this.$route.params.id;
    that.isLogin = sessionStorage.getItem('isLogin')
    that.form.uid = sessionStorage.getItem('uid')

   

   //数据库 
      axios.request({
             method:'get',
             //url:'/api/Search'+tag
             url:'http://localhost:8081/movieager/movie/getMovieById/mid='+id
      }).then(function(response) {
 
        console.log(response.data),
        console.log('数据库'+id),

        that.movie = response.data
        self.form.mname = response.data.name
        sessionStorage.setItem('mname',response.data.name)
        console.log('电影名字'+sessionStorage.getItem('mname'))
        //取传值到子控件的值
        var temptag = (that.movie.genres).split("/")
        that.temptag = temptag[0]
         console.log(that.temptag)
         axios.request({
        method:'get',
        url:'http://localhost:8081/movieager/movie/getMoviesByGenres/genres='+that.temptag+'&&page='+that.count+'&&size=4            '
        })
        .then(function(response){
        console.log("子控件"),
        console.log(response.data),
        console.log(that.tag),
        that.movieList = response.data.content

        //获取名字
        that.$axios({
			    method:'get',
          url:'http://localhost:8081/movieager/user/getUserById/uid='+that.form.uid,
      })
		  .then(res => {
			  //console.log(res.data);
        self.form.uname = res.data.name;
        sessionStorage.setItem('uname',res.data.name)
        console.log('我的名字'+self.form.uname)
		  })
		  .catch(err => {
			  console.log(err);
		  })


      })
      .catch(error => console.log(error))
        })
      .catch(error => console.log(error));

      //显示评论
      //按时间
      axios.request({
      method:'get',
      url:'http://localhost:8081/movieager/comment/getCommentsByMid/mid='+id+'&&page=1&&size=10&&sort=time',
      })
    .then(function(response) {
      //that.coming_soon = response,
      that.tcomment_List=response.data.content
      console.log(response.data)
     })
    .catch(error => console.log(error));
     

    //精选评论
      axios.request({
      method:'get',
      url:'http://localhost:8081/movieager/comment/getCommentsByMid/mid='+id+'&&page=1&&size=5&&sort=thumb',
      })
    .then(function(response) {
      //that.coming_soon = response,
      that.lcomment_List=response.data.content
      console.log(response.data)
     })
    .catch(error => console.log(error));
      },

  methods:{
     open3() {
        this.$message({
          message: '请先登录！',
          type: 'warning'
        });
      },
     load () {
        this.rcount += 2
      },
      addfavor(key){
        console.log(key)
      },
      removefavor(key){
        console.log(key)
      },
      getscore(){
        this.value2=this.value*2
        console.log(this.value)
        console.log(this.value2)
        if(this.value2>=0&&this.value2<=2)
          this.value3=1
        else if(this.value2>2&&this.value2<=4)
          this.value3=2
        else if(this.value2>4&&this.value2<=6)
          this.value3=3
        else if(this.value2>6&&this.value2<=8)
          this.value3=4
        else if(this.value2>8&&this.value2<=10)
          this.value3=5
        console.log(this.value3)//value3输入数据库
        

        const self = this
        
        self.form.pid = sessionStorage.getItem('uid')
        self.form.uid = sessionStorage.getItem('uid')
        self.form.uname = sessionStorage.getItem('uname')
        self.form.mid = self.$route.params.id;
        self.form.mname = sessionStorage.getItem('mname')
        self.form.time = new Date().getTime()
        self.form.rating = self.value3

        self.$axios({
						headers:{
							'Content-Type':'application/json;'
						},
						method:'post',
						url: 'http://localhost:8081/movieager/preference/addPreference',

						transformRequest:[function(data){
							data = JSON.stringify(data);
							return data;
						}],
						
						data:{
							preference:{
								'id' : self.form.pid,
                'uid' : self.form.uid,
                'uname':self.form.uname,
                'mid': self.form.mid,
                'mname':self.form.mname,
                'rating': self.form.rating,
                'time': self.form.time,
							}
						},	
					})
					.then( res => {
						console.log(res.data);	
            alert('评分成功！');		   
					})
					.catch( err => {
						console.log(err);
					})
      },
      postComment(){
        const self = this;
        const mid = self.$route.params.id;
        self.userId = sessionStorage.getItem('uid');
        self.form.uname = sessionStorage.getItem('uname');
        self.movieId = mid;
        self.form.mname = sessionStorage.getItem('mname')
        self.time = new Date().getTime()
        
        self.$axios({
						headers:{
							'Content-Type':'application/json;'
						},
						method:'post',
						url: 'http://localhost:8081/movieager/comment/addComment',

						transformRequest:[function(data){
							data = JSON.stringify(data);
							return data;
						}],
						
						data:{
							comment:{
                'id':self.userId,
								'uid':self.userId,
                'uname':self.form.uname,
								'mid':self.movieId,
                'mname':self.form.mname,
								'comment':self.commentInput,
                'time':self.time,
                'thumb':0
							}
						},
					})
					.then( res => {
						console.log(res.data);
            if(res.data){
                alert('评论成功');
            //再次加载评论区    
            //显示评论
             //按时间
      self.$axios({
      method:'get',
      url:'http://localhost:8081/movieager/comment/getCommentsByMid/mid='+mid+'&&page=1&&size=5&&sort=time',
      })
    .then(function(response) {
      //that.coming_soon = response,
      self.tcomment_List=response.data.content
      console.log(response.data)
     })
    .catch(error => console.log(error));
            }
            
     })


      .catch( err => {
					console.log(err);
				})
      }
  },
   

})

</script>

<style scoped>


  .a{
       
        font-weight: 700;
        font-size: 16px;
        color: #5a5a5a;
  }

 .cardContainx {
    width: 100%;
    height: 30%;
    background: #fff;
  }

  .division0 {
    width: 100%;
    margin: 50px auto;
    text-align: center;
    padding-left: 10px;
    color: #5a5a5a;
    background-color: #fff;
  }


.scorecolor{
display: inline-block;
  color: #ff9900;
}

.picon{
    display: inline-block;
    margin: auto;
    position: absolute;
    margin-right: 10px;

}

.wrapper {
  display: flex;
  overflow-y: hidden;
  overflow-x: scroll;
}
.wrapper{
    display: flex;
    width:160rpx;
    height:160rpx;
}

.same1{
    display: inline-block;
    margin: auto;
    position: absolute;
    margin-left: 750px;
    margin-top: 30px;
    margin-right: 10px;
   
}

.same{
 display: inline-block;
}

 * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
  }

  div .moviecard {
    width: 1000px;
    margin: 20px auto auto auto;
  }

  .avatar {
    float: left;
    width: 126px;
    height: 180px;
  }

  .title {
    font-size: 21px;
  }

  .introduce {
    margin-left: 140px;
    height: 110px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .movieintroducet {
    /*margin-left: 0px;*/
    margin: 15px 15px 15px 15px;
    
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .movieintroducet p {
    margin: 5px;
  }

  .introduce p {
    margin: 8px;
  }

  p span {
    margin: 14px;
  }

  .movieintroduce {
    border-left: 5px solid #888;
    text-align: left;
    padding-left: 8px;
  }

  .moviecontent {
    margin: 15px 15px 15px 15px;
    text-align: left;
  }


  .moviebtn {
    float: right;
    margin-bottom: 20px;
  }

  .combtn {
    float: left;
    margin-top: 10px;
    margin-bottom: 20px;
  }

  .combtn2 {
    float: left;
    margin-top: 5px;
    margin-bottom: 20px;
  }

  .scorec {
    margin: 0px auto auto 0px;
  }

  .cardContain {
    width: 100%;
    height: 100%;
    background: #fff;
  }

  .newsContain {
    padding-top: 1px;
    width: 100%;
    height: 100%;
    background: #fff;
  }

  .picContain {
    margin-right: 10px;
    perspective: 1000px;
  }

  .picContain:hover .flipper, .picContain.hover .flipper {
    transform: rotateY(180deg);
  }

  .picContain, .itemPic, .back {
    width: 80px;
    height: 80px;
  }

  .flipper {
    transition: 0.6s;
    transform-style: preserve-3d;
    position: relative;
  }

  .newsItem {
    display: flex;
    justify-content: flex-start;
    width: 900px;
    margin: auto;
    height: 114px;
    text-align: left;
    color: #5a5a5a;
    font-weight: 500;
    padding-top: 15px;
    border-bottom: 1px solid #ededed;
  }

  .itemPic, .back {
    position: absolute;
    top: 0;
    left: 0;
    backface-visibility: hidden;
    background: #cc0000;
    text-align: center;
    color: white;
    font-weight: 500;
    line-height: 80px;
    white-space: nowrap;
  }

  .itemPic {
    z-index: 2;
  }

  .back {
    transform: rotateY(180deg);
  }

  .footer {
    width: 100%;
    height: 100px;
    background: black;
    padding-top: 20px
  }

  .footer a {
    color: white;
    text-decoration: none;
  }

  .aboutus {
    width: 100%;
    height: 500px;
    background: url("https://ydschool-video.nosdn.127.net/158480509232652112_AaOXxSky.jpg") no-repeat;
    background-size: 100% 100%;
    filter: grayscale(70%);
    opacity: 0.7;
    color: white;
    font-weight: 600;
    padding-top: 60px;
  }

  .aboutus p {
    margin-top: 30px;
    font-size: 18px;
  }

  #aboutusInfo {
    margin-top: 80px;
    animation-delay: 1s
  }

  .cardBox {
    position: relative;
    width: 1200px;
    margin: 20px auto 30px auto;
    box-shadow: 0 10px 15px #888;
    border-radius: 6px;
  }

  .wrapper-card {
    width: 1200px;
    height: 1000px;
    margin: 30px auto auto auto;
    padding-top: 30px;
  }

  .wrapper-card .card {
    color: #07111B;
    font-size: 16px;
    width: 230px;
    height: 243px;
    float: left;
    margin: 30px;
    border-radius: 6px;
  }

  .wrapper-card .card:hover {
    transform: translateY(-5px);
    transition: 3ms;
    box-shadow: 5px 5px 10px #888;
  }

  .wrapper-card .image {
    border-radius: 6px 6px 0 0;
    width: 100%;
    height: 100%;
    margin-bottom: 20px;
    border-radius: 6px;
  }

  .boxImg {
    width: 100%;
    height: 100%;
    border-radius: 6px;
  }

  .divisionx {
    width: 90%;
    margin: 10px auto;
    text-align: left;
    padding-left: 10px;
    color: #5a5a5a;
  }

  .footer img {
    width: 25px;
    height: 25px;
    margin-right: 10px
  }

  .footer span {
    margin-right: 20px;
  }

  .recommandInfo p {
    margin-bottom: 6px;
  }

  .el-progress__text {
    font-size: 16px !important;
    text-align: center !important;
  }

  .el-carousel-item {
    display: flex;
    justify-content: space-around;
  }

  .el-carousel {
    width: 1200px;
    margin: 0 auto;
  }

  .mytable {
    width: 100%;
    height: 700px;
  }

  .progress2 {
    width: 182px;
    border: 0;
  }

  .editt {
    margin: 0px auto auto 0px;
  }

</style>