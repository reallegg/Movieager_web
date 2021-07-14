<template>
<div>


  <div class="division0">
      <h3>搜索结果</h3>
      <h3 style="color: #888;font-weight: 500"> RESULT </h3>
  </div>

  <div class="newsContain">
      <div class="temp">
        <div class="newsItem" v-for="(item, key) in resultlist" :key="key" @click="getMovieDetail(item.mid)">
        <div class="picContain" ontouchstart="this.classList.toggle('hover');">
            <meta name="referrer" content="no-referrer"/>
            <img :src=item.poster height="100" width="75">
        </div>
        <div>
            <p style="white-space: pre-wrap; font-weight: 700;font-size:18px;">{{item.name}} </p>
            <p>评分<span>：</span><span style="white-space: pre-wrap; font-weight: 700;font-size:18px;color:#ff9900" >{{item.score}}</span></p>
            <p>{{item.tags}}</p>
        </div>
        </div>
      </div>
    </div>

<div style="margin-top:50px"></div>

     <div class="division1">
      <el-button class="editt" @click="prePage()">上一页</el-button>
      <el-button type="primary" class="editt">{{this.count}}</el-button>
      <el-button class="editt" >{{this.count+1}}</el-button>
      <el-button class="editt" >{{this.count+2}}</el-button>
      <el-button class="editt" @click="nextPage()">下一页</el-button>
    </div>


   
</div>
<!--
        <div class="card" v-for="(item, index) in search_result" :key="index">
                    引入资源防止403-->
   
         <!-- <img :src="item.images.large" class="image" @click="getMovieDetail(item.mid)">
          <div>
                <td>{{item.name}}</td>
                <td>{{item.genres}}</td>
                <td>{{item.tags}}</td>
          </div>
        </div>
      </div>
      -->
<!--    </div>
</div>-->
</template>

<script>
import axios from 'axios'
export default({
  name:'app',
  data(){
    return{
      search_result:'',
      searchName:'',
      count:1,//页数
      resultlist:[]
    }
  },
  methods:{
    getMovieDetail(id) {
      //localStorage.setItem('movieId', id);
    //  this.$router.push({ path:'/movieInfo/${id}' });
       this.$router.push({
           name: 'movieInfo1',
           params: {
             id: id,
           }
         })
    },
    prePage() {
      if (this.count > 1) {
        this.count = this.count - 1;
      }
      this.getnextpage();
    },
    nextPage() {
      this.count = this.count + 1;
      this.getnextpage();
    },
    getnextpage(){
      const _this =this
     // 取到路由带过来的参数 
     let routerQuery = this.$route.query.search_result
     // 将数据放在当前组件的数据内
     _this.searchName = routerQuery
      console.log(_this.searchName)
     _this.$axios({
       method:'get',
       url:'http://localhost:8081/movieager/movie/getMoviesByName/name='+_this.searchName+'&&page='+_this.count+'&&size=8',
      })
     .then(response=>(//_this.search_result=response
     console.log(response),
     this.resultlist = response.data.content
     ))
    .catch(error => console.log(error))
    }
  },
  // created(){
  //   const _this =this
  //   // 取到路由带过来的参数 
  //   let routerParams = this.$route.query.search_result
  //   // 将数据放在当前组件的数据内
  //   _this.searchName = routerParams
  //   console.log(_this.searchName)
  //   this.$axios.get('http://localhost:8081/movieager/moive/getMoviesByName/name='+_this.searchName).then(function (resp){
  //   console.log(resp)
  //   _this.search_result = resp.data
  //   })
  // },
  mounted(){
    const _this =this
    // 取到路由带过来的参数 
    let routerQuery = this.$route.query.search_result
    // 将数据放在当前组件的数据内
    _this.searchName = routerQuery
    console.log(_this.searchName)
    _this.$axios({
       method:'get',
       url:'http://localhost:8081/movieager/movie/getMoviesByName/name='+_this.searchName+'&&page='+_this.count+'&&size=8',
      })
    .then(response=>(//_this.search_result=response
    console.log(response),
    this.resultlist = response.data.content
    ))
    .catch(error => console.log(error))
  }
  
})

</script>

<style>

 @import "../assets/animate.min.css";


  .division0 {
    margin-bottom: 10px; 
    width: 100%;
    height: 100px;
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
    padding-top: 10px;
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
    width: 100px;
    height: 130px;
  }
  .flipper {
    transition: 0.6s;
    transform-style: preserve-3d;
    position: relative;
  }
  .newsItem {
    display: flex;
    justify-content: flex-start;
    width: 1200px;
    margin: auto;
    height: 130px;
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



  .cardContain {
    width: 100%;
    height: 100%;
    background: #fff;
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
  .division {
    width: 100%;
    margin: 10px auto;
    text-align: center;
    padding-left: 10px;
    color: #5a5a5a;
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