# ES新特性

## ECMAScript和JavaScript的关系

学习ES新特性首先要明白：ECMAScript和JavaScript到底是什么关系？

要讲清楚这个问题，需要回顾历史。1996年11月，JavaScript的创造者Netscape公司，决定将JavaScript提交给国际标准化组织ECMA，希望这种语言能够成为国际标准。次年，ECMA发布262号标准文件（ECMA-262）的第一版，规定了浏览器脚本语言的标准，并将这种语言称为ECMAScript，这个版本就是1.0版。

该标准从一开始就是针对JavaScript语言制定的，但是之所以不叫JavaScript，有两个原因。一是商标，Java是Sun公司的商标，根据授权协议，只有Netscape公司可以合法地使用JavaScript这个名字，且JavaScript本身也已经被Netscape公司注册为商标。二是想体现这门语言的制定者是ECMA，不是Netscape，这样有利于保证这门语言的开放性和中立性。

因此，ECMAScript和JavaScript的关系是，前者是后者的规格，后者是前者的一种实现（另外的ECMAScript方言还有Jscript和ActionScript）。日常场合，这两个词是可以互换的。

## 1、新特性快速预览

| 版本号  | 年份   | 新特性                                                       |
| ------- | ------ | ------------------------------------------------------------ |
| 第 6版  | 2015年 | 模块化、面向对象语法Promise、 箭头函数、 箭头函数let、 const、数组解构赋值等 、数组解构赋值等 、 |
| 第 7版  | 2016年 | 幂运算符、数组扩展Async/await关键字                          |
| 第 8版  | 2017年 | Async/await、字符串扩展 、字符串扩展                         |
| 第 9版  | 2018年 | 对象解构赋值、正则扩展                                       |
| 第 10版 | 2019年 | 扩展对象、数组方法                                           |
|         |        |                                                              |

注：从 ES6开始，每年发布一个版本，版本号比份最后位大 1

## 2、ES6新特性

### 2.1、let声明变量

```javascript
let a = 34;
let b = 'show';
console.log(a+b);

//1. 不能重复声明
let name = 'tom';
let name = 'jerry'

//2. 块级作用域(包含if while等有范围的)
{
   let age = 19;
}
console.log(age);//获取不到age

//3. 不存在变量提升
console.log(girl);//会报错
let girl = 'alice';
```

用let解决事件函数中不能获得外层循环中 `i` 的问题

```javascript
<style>
        .box{
            height: 50px;
            width: 100px;
            border: 1px solid skyblue;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <h2>鼠标点击更换颜色</h2><hr>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <script>
        let elements = document.getElementsByClassName("box");
        // for(var i = 0;i<elements.length;i++){
        //     elements[i].onclick = function(){
        //         // this.style.background = 'pink';
        //         //点击的时候循环已经执行完成，var i已经变成了3（全局变量）
        //         elements[i].style.background = 'pink';
        //     }
        // }
        for(let i = 0;i<elements.length;i++){
            elements[i].onclick = function(){
                // this.style.background = 'pink';
                //点击的时候循环已经执行完成，var i已经变成了3（全局变量）
                elements[i].style.background = 'pink';
            }
        }
        
    </script>
</body>
```



### 2.2、const声明变量

```javascript
<script>
   //1.一定要赋初始值
   // const A;
   //2.一般常 量使用大写(习惯做法，非标准)
   const a=100;
   //3.常量的值不能修改
   // SCHOOL = ' ATGUIGU' ;
   //4. 块儿级作用域
   // {
       const PLAYER = 'UZI';
   // }
   // console.1og(PLAYER);
</script>
```

### 2.3、 模板字符串
采用反引号来增强字符串的声明

1. 字符串中可以出现换行符。

2. 使用`${变量名}`来拼接字符串

```javascript
<script>
     // 模板字符串用反引号来声明，可以直接在声明的时候进行换行，便于阅读
     let el = `<ul>
               <li>鲁班</li>
         	   <li>亚瑟</li>
       	      <li>妲己</li>
        	      </ul>`;

	  let name = '刘德华';
     let show = `${name}是我最喜欢的演员。。。`;
     console.log(show);
 </script>
```

### 2.4、 对象的简化表达

ES6 允许在大括号里面，直接写入变量和函数，作为对象的属性和方法。

对象中的方法可以省去`：function`

这样的书写更加简洁

```javascript
<script>
     let name = 'tom';
     let show = function(){
         console.log("展示自我");
     }

     //对象的简化
     const person = {
         name,
         show,
         // study:function(){
         //     console.log("我是学生，我要学习");
         // }
         // study可以简化为下面这种方式
         study(){
             console.log("我是学生，我要学习");
         }
     }
     person.show();
     person.study();
 </script>
```

