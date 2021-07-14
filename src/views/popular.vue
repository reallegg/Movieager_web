<template>
<div> 
  <el-container>
  <el-header></el-header>
  <el-container>
    <el-main>
   
      <div class="division0">
      <h3>当期热映</h3>
      <h3 style="color: #888;font-weight: 500">POPULAR_NOW</h3>
      </div>

      <div class="wrapper-card">
       <div class="cardContain">
        <div class="card" v-for="(item, index) in popular_now" :key="index">
          <meta name="referrer" content="no-referrer"/>
          <img :src="item.poster" class="image" @click="getMovieDetail(item.mid)">
          <div>
            <p style="white-space: pre-wrap;">{{item.name}} </p>
          </div>
        </div>
      </div>  
    </div>

     <el-pagination class="pag"
      layout="prev, pager, next"
      :total="30"
      @prev-click="reducecount()"
      @next-click="addcount()">
    </el-pagination>
     <div class="division0">
      <h3>即将上映</h3>
      <h3 style="color: #888;font-weight: 500">COMING_SOON</h3>
      </div>
      <div class="wrapper-card">
       <div class="cardContain">
        <div class="card" v-for="(item, index) in coming_soon" :key="index">
          <meta name="referrer" content="no-referrer"/>
          <img :src="item.poster" class="image" @click="getMovieDetail(item.mid)">
          <div>
            <p style="white-space: pre-wrap;">{{item.name}} </p>
          </div>
        </div>
      </div>
   </div>
    <el-pagination class="pag"
      layout="prev, pager, next"
      :total="20"
      @prev-click="reduceccount()"
      @next-click="addccount()">
    </el-pagination>


  </el-main>


 

    <el-aside width="400px">
      <div class="rating_answer">
        <ul>
          <li>
            <i class="el-icon-refresh" :style="display=inline-block" @click="refreash()"></i>
            <h5>近期影讯速递</h5> 
            
          </li>
         
        </ul>
      </div>


    <div v-for="(item, index) in newslist.slice(this.newcount, this.newcount+3)" :key="index">
    <b-card
    :title="item.title"
    :img-src="item.picUrl"
    :img-alt="Image"
    style="max-width: 15rem;
    margin-left: 80px;
    margin-top: 50px;"
    class="mb-2"
    >
    <b-card-text style="color:#5a5a5a">
      {{item.description}}
    </b-card-text>
    </b-card>
    </div>
    </el-aside>
  </el-container>
  </el-container>

</div>   
</template>

<script>

import axios from 'axios'
import { BIconThreeDotsVertical } from 'bootstrap-vue';
export default({
  name:'popular',
  data(){
    return{
      pcount:1,
      ccount:1,
      newcount:0,
      popular_now:[],
      coming_soon:[],
      movieList:[],
      image:[],
      newslist:[]
    }
  },
  methods:{
    getMovieDetail(id) {
      this.$router.push({
          name: 'movieInfo1',
          params: {
            id: id
          }
        })
    },
    refreash(){
      this.newcount=this.newcount+3;
    },
    addcount(){
      this.pcount++
      console.log(this.pcount)
      this.getmoviepopular()
    },
    reducecount(){
      this.pcount--
      console.log(this.pcount)
      this.getmoviepopular()
    },
    addccount(){
      this.ccount++
      this.getmoviecomming()
    },
    reduceccount(){
      this.ccount--
      this.getmoviecomming()
    },
    getmoviepopular(){
      var that = this;
      axios.request({
      method:'get',
      url:'http://localhost:8081/movieager/movie/getMoviesByTags/tags='+'正在上映'+'&&page='+that.pcount+'&&size=10',
      })
    .then(function(response) {
      //that.coming_soon = response,
      that.popular_now=response.data.content
      console.log(response.data.content)
     })
    .catch(error => console.log(error));

    },
    getmoviecomming(){
      var that = this;
      axios.request({
      method:'get',
      url:'http://localhost:8081/movieager/movie/getMoviesByTags/tags='+'即将上映'+'&&page='+that.ccount+'&&size=1',
      })
    .then(function(response) {
      //that.coming_soon = response,
      that.coming_soon=response.data.content
      console.log(response.data.content)
     })
    .catch(error => console.log(error));
    }
  },
  mounted(){
    var that = this;
    axios.request({
      method:'get',
      url:'http://localhost:8081/movieager/movie/getMoviesByTags/tags='+'即将上映'+'&&page='+that.ccount+'&&size=10',
      })
    .then(function(response) {
      //that.coming_soon = response,
      that.coming_soon=response.data.content
      console.log(response.data.content)
     })
    .catch(error => console.log(error));

       axios.request({
       method:'get',
       url:'/api/news/index?key=9a90a231affbe4721efcf7d87a79785e&num=15',
       })
     .then(function(response) {
       that.newslist=response.data.newslist
       console.log(newslist)
      })
     .catch(error => console.log(error));

      axios.request({
      method:'get',
      url:'http://localhost:8081/movieager/movie/getMoviesByTags/tags='+'正在上映'+'&&page='+that.pcount+'&&size=10',
      })
    .then(function(response) {
      //that.coming_soon = response,
      that.popular_now=response.data.content
      console.log(response.data.content)
     })
    .catch(error => console.log(error));
     
  },

})
</script>

<style scoped>


  .pag{
    padding-top: 50px;
    padding-left: 530px;
    padding-bottom: 80px;
  }

  .rating_answer {
    margin: auto;
    padding: 15px 46px 12px 28px;
    line-height: 1.5;
    background: whitesmoke;;
    border-radius: 4px;
    width: 282px;
  }

   .division0 {
    margin-left: 20px;
    margin-bottom: 10px; 
    width: 100%;
    height: 100px;
    text-align: center;
    padding-left: 10px;
    color: #5a5a5a;
    background-color: whitesmoke;
  }

  .cardContain {
    width: 100%;
    height: 100%;
    margin-left: 90px;
    background: #fff;
  }

  .wrapper-card {
   
    height: 600px;
    margin: 30px auto auto auto;
    padding-top: 30px;
  }

  .wrapper-card .card {
    color: #07111B;
    font-size: 16px;
    width: 150px;
    height: 200px;
    float: left;
    margin: 30px;
    border-radius: 6px;
  }

  .wrapper-card .image {
    border-radius: 6px 6px 0 0;
    width: 100%;
    height: 100%;
    margin-bottom: 20px;
    border-radius: 6px
  }


  .el-header, .el-footer {
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    
    color: #333;
    text-align: center;
 
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }


  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 380px;
  }
</style>