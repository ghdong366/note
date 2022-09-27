# 第二章、Vue组件

## 2.1  组件介绍

组件就是实现应用中局部功能代码和资源的集合

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/Vue组件示意图.png)

## 2.2  非单文件的组件

### 基本用法

**Vue中使用组件的三大步骤：**

```
step1. 定义组件(创建组件)
step2. 注册组件
step3. 使用组件(写组件标签)
```

**一、如何定义一个组件？**
		使用  `Vue.extend(options)`  创建，其中options和new Vue(options)时传入的那个options几乎一样，但也有点区别；
		区别如下：
				1).`el`不要写，为什么？ ——— 最终所有的组件都要经过一个vm的管理，由vm中的el决定服务哪个容器。
				2).`data`必须写成函数，为什么？ ———— 避免组件被复用时，数据存在引用关系。
				备注：使用template可以配置组件结构。

**二、如何注册组件？**
                1).局部注册：靠`new Vue`的时候传入components项
                2).全局注册：靠`Vue.component('组件名',组件)`

​					==注意：全局注册组件需要在定义vm之前==

**三、编写组件标签：**
                `<school> </school>`

代码示例：

```html
<div id="root">
   <hello></hello>
   <hr>
   <h1>{{msg}}</h1>
   <hr>
   <!-- 第三步：编写组件标签 -->
   <school></school>
   <hr>
   <!-- 第三步：编写组件标签 -->
   <student></student>
</div>

=============================================
<div id="root2">
   <hello></hello>
</div>
<script type="text/javascript">
    Vue.config.productionTip = false

    //第一步：创建school组件
    const school = Vue.extend({
        template:`
				<div class="demo">
					<h2>学校名称：{{schoolName}}</h2>
					<h2>学校地址：{{address}}</h2>
					<button @click="showName">点我提示学校名</button>
				</div>
			`,
        // el:'#root', //组件定义时，一定不要写el配置项，因为最终所有的组件都要被一个vm管理，由vm决定服务于哪个容器。
        data(){
            return {
                schoolName:'HFUU',
                address:'合肥'
            }
        },
        methods: {
            showName(){
                alert(this.schoolName)
            }
        },
    })

    //第一步：创建student组件
    const student = Vue.extend({
        template:`
				<div>
					<h2>学生姓名：{{studentName}}</h2>
					<h2>学生年龄：{{age}}</h2>
				</div>
			`,
        data(){
            return {
                studentName:'张三',
                age:18
            }
        }
    })

    //第一步：创建hello组件
    const hello = Vue.extend({
        template:`
				<div>
					<h2>你好啊！{{name}}</h2>
				</div>
			`,
        data(){
            return {
                name:'Tom'
            }
        }
    })

    //第二步：全局注册组件
    Vue.component('hello',hello)

    //创建vm
    const vm = new Vue({
        el:'#root',
        data:{
            msg:'你好啊！'
        },
        //第二步：注册组件（局部注册）
        components:{
            school,
            student
        }
    })

    new Vue({
        el:'#root2',
    })
</script>
```

### 一些注意事项

1. 关于组件名:

   一个单词组成：
   		第一种写法(首字母小写)：school
   		第二种写法(首字母大写)：School
   多个单词组成：
   		第一种写法(kebab-case命名)：my-school。注意这里在对象中，对应的属性名要用引号括起来
   		第二种写法(CamelCase命名)：MySchool (需要Vue脚手架支持)
   备注：
       (1).组件名尽可能回避HTML中已有的元素名称，例如：h2、H2都不行。
       (2).可以使用name配置项指定组件在开发者工具中呈现的名字。

2. 关于组件标签:

   ​		第一种写法：`<school></school>`

   ​		第二种写法：`<school/>`

   ​		备注：

   ​		不用使用脚手架时，`<school/>`会导致后续组件不能渲染。

   ​		组件的模板结构中，必须有一个根标签。

3. 一个简写方式：

   ​		`const school = Vue.extend(options)` 可简写为：`const school = options`

## 2.3  组件的嵌套

一个组件可以嵌套另外一个组件，在Vue中，一般用一个名为App的组件作为父组件。

