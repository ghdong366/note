

# JavaScript

# 第一章、基础语法

## 1.1  js特性和浏览器

**提醒**

js中推荐使用单引号

通过`prompt(info)`获取的都是String类型

**浏览器解析js过程**

浏览器本身并不会执行JS代码,而是通过内置JavaScript引擎(解释器)来执行JS代码。JS 引擎执行代码时逐行解释。每一句源码(转换为机器语言) , 然后由计算机去执行,所以JavaScript语言归为脚本语言，==会逐行解释执行。==

**js的组成**

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/js组成（三部分）.png)

ECMAScript规定了JS的编程语法和基础核心知识,是所有浏览器厂商共同遵守的一套JS语法工业标准。

DOM提供的接口可以对页面上的各种元素进行操作(大小、位置、颜色等)。

通过BOM可以操作浏览器窗口,比如弹出框、控制浏览器跳转、获取分辨率等。

**js三种位置**

* 行内

  可以将单行或少量JS代码写在HTML标签的事件属性中(以on开头的属性)

  除非在特殊情况，为了防止弄混，一般不用

* 内嵌式

  写在script标签中。

* 外链式

  ```html
  <script src="my.js"></script>
  ```

**js注释**

​	单行注释   //

​    多行注释 /**/

## 1.2 js的语法

### 1.2.1  js的输入和输出

`alert(msg)`  浏览器弹出警示框  
`console.log(msg)`浏览器控制台打印输出信息
`prompt(info)`浏览器弹出输入框，用户可以输入浏览器。

```javascript
alert("hahahah");
var a=prompt("请输入内容");
console.log(a);
```

### 1.2.2  变量

在js中，用var声明一个变量，这个变量的类型不是固定的，是可变的。

如果不赋初值，变量不会默认赋值，而是`undefined`

### 1.2.3 数据类型

JavaScript是-种弱类型或者说动态语言。 这意味着不用提前声明变量的类型,在程序运行过程中,类型会被自动确定。

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/js数据类型2.png)

1. 数字型

●Infinity ,代表无穷大,大于任何数值
●-Infinity , 代表无穷小,小于任何数值
●NaN,Not a number,代表一个非数值

==isNaN（要判断的变量或表达式）==

判断一个变量是否为一个数值型的，如果是数值型，返回false,不是返回true

2. 字符串型

   以双引号和单引号包含，两个可嵌套。

   转移字符和java基本相同

   **字符串的长度**

   通过`.length`属性来获取

   **字符串拼接**

   字符串+任何类型=拼接之后的新字符串

3. Boolean、Undefined、null类型

   **Boolean**

   参与数字运算时，true被当作1，false被当作0

   **Undefined**

   如果一个变量声明未赋值就是undefined 未定义数据类型

   **null**

   表示变量是空的，参与数值运算当作0

4. **typeof( )**检测数据类型

   ```javascript
   比如:
   var num =10;
   console.log(typeof(num)) //返回number
   ```