### 2.5 、 箭头函数

**箭头函数的格式**

`let 函数名 = ()=>{`

`}`

```javascript
<script>
   let fu = (mes) => {
      alert("箭头函数："+mes);

   }
   fu("参数");
</script>
```

**箭头函数的特性：**

1. this是静态的。this始终指向函数声明时所在作用域下的this的值

2. 不能当做构造函数

3. 不能使用arguments 变量

==说明：==

箭头函数可以还可以简写

当参数只有一个时可以省略小括号，当方法体只有一个条语句时，可以省略花括号（而且需要省略return）。

```javascript
//计算n的平方
let f2 = n=>n*n;
let result = f2(5);
console.log(result);
```

**箭头函数的适用场景**

```
箭头函数适合与this 无关的回调。定时器，数组的方法回调
箭头函数不适合与this 有关的回调。 事件回调，对象的方法

```

### 2.6、 函数参数的默认值

ES6 允许给函数参数赋值初始值

```javascript
//1. 形参初始值
function add(a,b,c=10) {
   return a+b+C;
}
let result = add(1,2);
console .1og( result);//结果13

```

==注意：==

一般的带有默认值的参数要放在最后

### 2.7、rest参数

表示可变长度的参数，类似于java中的可变长参数。都是用`...`表示不定长的参数个数。

```javascript

// 传统的arguements
function data(a){
   console.log(arguments);
}
data(1,2,3,4);

// rest参数
function fu2(a,b,...args){
   console.log(args);
}
fu2(1,2,3,4);

```

**rest和arguments的区别**

```
rest表示的是一个数组
arguments表示的是一个对象，是伪数组。
```

### 2.8、扩展运算符

运算符  `...`

将数组转换为以逗号分割的参数序列。

```javascript
// 数组的合并
let kuaizi = ['王太利', '肖央'];
let fenghuang = ['曾毅','玲花'];
let zuixuanxiaopengguo = [...kuaizi,...fenghuang];
console.log(zuixuanxiaopengguo);
//数组的克隆
let name = ['tom','jerry','sam'];
let arr = [...name];
console.log(arr);
//将伪数组转换为数组
var ele = document.querySelectorAll("p");
console.log(ele);//这时输出的是伪数组
var eleArray = [...ele];
console.log(eleArray);
```

### 2.9、新的数据类型Symbol

ES6 引入了一种新的原始数据类型 Symbol，表示独一无二的值。它是 JavaScript 语言的第七种数据类型，是一种类似于字符串的数据类型。

**Symbol 特点** 

1. Symbol 的值是唯一的，用来解决命名冲突的问题

2. Symbol 值不能与其他数据进行运算 

3. Symbol 定义 的 对象属 性 不能 使 用 for…in 循 环遍 历 ，但 是可 以 使 用 Reflect.ownKeys 来获取对象的所有键名

==js中的类型总结==

助记：USONB

U undefinded

S  string  Symbol

O object 

N  null  number

B  boolean

```js
//创建 Symbol
let s1 = Symbol();
console.log(s1, typeof s1);

//添加标识的 Symbol
let s2 = Symbol('尚硅谷');
let s2_2 = Symbol('尚硅谷');
console.log(s2 === s2_2);//返回false

//使用 Symbol for 定义
let s3 = Symbol.for('尚硅谷');
let s3_2 = Symbol.for('尚硅谷');
console.log(s3 === s3_2);//返回true,这里相当于java中的常量string
```

**Symbol的作用演示**



### 2.10、迭代器

遍历器（Iterator）就是一种机制。它是一种接口（就是对象有Symbol.iterator]属性），为各种不同的数据结构提 供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作。

```js
let arr = ['tom','jerry'];
for (const name of arr) {
   console.log(name);
}
console.log("======");
console.log(arr[Symbol.iterator]());
```

==for in 和for of==
for-in是ES5标准，遍历的是key（可遍历对象、数组或字符串的key）

for-of是ES6标准，遍历的是value（可遍历对象、数组或字符串的value）

**自定义迭代器**

```js
<script>
  //声明一个对象
  const banji = {
      name: "终极一班",
      stus: [
          'xiaoming',
          'xiaoning',
          'xiaotian',
          'knight'
      ],
      [Symbol.iterator]() {
          //索引变量
          let index = 0;
          //
          let _this = this;
          return {
              next: function () {
                  if (index < _this.stus.length) {
                      const result = {
                          value: _this.stus[index],
                          done: false
                      };
                      //下标自增
                      index++;
                      //返回结果
                      return result;
                  } else {
                      return {
                          value: undefined,
                          done: true
                      };
                  }
              }
          };
      }
  }

  //遍历这个对象 
  for (let v of banji) {
      console.log(v);
  }
</script>
```

