<template>
<div>
        
      <div class="cardContainx">
      <div class="wrapper-cardx">
        <div class="card" v-for="(item,key) in preference_result" :key="key">
          <img :src="poster[item.mid]" class="image" @click="getMovieDetail(item.mid)">
          <div>
            <p style="white-space: pre-wrap;font-weight: 700;text-align: center">{{item.mname}}<span>:</span><span style="white-space: pre-wrap; font-weight: 700;font-size:18px;color:#ff9900" >{{item.rating*2}}</span>  </p>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
   export default {
    data() {
      return {
        form:{
          userID:null
        },
        preference_result:[],
        poster:[]
      }
    },
    methods:{

      getMovieDetail(id) {
      //localStorage.setItem('movieId', id);
      //this.$router.push({ path:'/movieInfo/${id}' });
      this.$router.push({
          name: 'movieInfo1',
          params: {
            id: id,
            type:1
          }
        })
    },
    },
    mounted:function(){
        const self = this
	   // let routerQuery_1 = self.$route.query.uid
        self.form.userID = sessionStorage.getItem('uid')
        console.log(self.form.userID)
        self.$axios({
			      method:'get',
            url:'http://localhost:8081/movieager/preference/getPreferenceByUid/uid='+self.form.userID+'&&page=1&&size=5',
        })
		  .then(res => {
		    console.log(res.data);
        self.preference_result = res.data.content

          

            //获取图片
             for(var i = 0;i<self.preference_result.length;i++){
                //console.log(self.preference_result[i].mid,self.preference_result[i].mname)
                var mid = self.preference_result[i].mid
               
                axios.request({
			          method:'get',
                url:'http://localhost:8081/movieager/movie/getMovieById/mid='+mid,
                })
		            .then(res => {
                console.log(res.data.mname,res.data.mid,res.data.poster)
                //this.img = res.data.poster
                
                this.poster.push(res.data)
                this.poster[res.data.mid]=res.data.poster
		            }).catch(err => {
			          console.log(err);
		           })
               }
		  })
		  .catch(err => {
			  console.log(err);
		  })
    
    }
  }
</script>

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

 .wrapper-cardx {
    width: 1200px;
    height: 300px;
    margin: 30px 40px 150px auto;
    padding-top: 30px;
    
  }

  .wrapper-cardx .card {
    color: #07111B;
    font-size: 16px;
    width: 200px;
    height: 220px;
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