5. 数据类型转换

   * 其他类型转换为String类型

     | 方式           | 说明                         | 举例                                  |
     | -------------- | ---------------------------- | ------------------------------------- |
     | toString()     | 转成字符串                   | var num= 1; alert(num.toString();     |
     | String()       | 强制转换转成字符串           | var num = 1; alert(String(num);       |
     | 加号拼接字符串 | 和字符串拼接的结果都是字符串 | var num = 1; alert(num+“我是字符串"); |

   * 其他类型转换为number类型

     |                        |                              |                   |
     | ---------------------- | ---------------------------- | ----------------- |
     | parselnt(string)函数   | 将string类型转成整数数值型   | parselnt('78')    |
     | parseFloat(string)函数 | 将string类型转成浮点数数值型 | parseFloat(8.21') |
     | Number()强制转换函数   | 将string类型转换为数值型     | Number('12')      |
     | js隐式转换(- * /)      | 利用算术运算隐式转换为数值型 | '12'-0            |

     比较运算符也可以隐式转换

     注：当文字中不仅仅包含数字符号时，可以转换以数字开头的字符串

     var len='200px'
     console.log(parseInt(len));

   * 转换为Boolean类型

     使用`Boolean()`强制类型转换

     只有非空字符串和数字才能转换true

### 1.2.4（循环案例）打印星星

```javascript
// 打印倒三角形
        var num=10;//初始的星星数
        var str='';//表示一行的内容
        for(var i=0;i<10;i++){
            for(var j=0;j<num;j++){
                str=str+'★'
            }
            console.log(str);
            str='';//每打印一行str清空
            num--;//下一行的星星数减一
        }
```



### 1.2.5  断点调试

断点调试可以帮我们观察程序的运行过程
浏览器中按F12--> sources -->找到需要调试的文件-->在程序的某一行设置断点
Watch:监视,通过watch可以监视变量的值的变化,非常的常用。
F11:程序单步执行,让程序一行行的执行,这个时候,观察watch中变量的值的变化。

### 1.2.6  数组

**创建数组**

两种方式

```javascript
var arr = new Array();//创建一个空数组
var num = [1,2,3,4,5];
```

==注意==

JavaScript中允许一个数组中的数据类型不同

**数组的长度**

```javascript
通过length属性获取数组的长度
console.log(num.length);//打印出数组的长度
```

**数组扩容**

通过修改数组的length属性，来扩大数组的容量，新扩建的位置元素为空

**判断是否是数组**

var arr;

console.og(arr instanceof Array)

### 1.2.7  函数

格式：

```javascript
//-----------定义函数
function 函数名(形参列表){
	//函数体
	//返回值
}
//第二种函数声明的方式（）
var fun = function(){
   
}

//-------------调用函数
函数名(实参)


function add(a,b){
    return a+b;
 }
var result = add(2,6);
console.log(result);
```

==注意==

形参不需要写var，直接给变量

**arguments**

当我们不确定有多少个参数传递的时候,可以用arguments来获取。在JavaScript中, arguments实际上
它是当前函数的一一个内置对象。所有函数都内置了一个arguments对象, arguments对象中存储了传递的所有实参。

```
arguments展示形式是-个伪数组,因此可以进行遍历。伪数组具有以下特点:
●具有length属性
●按索引方式储存数据
●不具有数组的push, pop等方法
```

### 1.2.8  js的预解析

js引擎运行js分为两步: 
预解析代码执行 

```JavaScript
1.说明
(1). 预解析js引擎会把js里面所有的var还有function提升到当前作用域的最前面
(2).代码执行 按照代码书写的顺序从上往下执行

2.预解析分为变量预解析(变量提升) 和函数预解析(函数提升)
 (1) 变量提升就是把所有的变量声明提升到当前的作用域最前面 不提升赋值操作
 (2) 函数提升就是把所有的函数声明提升到当前作用域的最前面不调用函数
```

```javascript
// //案例1
        var num = 10;
        fun() ;
        function fun () {
            console.log(num);
            var num = 20;
        }

 //相当于执行了以下操作
        var num;
        function fun() {
            var num;
            console.log(num);
            num = 20;
        }
        num = 10;
        fun();
```



### 1.2.8 对象

**创建对象的三种方式**

1. 利用字面量创建对象

   ```javascript
   var obj={
       uname: '张三疯',
       age: 18,
       sex :'男'，
   sayHi: function() {
       console.log('hi~');
   	}
   }
   //多个属性和方法之间用逗号隔开
   ```

   ==注意：==

   * 多个属性和方法之间用逗号隔开

   * 对象的属性不需要用var声明

2. 利用new Object创建对象

   ```javascript
   var obj = new Object(); //创建了一个空的对象
   obj.uname = '张三疯';
   obj.age = 18;
   obj.sex = '男';
   obj.sayHi = function() {
       console .log('hi~' );
   }
   
   ```

3. 利用构造函数创建对象

   先自定义构造函数，然后再`new 构造函数（）`的方式创建对象。

   ```javascript
   function Star(uname, age, sex) {
       this.name = uname;
       this.age = age; 
       this.sex = sex;
   }
   var 1dh = new Star ('刘德华'，18， '男');
   
   ```

**对象的遍历**

`for    in`的方式遍历对象

```javascript
var tom = new People('tom',19,'北京');
        console.log(tom);
        //遍历对象中的属性
        for(var k in tom){
            console.log(k);//获取属性key
            console.log(tom[k]);//获取对应key的value
        }
```

### 1.2.9  内置对象

**Math对象**

```
Math.abs()
Math.acos()
Math.asin()
Math.ceil()函数返回大于或等于一个给定数字的最小整数(向上取整)
Math.floor() 返回小于或等于一个给定数字的最大整数。(向下取整)
Math.log()函数返回一个数的自然对数
Math.log10()
Math.log2()
Math.max()
Math.min()
Math.pow()
Math.random()函数返回一个浮点数,  伪随机数在范围从0到小于1
Math.round()函数返回一个数字四舍五入后最接近的整数。
Math.sign()函数返回一个数字的符号, 指示数字是正数，负数还是零。
Math.sin()
```

**返回指定范围内的随机整数**

```javascript
这个例子返回了一个在指定值之间的随机数。这个值不小于 min（有可能等于），并且小于（不等于）max。

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
}
```

**Date日期对象**

Date需要被创建(new)出来。

构造函数

默认无参的构造函数返回系统当前的时间。

如果括号里面有时间,就返回参数里面的时间。例如日期格式字符串为'2019-5-1' , 可以写成new Date(‘2019-5-1’)或者new Date(‘2019/5/1’)

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/js内置的Date对象常用方法.png)

```javascript
var now = new Date();
console.log(now);
var year = now.getFullYear();
var month = now.getMonth()+1;//获取的月份数加一
var date = now.getDate();
var day = now.getDay();
console.log(year+'年'+month+'月'+date+'日 星期'+day);
```

**倒计时案例**

//获取时间对象距离标准时间的毫秒数

​	`	getTime()`  

​	`valueOf()` 

​	`	Date.now()`  //当前时间 距离标准时间的毫秒数

思路：

先将两个时间之间相差的毫秒数 通过时间戳算出

把剩余时间总的毫秒数转换为天、时、分、秒(时间戳转换为时分秒)
转换公式如下:
●d = parselnt(总秒数/ 60/60/24); // 计算天数
●h= parselnt(总秒数/ 60/60%24) // 计算小时
●m= parselnt(总秒数/60 %60); // 计算分数
●S = parseInt(总秒数%60);//计算当前秒数

```javascript
 // 倒计时函数
function countTime(time){
    var now = +new Date();
    var goaltime = +new Date(time);

    var times = (goaltime-now)/1000;//返回两个直接相差的秒数
    var d = parseInt(times/60/60/24);//获取天数
    var h = parseInt(times/60/60%24);//获取小时
    var m = parseInt(times/60%60);//获取分钟
    var s = parseInt(times%60);//秒
    return d+'天'+h+'小时'+m+'分'+s+'秒';
}

var exp = countTime('2021-6-8 08:00:00');
document.write(exp);
```

# 第二章、DOM

### 2.1  DOM基础

文档对象模型( Document Object Model ,简称DOM ) , 是W3C组织推荐的处理可扩展标记语言( HTML
或者XML )的标准编程接口。（通过这些DOM接口可以改变网页的内容、结构和样式。）

●文档:一个页面就是一个文档 , DOM中使用document表示
●元愫:页面中的所有标签都是元素, DOM中使用element示
●节点:网页中的所有内容都是节点(标签、属性、文本、注释等) , DOM中使用node表示

==以上这些都当做对象==

#### 2.1.1 获取元素

**通过id获取**

`document.getElementById('box');`获取的是一个id='box'的元素对象

`console.dir(box1);`控制台打印该元素的详细信息

**通过标签名**

返回的是所有指定标签名的对象集合，可以看做是伪数组。

`document.getElementsByTagName('div')`//获取所有的div元素对象，以数组形式返回。

`element. getElementsByTagName ( '标签名');`//element是父元素对象。
注意:父元素必须是单个对象(必须指明是哪一个元素对象).获取的时候不包括父元素自己。

**根据选择器获取标签**

`document.querySelector("css选择器或标签名")`

`document.querySelectorAll('css选择器或标签名')`

```
说明：
那么多的获取元素的方法可以结合使用，用于取指定父元素中的子元素。
如： var li = document.getElementById('head').querySelectorAll('li');

```

==**获取body和html对象**==

```javascript
var body = document.body;//获取boby对象
var html = document.documentElement;//获取html对象
console.dir(body);
console.dir(html);
```

#### 2.1.2  事件

事件是有三部分组成

事件源、事件类型、事件处理程序    我们也称为事件三要素

```javascript
//点击事件举例
<button id='btn'>你好！</button>
<script>
    var btn = document.getElementById('btn');
    btn.onclick = function(){
        alert("hello..........")
    }
</script>
```

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/javascript元素事件.png)

==举例：按钮变灰的方法==

```html
<button>按钮</button>
    
<script>
        var btn = document.querySelector('button');
        btn.onclick = function(){
            this.disabled =true;
        }
</script>
```



#### 2.1.3  修改元素的内容

1. innerText
2. innerHTML

**innerText 和innerHTML的区别**

innerText不识别htm1标签非标准 

innerHTML 识别html标签W3C标准

//这两个属性是可读写的
可以获取元素里面的内容

```javascript
var div = document . querySelector( 'div');
div. innerText = '<strong>今天是: </strong> 2019';
div . innerHTML = ' <strong>今天是: </strong> 2019' ;
```

#### 2.1.4  修改元素的属性

修改html标签的属性值

先获取元素对象，然后对元素对象的属性进行重新赋值

对于元素的class属性，应该用`className`来获取

```javascript
//修改元素属性src
// 1.获取元素
var ldh = document. getElementById( 'ldh' );
var zxy = document . getElementById( 'zxy');
var img = document. querySelector( ' img ' );
// 2.注册事件
处理程序
zxy .onclick = function() {
img.src ='images/ zxy.jpg' ;
img.title = '张学友;
}
ldh. onclick = function() {
img.src = 'images/ldh.jpg';
img.title ='刘德华';

```

#### 2.1.5  修改样式属性

修改元素的css样式属性。

我们可以通过JS修改元素的大小、颜色、位置等样式。
1. element. style.样式属性
  行内样式操作

2. element. className

  类名样式操作,直接修改类名，达到更换选择器的目的

==注意:==
1.JS里面的样式采取驼峰命名法比如fontSize、 backgroundColor
2.JS修改style样式操作,产生的是行内样式, css权重比较高

```html
<div id="box"></div><br>
<button id="btn">更改盒子的样式</button>
<script>
    var box = document.getElementById('box');
    var btn = document.getElementById('btn');
    btn.onclick = function(){
        box.style.width = '200px';
        box.style.backgroundColor = 'pink';
    }
</script>
```

```html
<div>文本</div>
<script>
// 1.使用element.style 获得修改元素样式 如果样式比较少或者功能简单的情况下使用
var test = document . querySelector( 'div');
test.onclick =
function() {
// this. style . backgroundColor = ' purple ';
// this.style.color = ' #fff';
// this. style. fontSize = ' 25px';
// this. style. marginTop = ' 100px' ;
//让我们当前元素的类名改为了change
// 2.我们可以通过修改元素的className更改元素的样式适合于样式较多或者功能复杂的情况
this. className = 'change' ;
</ script>
中

```

#### 2.1.6  案例（密码检查）

```html
<style>
        .wrong {
            color: red;
            font-size: 15px;
        }
    </style>


<body>
    密码：<input type="password" id="pass">
    <span id="tips"></span>
    <script>
        var password = document.getElementById('pass');
        var tips = document.getElementById('tips');
        password.onblur = function(){
            var length = password.value.length;
            console.log(length);
            if(length<6){
               tips.innerText = '×密码要多于六位！'
               tips.className = 'wrong'
            }
            if(length>6){
                tips.innerText = '';
            }

        }
    </script>
</body>
```

#### 2.1.7  百度换肤

```javascript
var imgs = document . querySelector(' . baidu' ) .querySelectorAll('img');
// console . log( imgs);
// 2.循环注册事件
for(vari=0;i< imgs.length; i++) {
	imgs [i] .onclick = function() {
	// this.src 就是我们点击图片的路径images/2.jpg
	// console. log(this. src);
	//把这个路径this.src给body就可以了
	document. body . style . backgroundImage = 'ur1(' + this.src + ' )' ;
}
}
```

#### 2.1.8 复选框全选

```javascript
//获取元素
var j_ cbA1l = document . getElementById('j_ cbA1l'); //全选按钮
var j_ tbs = document. getElementById('j_ tb' ) .getElementsByTagName( ' input'); // 下面所有的复选框
//注册事件
j_ cbAll.onclick = function() {
// this . checked它可以得到当前复选框的选中状态如果是true就是选中，如果是false就是未选中
	console . log(this. checked); 
	for (var i = 0; i < j_ tbs.length; i++) {
	j_ tbs[i].checked = this. checked;
}

```

#### 2.1.9  自定义属性

程序员可以在js中给标签添加自定义属性，用于区别不同的标签。

**添加属性：**

直接在标签中添加。如：\<div  index="1">\</div>

* element . setAttribute('属性'，'值');              给==已经存在的自定义属性==赋值

**获取属性值：**

* element .属性获取属性值。---------常用于标签自带的属性

* element .getAttribute( '属性');----------常用于自定义的属性

**移除属性**

* element . removeAttribute ('属性') ;

#### 2.1.10  案例 (Tab栏切换 )

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/tab栏切换.png)

```html
<style>
    * {
        margin: 0;
        padding: 0;
    }
    
    li {
        list-style-type: none;
    }
    
    .tab {
        width: 978px;
        margin: 100px auto;
    }
    
    .tab_list {
        height: 39px;
        border: 1px solid #ccc;
        background-color: #f1f1f1;
    }
    
    .tab_list li {
        float: left;
        height: 39px;
        line-height: 39px;
        padding: 0 20px;
        text-align: center;
        cursor: pointer;
    }
    
    .tab_list .current {
        background-color: #c81623;
        color: #fff;
    }
    
    .item_info {
        padding: 20px 0 0 20px;
    }
    
    .item {
        display: none;
    }
</style>


<body>
    <div class="tab">
        <div class="tab_list">
            <ul>
                <li class="current">商品介绍</li>
                <li>规格与包装</li>
                <li>售后保障</li>
                <li>商品评价（50000）</li>
                <li>手机社区</li>
            </ul>
        </div>
        <div class="tab_con">
            <div class="item" style="display: block;">
                商品介绍模块内容
            </div>
            <div class="item">
                规格与包装模块内容
            </div>
            <div class="item">
                售后保障模块内容
            </div>
            <div class="item">
                商品评价（50000）模块内容
            </div>
            <div class="item">
                手机社区模块内容
            </div>

        </div>
    </div>
 <script>
        // 获取元素
        var tab_list = document.querySelector('.tab_list');
        var lis = tab_list.querySelectorAll('li');
        var items = document.querySelectorAll('.item');
        // for循环绑定点击事件
        for (var i = 0; i < lis.length; i++) {
            // 开始给5个小li 设置索引号 
            lis[i].setAttribute('index', i);
            lis[i].onclick = function() {
      // 1. 上的模块选项卡，点击某一个，当前这一个底色会是红色，其余不变（排他思想） 修改类名的方式

                // 干掉所有人 其余的li清除 class 这个类
                for (var i = 0; i < lis.length; i++) {
                    lis[i].className = '';
                }
                // 留下我自己 
                this.className = 'current';
                // 2. 下面的显示内容模块
                var index = this.getAttribute('index');
                console.log(index);
                // 干掉所有人 让其余的item 这些div 隐藏
                for (var i = 0; i < items.length; i++) {
                    items[i].style.display = 'none';
                }
                // 留下我自己 让对应的item 显示出来
                items[index].style.display = 'block';
            }
        }
    </script>
</body>
```

#### 2.1.11  自定义属性

H5规定自定义属性以 `data-` 开头作为属性名

如:

```html
<div data-index="1"></div>
```

#### 2.1.12  结点

1. 通过孩子结点获取父结点(亲爸爸)：`孩子对象.parentNode`

   ```html
   <div class=" demo">
   <div class="box">
   <span class= "erweima">x</ span>
   </div>
   </div>
   <script>
   
   // 1.父节点parentNode
   var erweima =document . querySelector(' . erweima' );
   // var box = document . querySelector(' .box ' );
   // 得到的是离 元素最近的父级节点(亲爸爸)如果找不到父节点就返回为null
   console.log(erweima . parentNode);
   </script>
   
   ```

2. 通过父结点获取孩子结点：

   | 获取方法                   | 说明                                                         |
   | -------------------------- | ------------------------------------------------------------ |
   | `父结点.childNodes`        | 获取父元素中的所有子结点（==包括元素结点，文本结点==）。所以不建议使用这个 |
   | `父结点.children`          | 只获取父元素中的子元素结点。                                 |
   | `父结点.firstElementChild` | 获取第一个子元素结点                                         |
   | `父结点.lastElementChild`  | 获取最后一个子元素结点                                       |

   ==后面两个方法有兼容性问题，必须IE9以上版本支持==
   
3. 通过兄弟结点获取元素结点
   `nextElementSibling`    得到下一个兄弟元素节点
   `previousElementSibling`   得到上一个兄弟结点

#### 2.1.13  案例（下拉菜单）

```html
    <style>
        * {
            padding: 0;
            margin: 0;
        }

        li {
            list-style: none;
        }

        a {
            text-decoration: none;
            font-size: 20px;
        }

        .nav {
            margin-left: 200px;
            margin-top: 200px;
        }

        .nav>li {
            position: relative;
            float: left;
            height: 50px;
            width: 90px;
        }

        .nav>li>a {
            display: block;
            width: 100%;
            height: 100%;
            line-height: 50px;
            text-align: center;
        }

        .nav>li>a:hover {
            background-color: rgb(196, 193, 193);

        }

        /* 子项目的大格子 */
        .nav ul {
            display: none;
            position: absolute;
            top: 50px;
            left: 0;
            width: 90px;
            border-left: 1px solid rgb(233, 192, 118);
            border-right: 1px solid rgb(233, 192, 118);
        }

        .nav ul a {
            display: block;
            width: 100%;
            border-bottom: 1px solid #FECC5B;
            font-size: 16px;
            line-height: 50px;
            text-align: center;
        }

        .nav ul li a:hover {
            background-color: #FFF5DA;
        }
    </style>


<body>
    <ul class="nav">
        <li>
            <a href="#">菜单1</a>
            <ul>
                <li><a href="">内容1</a></li>
                <li><a href="">内容2</a></li>
                <li><a href="">内容3</a></li>
                <li><a href="">内容4</a></li>
            </ul>
        </li>
        <li>
            <a href="#">菜单2</a>
            <ul>
                <li><a href="">内容1</a></li>
                <li><a href="">内容2</a></li>
                <li><a href="">内容3</a></li>
                <li><a href="">内容4</a></li>
            </ul>
        </li>
        <li>
            <a href="#">菜单3</a>
            <ul>
                <li><a href="">内容1</a></li>
                <li><a href="">内容2</a></li>
                <li><a href="">内容3</a></li>
                <li><a href="">内容4</a></li>
            </ul>
        </li>
    </ul>
    <script>
        
        // 1. 获取元素
        var nav = document.querySelector('.nav');
        var lis = nav.children; // 得到4个小li
        // 2.循环注册事件
        for (var i = 0; i < lis.length; i++) {
            lis[i].onmouseover = function() {
                //给ul的样式display设置为none
                this.children[1].style.display = 'block';
            }
            lis[i].onmouseout = function() {
                this.children[1].style.display = 'none';
            }
        }
    </script>
</body>
```

==特别注意：==

不能在一个函数中使用函数体外的i值

如

for (var i = 0; i < lis.length; i++) {
            lis[i].onmouseover = function() {
          //给ul的样式display设置为none
               <font color='red'>lis[i]</font>.children[1].style.display = 'block';

}

上图中标红的就是错误的。应该用this

#### 2.1.14 创建、添加结点

| 方法                                    | 说明                                                       |
| --------------------------------------- | ---------------------------------------------------------- |
| document. createElement ( ' tagName ' ) | 创建一个标签元素结点，但现在只在内存中，<br />还未在界面中 |
| node.appendChild(childnode)             | 在一个结点（父结点）中添加一个创建好的元素结点             |

**其他的创建标签方式**

innerHTML

document.write()  //注意，这个会重绘界面

```javascript
<ul></ul>
=====================

// 1.创建节点元素节点
var li=document . createElement( 'li' );
// 2.添加节点node. appendChild(child)   node父级   child是子级   后面追加元素
var ul=document . querySelector('ul' );
ul.appendChild(li);
// 3.添加节点node . insertBefore(child, 指定元素);
var lili2 = document . createElement('li');
ul . insertBefore(lili2,参考的结点)

```

#### 2.1. 15 删除结点

| 方法                       | 说明                     |
| -------------------------- | ------------------------ |
| node . removeChild (child) | 删除父结点中的子元素结点 |

### 2.2  DOM之事件高级

#### 2.2.1  通过监听器注册事件

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/js高级事件.png)

```html
<button>按钮1</button>
<button>按钮2</button>
==================================
var btns = document . querySelectorAll( 'button');
//1.传统方式注册事件
btns[0].onclick = function() {
alert('hi');
btns[0].onclick = function() {
alert('hao a u');
}
// 2.事件侦听注册 事件addEventListener
// (1) 里面的事件类型是字符串必定加引号而且不带on
//(2)同一个元素同一个事件可以添加多个侦听器(事件处理程序)
btns [1]. addEventListener('click', function() {
  alert(22);
})
btns [1]. addEventListener('click', function() {
   alert(33);
})

```

==注意：==

addEventListener()中第一个参数是事件类型，第二个参数是函数名（也可以带函数体的函数），第三个参数可选（true表示捕获阶段，false表示冒泡阶段）默认是false冒泡阶段

#### 2.2.2  解绑事件

1. 传统事件的解绑

   `对象.onclick=null;`

2. 监听器事件的解绑

   `对象.removeEventListener(事件类型，事件函数名);`

```javascript
var btn1 = document.getElementById('btn1');
var btn2 = document.getElementById('btn2');
console.log(btn1);
btn1.onclick = function() {
    alert('btn1');
    btn1.onclick=null;
}
function show(){
    alert('btn2.......')
}
btn2.addEventListener('click',show);
btn2.removeEventListener('click',show);
```

### 2.3  DOM事件流

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/DOM事件流.png)

