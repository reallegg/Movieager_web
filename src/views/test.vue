<template>
<div class="divisionx"><h3>test</h3>
  <div class="cardContain">
      <div class="wrapper-card">
        <div class="card" v-for="(item, index) in users" :key="index">
          <!--          引入资源防止403-->
          <meta name="referrer" content="no-referrer"/>
         <!-- <img :src="item.images.large" class="image" @click="getMovieDetail(item.mid)">-->
          <div>
                <td>{{item.uid}}</td>
                <td>{{item.name}}</td>
                <td>{{item.phone}}</td>
          </div>
        </div>
      </div>
    </div>
</div>
     
</template>

<script>
import axios from 'axios'
//import fetch from '../api/fetch';
export default ({
  data() {
    return {
      users: null,
    }
  },
  created(){
    const _this =this
    this.$axios.get('http://localhost:8081/movieager/user/getUserById/uid='+121).then(function (resp){
    console.log(resp)
    _this.users = resp.data
    })
  },
  mounted() {
    var that = this;
    axios.request({
        method:'get',
        url:'/api/search'+'肖申克的救赎'+'&page=0'
    })
      .then(function(response) {
        console.log(response.data),
      //  console.log(tags),
      //  console.log('juqing'),
        that.movieList = response
      })
.catch(error => console.log(error))
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