```html
<!--测试组件的嵌套，school组件中嵌套student组件-->

<div id="app">
    <school></school>
</div>

<script>

    const student = Vue.extend({
        template:`
          <div>
            <h4>学生：{{tom}}  年龄：{{age}}</h4>
          </div>
        `,
        data(){
            return {
                name:"tom",
                age:18
            }
        }
    })

    const school = Vue.extend({
        template:`
          <div>
            <h2>学校名：{{name}}</h2>
            <h2>学校地址：{{address}}</h2>
            <student></student>
          </div>
        `,
        data(){
            return {
                name:"HFUU",
                address:"合肥"
            }
        },
        components:{
            student:student
        }
    })

    const vm = new Vue({
        el: '#app',
        data() {
            return {}
        },
        components:{
            school
        }
    })
</script>
```

<img src="https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/组件的嵌套.png" style="zoom:67%;" />



## 2.4  知识补充（原型和原型对象）

### 实例成员和静态成员

```javascript
// 构造函数中的属性和方法我们称为成员, 成员可以添加
function Star(uname, age) {
   this.uname = uname;
   this.age = age;
   this.sing = function() {
      console.log('我会唱歌');

   }
}
var ldh = new Star('刘德华', 18);
// 1.实例成员就是构造函数内部通过this添加的成员 uname age sing 就是实例成员
// 实例成员只能通过实例化的对象来访问
console.log(ldh.uname);
ldh.sing();
// console.log(Star.uname); // 不可以通过构造函数来访问实例成员
// 2. 静态成员 在构造函数本身上添加的成员  sex 就是静态成员
Star.sex = '男';
// 静态成员只能通过构造函数来访问
console.log(Star.sex);
console.log(ldh.sex); // 不能通过对象来访问
```

> 说明：
>
> 构造函数方法很好用,但是存在浪费内存的问题。

### 显式原型属性`prototype`

JavaScript规定,每一个构造函数都有一个prototype属性,指向另一个对象。 注意这个对象就是原型对象,这个对象的所有属性和方法,都会被构造函数所拥有。
我们可以把那些不变的方法,直接定义在prototype对象上,这样所有对象的实例就可以共享这些方法（或变量）。

```javascript
// 1. 构造函数的问题:每次实例化对象都会重新为方法分配内存空间
function Star(uname, age) {
   this.uname = uname;
   this.age = age;
   // this.sing = function() {
   //     console.log('我会唱歌');

   // }
}
Star.prototype.sing = function() {
   console.log('我会唱歌');
}
var ldh = new Star('刘德华', 18);
var zxy = new Star('张学友', 19);
console.log(ldh.sing === zxy.sing); //结果为true
// console.dir(Star);
ldh.sing();
zxy.sing();
// 2. 一般情况下,我们的公共属性定义到构造函数里面, 公共的方法我们放到原型对象身上
// 并且prototype上的属性可以用实例对象调用
```

### 隐式原型属性：`__proto__`原型

注意：在新版的浏览器中，用   `[[Prototype]]`  表示`__proto__`

```javascript
function Star(uname, age) {
   this.uname = uname;
   this.age = age;
}
Star.prototype.sing = function() {
   console.log('我会唱歌');
}
var ldh = new Star('刘德华', 18);
var zxy = new Star('张学友', 19);
ldh.sing();
console.log(ldh); // 对象身上系统自己添加一个 __proto__ 指向我们构造函数的原型对象 prototype
console.log(ldh.__proto__ === Star.prototype);
// 方法的查找规则: 首先先看ldh 对象身上是否有 sing 方法,如果有就执行这个对象上的sing
// 如果么有sing 这个方法,因为有__proto__ 的存在,就去构造函数原型对象prototype身上去查找sing这个方法
```

> 注意：
>
> `prototype`是在构造函数上
>
> `__proto__`是在实例对象上
>
> 它们指向的是同一个原型对象。
>
> 在新版的浏览器中，用   `[[Prototype]]`  表示`__proto__`

### 构造函数、实例、原型对象三者的关系

<img src="https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/构造函数-实例-原型对象三者关系.png" style="zoom:67%;" />

>程序员通过prototype往原型对象上放东西（属性），程序通过`___proto__`来找东西

### 原型链

对于任何一个对象，都有`__proto__`属性去指向原型对象。同样的，原型对象也有`__proto__`属性。这样就的原型之间就相当于是在一条链上，被称为原型链。

