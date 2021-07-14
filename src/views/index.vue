<template>

<div>

<header>
  <div class="cardBox">
        <el-carousel trigger="click" height="400px" style="position: sticky;">
          <el-carousel-item v-for="(item, key) in crouselImg" :key="key">
            <img :src="item.img" class="boxImg">
          </el-carousel-item>
        </el-carousel>
      </div>

</header>

<div style="margin-top:50px"/>


 <div class="division"><h3>为您推荐</h3>
      <h3 style="color: #888;font-weight: 400"> RECOMMENDMOVIES </h3></div>
    <div v-show="isLogin" class="cardContainx">
      <i style="margin-left:1350px" class="el-icon-refresh" @click="change()">换一批</i>
      <div class="wrapper-cardx1" style="margin: 0px auto auto auto;">
  <div class="mt-4 card" v-for="(item, key) in recommand_result.slice(0,4)" :key="key">
    <b-card :img-src="item.poster" img-alt="Card image" img-left class="image" @click="getMovieDetail(item.mid)">
      <b-card-text>
         <div class="division" style="font-weight: 700"><h3>{{item.name}}</h3></div>
       <div style="margin:40px 25px 25px 20px;
       text-indent : 20px;
       letter-spacing:2px;">{{ item.storyline }}</div>
      </b-card-text>
    </b-card>
  </div>
  </div>
    </div>
  


      
   
    <div v-show="!isLogin" class="cardContainx">
      <div class="division0">
      <a  class="a" href="/#/login">想要查看个性化电影推荐，请先登录！</a>
      </div>
    </div>
    
 <div class="division"><h3>豆瓣精选TOP电影</h3>
      <h3 style="color: #888;font-weight: 400"> MOVIETOP20 </h3></div>
    <div class="cardContainx">
      <div class="wrapper-cardx">
        <div class="card" v-for="item in movieList.slice(0,20)" :key="item">
          <img :src="item.poster" class="image" @click="getMovieDetail(item.mid)">
          <div>
            <p style="white-space: pre-wrap;">{{item.name}}    </p>
          </div>
        </div>
      </div>
    </div>
</div>
   
</template>

<style scoped>


  .a{
       
        font-weight: 700;
        font-size: 16px;
        color: #5a5a5a;
  }

  .division0 {
    width: 100%;
   
    margin: 50px auto;
    text-align: center;
    padding-left: 10px;
    color: #5a5a5a;
    background-color: #fff;
  }

  .division {
    width: 100%;
    margin: 30px auto;
    text-align: center;
    padding-left: 10px;
    color: #5a5a5a;
    background-color: whitesmoke;
  }



 .wrapper-cardx1 {
    width: 1200px;
    height: 1700px;
    margin: 30px auto auto auto;
  
  }

 .wrapper-cardx {
    width: 1200px;
    height: 400px;
    margin: 30px auto auto auto;
    padding-top: 30px;
  }
  .wrapper-cardx .card {
    color: #07111B;
    font-size: 16px;
    width: 230px;
    height: 243px;
    float: left;
    margin: 30px;
    border-radius: 6px;
  }
  .wrapper-cardx .card:hover {
    transform: translateY(-5px);
    transition: 3ms;
    box-shadow: 5px 5px 10px #888;
  }
  .wrapper-cardx .image {
    border-radius: 6px 6px 0 0;
    width: 100%;
    height: 100%;
    margin-bottom: 20px;
    border-radius: 6px;
  }

  .cardContainx {
    width: 100%;
    height: 30%;
    background: #fff;
  }

.cardBox {
    position: relative;
    width: 1200px;
    margin: 20px auto 30px auto;
    box-shadow: 0 10px 15px #888;
    border-radius: 6px;
  }


  .boxImg {
    width: 100%;
    height: 100%;
    border-radius: 6px;
  }

.blackposition{
  pointer-events: relative;
  background-color:#222;
  width: 100%;
  height: 400px;
 
  margin-right: 100px;
  
}



.roll{
  margin-right: 100px;
  margin-left: 100px;
  position: absolute;
  top: 150px;
  background: #222;
}

  .el-carousel__item h3 {
    color: #222;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #222;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #222;
  }
  
  
</style>

<script>
import footer1 from '../components/footer.vue';
import routerpage from '../components/routerpage.vue'

