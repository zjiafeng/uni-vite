### 一、前言
自上次开发小程序已经很久了，看到博客主题有相关的小程序，正好拿来复习下小程序相关知识。
本次采用uni-app+vite cli开发，具体搭建流程参考[uni-app官方文档](https://uniapp.dcloud.net.cn/quickstart-cli.html "uni-app官方文档")
uni+vite小程序源码：[https://github.com/zjiafeng/uni-vite](https://github.com/zjiafeng/uni-vite "https://github.com/zjiafeng/uni-vite")
参考代码：[https://github.com/D-xuanmo/blog-miniprogram-wordpress](https://github.com/D-xuanmo/blog-miniprogram-wordpress "https://github.com/D-xuanmo/blog-miniprogram-wordpress")

### 二、开发
1. 模板下载：[uniapp](ttps://uniapp.dcloud.net.cn/quickstart-cli.html) 官网通过`vue-cli` 命令行创建uniapp，使用  npx degit dcloudio/uni-preset-vue#vite-ts my-vue3-project下载模板；

2. 安装css预处理 sass: 项目终端输入：**yarn add node-sass@^4.0.0 sass-loader@^10.0.1 sass**

3. 配置使用微信小程序API，由于安装的`uniapp-ts`项目只会包含uni-app本身的@types声明，如果想直接使用wx或小程序的api的话就需要自行添加

   以微信小程序为例：项目终端输入：**yarn add @types/weixin-app**

   打开根目录`tsconfig.json`文件，在types选项中添加weixin使用的声明
```
   {
     "compilerOptions": {
       "target": "esnext",
       "useDefineForClassFields": true,
       "module": "esnext",
       "moduleResolution": "node",
       "strict": true,
       "jsx": "preserve",
       "sourceMap": true,
       "resolveJsonModule": true,
       "esModuleInterop": true,
       "lib": ["esnext", "dom"],
       "types": ["@dcloudio/types", "weixin-app"],
       "baseUrl": ".",
       "paths": {
         "@/*":["src/*"]
       }
     },
     "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"]
   }
```
4. 运行项目： 使用**yarn run dev:mp-weixin运行**；微信开发者工具打开**dist/mp-weixin**文件夹

### 三、部署
1. 上传代码，通过微信开发者工具进行上传，在版本管理处可看到开发版本，可以使用体验版进行查看

2. 注意：`上线要把接口域名添加到小程序管理后台的request里才可以正常访问`

   位置：开发管理>开发设置>服务器域名>request合法域名

3. 提交审核，一般在24h内。审核完成就可以进行发布，发布后大概需要1-2天就可以在微信小程序中搜索。

#### 以下是我的小程序码，欢迎访问~

![](https://www.jiafeng.co/images/logo/applet.png)