```javascript
function Star(uname, age) {
   this.uname = uname;
   this.age = age;
}
Star.prototype.sing = function() {
   console.log('我会唱歌');
}
var ldh = new Star('刘德华', 18);
// 1. 只要是对象就有__proto__ 原型, 指向原型对象
console.log(Star.prototype);
console.log(Star.prototype.__proto__ === Object.prototype);
// 2.我们Star原型对象里面的__proto__原型指向的是 Object.prototype
console.log(Object.prototype.__proto__);
// 3. 我们Object.prototype原型对象里面的__proto__原型  指向为 null
```

<img src="https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/原型链示意图.png" style="zoom:50%;" />

**js中的成员查找机制**

```
①当访问一个对象的属性(包括方法)时,首先查找这个对象自身有没有该属性。
②如果没有就查找它的原型(也就是_ proto_ 指向的prototype原型对象)。
③如果还没有就查找原型对象的原型( Object的原型对象)。
④依此类推- -直找到Object为止 ( null )
```

**原型对象中的this指向**

原型对象中的this指向的是调用它的实例对象。

## 2.5  Vue.extend()

当使用extend()定义一个组件时，返回的是一个构造函数，名字为`VueComponent`

1. school组件本质是一个名为VueComponent的构造函数，且不是程序员定义的，是`Vue.extend`生成的。

2. 我们只需要写`<school/>`或`<school></school>`，Vue解析时会帮我们创建school组件的实例对象，
   即Vue帮我们执行的：==new VueComponent(options)==

3. 特别注意：每次调用`Vue.extend`，返回的都是一个全新的`VueComponent` ！！！！

4. 关于this指向：
           (1).组件配置中：
                       data函数、methods中的函数、watch中的函数、computed中的函数 它们的this均是【VueComponent实例对象】。
           (2).new Vue(options)配置中：
                       data函数、methods中的函数、watch中的函数、computed中的函数 它们的this均是【Vue实例对象】。

5. VueComponent的实例对象，以后简称vc（也可称之为：组件实例对象）。
       Vue的实例对象，以后简称vm。

## 2.6  组件的实例对象和vm之间的一个重要的内置关系

1. 一个重要的内置关系：VueComponent.prototype.__proto__ === Vue.prototype
2. 为什么要有这个关系：让组件实例对象（vc）可以访问到 Vue原型上的属性、方法。

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/QQ截图20211225154753.png)

## 2.7  单文件组件

真实的开发中不会使用非单文件的组件，而是使用单文件组件。

### 2.7.1 单文件组件的写法

单文件的组件，以`.vue`后缀结尾的文件，一个文件就对应一个组件。

它由三部分组成：

```html
<template>
页面模板
</template>

<script>
	export default {
	data() {
      return {
      
   }},
   components: {}
}
</script>

<style>
样式定义
</style>
```

### 2.7.2 脚手架入门

VueCLI官网：https://cli.vuejs.org/zh/

#### 使用步骤：

第一步（仅第一次执行）：全局安装@vue/cli 使用命令：`npm install -g @vue/cli`

第二步：切换到你要创建项目的目录，然后使用命令创建项目 `vue create xxx `（其中xxx是项目名）

第三步：启动项目 `npm run serve`



#### 项目目录结构

用脚手架创建的vue项目目录结构

```
├── build/               # Webpack 配置目录
├── dist/                # build 生成的生产环境下的项目
├── config/               # Vue基本配置文件，可以设置监听端口，打包输出等
├── node_modules/                # 依赖包，通常执行npm i会生成
├── src/                 # 源码目录（开发的项目文件都在此文件中写）
│   ├── assets/            # 放置需要经由 Webpack 处理的静态文件，通常为样式类文件，如css，sass以及一些外部的js
│   ├── components/        # 公共组件
│   ├── filters/           # 过滤器
│   ├── store/    　　　　 # 状态管理
│   ├── routes/            # 路由，此处配置项目路由
│   ├── services/          # 服务（统一管理 XHR 请求）
│   ├── utils/             # 工具类
│   ├── views/             # 路由页面组件
│   ├── App.vue             # 根组件
│   ├── main.js             # 入口文件
├── index.html         # 主页，打开网页后最先访问的页面
├── static/              # 放置无需经由 Webpack 处理的静态文件，通常放置图片类资源
├── .babelrc             # Babel 转码配置
├── .editorconfig             # 代码格式
├── .eslintignore        # （配置）ESLint 检查中需忽略的文件（夹）
├── .eslintrc            # ESLint 配置
├── .gitignore           # （配置）在上传中需被 Git 忽略的文件（夹）
├── package.json         # 本项目的配置信息，启动方式
├── package-lock.json         # 记录当前状态下实际安装的各个npm package的具体来源和版本号
├── README.md         # 项目说明（很重要，便于其他人看懂）
```

