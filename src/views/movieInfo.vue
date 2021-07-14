<template>
<div>

     <div>
      <el-card class="moviecard" style="height: 200px;">
        <img :src="movie.images.large" class="avatar">
        <div class="introduce">
          <p class="title">{{movie.title}}
          </p>
          <p>标签：{{movie.genres[1]}},{{movie.genres[2]}},{{movie.genres[0]}}</p>
          <p>主演：{{movie.casts[0].name}},{{movie.casts[1].name}}</p>
          <p>评分：{{movie.rating.average}}<span>|</span>评论数：{{movie.comments_count}}</p>
        </div>
        <el-button class="same1" type="danger" margin-right="10px">喜欢</el-button>
      </el-card>

      <el-card class="moviecard">
        <div class="movieintroduce">电影简介</div>
        <div class="movieintroducet">
          <p>导演<span>:</span>{{movie.directors[0].name}}</p>
          <p>上映时间<span>:</span>{{movie.year}}<span>|</span>地区：{{movie.countries[0]}}</p>
          <p class="same">我的评分<span>:</span><el-rate @change="getscore()" v-model="value" text-color="#ff9900" allow-half style="display: inline-block;"></el-rate>
          {{ value2 }}</p>
        </div>
      </el-card>
        
     

      <el-card class="moviecard">
        <div class="movieintroduce">电影内容</div>  
        <div class="moviecontent">
          <p>{{ summery }}</p>
        </div>
      </el-card>


      <el-card class="moviecard">
        <div class="movieintroduce">相似电影</div>  
        <div class="moviecontent">
          
          <Lmovie></Lmovie>
     
        </div>
      </el-card>

      <el-card class="moviecard">
        <div class="movieintroduce">电影评论</div>
        <div class="newsContain">
          <div class="temp">
            <!--        @click="personDetail(item.id)-->
            <el-input placeholder="登录后才可以评论哟~"  v-model="commentInput" maxlength="50" v-show="!isLogin" disabled type="textarea" autosize style="margin-top: 20px">
            </el-input>
            <el-input placeholder="请输入内容"  v-model="commentInput" maxlength="50" v-show="isLogin" type="textarea" autosize style="margin-top: 20px">
            </el-input>
            <el-button @click="postComment" class="combtn2" plain size="small">评论</el-button>
            <div class="newsItem" v-for="(item, key) in comment" :key="key">
              <div class="picContain" ontouchstart="this.classList.toggle('hover');">
                <meta name="referrer" content="no-referrer"/>
                <Avatar  :username="item.userName"
                background-color="#ccc"
                color="#fff"
                style=" vertical-align: middle;"
                :inline="true">
                </Avatar>

              </div>
              <div>
                 <p style="white-space: pre-wrap; color: #66b1ff">用户：{{item.userName}}&nbsp;&nbsp;&nbsp;&nbsp;赞同：{{item.votes}}&nbsp;&nbsp;&nbsp;&nbsp;时间：{{item.commentTime}}
                 <b-icon class="picon" icon="star" variant="warning" @click="addfavor(1);item.like=!item.like" v-if="item.like==false"></b-icon>
                <b-icon class="picon" icon="star-fill" variant="warning" @click="removefavor(0);item.like=!item.like" v-else></b-icon>
                <p style="margin-top:25px">{{item.content}}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
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

import Avatar from 'vue-avatar'
import axios from 'axios'
import Lmovie from '../components/Lmovie.vue'
import Vue from 'vue'
import { BootstrapVue, BootstrapVueIcons } from  'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

