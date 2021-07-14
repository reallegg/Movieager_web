<template>
  <div id="app">
  <div class="wrapper">
    <header>
      <Navbar  />
    </header>
    <div><router-view></router-view></div>
    <div class="division"></div>
     <div class="footer">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <ul class="legals">
              <li style="display: inline;margin:10px">
                <a href="http://zuimeia.com/about.html" target="_blank">关于</a>
                </li>                
                  <li style="display: inline" >
                    <a href="http://zuimeia.com/" target="_blank">主页</a>
                    </li>
                    </ul>
                    <div class="line"></div>
                    <ul class="legals" style="color=#fff">
                      <li>
                       <a>
                        最新电影咨询 个性化电影推荐</a>
                      </li>
                      
                        </ul>
                        <p class="copy">© 2021 · Movieager · All Rights Reserved</p>
                    </div>
                </div>
            </div>
 
      </div>
  </div>  
  <!--
  <footer1></footer1> 
  <div class = "tab01"> 
  <router-view></router-view>
  </div>-->
  </div>
</template>

<script>
//import Navbar from '../../src/components/Navbar.vue';
//import { component } from 'vue/types/umd' border:2px solid#dddddd;
import Navbar from '../src/components/Navbar1.vue';
import Navbar2 from '../src/components/Navbar2.vue';
//import footer1 from '../src/components/footer.vue';
export default {
  name: "app",
  data(){
    return{
    
    }
  },
  components:{
    Navbar,
    Navbar2,

  },
  
  }



</script>


<style scoped>

 
html a {
    
    -webkit-font-smoothing: antialiased;
    text-shadow: 1px 1px 1px rgb(0 0 0 / 0%);
}

ul.legals {
    list-style: none;
    color: #fff;
    font-size: 14px;
    margin: 5px auto;
    text-align: center;
    padding: 0px !important;
    padding-top: 0px !important;
    padding-right: 0px !important;
    padding-bottom: 0px !important;
    padding-left: 0px !important;
}


.row {
    margin-left: -15px;
    margin-right: -15px;
}

.container {
    margin-right: auto;
    margin-left: auto;
    padding-left: 15px;
    padding-right: 15px;
}

.line{
    border-bottom: 1px solid #ababab;
    width: 140x;
    margin: 0 auto;
}

  .division {
    width: 100%;
    margin: 30px auto;
    text-align: center;
    padding-left: 10px;
    color: #fff;
    background-color: whitesmoke;
  }

html,body{height: 100%;}
.wrapper{display: flex;flex-direction: column;min-height: 100%;}
.footer{width: 100%;background-color: #8c9398;height: 150px;
    text-align: center;
    padding-left: 10px;
    text-transform: uppercase;}

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body{
  background-color: #c0c0c0;
}

header{
  width: 100vm;
  padding: 15px;
  background-color: #222;

}

.tab01{
	background:#fff;
	margin-top: 40px;
  margin-left: 100px;
  margin-right: 100px;
	border-radius:25px;
}

.app{
  background: #c0c0c0;
  position:absolute;
  top:0;
  right:0;
  bottom:0;
  left:0;
}
</style>