#### render配置项

在`main.js`文件中，App组件的注册方式与之前的配置方式有所不同，如下。

```
new Vue({
  el:'#app',
  render: h => h(App),
})
```

说明：

在引入vue时，实际引入的是`vue.runtime.esm.js`文件

```
1. vue.js与vue.runtime.xxx.js的区别：
   vue.js是完整版的Vue，包含：核心功能 + 模板解析器。
   vue.runtime.xxx.js是运行版的Vue，只包含：核心功能；没有模板解析器。
2. 因为vue.runtime.xxx.js没有模板解析器，所以不能使用template这个配置项，需要使用render函数接收到的createElement函数去指定具体内容。
```

#### 项目隐藏配置

**说明：**

Vue 脚手架隐藏了所有 webpack 相关的配置，若想查看具体的 webpakc 配置， 请执行：`vue inspect > output.js`

会在项目的根目录生成一个output.js文件，这个文件只是vue项目配置的映射文件。如果需要更改配置项，则需手动创建`vue.config.js`文件。具体的配置说明见vueCLI官网：https://cli.vuejs.org/zh/config/

举例：

```javascript
module.exports = {
  pages: {
    index: {
      // page 的入口
      entry: 'src/index/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
    }
  },
   //关闭保存时语法检查
  lintOnSave: false
}
```

## 2.8 ref属性

在vue中一般不需要手动的获取或操作DOM元素，而是通过给结点（或组件）添加`ref属性`来代替`id属性`获取结点（组件）元素。

使用方式：

1. 打标识：`<h1 ref="xxx">.....</h1>` 或 `<School ref="xxx"></School>`
2. 获取：`this.$refs.xxx`

注意：

1. 应用在html标签上获取的是真实DOM元素，应用在组件标签上是组件实例对象（vc）
2. 注意是`$refs`属性，记得加 s

## 2.9 props配置项

1. 第一种方式（只接收）：`props:['name']`

2. 第二种方式（限制类型）：`props:{name:String}`

3. 第三种方式（限制类型、限制必要性、指定默认值）：

   ```javascript
   props:{
   	name:{
   	type:String, //类型
   	required:false, //必要性
   	default:'老王' //默认值
   	}
   }
   ```

示例：

```javascript
====================使用时=================：
<Student name="jerry" sex="男"></Student>
    <hr>
<Student name="Alice" sex="女" :age="18"></Student>


====================定义时==========：
export default {
  name: "Student",
  data() {
    return {
      msg: '我是一个学生'
    }
  },
  // eslint-disable-next-line vue/no-dupe-keys
  // 数据不用写死，使用组件时属性的值是什么，组件对应的数据就是什么（默认都是字符串）
  // 第1种：数组的写法
  /*
   props:['name','sex','age']
  */
  // 第2种：对象的写法,键是属性名，值为数据类型，但是注意：这里不会做自动类型转换，如果类型不匹配，则会在控制台提醒
  /*
  props:{
    name:String,
    sex:String,
    age:Number
  }
   */
  // 第3种：对象嵌套对象的写法,注意：一般required为true时不需设置默认值default
  props: {
    name: {
      type: String, //类型
      required: true,//必要性
    },
    sex: {
      type: String,
      required: false,
      default: '男' //默认值
    },
    age:{
      type:Number,
      default: 20

    }

  }
}
```

==注意：==

props是只读的，Vue底层会监测你对props的修改，如果进行了修改，就会发出警告，若业务需求确实需要修改，那么请复制props的内容到data中一份，然后去修改data中的数据。

对于数值型的参数，可以通过数据绑定`v-bind:`或者`:`来指定。见上述代码age属性的使用。

## 2.10  混入