==注意事项：==

1. 在js中，只能执行捕获或冒泡其中一种阶段
2. 实际开发中我们很少使用事件捕获,我们更关注事件冒泡。
3. 有些事件是没有冒泡的，比如onblur、onfocus、 onmouseenter、 onmouseleave

```javascript
var son = document.querySelector('.son');
son.addEventListener('click', function() {
    alert('son');
}, false);
var father = document.querySelector('.father');
father.addEventListener('click', function() {
    alert('father');
}, false);
document.addEventListener('click', function() {
    alert('document');
})
```

#### 2.3.1  事件对象

官方解释: event对象代表事件的状态,比如键盘按键的状态、鼠标的位置、鼠标按钮的状态。
简单理解:事件发生后,跟事件相关的一系列信息数据的集合都放到这个对象里面,这个对象就是事件对象event ,它有很多属性和方法。

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/事件对象的属性和方法.png)

==注意事项==

1. 就是一个事件对象写到我们侦听函数的小括号里面当形参来看
2. 事件对象只有有了事件才会存在，它是系统给我们自动创建的，不需要我们传递参数
3. 可以自己命名，然后直接在函数体中使用这个对象

```JavaScript
var btn = document.querySelector('button');
btn.onclick = function(event){
    console.log(event);
    console.log(event.target);
    console.log(event.type);
}
```

