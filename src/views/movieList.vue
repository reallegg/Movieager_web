<template>
  <div>
    <div class="division0">
      <h3>筛选电影</h3>
      <h3 style="color: #888;font-weight: 500"> CLASSCIFICATION </h3>  
      <div class="division1">
      <el-button style="margin-top: 10px" @click="selectTag('动作')">动作</el-button>
      <el-button style="margin-top: 10px" @click="selectTag('科幻')">科幻</el-button>
      <el-button style="margin-top: 10px" @click="selectTag('爱情')">爱情</el-button>
      <el-button style="margin-top: 10px" @click="selectTag('喜剧')">喜剧</el-button>
      <el-button style="margin-top: 10px" @click="selectTag('惊悚')">惊悚</el-button>
      <el-button style="margin-top: 10px" @click="selectTag('犯罪')">犯罪</el-button>
      </div>
      </div>    
    <div class="cardContain">
      <div class="wrapper-card">
        <div class="card" v-for="(item, key) in movieList" :key="key">
          <!--          引入资源防止403-->
          <meta name="referrer" content="no-referrer"/>
          <img :src="item.poster" class="image" @click="getMovieDetail(item.mid)">
          <div>
            <p style="white-space: pre-wrap;">{{item.name}}    </p>
          </div>
        </div>
      </div>
    </div>
    <div class="division1">
      <el-button class="editt" @click="prePage()">上一页</el-button>
      <el-button type="primary" class="editt">{{this.count}}</el-button>
      <el-button class="editt" >{{this.count+1}}</el-button>
      <el-button class="editt" >{{this.count+2}}</el-button>
      <el-button class="editt" @click="nextPage()">下一页</el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      movieList: [],
      count: 1,//分页
      tags:null,
      //isShow: false,
    };
  },
  mounted() {
    this.tags='动作';
    this.getMovie();
  },
  computed: {
  },
  methods: {
    getMovie(){
      var that = this;
      axios.request({
             method:'get',
             //url:'/api/Search'+tag
             url:'http://localhost:8081/movieager/movie/getMoviesByGenres/genres='+that.tags+'&&page='+this.count+'&&size=16'
      }).then(function(response) {
        //console.log(response.data.subjects),
        console.log(response.data),
        console.log(that.tags),
        that.movieList = response.data.content
      })
      .catch(error => console.log(error))
    },
    selectTag(tag) {
      //使用后端接口
       this.tags=tag;
       this.getMovie();
   

      //调用API
    //     var that = this;
    //     axios.request({
    //          method:'get',
    //          url:'/api/Search'+tag
    //     })
        
    //     .then(function(response) {
    //     console.log(response.data.subjects),
    //     console.log(response.data),
    //     console.log(tag),
    //     that.movieList = response.data.subjects
    //   })
    //   .catch(error => console.log(error))

    //数据库
    
    },  
    //翻页
    prePage() {
      if (this.count > 1) {
        this.count = this.count - 1;
      }
      this.getMovie();
    },

    nextPage() {
      this.count = this.count + 1;
      this.getMovie();
    },

    //电影详细信息
    getMovieDetail(id) {
      console.log(id)
      this.$router.push({
          name: 'movieInfo1',
          params: {
            id: id,
          }
        })
    },

    // getMovie(){
    //   //从后端接口返回tag对应的电影
    // }
  },
};
</script>


<style scoped>



  @import "../assets/animate.min.css";
  
  .wrapper-card .card{
    height: 250px;
  }

   .division {
    margin-bottom: 10px; 
    position: absolute;
    width: 100%;
    
    text-align: center;
    padding-left: 10px;
    color: #5a5a5a;
    background-color: whitesmoke;
  }

 .division1 {
    margin-bottom: 20px; 
    position: absolute;
    width: 100%;
    text-align: center;
    padding-left: 10px;
  }

   .division0 {
    margin-bottom: 10px; 
    width: 100%;
    height: 150px;
    text-align: center;
    padding-left: 10px;
    color: #5a5a5a;
    background-color: whitesmoke;
  }

  * {
    box-sizing: border-box;
  }
  body {
    background: #ededed;
    padding: 0;
    margin: 0;
  }
  .myMenu {
    position: sticky;
    top: 0;
    z-index: 100;
  }
  .indexContain {
    width: 100%;
    height: 100%;
    border: 1px solid #ededed;
    background: #fff;
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
    perspective: 500px;
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
    height: 1350px;
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