import axios from 'axios'
import Routerpage from '../components/routerpage.vue';
//import footer from '../components/footer.vue';
  export default {
  components: { footer1,routerpage, Routerpage },
    data() {
      return {
        slide: 0,
        sliding: null,
        images:[],
        movieList : [],  
        isLogin:null,
        recommand_result:null,
        count:4,
        recommendList:[
        { movieId: 1306004, name: '重返中世纪', cover: 'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p1878110577.jpg' },
        { movieId: 1307266, name: '一声惊雷', cover: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2178025056.jpg' },
        { movieId: 1308835, name: '诸神混乱之女神陷阱', cover: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1775859403.jpg' },
        { movieId: 1309166, name: '零号嫌疑犯', cover: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2529453201.jpg' }
        ],
        crouselImg: [
        { img: 'https://img10.360buyimg.com/ddimg/jfs/t1/188312/33/6946/760289/60bcca11E200311da/c9076d69e08174da.png' },
        { img: 'https://img12.360buyimg.com/ddimg/jfs/t1/178278/23/7685/1752956/60bcca17Ec41a1793/45145f488cd2d0f2.png' },
        { img: 'https://img10.360buyimg.com/ddimg/jfs/t1/193492/9/6824/932009/60bcca16Ee42a84b3/9abda4e1bd51f490.png' },
        { img: 'https://img14.360buyimg.com/ddimg/jfs/t1/190691/15/6873/1197994/60bcca17E1aea2e4e/3b42f6e5f92ace6a.png' },
         ],
     
        form:{
          UserId:null,
          UserPhone:null,
        },
        genres:null,
      }
    },
    mounted:function(){
    var that = this;
    that.isLogin = sessionStorage.getItem('isLogin')
    console.log(that.isLogin)
    axios.request({
      method:'get',
      url:'http://localhost:8081/movieager/movie/getTopMovies',
      })
    .then(function(response){
      console.log(response.data),
      that.movieList = response.data
    })
    .catch(error => console.log(error));

    //根据uid
    // axios.request({
		// 	    method:'get',
    //       url:'http://localhost:8081/movieager/user/getUserById/uid='+sessionStorage.getItem('uid'),
    //   })
		//   .then(res => {
			  
    //     that.genres = res.data.tags;
    //     console.log('我是推荐'+that.genres);
		//   })
		//   .catch(err => {
		// 	  console.log(err);});

      //根据手机号获取信息
      //self.form.UserPhone = sessionStorage.getItem('')
      console.log('手机号呢'+sessionStorage.getItem('phone'))
      axios.request({
			    method:'get',
          url:'http://localhost:8081/movieager/user/getUserByPhone/phone='+sessionStorage.getItem('phone'),
      })
		  .then(res => {
        that.genres = res.data.tags;
        console.log('我是推荐'+that.genres);

        //推荐
        var tag = that.genres.substring(0,2) 
        console.log(tag)
        that.genres = tag
        that.form.UserId = sessionStorage.getItem('uid');
      
        
        axios.request({
        method:'get',
         url:'http://localhost:8081/movieager/recommend/getUserBasedRecommend/uid='+that.form.UserId+'&&num=10',
        //url:'http://localhost:8081/movieager/movie/getMoviesByGenres/genres='+that.genres+'&&page=4&&size=4',          
        })
           .then(function(response){
            console.log('推荐啊啊啊！'+response.data),
            //response=>(this.data=response)
            that.recommand_result = response.data
          })
          .catch(error => console.log(error));
		  })

		  .catch(err => {
			  console.log(err);
		  });
      //if(that.isLogin == sessionStorage.getItem('isLogin')){
        
 

    
  },
  methods:{
    change(){
    var that = this;
    that.count++
    axios.request({
        method:'get',
         //url:'http://localhost:8081/movieager/recommend/getUserBasedRecommend/uid='+self.form.UserId+'&&num=4',
        url:'http://localhost:8081/movieager/movie/getMoviesByGenres/genres='+that.genres+'&&page='+that.count+'&&size=4',          
        }).then(function(response){
            console.log('换一批'+response.data),
            console.log(response.data),
            //response=>(this.data=response)
            that.recommand_result = response.data.content
          })
          .catch(error => console.log(error));
		


    },
    getMovieDetail(id) {
      //localStorage.setItem('movieId', id);
    //  this.$router.push({ path:'/movieInfo/${id}' });
      this.$router.push({
          name: 'movieInfo1',
          params: {
            id: id,
            type:1
          }
        })
    },
  }

  /* var that = this;
    axios.request({
      method:'get',
      url:'/api/popular_now/',
      })
    .then(function(response){
      console.log(response.data.subjects),
      //response=>(this.data=response)
      that.images = response.data.subjects
    })
    .catch(error => console.log(error))
    },
    methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      }
    },
   */
  }
</script>