```
target和this的区别：
target是触发事件的元素对象，this是绑定事件的元素对象。一般两个相同。
但是当ul（绑定了事件）中有li时，点击li，e.target是li,而this是ul
```

#### 2.3.2  阻止冒泡

想要阻止冒泡，就在孩子结点中用`e.stopPropagation()`函数

#### 2.3.3  事件委托

通过点击（或其他的动作）子元素来触发父元素的事件函数。

### 2.4  其他鼠标事件和键盘事件

**禁用右键菜单**

`contextmenu`

可以防止文字被复制，视频被保存的相关操作。

**禁止选中**

```javascript
// 1. contextmenu 我们可以禁用右键菜单
document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    })
    // 2. 禁止选中文字 selectstart
document.addEventListener('selectstart', function(e) {
    e.preventDefault();

})
```

**鼠标的位置**

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/鼠标的位置.png)

==案例：跟随鼠标的小精灵==

思路：

①鼠标不断的移动,使用鼠标移动事件: mousemove
②在页面中移动,给document注册事件
③图片要移动距离,而且不占位置,我们使用绝对定位即可
④核心原理:每次鼠标移动,我们都会获得最新的鼠标坐标，把这个x和y坐标做为图片的top和left值就可以移动图片(==注意单位问题==)

```javascript
<img src="https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/angel.gif">
<script>
    var img = document.querySelector('img');
    document.addEventListener('mousemove',function(e){
        console.log(e.pageX);
        console.log(e.pageY);
        // 单位不要忘记
        img.style.top = e.pageY+'px';
        img.style.left= e.pageX+'px';
    })
</script>
```

