module.exports = {
      // 解决跨域问题
      devServer: {
        open: true,
        host: 'localhost',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: {
          '/api/top250': {
            target: 'http://t.yushu.im/v2/movie/top250?apikey=0b2bdeda43b5688921839c8ecb20399b',
            changeOrigin: true,
           // ws: true,
            pathRewrite: {
              '^/api/top250': ''
            }
          },
          '/api/popular_now': {
              target: 'http://t.yushu.im/v2/movie/in_theaters?apikey=0b2bdeda43b5688921839c8ecb20399b',
              changeOrigin: true,
           // ws: true,
            pathRewrite: {
              '^/api/now': ''
          }
        },
        '/api/coming_soon':{
            target:'http://t.yushu.im/v2/movie/coming_soon?apikey=0b2bdeda43b5688921839c8ecb20399b',
            changeOrigin: true,
            pathRewrite: {
          '^/api/coming_soon': ''
        }
        },
          '/api/details':{
              target:'http://t.yushu.im/v2/movie/subject/',
              //target:'', 
              changeOrigin: true,
       // ws: true,
        pathRewrite: {
          '^/api/details': ''
        }
       },
        '/api/Search':{
            target:'http://t.yushu.im/v2/movie/search?apikey=0b2bdeda43b5688921839c8ecb20399b&tag=',
            //target:'', 
            changeOrigin: true,
       // ws: true,
        pathRewrite: {
          '^/api/Search': ''
        }
       },

        '/api/search':{
            target:'http://39.105.38.10:8081/movie/search?q=',
            //target:'', 
            changeOrigin: true,
            // ws: true,
                pathRewrite: {
          '^/api/search': ''
            }
         },
        '/api/8081': {
            target: 'http://localhost:8081',
            changeOrigin: true,
            pathRewrite: {
        '^/api/8081': ''
    }
  },
    '/api/news':{
            target:'http://api.tianapi.com/film/',
            //target:'', 
            changeOrigin: true,
                // ws: true,
                    pathRewrite: {
              '^/api/news': ''
            }
             },
       // before: app => { }
      }
      // 设置icon图标
     /** pwa: {
        iconPaths: {
          favicon32: './icon.png',
          favicon16: './icon.png',
          appleTouchIcon: './icon.png',
          maskIcon: './icon.png',
          msTileImage: './icon.png'
        }
      }
    */
    }
}