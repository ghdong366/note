在线文档：http://axios-js.com/zh-cn/docs/

## 1.axios入门

首先引入axios:

```html
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

页面的元素：

```html
  (get无参) <button onclick="fun1()">点击获取数据</button><br>
    (get有参) <button onclick="fun2()">点击获取数据</button><br>
    (post无参)<button onclick="fun3()">点击获取数据</button><br>
    (post有参-param形式)<button onclick="fun4()">点击获取数据</button><br>
    (post无参-json形式)<button onclick="fun5()">点击获取数据</button><br>
```

```javascript
function fun1() {
   axios({
      url: 'http://localhost:9999/user/getAll',
      method: 'get',
   }).then(response=>{
      console.log(response);
   })
}
```

```javascript
function fun2() {
axios({
url: 'http://localhost:9999/user/getOneUser',
method: 'get',
params:{
id:1
}
}).then(response=>{
console.log(response);
})
}
```

```javascript
function fun3() {
   axios({
      url: 'http://localhost:9999/user/post1',
      method: 'post'
   }).then(response=>{
      console.log(response);
   })
}
```

```javascript
function fun4() {
   axios({
      url: 'http://localhost:9999/user/post2',
      method: 'post',
      params:{
         email:'george@163.com',
         msg:'超级用户'
      }
   }).then(response=>{
      console.log(response);
   })
}
```

```javascript
function fun5() {
   axios({
      url: 'http://localhost:9999/user/post3',
      method: 'post',
      data:{
         id:1,
         username:'candy',
         age:20,
         email:'test1@qq.com',
         msg:'message'
      }
   }).then(response=>{
      console.log(response);
   })
}
```

> 携带参数时：
>
> params变量表示以单个参数传递
>
> data变量表示以json格式传递

## 2. axios的get、post



## 3.并发请求

演示并发请求：`axios.all( )`

```javascript
//并发请求，axios.all(),返回的是多个并发请求结果的数组
axios.all([
   axios.get('http://localhost:9999/user/getAll'),
   axios.get('http://localhost:9999/user/getOneUser',{params:{id:2}})
]).then(res=>{
   console.log(res);
})
```

手动处理请求结果：

```javascript
//并发请求处理方式1
axios.all([
   axios.get('http://localhost:9999/user/getAll'),
   axios.get('http://localhost:9999/user/getOneUser',{params:{id:2}})
]).then(res=>{
   console.log(res[0]);
   console.log("============");
   console.log(res[1]);

})
```

通过axios.spread( )处理请求结果

```javascript
//并发请求处理方式2
axios.all([
   axios.get('http://localhost:9999/user/getAll'),
   axios.get('http://localhost:9999/user/getOneUser',{params:{id:2}})
]).then(axios.spread((res1,res2)=>{
   console.log(res1); 
   console.log("----------");
   console.log(res2); 
}))
```

## 4.axios全局配置

全局配置参数作用很大 ，它不仅可以简化url,还可以设置超时时间、携带固定的请求头和token等信息

```javascript
//全局配置
axios.defaults.baseURL = 'http://localhost:9999/user'
axios.defaults.timeout = 5

//有了全局配置之后，可以简化每次请求的路径了
axios.get("/getAll").then(res=>{
   console.log(res);
}).catch(err=>{
   console.log(err);
})
```

## 5.axios的实例

因为项目中所以的请求默认配置不可能完全相同。因此需要对axios进行定制化的配置。这时就需要axios的实例。

然后基于某个实例去进行网络请求

```javascript
// 利用axios.create来创建一个实例
let axiosInstance = axios.create({
   baseURL : 'http://localhost:9999/user',
   timeout : 5000
});

//使用实例
axiosInstance({
   url:'getOneUser',
   method:'get',
   params:{
      id:3
   }
}).then(res=>{
   console.log(res);
})
```



```javascript
axiosInstance.get('/getOneUser',{params:{id:2}}).then(res=>{
   console.log(res);
})

axiosInstance.get('/getAll').then(res=>{
   console.log(res);
})
```

> * 创建实例时，会配置该实例的全局参数
>
> * 使用实例时，就把实例当成axios来使用
>
>   可以使用axios()原始api。如`axiosInstance.({配置对象})`
>
>   也可以使用get和post方法。如：`axiosInstance.get( )`
>

## 6.axios拦截器

axios提供了两类的拦截器

1. 一种是请求前的拦截器（成功请求、失败请求）
2. 另一种是响应前的拦截器（成功响应，失败响应）

拦截器的作用：

用于在网络请求的时候在发起请求或者响应时对数据进行操作后再传输。

### 6.1请求前拦截

```javascript
//请求前拦截
axios.interceptors.request.use(config => {
   console.log("成功请求前拦截");
   console.log(config);
   return config;
}, err => {
   console.log("失败请求前拦截");
   console.log(err);
})


axios.get("http://localhost:9999/user/getAll").then(res=>{
   console.log("响应的数据");
   console.log(res);
})
```

### 6.2响应前拦截

```javascript
//响应前拦截
axios.interceptors.response.use(config => {
   console.log("成功响应前拦截");
   console.log("拦截的数据：");
   console.log(config);
   return config.data;
}, err => {
   console.log("失败响应前拦截");
   console.log(err);
})


axios.get("http://localhost:9999/user/getAll").then(res=>{
   console.log("响应的数据");
   console.log(res);
})
```



![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/axios拦截器结果示例.png)



> config其实就是中间数据，拦截其实就是拦截到请求或响应的信息。对其进行处理后再请求或响应。

## 7.axios在vue中的封装

因为在vue中难免会出现很多处的请求场景，如果单独使用axios,则随着项目的增长后期会很难维护。因此经常讲axios手动封装然后再去使用。

在项目中，创建一个request.js文件。把封装的逻辑写在这个js中。

### 7.1第一种封装方式

基本封装为三个参数，分别是请求参数config(代表url)、成功回调函数、失败回调函数

```javascript
import axios from "axios";

function request(config,success,fail){
   axios(config).then(res=>{
      success(res)
   }).catch(err=>{
      fail(err)
   })
}
export {request}
```

使用时：

```javascript
request("http://localhost:9999/user/getAll",
        res => {
   console.log(res)
}),
   err=>{
   console.log(err)
}
```

### 7.2第二种封装方式

参数只有一个，为配置对象。axios需要的信息都可以通过一个config传递。

```javascript
//第二种封装
function request2(config){
   axios.defaults.baseURL='http://localhost:9999'
   axios(config.url).then(res=>{
      config.success(res)
   }).catch(err=>{
      config.fail(err)
   })
}
```

使用时：

```javascript
request2({url: '/user/getAll',
          success:res=>{
             console.log(res)
          },
          fail:err=>{
             console.log(err)
          }
        }
 )
```