**键盘事件**

三个事件的执行顺序是: keydown-- keypress --- keyup

```javascript
*// keyup是按键弹起触发*
document.onkeyup = function(){
   console.log('keyup');
}
*//keydown 按键按下触发*
document.addEventListener('keydown',function(){
  console.log('keydown');
})
*// keypress是按键按下触发，但是不识别功能键（如shift ctrl enter 方向键等）*
document.addEventListener('keypress',function(){
  console.log('keypress');
})
```

**键盘事件对象**

1. 通过`e.keyCode`获取按下的按键的ASCII码。
2. onkeydown和onkeyup不区分字母大小写, onkeypress区分字母大小写。

# 第三章、  BOM

BOM ( Browser Object Model )即浏览器对象模型,它提供了独立于内容而与浏览器窗口进行交互的对象,其核心对象是window。
BOM由-系列相关的对象构成,并且每个对象都提供了很多方法与属性。

### 3.1  页面加载事件

1. window.onload = function() {}
2. window . addEventListener ("load", function() {}) ;

等待界面加载完毕后触发，可以使用这个方法将JavaScript代码放到html代码之前。

### 3.2  浏览器窗口变化事件

1. window. onresize = function() { }

2. window . addEventLi stener ("resize", function() {}) ;

只要窗口大小发生像素变化,就会触发这个事件。
我们经常利用这个事件完成响应式布局。window.innerWidth 当前屏幕的宽度