### 2.11、Promise

所谓`Promise`，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。

**`Promise`对象有以下两个特点。**

（1）对象的状态不受外界影响。`Promise`对象代表一个异步操作，有三种状态：==`pending`（进行中）==、==`fulfilled`（已成功）==和==`rejected`（已失败）==。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是`Promise`这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。

（2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。`Promise`对象的状态改变，只有两种可能：从`pending`变为`fulfilled`和从`pending`变为`rejected`。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对`Promise`对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

**使用Promise的好处：**

可以大大减少函数的层层嵌套，把每个任务的逻辑功能剥离出来。

**Promise基本用法：**

`Promise`构造函数接受一个函数作为参数，该函数的两个参数分别是`resolve`和`reject`。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。

```javascript
  let promise = new Promise(function (resolve, reject) {

      // 一个异步的事件
      setTimeout(function () {
          let mess = '成功';

          /* resolve()表示异步操作成功
             reject()表示异步操作失败
          */

          if (mess == '成功') {
              resolve("异步操作成功");//会执行promise.then中的第一个方法
          } else {
              reject('异步操作失败');//表示失败，会执行promise.then中的第二个方法
          }
      }, 3000);

  });

  promise.then(function (value) {
      alert(value);
  },function(err){
      alert(err);
  });
```

**Promise封装读取文件的异步操作**

```js
const fs = require('fs');

const promise = new Promise(function (resolve, reject) {

    //异步事件
    fs.readFile('./aaa.txt', (err, data) => {

        if (err) {
            reject('读取文件失败');
        } else {
            resolve(data);//data是从文件中读取的数据
        }

    });
});
promise.then(function(data){
    console.log(data.toString());
},function(msg){
    console.log(msg);
});
```

### 2.12、set集合

ES6 提供了新的数据结构 Set（集合）。它类似于数组，但成员的值都是唯 一的，集合实现了 iterator 接口，所以可以使用『扩展运算符』和『for…of…』进 行遍历，

集合的属性和方法：

1) size 返回集合的元素个数 

2) add（） 增加一个新元素，返回当前集合 

3) delete（） 删除元素，返回 boolean 值 

4) has（） 检测集合中是否包含某个元素，返回 boolean 值 

5) clear（） 清空集合，返回 undefined

```js
//创建一个空集合
let s = new Set();
//创建一个非空集合
let s1 = new Set([1,2,3,1,2,3]);
//集合属性与方法
//返回集合的元素个数
console.log(s1.size);
//添加新元素
console.log(s1.add(4));
//删除元素
console.log(s1.delete(1));
//检测是否存在某个值
console.log(s1.has(2));
//清空集合
console.log(s1.clear());
```

**set的应用实例**

```js
  let arr = [1,2,3,4,5,4,3,2,1];
  //1. 数组去重
   let result = [...new Set(arr)];
   console.log(result);
  //2. 交集
  let arr2 = [4,5,6,5,6];
  let result = [...new Set(arr)].filter(item => {
       let s2 = new Set(arr2);// 4 5 6
       if(s2.has(item)){
           return true;
       }else{
           return false;
       }
   });
  // let result = [...new Set(arr)].filter(item => new Set(arr2).has(item));
   console.log(result);

  //3. 并集
   let union = [...new Set([...arr, ...arr2])];
   console.log(union);

  //4. 差集
  let diff = [...new Set(arr)].filter(item => !(new Set(arr2).has(item)));
  console.log(diff);
```

### 2.13、Map集合

ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合。但是“键” 的范围不限于字符串，各种类型的值（包括对象）都可以当作键。Map 也实现了 iterator 接口，所以可以使用『扩展运算符』和『for…of…』进行遍历。

Map 的属 性和方法： 

1) size 返回 Map 的元素个数 

2) set（） 增加一个新元素，返回当前 Map 

3) get （）返回键名对象的键值 

4) has （）检测 Map 中是否包含某个元素，返回 boolean 值 

5) clear（） 清空集合，返回 undefined

==注意==

JavaScript中键值都可以是任意的类型（包括字符串，函数，对象等）

**举例：**

```js
//声明 Map
let m = new Map();

//添加元素
m.set('name','尚硅谷');
m.set('change', function(){
   console.log("我们可以改变你!!");
});
let key = {
   school : 'ATGUIGU'
};
m.set(key, ['北京','上海','深圳']);

//size
// console.log(m.size);

//删除
// m.delete('name');

//获取
// console.log(m.get('change'));
// console.log(m.get(key));

//清空
// m.clear();

//遍历
for(let v of m){
   console.log(v);
}
```

