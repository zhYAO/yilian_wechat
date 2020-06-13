#### 欢迎入坑

#### 开发环境

- node 10.0.0 +

#### 开发使用

##### 1.taro

##### 2.dva

#### 如何开始

##### 1.[下载小程序开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html?t=18102216)

##### 2.npm install -g @tarojs/cli@2.2.7

##### 3.npm install

##### 4.npm run dev:(weapp or h5 or rn)

##### 5.npm run build:(weapp or h5 or rn)

#### 页面模版 自动创建

##### 运行 npm run temp (index) 自动创建页面

#### 页面结构

```
startedwithtaroredux
├─ .editorconfig //编辑器config
├─ .eslintrc //eslint
├─ .gitignore
├─ README.md
├─ config //webpack.config.js
│    ├─ dev.js
│    ├─ index.js
│    └─ prod.js
├─ dist //weapp的编译后目录
├─ .temp //h5的编译后目录
├─ package.json
├─ page.js // 页面模板
├─ src
│    ├─ app.jsx //入口文件
│    ├─ app.less //入口文件的less 只作用于pages一级的
│    ├─ index.html //入口html
│    ├─ components //组件
│    │    ├─ HOC //存放高阶
│    │    └─ page-components //存放普通通用组件
│    ├─ configuration
│    │    └─ globaldata.js //globaldata 里面放配置信息 如host sessionkey 等等
│    ├─ crossplatform //为了api和component的跨平台
│    │    └─ apiservice //将taro api进行一次封装
│    ├─ pages //页面文件
│    │    └─ index //页面文件
│    │         ├─ components //存放页面自己的组件
│    │         ├─ index.js //入口js
│    │         ├─ index.less //入口css
│    │         └─ model.js // 当前页面的model数据管理
│    ├─ service //网络
│    │    ├─ API //分装了请求函数
│    │    └─ xx-controller.js //请求的业务线 暴露请求api方法
│    ├─ static //静态资源
│    │    ├─ css
│    │    └─ images
│    ├─ model //dva的外层数据管理
│    │    └─ models //数据管理
│    └─ subpackages
│    │      └─ pages
│    │         └─ test //页面文件
│    │               ├─ components //存放页面自己的组件
│    │               ├─ index.js //入口js
│    │               ├─ index.less //入口css
│    │               └─ model.js // 当前页面的model数据管理
│    └─ utils //存放公共方法
│
```

#### 各种教程

##### 1.资源整合：https://github.com/NervJS/awesome-taro

#### 开发注意

##### 1.所有 taro 的 api 请不要直接使用，到 crosslpatform 里去寻找，有一一对应，没有的话你创建一个一一对应的。（原因：可以在里面处理 api 的跨平台问题）
