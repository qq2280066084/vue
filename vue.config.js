module.exports = {
  publicPath: '', // 用户部署的基本url,如果不配置默认为部署所在域的根目录，如果不要部署到子路径，则需要配置该项。如果设为空，转移后的使用相对路径引用文件。并且将所有的css js都放到了根目录
  //outputDir: '/Users/dixon/web/usc/app1/www', // 输出文件夹，我这里设为www,主要是和Cordova配合生成安卓应用的。
  productionSourceMap: false, // 不生成map
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/global.scss";', // 给每个文件都加载这个scss
      },
    },
  },

};