### 3.3  定时器

**语法规范:**

| 定时器函数                               | 说明                                | 备注                                                         |
| ---------------------------------------- | ----------------------------------- | ------------------------------------------------------------ |
| window . setTimeout(调用函数，延时时间); | 延时一段时间后调用函数 ，只生效一次 | // 1.这个window在调用的时候可以省略<br/>// 2.这个延时时间单位是毫秒但是可以省略，如果省略默认的是0<br/>// 3.这个调用函数可以直接写函数还可以写函数名还有一个写法'函数名()'<br/>//4.页面中可能有很多的定时器，我们经常给定时器加标识符(名字) |
| clearTimeout(定时器函数名)               | ==清除setTimeout类型的定时器函数==  |                                                              |
| window.setInterval(回调函数,延时间);     | 延时调用函数，反复生效              |                                                              |
| clearInterval(定时器函数名)              | ==清除setInterval定时器函数==       | 注意变量作用域的问题，避免获取不到定时器的函数名             |

```javascript
function show(){
    console.log('反复调用show（）函数');
}
//一次调用(这里给定时器函数加了个名字)
var time1= setTimeout(show,3000);

//反复调用
setInterval(show,1000);
```

#### 发送短信的案例

开始提示点击按钮发送验证码

点击按钮后按钮变灰，开始倒计时（启动Interval定时器函数）

