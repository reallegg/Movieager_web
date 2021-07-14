<template>
    <div>
    <b-row>

    <b-col sm="1">
    <div>
     <!-- As a heading -->
     <b-navbar type="dark">
     <b-navbar-brand tag="h1" class="mb-0">Movieager</b-navbar-brand>
     </b-navbar>
    </div>
    </b-col>

    <b-col sm="">
    <div>
    <b-navbar type="dark" >
    <b-navbar-nav>   
    <b-nav-item href="/#/index">主页</b-nav-item>

    <b-nav-item href="/#/movieList">
      电影分类
    </b-nav-item>

      <!-- Navbar dropdowns 
      <b-nav-item-dropdown text="电影分类">
        <b-dropdown-item href="#">大陆</b-dropdown-item>
        <b-dropdown-item href="#">港台</b-dropdown-item>
        <b-dropdown-item href="#">欧美</b-dropdown-item>
        <b-dropdown-item href="#">其他</b-dropdown-item>
      </b-nav-item-dropdown>
      -->
    <!--
      <b-nav-item-dropdown text="演员分类">
        <b-dropdown-item href="#">中国男演员</b-dropdown-item>
        <b-dropdown-item href="#">中国女演员</b-dropdown-item>
        <b-dropdown-item href="#">海外男演员</b-dropdown-item>
        <b-dropdown-item href="#">海外女演员</b-dropdown-item>
      </b-nav-item-dropdown>
      -->

    <b-nav-item-dropdown href="/#/popular" text="近期热点">
        <b-dropdown-item href="/#/popular">正在上映</b-dropdown-item>
        <b-dropdown-item href="/#/popular">即将上映</b-dropdown-item>
        <b-dropdown-item href="/#/popular">影视资讯</b-dropdown-item>
    </b-nav-item-dropdown>

    </b-navbar-nav>
    </b-navbar>
    </div>
    </b-col>
     
   <!-- <b-col sm="4">
    </b-col>
    
    <b-col sm="2">
    <div>
    <b-navbar type="dark">
       <b-navbar-nav>
          <b-form-input class="mr-sm-2"></b-form-input>
          <b-button placeholder="请输入你要查找的内容" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-navbar-nav>
    </b-navbar>
    -->
    <b-col sm="2">
      <div id="app">
    <b-navbar type="dark">
    <b-navbar-nav>
    <b-input-group class="mr-sm-2">
    
    <b-form-input></b-form-input>
     <b-button href="/#/search">Search</b-button>
   </b-input-group>
   </b-navbar-nav>
    </b-navbar>

    </div>
    </b-col>




    <b-col sm="1">
    <div>
    <b-navbar type="dark">
       <b-navbar-nav>
        <b-nav-item>
          请登录/注册
        </b-nav-item>
        </b-navbar-nav>
    </b-navbar>
    </div>
    </b-col>
  

  </b-row>
   </div>

</template>

<style scoped>

.b-navbar{
  color: #000;
}



</style>