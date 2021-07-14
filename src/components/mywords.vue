<template>
<div>

       
        <div class="newsItem" v-for="(item, key) in comment_result" :key="key"> 
            <div class="picContain" ontouchstart="this.classList.toggle('hover');">
                <meta name="referrer" content="no-referrer"/>
                <img :src="poster[key]"  height="100" width="75">
              </div>
              <div>
                <p style="white-space: pre-wrap;font-weight: 700;">{{item.mname}}<el-divider direction="vertical"></el-divider>{{item.time.slice(0,10)}},{{item.time.slice(11,19)}}<el-divider direction="vertical"></el-divider>
                <i class="el-icon-delete" @click="deletecomment(item.cid)"></i>
                <el-divider direction="vertical"></el-divider>
                <i class="el-icon-star-on" style="color: #ff9900"></i>0
                </p>
                
                <p style="margin-top:25px">{{item.comment}}</p>
              </div>
        </div>

      </div>
</template>

<script>

import axios from 'axios'
   export default({
    data() {
      return {
        form:{
          userID:null,
          cid:null
        },
        comment_result:[],
        poster:[],
      }
    },
    methods:{
        deletecomment(cid){
          
            //删除操作
            //const self = this
           // self.cid=self.form.cid
            axios.request({
			          method:'get',
                url:'http://localhost:8081/movieager/comment/deleteCommentById/cid='+cid,
                })
		            .then(res => {
                  console.log(res.data)
                  if(res.data == "success")
                  {
                      alert('删除成功！')
                      const self = this
                      self.form.userID = sessionStorage.getItem('uid')
                      console.log(self.form.userID)
                      self.$axios({
			                  method:'get',
                        url:'http://localhost:8081/movieager/comment/getCommentsByUid/uid='+self.form.userID+'&&page=1&&size=25&&sort=time',
                     })
		                .then(res => {
			                  console.log(res.data);
                        self.comment_result = res.data.content
                        console.log('我是id:'+res.data.content[0].cid)
              
                //取对应的图片
                      for(var i = 0;i<self.comment_result.length;i++){
                      axios.request({
			                  method:'get',
                        url:'http://localhost:8081/movieager/movie/getMovieById/mid='+self.comment_result[i].mid,
                      })
		                  .then(res => {
                        self.poster.push(res.data.poster)
		                  }).catch(err => {
			                 console.log(err);
		                })
                   }
		               })
		            .catch(err => {
			            console.log(err);
		           })

                  }
                  else{
                    alert('删除失败！')
                  }
                     
			         
		            }).catch(err => {
			          console.log(err);
		           })
         

        },
        getposter(){

          
        }
        },
     mounted:function(){
      const self = this
	//let routerQuery_1 = self.$route.query.uid
      self.form.userID = sessionStorage.getItem('uid')
      console.log(self.form.userID)
      self.$axios({
			    method:'get',
                url:'http://localhost:8081/movieager/comment/getCommentsByUid/uid='+self.form.userID+'&&page=1&&size=25&&sort=time',
                })
		            .then(res => {
			          console.log(res.data);
                self.comment_result = res.data.content
                console.log('我是id:'+res.data.content[0].cid)
              
                //取对应的图片
                for(var i = 0;i<self.comment_result.length;i++){
                axios.request({
			          method:'get',
                url:'http://localhost:8081/movieager/movie/getMovieById/mid='+self.comment_result[i].mid,
                })
		            .then(res => {
			         // console.log(res);
               // console.log(res.data.poster)
                //this.img = res.data.poster
                self.poster.push(res.data.poster)
               // self.cid.push(res.data.cid)
		            }).catch(err => {
			          console.log(err);
		           })
               }
		            })
		  .catch(err => {
			  console.log(err);
		  })
    
        },
        

    })
    
</script>

<style scoped>


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

  
.picon{

    display: inline-block;
    margin: auto;
    position: absolute;

    margin-right: 10px;

}

</style>