倒计时结束后，按钮可重新点击，显示“重新获取”，等待下一次的点击。(清除定时器函数)

```javascript
手机号：<input type="text">
<button>获取验证码</button>

<script>
    var second = 5;//剩余的时间（秒）
    var btn = document.querySelector('button');
    var timer=null;
    //对按钮中的文字进行修改（包含判断）
    function fu(){
        if(second!=0){
            btn.disabled = true;//按钮点击后变灰
            btn.innerText = second+'秒';
            second = second-1;
        }else{
            btn.disabled = false;
            
            clearInterval(timer);
            btn.innerText ='重新获取';
            second = 5;
        }
        
    }
    //按钮点击操作
    btn.onclick = function(){
            fu();
            timer = setInterval(fu,1000);
            
        }
</script>
```

### 3.4  同步和异步

<img src="https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/同步和异步.png" style="zoom: 50%;" />

**JS执行机制**

<img src="https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/JS执行机制.png" style="zoom: 50%;" />



![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/JS执行.png)

### 3.5  location对象 

表示当前页面的URL地址对象。

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/location对象属性.png)

页面跳转功能：

```javascript
<button>点击</button>
<script>
    var btn = document.querySelector('button');
    btn.addEventListener('click', function() {
        // console.log(location.href);
        location.href = 'https://www.baidu.com';
    })
</script>
```

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/location对象方法.png)

==注意：==
URL直接用引号引起来作为参数在方法中

### 3.6  history

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/history对象方法.png)

### 3.7  元素偏移量offset

offset翻译过来就是偏移量,我们使用offset系列相关属性可以动态的得到该元素的位置(偏移)、大小等。
● 获得元素距离带有定位父元素的位置
●获得元素自身的大小(宽度高度)
●注意:返回的数值都不带单位

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/offset系列属性.png)

==offsetParent与parentNode的区别==

offsetParent返回的是带有定位的父级元素
parentNode返回的是最近的父级元素（亲爸爸）

<font style='color:red'>offset与style比较</font>

| offset                                                       | sytle                                                        |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| ●offset可以得到==任意样式表==中的样式值<br />●offset系列获得的数值是没有单位的<br />●offsetWidth包含padding+ border +width<br />●offsetWidth等属性是只读属性,只能获取不能赋值 | ●style只能得到==行内样式表==中的样式值<br />●style.width获得的是带有单位的字符串<br />●style.width 获得不包含padding和border的值<br />●style.width是可读写属性,可以获取也可以赋值 |
| 所以,我们想要获取元素大小位置,用offset更合适                 | 所以,我们想要给元素更改值,则需要用style改变                  |

