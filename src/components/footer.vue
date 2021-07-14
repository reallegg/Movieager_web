<template>
<div>
<div class="division"><h3>关于我们</h3>
      <h3 style="color: #888;font-weight: 400">    ABOUT MOVIEAGER    </h3></div>

    <div class="aboutus">
      <div id="aboutusInfo">
        <p style="font-size: 200%">基于协同算法的电影推荐系统</p>
        <p style="font-size: 200%">为您推荐最好的电影，带给你最佳的观影体验！</p>
      </div>
    </div>
    
    <div class="division"><h3>联系我们</h3>
      <h3 style="color: #888;font-weight: 400">    CONTACT    </h3>
    </div>
    
    <div class="footer">
      <a href="https://github.com/movieager"><img src="../assets/github.png"><span>https://github.com/movieager</span></a>
    </div>
</div>

</template>

<style scoped>

  .footer {
    width: 100%;
    height: 100px;
    background: black;
    padding-top: 20px
  }

  .footer a {
    color: white;
    text-decoration: none;
  }

  .aboutus {
    width: 100%;
    height: 500px;
    background-size: 100% 100%;
    filter: grayscale(70%);
    opacity: 0.7;
    color: white;
    font-weight: 600;
    padding-top: 60px;
  }

  .aboutus p {
    margin-top: 30px;
    font-size: 18px;
  }

  #aboutusInfo {
    margin-top: 80px;
    animation-delay: 1s
  }

  .division {
    width: 100%;
    margin: 30px auto;
    text-align: center;
    padding-left: 10px;
    color: #5a5a5a;
    background-color: whitesmoke;
  }

</style>