<template>
<div>
<div class="tab01">
  <div>
    <div class="title">
      <ul>
       <!-- <router-link :to="{name:'mym'}">111</router-link> 
         <router-link :to="{name:'myw'}">222</router-link> -->
      </ul>
    <div class="info">
    <avatar :username="form.name" :src="iavatar"  background-color="#fff" size="100"/>
    <div style="margin:20px;"></div>
    </div>
      
  <!--
   <b-button @click="edit" block variant="dark">编辑资料</b-button>
  -->
   

     <div class="text-center">
         <h5 class="h2" >
           {{ form.name }}
         </h5>
       
      </div>


    <div class="row">
      <div class="col">
      <div class="card-profile-stats d-flex justify-content-center mt-md-5">
      
        <div class="numbox">
        <span class="heading">{{preference_result.length}}</span>
        <span class="description">曾打分的电影</span>
        </div>
       
        <div class="numbox">
        <span class="heading">{{comment_result.length}}</span>
        <span class="description">发出的评论</span>
        </div>
        
        
        </div>
    </div>
    </div>

    </div>

    <b-card no-body>
      <b-tabs v-model="tabIndex" card>
        <b-tab title="我评分过的电影" :title-link-class="linkClass(0)">
         <mymovie></mymovie>
          </b-tab>
        <b-tab title="我发出的评论" :title-link-class="linkClass(1)">
          <mywords></mywords>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</div>


<div class="tab02">
<edit></edit>

</div>

<div class="tab02">
<editpsw></editpsw>

</div>


</div>
</template>

<script scoped>
import Avatar from 'vue-avatar'
import edit from '../components/edit.vue'
import editpsw from '../components/editpsw.vue'
import mymovie from '../components/mymovie.vue'
import mywords from '../components/mywords.vue'
import myLwords from '../components/myLwords.vue'

  export default {
    components:{
      Avatar,
      edit,
      mymovie,
      mywords,
      myLwords,
      editpsw
    },
    data() {
      return {
        tabIndex: 0,
        isLogin:true,
        preference_result:[],
        comment_result:[],
        
        //iavatar:'https://wx4.sinaimg.cn/thumb180/e6a8b122ly8gpcmc9hb54j20u0132kjl.jpg',
        iavatar:'https://ui-avatars.com/api/?length=1&color=1E90FF&background=ffffff&size=100&name=',
        form:{
          name: null,
          userID: null,
          inline:'true',
        }
        
      }
    },
    methods: {
      edit () {
      this.$router.push('/edit')
      },
      linkClass(idx) {
        if (this.tabIndex === idx) {
          return ['bg-primary', 'text-light']
        } else {
          return ['bg-light', 'text-info']
        }
      }
    },
     mounted:function(){
      if (location.href.indexOf("#reloaded") == -1) {
                location.href = location.href + "#reloaded";
                location.reload();
                // const self = this
                // self.form.inline = true
            }
      const self = this
		  //let routerQuery_1 = self.$route.query.uid
      self.form.userID = sessionStorage.getItem('uid')
      console.log(self.form.userID)
      self.$axios({
			    method:'get',
          url:'http://localhost:8081/movieager/user/getUserById/uid='+self.form.userID,
      })
		  .then(res => {
			  console.log(res.data.name);
        self.form.name = res.data.name;
        self.iavatar = self.iavatar+res.data.name
		  })
		  .catch(err => {
			  console.log(err);
		  })

      //对我喜欢的电影计数
        console.log('m计数'+self.form.userID)
        self.$axios({
			      method:'get',
            url:'http://localhost:8081/movieager/preference/getPreferenceByUid/uid='+self.form.userID+'&&page=1&&size=20',
        })
		  .then(res => {
		    console.log(res.data);
            self.preference_result = res.data.content
      })
      //对我发表的评论计数
      console.log('c计数'+self.form.userID)
      self.$axios({
			    method:'get',
                url:'http://localhost:8081/movieager/comment/getCommentsByUid/uid='+self.form.userID+'&&page=1&&size=25&&sort=time',
                })
		            .then(res => {
			          console.log(res.data);
                self.comment_result = res.data.content
                })
              


    }
  }
</script>

<style scoped>



.text-center1 {
  
    margin-top: 200px;
    text-align: center!important;
    position: absolute;
    margin-left: 680px;
    margin-right: 650px;
    color: white;

}

.text-center{
position: absolute;
  left: 0;
  right: 0;
  top: 230px;
  bottom: 0;
  margin: auto;
  width: 100px;
  color: white;

}
.h3, h3 {
    font-size: 1.0625rem;
}

.numbox{

    text-align: center;
    margin-right: 1rem;
    padding: .875rem;

}

.card-profile-stats {
   
    justify-content: center!important;
}

.description {
   
    color: #adb5bd;
}

.row {
  position: absolute;
  left: 0;
  right: 0;
  top: 250px;
  bottom: 0;
  margin: auto;
  width: 400px;

}

.row1 {
  position: absolute;
    display: -webkit-box;
    display: flex;
    flex-wrap: wrap;
    margin-left: 550px;
    margin-right: 400px;
    margin-top: 200px;
    box-sizing: border-box;
}

.heading {
    font-size: 1.1rem;
    font-weight: 700;
    display: block;
    color: aliceblue;
}

.title{
  width: 100%;
  position: relative;
  height:400px;
  border-top-left-radius:25px;
  border-top-right-radius:25px;
  background: color #C0C0C0 ;
  background-image:linear-gradient(#B2B9BE,#2F4052) ;
}

.info{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 100px;
  height: 200px;
  
}

.tab01{
	font-family: Open Sans,sans-serif;
	margin-top: 40px;
  margin-left: 100px;
  margin-right: 100px;
	border-radius:25px;
  line-height: 1.5;
}


</style>