**案例(获取鼠标在盒子中的相对位置)**

```javascript
<script>
    // 我们在盒子内点击， 想要得到鼠标距离盒子左右的距离。
    // 首先得到鼠标在页面中的坐标（ e.pageX, e.pageY）
    // 其次得到盒子在页面中的距离(box.offsetLeft, box.offsetTop)
    // 用鼠标距离页面的坐标减去盒子在页面中的距离， 得到 鼠标在盒子内的坐标
    var box = document.querySelector('.box');
    box.addEventListener('mousemove', function(e) {
        // console.log(e.pageX);
        // console.log(e.pageY);
        // console.log(box.offsetLeft);
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        this.innerHTML = 'x坐标是' + x + ' y坐标是' + y;
    })
</script>
```

### 3.8  client 系列属性

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/client系列属性.png)

==clientWidth与offsetWidth区别==

clientWidth是盒子的padding加上内容宽度，不包含边框。
offsetWidth包含边框。

### 3.9  立即执行函数

**1.(function() {} ) ()**

**2.(function() f () )**
主要作用:创建一个独立的作用域。避免了命名冲突问题

### 3.10  scroll系列属性

scroll翻译过来就是滚动的,我们使用scroll系列的相关属性可以动态的得到该元素的大小、滚动距离等。

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/scroll系列属性.png)

<font color='red' size='4px'>scroll事件</font>

```html
<style>
        div {
            height: 200px;
            width: 140px;
            background-color: pink;
            overflow: auto;
        }
    </style>

<body>
    <div>你好呀!我是佩奇你好呀!我是佩奇你好呀!我是佩奇你好呀!我是佩奇你好呀!我是佩奇你好呀!我是佩奇你好呀!我是佩奇你好呀!我是佩奇你好呀!我是佩奇你好呀!我是佩奇你好呀!我是佩奇你好呀!我是佩奇你好呀!我是佩奇你好呀!我是佩奇你好呀!我是佩奇你好呀!我是佩奇你好呀!我是佩奇你好呀!我是佩奇你好呀!我是佩奇你好呀!我是佩奇</div>
<script>
    var box = document.querySelector('div');
    console.log('盒子内容的实际高度'+box.scrollHeight);
    box.onscroll = function(e){
        console.log(box.scrollTop);
    }
</script>
```

==案例（仿淘宝侧边栏）==

```
要求：
1.原先侧边栏是绝对定位
2.当页面滚动到一定位置,侧边栏改为固定定位
3.页面继续滚动,会让返回顶部显示出来
```

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/案例分析（淘宝侧边栏）.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>固定侧边栏</title>
    <style>

        a{
            display: block;
            height: 79px;
            width: 100%;
            color: rgb(73, 73, 73);
            text-align: center;
            text-decoration: none;
            border-bottom: 1px solid rgb(112, 112, 112);
        }
        .goBack{
            display: none;
        }
        .w{
            width: 1000px;
            margin: 10px auto;
            margin-top: 0;
        }
        .slider-bar{
            position: absolute;
            top: 500px;
            left: 50%;
            margin-left: 500px;
            width: 90px;
            font-size: 16px;
            font-family: 'HeiTi';
            background-color: pink;
        }
        .header{
            height: 100px;
            background-color: rgb(116, 80, 158);
        }
        .banner{
            height: 300px;
            background-color: skyblue;
        }
        .main{
            height: 1500px;
            background-color: rgb(236, 198, 115);
        }
    </style>
    <script>
        window.onload=function(){
            var slider = document.querySelector('.slider-bar');
            var goBack = document.querySelector('.goBack');
            var top = slider.offsetTop;//获取侧边栏盒子最初与上沿距离
            console.log(top);
            document.onscroll = function(){
                var hidetop = window.pageYOffset;//动态获取整个文档的滚动高度
                console.log(hidetop);
                
                if(hidetop>200&&hidetop<400){
                    slider.style.position = 'fixed';
                    slider.style.top = (top-200)+'px';//计算到指定位置时侧边盒子距离上端的高度。注意带单位
                }
                else if(hidetop>=400){
                    goBack.style.display = 'block';//将返回顶部的链接显示出来
                }
                else{
                    //滚动回去时，复原
                    slider.style.position = 'absolute';
                    slider.style.top = top+'px';
                    goBack.style.display = 'none';
                }
            }
        }
    </script>
</head>
<body>
    <div class="slider-bar">
        <a href="###">猜你<br>喜欢</a>
        <a href="###">反馈</a>
        <a href="#top" class="goBack">返回<br>顶部</a>
    </div>
    <!-- 界面主要内容 -->
    <div class="header w" id="top">头部区域</div>
    <div class="banner w">banner区域</div>
    <div class="main w">主体区域</div>
</body>
</html>
```

==注意事项==

1. `offsetHight`和`pageYOffset`获取的高度都是没有单位的，但是定位的`top`是有单位的，赋值时要注意加上px
2. 改为固定定位后，top的值要计算出，然后赋值
3. 滚动条返回时，要恢复侧边栏的位置和属性

