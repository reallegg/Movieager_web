<template>
<div class="divisionx"><h3>即将热映</h3>
  <div class="cardContain">
      <div class="wrapper-card">
        <div class="card" v-for="(item, index) in movieList" :key="index">
          <!--          引入资源防止403-->
          <meta name="referrer" content="no-referrer"/>
          <img :src="item.images.large" class="image" @click="getMovieDetail(item.id)">
          <div>
            <p style="white-space: pre-wrap;">{{item.title}} </p>
          </div>
        </div>
      </div>
    </div>
</div>
     
</template>

<script>

import axios from 'axios'
export default({
  name:'coming',
  data(){
    return{
      coming_soon:null,
      movieList:[],
      image:[]
    }
  },
  mounted(){
    var that = this;
    axios.request({
      method:'get',
      url:'/api/coming_soon/',
      })
    .then(function(response) {
      that.coming_soon = response,
      that.movieList=response.data.subjects
     })
    .catch(error => console.log(error))
  },
  methods:{
    getMovieDetail(id) {
      //localStorage.setItem('movieId', id);
    //  this.$router.push({ path:'/movieInfo/${id}' });
      this.$router.push({
          name: 'movieInfo',
          params: {
            id: id
          }
        })
    },
  }

})
</script>

<style>
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

</style>