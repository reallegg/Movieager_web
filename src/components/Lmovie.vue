 <template>
     <div>
       {{ msg }}
      <div class="cardContainx">
      <div class="wrapper-cardx">
        <div class="card" v-for="item in movieList" :key="item">
          <img :src="item.poster" class="image" @click="getMovieDetail(item.mid)">
          <div>
            <p style="white-space: pre-wrap;">{{item.name}}    </p>
          </div>
        </div>
      </div>
     </div>

     </div>

 </template>
 

<script>
import axios from 'axios'
export default({
  data(){
    props:["msg"]
    return{
        movieList : [],
        count:1, 
        msg:this.msg
      }
  },

 mounted(){
   
     var that = this;
    that.$axios({
      method:'get',
      url:'http://localhost:8081/movieager/movie/getMoviesByGenres/genres='+that.msg+'&&page='+that.count+'&&size=4'
      })
    .then(function(response){
     // console.log("子控件"),
     // console.log(response.data),
     // console.log(that.tag),
      that.movieList = response.data.content
    })
    .catch(error => console.log(error)) 
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
  }


})
</script>


<style scoped>



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

</style>