//Vue.use(BootstrapVueIcons)
export default({
    components:{
      Avatar,
      Lmovie,
      
  //    Bscroll
      //BootstrapVueIcons,
      //star
    },


  name:'app',
  data(){
    return{
      flag:true,
      value:null,
      value2:null,
      value3:null,
      max:10,
      colors:['#99A9BF', '#F7BA2A', '#FF9900'],
      rcount:5,
      summery:'一场谋杀案使银行家安迪（蒂姆•罗宾斯 Tim Robbins 饰）蒙冤入狱，谋杀妻子及其情人的指控将囚禁他终生。在肖申克监狱的首次现身就让监狱“大哥”瑞德（摩根•弗里曼 Morgan Freeman 饰）对他另眼相看。瑞德帮助他搞到一把石锤和一幅女明星海报，两人渐成患难 之交。很快，安迪在监狱里大显其才，担当监狱图书管理员，并利用自己的金融知识帮助监狱官避税，引起了典狱长的注意，被招致麾下帮助典狱长洗黑钱。偶然一次，他得知一名新入狱的小偷能够作证帮他洗脱谋杀罪。燃起一丝希望的安迪找到了典狱长，希望他能帮自己翻案。阴险伪善的狱长假装答应安迪，背后却派人杀死小偷，让他唯一能合法出狱的希望泯灭。沮丧的安迪并没有绝望，在一个电闪雷鸣的风雨夜，一场暗藏几十年的越狱计划让他自我救赎，重获自由！老朋友瑞德在他的鼓舞和帮助下，也勇敢地奔向自由。',
      isLogin:true,
      movie:[],
      id:this.$route.params,
      count:1,
      //id=uid和mid路由取值
      userId:null,
      movieId:null,
      commentInput:null,
      time:null,//时间不能为空
      comment:[
        {'userName':'朝暮雪','votes':'33','commentTime':'2020-10-22','content':'“你知道，有些鸟儿是注定不会被关在牢笼里的，它们的每一片羽毛都闪耀着自由的光辉。” ','like':false},
        {'userName':'dragon','votes':'13','commentTime':'2021-1-2','content':'hope is a good thing','like':false},
        {'userName':'眠去','votes':'20','commentTime':'2006-11-13','content':'没有人会不喜欢吧！书和电影都好。','like':false},
        {'userName':'森林','votes':'4','commentTime':'2018-10-2','content':'一部没有爱情与美女的电影,却光芒四射','like':false},
        {'userName':'小海','votes':'5','commentTime':'2010-01-28','content':'这部电影没什么好说的，史上最完美的电影，没有一秒尿尿时间！','like':false},
        {'userName':'文泽尔','votes':'1','commentTime':'2006-06-15','content':'真不错，很好看','like':false},
        {'userName':'赫克托尔','votes':'2','commentTime':'2012-05-28','content':'这样的男人谁会舍得背叛。。。','like':false},
        {'userName':'寂地','votes':'12','commentTime':'2007-06-06','content':'有种鸟是关不住的.','like':false},
        {'userName':'影志','votes':'6','commentTime':'2006-02-04','content':'Fear Can Hold You Prisoner, Hope Can Set You Free','like':false},
        {'userName':'dragon','votes':'8','commentTime':'2006-06-20','content':'关于希望最强有力的注释。','like':false},
        {'userName':'小耳朵图吗','votes':'22','commentTime':'2007-08-21','content':'越狱我感觉就是改编自这个','like':false},
        {'userName':'南笙 ','votes':'21','commentTime':'2012-01-06','content':'对不起，我戒酒了。','like':false},
           ]
    }
 
  
  },
  methods:{
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
      },
      postComment(){
        const self = this;
        self.userId = 101;
        self.movieId = 44540;//速度与激情2
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
								'mid':self.movieId,
								'comment':self.commentInput,
                'time':self.time
							}
						},
					})
					.then( res => {
						console.log(res.data);
						//显示又要从数据库里面getuserbyid,从json取出名字
            //getcommentbymid???那名字怎么办..
            alert('评论成功');
						})
					.catch( err => {
						console.log(err);
					})
      }
  },
  mounted(){
    var that = this;
    const id = this.$route.params.id;
      //API
    axios.request({
      method:'get',
      url:'/api/details/'+id,
      }).then(function(response){
      console.log(response.data),
      console.log('API'+id),
      //response=>(this.data=response)
      that.movie = response.data
    })
    .catch(error => console.log(error))
  

  }
  
})

</script>

<style scoped>


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
    margin-top: 10px;
    margin-right: 10px;
    margin-bottom: 50px;
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
    height: 140px;
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
    width: 1000px;
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