### 2.14、 class类

阮一峰：  https://wangdoc.com/es6/class.html

ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念，作为对象的模板。通过 class 关键字，可以定义类。新的 class 写法只是让对象 原型的写法更加清晰、更像面向对象编程的语法而已。

```js
//声明一个类
  class Phone{
      //构造方法
      constructor(brand,price){
          this.brand = brand;
          this.price = price;
      }

      callNumber(number){
          console.log('打电话给：'+number);
      }
  }
  let huawei = new Phone('华为',1999);
  huawei.callNumber(110);
  console.log(huawei);
```

构造函数的`prototype`属性，在 ES6 的“类”上面继续存在。事实上，类的所有方法都定义在类的`prototype`属性上面。

**继承和重写父类的方法：**

```js
//继承父类Phone
class SmartPhone extends Phone{
   constructor(brand,price,color,size){
       super(brand,price);
       this.color = color;
       this.size = size;
   }
   //重写父类中play方法
   play(){
       console.log('小米手机打游戏');
   }

}
let mi = new SmartPhone('mi',1999,'white',6.9);
mi.play();
console.log(mi);
```

### 2.15、数值相关的方法扩展

1. 整数的不同进制表示

 ES6 提供了二进制和八进制数值的新的写法，分别用前缀 `0b`、`0o`表示。

2. Number相关的方法

   | 方法                 | 说明                                   |
   | -------------------- | -------------------------------------- |
   | Number.isFinite( )   | 用来检查一个数值是否为有限的           |
   | Number.isNaN( )      | 用来检查一个值是否为 NaN               |
   | Number.parseInt( )   |                                        |
   | Number.parseFloat( ) |                                        |
   | Number.isInteger( )  | 用来判断一个数值是否为整数             |
   | Math.trunc ( )       | 用于去除一个数的小数部分，返回整数部分 |

### 2.16、解构赋值

ES6允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。本质上，这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。

```js
let a = 1;
let b = 2;
let c = 3;
// 等价于
let [a, b, c] = [1, 2, 3];
 
let [ , third] = ["foo", "bar", "baz"];
third // "bar"
 
let [head, ...tail] = [1, 2, 3, 4];
head // 1
tail // [2, 3, 4]
 
let [x, y, ...z] = ['a'];
x // "a"
y // 变量解构不成功，赋值为undefined
z // 数组解构不成功，赋值为[]
```

### 2.17、模块化

在ES6之前，JavaScript 一直没有模块（module）体系，无法将一个大程序拆分成互相依赖的小文件，再用简单的方法拼装起来。

在 ES6 之前，社区制定了一些模块加载方案，最主要的有 CommonJS 和 AMD 两种。前者用于服务器，后者用于浏览器。ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。

##### 模块化的好处

1) 防止命名冲突 

2) 代码复用 

3) 高维护性

##### 基本语法

```
模块功能主要由两个命令构成：export 和 import。 
  export 命令用于规定模块的对外接口 
  import 命令用于输入其他模块提供的功能
```

##### 模块化初体验

`m1.js文件`

```javascript
export let name = 'tom';
export function show(){
    console.log('show something');
}
```

`test.html文件`

```html
<html lang="en">
<head>
    <title>Document</title>
</head>
<body>
    <script type="module">
        import * as m from './m1.js';
        console.log(m);
    </script>
</body>
</html
```

==特别注意：==

这里的script标签必须带有type='module'



##### 模块数据暴露的方式：

1. 分别暴露

   ```javascript
   export let name = 'tom';
   export function show(){
       console.log('show something');
   }
   ```

2. 统一暴露

   ```javascript
   let phone = 'xiaomi';
   let man = {
       name:'tom',
       study(){
           console.log('study hard...');
       }
   };
   export{phone,man};
   ```

3. 默认暴露

```javascript
export default {
    school:'hfuu' ,
    change: function(){
    console. log( "我们可以改变你!!");
    }
}
```

##### 模块的导入

1. 统一导入方式

   ```javascript
   import * as m from './m1.js';
   console.log(m);
   console.log("========")
   import * as m2 from './m2.js';
   console.log(m2);
   m2.man.study();
   console.log("========");
   import * as m3 from './m3.js';
   console.log(m3);
   ```

2. 解构赋值形式的导入

   ```javascript
   <script type="module">
        // 2、结构赋值的形式的导入
        import {name,show} from './m1.js';
        console.log(name);
        console.log(show);
        import {default as m3} from './m3.js';
        console.log(m3);
    </script>
   ```

   ==注意：==

   对于用解构赋值导入默认暴露的数据，必须指定别名

3. 简便导入（**只针对默认暴露**）

   ```javascript
   <script type="module">
        // 简单导入,只针对默认暴露
        import m3 from './m3.js';
        console.log(m3);
    </script>
   ```

##### 模块化安装Jquery的包

1. 初始化项目

   npm下载依赖：

   `npm install babel-cli babel-preset-env browserify -D`

   `npm i jquery`

2. 创建相关的html和js源文件

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <title>Document</title>
       <style>
           div{
               height: 100px;
               width: 100px;
               border:2px solid skyblue;
           }
       </style>
   </head>
   <body>
       <!-- 案例说明：使用es6导入jquery并使用 -->
       <div class="box"></div>
       <script type="module" src="./dist/bundle.js">
       </script>
   </body>
   </html>
   ```

   src文件夹中的源代码js

   ```javascript
   import $ from 'jquery';
   
   $('div').click(function () {
       $(this).css('background', 'skyblue');
   });
   ```

3. 使用babel来生成兼容性的js文件

   `npx babel src/js -d dist/js --presets=babel-preset-env`

4. 使用browserify来打包babel处理后的兼容性js文件

   `npx browserify dist/js/app.js -o dist/bundle.js `

## 3、babel

中文文档：https://www.babeljs.cn/docs/

主要功能：用于将采用 ECMAScript 2015+ 语法编写的代码转换为向后兼容的 JavaScript 语法，编码者可以把精力更多的放在功能上，而不是兼容问题。

## 4、ES7新特性

| 新特性                   | 说明                                               |
| ------------------------ | -------------------------------------------------- |
| Array.prototype.includes | 方法用来检测数组中是否包含某个元素，返回布尔类型值 |
| 指数运算符「**」         | 用来实现幂运算，功能与 Math.pow 结果相同           |

```javascript
// includes
// const mingzhu = ['西游记','红楼梦','三国演义','水浒传'];

//判断
 console.log(mingzhu.includes('西游记'));//返回true
 console.log(mingzhu.includes('金瓶梅'));//返回false

// **
console.log(2 ** 10);// 结果都是1024
console.log(Math.pow(2, 10));
```

## 5、ES8新特性

### async函数

1. async 函数的返回值为 promise 对象
2.  promise 对象的结果由 async 函数执行的返回值决定

```javascript
<script>
     //async 函数
     async function fn(){
         // 返回一个字符串
         // return '尚硅谷';
         // 返回的结果不是一个 Promise 类型的对象, 返回的结果就是成功 Promise 对象
         // return;
         //抛出错误, 返回的结果是一个失败的 Promise
         // throw new Error('出错啦!');
         //返回的结果如果是一个 Promise 对象
         return new Promise((resolve, reject)=>{
             resolve('成功的数据');
             // reject("失败的错误");
         });
     }

     const result = fn();

     //调用 then 方法
     result.then(value => {
         console.log(value);
     }, reason => {
         console.warn(reason);
     })
 </script>
```

### await

1. await 必须写在 async 函数中
2. await 右侧的表达式一般为 promise 对象
3. await 返回的是 promise 成功的值 
4. await 的 promise 失败了, 就会抛出异常, 需要通过 try...catch 捕获处理

**案例：使用async和await演示读取文件的操作**

```javascript
//1. 引入 fs 模块
const fs = require("fs");

//读取『为学』
function readA() {
    return new Promise((resolve, reject) => {
        fs.readFile("./a.txt", (err, data) => {
            //如果失败
            if (err) reject(err);
            //如果成功
            resolve(data);
        })
    })
}

function readB() {
    return new Promise((resolve, reject) => {
        fs.readFile("./b.md", (err, data) => {
            //如果失败
            if (err) reject(err);
            //如果成功
            resolve(data);
        })
    })
}

function readC() {
    return new Promise((resolve, reject) => {
        fs.readFile("./c.txt", (err, data) => {
            //如果失败
            if (err) reject(err);
            //如果成功
            resolve(data);
        })
    })
}

//声明一个 async 函数
async function main(){
    //获取a.txt内容
    let A = await readA();
    //获取b.md内容
    let B = await readB();
    // 获取c.txt内容
    let C = await readC();

    console.log(A.toString());
    console.log(B.toString());
    console.log(C.toString());
}

main();
```



>关于ES新特性，暂时更新到这里。。
>
>可参考文档：https://wangdoc.com/es6/





