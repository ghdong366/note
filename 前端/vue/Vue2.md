# 第一章、Vue核心

## 1.1  vue简介

Vue (读音 /vjuː/，类似于 **view**) 是一套用于构建用户界面的**渐进式框架**。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。

中文文档：https://cn.vuejs.org/

## 1.2 初识vue

```html
<html>
	<head>
		<meta charset="UTF-8" />
		<title>初识Vue</title>
		<!-- 引入Vue -->
      <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
	</head>
	<body>
		<!-- 准备好一个容器 -->
		<div id="demo">
			<h1>Hello，{{name.toUpperCase()}}，{{address}}</h1>
		</div>

		<script type="text/javascript" >
			Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

			//创建Vue实例
			new Vue({
				el:'#demo', //el用于指定当前Vue实例为哪个容器服务，值通常为css选择器字符串。
				data:{ //data中用于存储数据，数据供el所指定的容器去使用，值我们暂时先写成一个对象。
					name:'tom',
					address:'北京'
				}
			})

		</script>
	</body>
</html>
```



### 学习vue需要的前置知识：

```
ES6语法规范
ES6模块化
包管理器
原型、原型链
数组的常用方法
axios
promise
```

### 总结

>1、想让vue工作，就必须创建一个Vue实例，且要传入一个配置对象`{}`。
>
>2、app容器里的代码依然符合html规范，只不过混入了一些特殊的Vue语法。
>
>3、app容器里的代码被称为    “vue模板”。
>
>4、Vue实例和容器是一一对应的。
>
>5、真实开发中只有一个Vue实例，并且配合组件一起使用。
>
>6、{{XXX}}中的XXX要写js表达式，且XXX可以自动读取到data中的所有属性。
>
>7、一旦data中的数据发生改变，那么页面中用到该数据的地方也会自动更新。

==注意区分：js表达式 和 js代码(语句)==

```
1.表达式：一个表达式会产生一个值，可以放在任何一个需要值的地方：
		(1). a
		(2). a+b
		(3). demo(1)
		(4). x === y ? 'a' : 'b'
2.js代码(语句)
		(1). if(){}
		(2). for(){}
```



## 1.3  模板语法

### 插值语法

功能：用于解析标签体内容

写法：`{{xxx}}`,xxx是js表达式，且可以直接读取到data中的所有属性。

### 指令语法：

功能：用于解析标签（包括标签属性，标签体内容，绑定事件。。。）

举例：`v-bind:hreaf='xxx'`  或者 简写为 `:href='xxx'`,xxx同样要是js表达式。且可以直接读取到vue实例的data数据

**说明：**

Vue中有很多的指令，且指令都是 `v-???` 形式，此处是以`v-bind`  举例。

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/vue常见指令.png)



## 1.4  数据绑定

### 单向数据绑定 

语法：`v-bind:href ="xxx"` 或简写为 `:href `

特点：数据只能从 data 流向页。

### 双向数据绑定 

语法：`v-model:value="xxx"` 或简写为 `v-model="xxx" `

特点：数据不仅能从 data 流向页面，还能从页面流向 dat

```html
   <!-- 准备好一个容器-->
   <div id="root">
      <!-- 普通写法 -->
      <!-- 单向数据绑定：<input type="text" v-bind:value="name"><br/>
      双向数据绑定：<input type="text" v-model:value="name"><br/> -->

      <!-- 简写 -->
      单向数据绑定：<input type="text" :value="name"><br/>
      双向数据绑定：<input type="text" v-model="name"><br/>

      <!-- 如下代码是错误的，因为v-model只能应用在表单类元素（输入类元素）上 -->
      <!-- <h2 v-model:x="name">你好啊</h2> -->
   </div>

<script type="text/javascript">
   Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

   new Vue({
      el:'#root',
      data:{
         name:'尚硅谷'
      }
   })
</script>
```

**备注：**
双向绑定一般都应用在表单类元素上（如：input、select等）
v-model:value 可以简写为 v-model，因为v-model默认收集的就是value值。

## 1.5  el和data的两种写法

### **el有2种写法**

1. new Vue时候配置el属性。

2. 先创建Vue实例，随后再通过vm.$mount('#root')指定el的值。

### **data有2种写法**

1. 对象式

   直接声明data为一个对象。

2. 函数式

   将data声明为一个函数，函数的返回值是一个对象。

   目前哪种写法都可以，以后学习到组件时，data必须使用函数式，否则会报错。

**一个重要的原则：**

​		由Vue管理的函数，一定不要写箭头函数，一旦写了箭头函数，this就不再是Vue实例了。

```html
<div id='app'>
   <h1>{{username}}</h1>
</div>

<script>
   //第一种写法
   /* let vm = new Vue({

         el:'#app',
         data:{
             username:'jerry'
         } 
     }) */

   //第二种写法
   let m = new Vue({
      data(){
         return {
            username:'tom'
         }
      }
   });
   m.$mount("#app");

</script>
```

## 1.6  MVVM模型

**MVVM模型**

​	M：模型(Model) ：data中的数据

​	V：视图(View) ：模板代码

​	VM:视图模型(ViewModel)：Vue实例

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/MVVM.png)

```
data中所有的属性，最后都出现在了vm身上。(数据代理)
vm身上所有的属性 及 Vue原型上所有属性，在Vue模板中都可以直接使用。
```

## 1.7  数据代理

### Object.defineProperty方法回顾

ES5新增的方法

可以给对象定义新属性和修改原来的属性

`Object.defineProperty（obj, prop, descriptor）`

* obj:：必须。目标对象
* prop：必须。需要定义或者修改的属性名称，字符串形式
* descriptor：必须。目标属性所拥有的特性，对象的形式

```
descriptor参数的格式：
	value:设置属性的值，默认为undefined
	writable：该属性是否可以被重写。默认为false
	enumerable:目标属性是否可以被枚举。默认为false
	configurable：目标属性是否可以被删除或是否可以再写修改特性。默认为false
	get()：函数，当有人读取对象的该属性时，get函数(getter)就会被调用，且返回值就是属性的值
	set()：函数，当有人修改对象的该属性时，set函数(setter)就会被调用，且会收到修改的具体值
```

```javascript
let number = 18
let person = {
   name:'张三',
   sex:'男',
}

Object.defineProperty(person,'age',{
   // value:18,
   // enumerable:true, //控制属性是否可以枚举，默认值是false
   // writable:true, //控制属性是否可以被修改，默认值是false
   // configurable:true //控制属性是否可以被删除，默认值是false

   //当有人读取person的age属性时，get函数(getter)就会被调用，且返回值就是age的值
   get(){
      console.log('有人读取age属性了')
      return number
   },

   //当有人修改person的age属性时，set函数(setter)就会被调用，且会收到修改的具体值
   set(value){
      console.log('有人修改了age属性，且值是',value)
      number = value
   }

})

// console.log(Object.keys(person))

console.log(person)
```

### 数据代理案例

数据代理：通过一个对象代理对另一个对象中属性的操作（读/写）

```javascript
let obj = {x:100}
let obj2 = {y:200}
Object.defineProperty(obj2,'x',{
   get(){
      return obj.x   
   },
   set(value){
      obj.x = value  
   }
})
```

### Vue中的数据代理

1.Vue中的数据代理：
          通过vm对象来代理data对象中属性的操作（读/写）
2.Vue中数据代理的好处：
          更加方便的操作data中的数据
3.基本原理：
          通过Object.defineProperty()把data对象中所有属性添加到vm上。
          为每一个添加到vm上的属性，都指定一个getter/setter。
          在getter/setter内部去操作（读/写）data中对应的属性。

```html
<!-- 准备好一个容器-->
<div id="root">
   <h2>学校名称：{{name}}</h2>
   <h2>学校地址：{{address}}</h2>
</div>


<script type="text/javascript">

const vm = new Vue({
   el:'#root',
   data:{
      name:'jack',
      address:'北京'
   }
})
</script>
```

<img src="https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/vue数据代理.png" style="zoom:67%;" />

<img src="https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/Vue数据代理图示.png" style="zoom: 50%;" />



## 1.8  事件函数

### 事件的基本使用：

1. 使用`v-on:xxx` 或 `@xxx `绑定事件，其中xxx是事件名；
2. 事件的回调需要配置在methods对象中，最终会在vm上；
3. methods中配置的函数，不要用箭头函数！否则this就不是vm了；
4. methods中配置的函数，都是被Vue所管理的函数，this的指向是vm 或 组件实例对象；
5. `@click="demo"` 和 `@click="demo($event)"` 效果一致，但后者可以传参；
6. 在调用事件处理函数的时候，会自动传入一个参数，这个参数是`event`,表示事件，但如果传入了其他参数，这个event参数默认不被传入，在Vue中，可以在调用的时候使用`函数名($event)`,来手动传入这个函数。

```html
<div id="box">
   <h1>{{tig}}</h1>
   <button v-on:click="show">按钮1</button><br>
   <button @click="demo($event,1,2,3)">按钮2</button>
</div>
<script>
   const vm = new Vue({
      el:'#box',
      data(){
         return {
            tig:'事件的基本使用'    
         }
      },
      methods:{
         show($event){
            alert("按钮被点击...");        
            console.log($event.target);      
         },
         demo($event,a,b,c){     
            console.log($event);   
            console.log(a,b,c);       
         }
      }
   });
</script>
```

**说明：**在模板使用`v-on:`时，不一定要调用函数，也可以是简单的表达式

```html
<div id="example-1"> 
   <button v-on:click="counter += 1">Add 1</button> 
   <p>The button above has been clicked {{ counter }} times.</p>
</div>
```



### 事件修饰符

Vue中的事件修饰符：

| 修饰符  | 功能                                                         |
| ------- | ------------------------------------------------------------ |
| prevent | 阻止默认事件（常用）；等同于：`event.preventDefault()`       |
| stop    | 阻止事件冒泡（常用）；等同于:   `event.stopPropagation()`    |
| once    | 事件只触发一次（常用）；                                     |
| capture | 使用事件的捕获模式；                                         |
| self    | 只有event.target是当前操作的元素时才触发事件；               |
| passive | 事件的默认行为立即执行，无需等待事件回调执行完毕；比如用在`wheel`鼠标滚轮事件上 |

```html
<!-- 准备好一个容器-->
<div id="root">
   <h2>欢迎来到{{name}}学习</h2>
   <!-- 阻止默认事件（常用） -->
   <a href="http://www.atguigu.com" @click.prevent="showInfo">点我提示信息</a>
   <!-- 阻止事件冒泡（常用） -->
   <div class="demo1" @click="showInfo">
      <button @click.stop="showInfo">点我提示信息</button>
      <!-- 修饰符可以连续写 -->
      <!-- <a href="http://www.atguigu.com" @click.prevent.stop="showInfo">点我提示信息</a> -->
   </div><!-- 事件只触发一次（常用） -->
   <button @click.once="showInfo">点我提示信息</button>
</div> 
<script type="text/javascript"> 
   new Vue({ 
      el:'#root',   
      data:{   
         name:'george社区' 
      },    
      methods:{     
         showInfo(e){     
            alert('同学好！')       
            // console.log(e.target)    
         },
         showMsg(msg){
            console.log(msg)
         }
      } 
   })
</script>
```

**说明：**

事件修饰符可以连续书写，表示对事件的多个限制。

函数的调用可以加括号，也可以不加括号

### 键盘事件

1. Vue中常用的按键别名：
   回车 => enter
   删除 => delete (捕获“删除”和“退格”键)
   退出 => esc
   空格 => space
   换行 => tab (特殊，必须配合keydown去使用)
   上 => up
   下 => down
   左 => left

2. Vue未提供别名的按键，可以使用按键原始的key名（如：`回车：Enter`）去绑定，但注意要转为kebab-case（短横线命名）

3. 系统修饰键（用法特殊）：`ctrl、alt、shift、meta`
   (1).配合keyup使用：按下修饰键的同时，再按下其他键，随后释放其他键，事件才被触发。
   (2).配合keydown使用：正常触发事件。

4. 也可以使用keyCode去指定具体的按键（不推荐）

5. Vue.config.keyCodes.自定义键名 = 键码，可以去定制按键别名

```html
<div class="box">  
   <input type="text" placeholder="输入Ctrl+a触发键盘事件" @keyup.Ctrl.a="showInfo"><br><br>
   <input type="text" placeholder="输入回车触发键盘事件" @keyup.enter="showInfo">
</div> 
<script>  
   const vm = new Vue({
      el:'.box',
      data:{
      },
      methods:{
         showInfo(event){
            console.log(event.keyCode);
         }
      }
   })
</script>
```

**说明：**

键盘事件的按钮也可以连续书写。

## 1.9  计算属性

### 基本概念和特点

1.定义：要用的属性不存在，要通过已有属性计算得来。
2.原理：底层借助了Objcet.defineproperty方法提供的getter和setter。
3.get函数什么时候执行？
  (1).初次读取时会执行一次。
  (2).当依赖的数据发生改变时会被再次调用。
4.优势：与methods实现相比，内部有==缓存机制（复用）==，效率更高，调试方便。
5.备注：
	1.计算属性最终会出现在vm上，直接读取使用即可。
	2.如果计算属性要被修改，那必须写set函数去响应修改，且set中要引起计算时依赖的数据发生改变。

### 案例（fullName展示的效果）

##### methods方式的实现

```html
<!-- 准备好一个容器-->
<div id="root">
   姓：<input type="text" v-model="firstName"> <br/><br/>
   名：<input type="text" v-model="lastName"> <br/><br/>
   <!-- 注意：这里fullName()要写成函数调用的方式，将函数的返回值显示在界面上 -->
   全名：<span>{{fullName()}}</span>
</div>
<script type="text/javascript">
   Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

   new Vue({
      el:'#root',
      data:{
         firstName:'张',
         lastName:'三'
      },
      methods: {
         fullName(){
            console.log('@---fullName')
            return this.firstName + '-' + this.lastName
         }
      },
   })
</script>
```

 **注意：**这里fullName()要写成函数调用的方式，将函数的返回值显示在界面上 

##### 计算属性的实现方式

```html
<!-- 准备好一个容器-->	
<div id="root">
   姓：<input type="text" v-model="firstName"> <br/><br/>
   名：<input type="text" v-model="lastName"> <br/><br/>
   测试：<input type="text" v-model="x"> <br/><br/>	
   全名：<span>{{fullName}}</span> <br/><br/>	
   <!--       
全名：<span>{{fullName}}</span> <br/><br/>	
全名：<span>{{fullName}}</span> <br/><br/>	
全名：<span>{{fullName}}</span>         -->	
</div>
<script type="text/javascript"> 
   Vue.config.productionTip = false
   //阻止 vue 在启动时生成生产提示。
   const vm = new Vue({   
      el:'#root',   
      data:{     
         firstName:'张', 
         lastName:'三',   
         x:'你好'    
      },   
      methods: {   
         demo(){     
         }     
      },     
      computed:{
         fullName:{
            //get有什么作用？当有人读取fullName时，get就会被调用，且返回值就作为fullName的值            					//get什么时候调用？1.初次读取fullName时。2.所依赖的数据发生变化时。  
            get(){
               console.log('get被调用了')      
               // console.log(this) //此处的this是vm  
               return this.firstName + '-' + this.lastName      
            },      
            //set什么时候调用? 当fullName被修改时。
            set(value){      
               console.log('set',value)         
               const arr = value.split('-')   
               this.firstName = arr[0]     
               this.lastName = arr[1]     
            }
         }
      }
   })
</script>
```

### 计算属性的简写

当一个计算属性只读（只需要get函数）时，这个计算属性可以简写。简写为一个函数的形式，它的返回值就是展示在模板中的，但是在调用的时候还是使用`属性名称`的形式。

```html
<!-- 准备好一个容器-->
<div id="root">  
   姓：<input type="text" v-model="firstName"> <br/><br/>  
   名：<input type="text" v-model="lastName"> <br/><br/>   
   全名：<span>{{fullName}}</span> <br/><br/> 
</div>
<script type="text/javascript"> 
   Vue.config.productionTip = false 
   //阻止 vue 在启动时生成生产提示。
   const vm = new Vue({    
      el:'#root',     
      data:{      
         firstName:'张', 
         lastName:'三',    
      },    
      computed:{  
         //完整写法
         /* fullName:{  
         get(){    
         console.log('get被调用了')   
         return this.firstName + '-' + this.lastName  
         },      
         set(value){     
         console.log('set',value)     
         const arr = value.split('-')
         this.firstName = arr[0]  
         this.lastName = arr[1]
         } 
         } */
         //简写 
         fullName(){ 
            console.log('get被调用了')
            return this.firstName + '-' + this.lastName  
         } 
      }  
   })
</script>
```

## 1.10  监视属性

### 基本用法：

1. 当被监视的属性变化时, 回调函数（`handler函数`）自动调用, 进行相关操作

2. 监视的属性必须存在，才能进行监视！！

3. 监视的两种写法：

   * new Vue时传入`watch`配置

   * 通过`vm.$watch`监视

4. 每一个监视属性都可以配置，其中`handler`为要执行的函数，`immediate`为首次启动时是否执行。

```html
<!-- 准备好一个容器-->
<div id="root">
   <h2>今天天气很{{info}}</h2>
   <button @click="changeWeather">切换天气</button>
</div>


<script type="text/javascript">
   Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

   const vm = new Vue({
      el:'#root',
      data:{
         isHot:true,
      },
      computed:{
         info(){
            return this.isHot ? '炎热' : '凉爽'
         }
      },
      methods: {
         changeWeather(){
            this.isHot = !this.isHot
         }
      },
      /* watch:{
				isHot:{
					immediate:true, //初始化时让handler调用一下
					//handler什么时候调用？当isHot发生改变时。
					handler(newValue,oldValue){
						console.log('isHot被修改了',newValue,oldValue)
					}
				}
			} */
   })

   vm.$watch('isHot',{
      immediate:true, //初始化时让handler调用一下
      //handler什么时候调用？当isHot发生改变时。
      handler(newValue,oldValue){
         console.log('isHot被修改了',newValue,oldValue)
      }
   })
</script>
```

**说明：**

1. 监视属性不仅可以监视data中的属性，也可以监视计算属性中的属性。
2. 通过new方式的watch监视，监视属性写法`不用加this和引号`。通过vm.$watch监视时，监视的属性要加上`引号`。

### 深度监视

监视多级结构中所有属性的变化。

**深度监视：**
   (1).Vue中的watch默认不监测对象内部值的改变（一层）。
   (2).检测属性中配置`deep:true`可以监测对象内部值改变（多层）。
**备注：**
   (1).Vue自身可以监测对象内部值的改变，但Vue提供的watch默认不可以！
   (2).使用watch时根据数据的具体结构，决定是否采用深度监视。

```html
<div id="root">
   <h2>今天天气很{{info}}</h2>
   <button @click="changeWeather">切换天气</button>
   <hr/>
   <h3>a的值是:{{numbers.a}}</h3>
   <button @click="numbers.a++">点我让a+1</button>
   <h3>b的值是:{{numbers.b}}</h3>
   <button @click="numbers.b++">点我让b+1</button>
   <button @click="numbers = {a:666,b:888}">彻底替换掉numbers</button>
   {{numbers.c.d.e}}
</div>
<script type="text/javascript">
   Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

   const vm = new Vue({
      el:'#root',
      data:{
         isHot:true,
         numbers:{
            a:1,
            b:1,
            c:{
               d:{
                  e:100
               }
            }
         }
      },
      computed:{
         info(){
            return this.isHot ? '炎热' : '凉爽'
         }
      },
      methods: {
         changeWeather(){
            this.isHot = !this.isHot
         }
      },
      watch:{
         isHot:{
            // immediate:true, //初始化时让handler调用一下
            //handler什么时候调用？当isHot发生改变时。
            handler(newValue,oldValue){
               console.log('isHot被修改了',newValue,oldValue)
            }
         },
         //监视多级结构中某个属性的变化
         /* 'numbers.a':{
					handler(){
						console.log('a被改变了')
					}
				} */
         //监视多级结构中所有属性的变化
         numbers:{
            deep:true,
            handler(){
               console.log('numbers改变了')
            }
         }
      }
   })

</script>
```

### 监视属性的简写

如果不需要使用deep或者immediate等参数，可以将监视属性进行简写。

1. new Vue时

```javascript
watch:{
   //简写
    isHot(newValue,oldValue){
      console.log('isHot被修改了',newValue,oldValue,this)
   }
}
```

2. 使用`vm.$watch`

```javascript
//简写
vm.$watch('isHot',(newValue,oldValue)=>{
   console.log('isHot被修改了',newValue,oldValue,this)
})
```



**案例**

```html
<div id="box">
     <h3>{{number}}</h3>
     <button @click='add()'>点击增加数量</button>

 </div>
 <script type="text/javascript"> 
     const vm = new Vue({
         el:'#box',
         data(){
             return {
                 number:1
             }
         },
         methods: {
             add(){
                 this.number++;
             }
         },
         watch:{
             // 监视属性的完整写法
             /* number:{
                 immediate:true,
                 handler(){
                     console.log('number的值被修改了');
                 }
             } */
             number(){
                 console.log('监视属性简写方式','number的值被修改了');
             }
         }

     })

 </script>
```

### computed和watch比较

官网案例：https://cn.vuejs.org/v2/guide/computed.html#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7-vs-%E4%BE%A6%E5%90%AC%E5%B1%9E%E6%80%A7

**computed和watch之间的区别：**

1. computed能完成的功能，watch都可以完成。

2. watch能完成的功能，computed不一定能完成，例如：==watch可以进行异步操作。==

**两个重要的小原则：**

1. 所被Vue管理的函数，最好写成普通函数，这样this的指向才是vm 或 组件实例对象。

2. 所有不被Vue所管理的函数（定时器的回调函数、ajax的回调函数等、Promise的回调函数），最好写成箭头函数，这样this的指向才是vm 或 组件实例对象。

**用watch实现异步操作的案例：**

```html
<div id="box">
     <h3>{{number}}</h3>
     <button @click='add()'>点击增加数量</button>

 </div>
 <script type="text/javascript"> 
     const vm = new Vue({
         el:'#box',
         data(){
             return {
                 number:1
             }
         },
         methods: {
             add(){
                 this.number++;
             }
         },
         watch:{

             number:{
                 handler(){
                     setTimeout(()=>{
                         alert('1秒前number的值被修改了哈。。。');
                     },1000);
                 }
             }
         }

     })

 </script>
```

## 1.11 绑定样式

### 绑定class样式

语法

`:class="xxx"` xxx可以是字符串、对象、数组。
       字符串写法适用于：类名不确定，要动态获取。
       数组写法适用于：要绑定多个样式，个数不确定，名字也不确定。
       对象写法适用于：要绑定多个样式，个数确定，名字也确定，但不确定用不用。

```html
<head>
    <meta charset="UTF-8">
    <title>绑定style样式</title>
    <script src="./lib/vue.js"></script>
    <style>
        button{
            font-size: 20px;
        }
        .basic {
            height: 260px;
            width: 500px;
            border: 2px solid peru;
        }

        .s1 {
            background-color: salmon;
        }

        .s2 {
            background-color: skyblue;
        }
        .s3{
            border-radius: 20px;
        }
        .s4{
            font-size: 30px;
        }

    </style>

</head>

<body>
    <div id="app">
        <!-- 绑定单个样式 -->
        <div class="basic" :class="color">盒子</div><br>
        <button @click="changeColor()">切换底色</button>
        <hr>
        <!-- 绑定多个样式，传入一个数组-->
        <div class="basic" :class="classArr">盒子</div><br>
        <button @click="addStyle()">添加样式</button>
    </div>

    <script>
        //创建Vue实例,得到 ViewModel
        var vm = new Vue({
            el: '#app',
            data: {
                color: 's1',
                classArr: ['s1', 's2','s3']
            },
            methods: {
                changeColor() {
                    if (this.color === 's1') {
                        this.color = 's2';
                    } else {
                        this.color = 's1';
                    }
                },
                addStyle(){
                    this.classArr.push('s4');
                }
            }
        });
    </script>
</body>
```



### 绑定style样式

语法：

`:style="{fontSize: xxx}"`     其中xxx是一个表示样式的对象。
​`:style="[a,b]"`    其中a、b是样式对象。

```html
<div id="app">
     <div class="basic" :style="styleObj">盒子</div>
 </div>

 <script>
     var vm = new Vue({
         el: '#app',
         data: {
             styleObj: {
                 fontSize: '40px',
                 color: 'skyblue',
                 textAlign:'center'
             }
         },
         methods: {

         }
     });
 </script>
```

**特别注意:**

样式对象中，表示标签的属性名需要用驼峰法。

## 1.12  条件渲染

### v-if

写法：

1. `v-if="表达式" `

2. `v-else-if="表达式"`

3. `v-else="表达式"`

适用于：切换频率较低的场景。

特点：不展示的DOM元素直接被移除。

注意：`v-if`可以和`v-else-if`、`v-else`一起使用，但要求结构不能被“打断”。

### v-show

写法：

1. `v-show="表达式"`

适用于：切换频率较高的场景。
特点：不展示的DOM元素未被移除，仅仅是使用样式隐藏掉		

**备注**：使用v-if的时，元素可能无法获取到，而使用v-show一定可以获取到。

```html
<div id="root">
   <h2>当前的n值是:{{n}}</h2>
   <button @click="n++">点我n+1</button>
   <!-- 使用v-show做条件渲染 -->
   <!-- <h2 v-show="false">欢迎来到{{name}}</h2> -->
   <!-- <h2 v-show="1 === 1">欢迎来到{{name}}</h2> -->

   <!-- 使用v-if做条件渲染 -->
   <!-- <h2 v-if="false">欢迎来到{{name}}</h2> -->
   <!-- <h2 v-if="1 === 1">欢迎来到{{name}}</h2> -->

   <!-- v-else和v-else-if -->
   <!-- <div v-if="n === 1">Angular</div>
   <div v-else-if="n === 2">React</div>
   <div v-else-if="n === 3">Vue</div>
   <div v-else>哈哈</div> -->

   <!-- v-if与template的配合使用 -->
   <template v-if="n === 1">
      <h2>你好</h2>
      <h2>北京</h2>
   </template>

</div>
<script type="text/javascript">

   const vm = new Vue({
      el:'#root',
      data:{
         name:'george Home',
         n:0
      }
   })
</script>
```

==template说明：==

使用template不会破坏原本的结构，另外它只能配合  `v-if`  使用，不能用  `v-show` 

## 1.13  列表渲染

### v-for指令:

1.用于展示列表数据
2.语法：`v-for="(item, index) in xxx" :key="yyy"`
3.可遍历：数组、对象、字符串（用的很少）、指定次数（用的很少）

```html
<div id="root">
   <!-- 遍历数组 -->
   <h2>人员列表（遍历数组）</h2>
   <ul>
      <li v-for="(p,index) in persons" :key="index">
         {{p.name}}-{{p.age}}
      </li>
   </ul>

   <!-- 遍历对象 -->
   <h2>汽车信息（遍历对象）</h2>
   <ul>
      <li v-for="(value,k) of car" :key="k">
         {{k}}-{{value}}
      </li>
   </ul>

   <!-- 遍历字符串 -->
   <h2>测试遍历字符串（用得少）</h2>
   <ul>
      <li v-for="(char,index) of str" :key="index">
         {{char}}-{{index}}
      </li>
   </ul>

   <!-- 遍历指定次数 -->
   <h2>测试遍历指定次数（用得少）</h2>
   <ul>
      <li v-for="(number,index) of 5" :key="index">
         {{index}}-{{number}}
      </li>
   </ul>
</div>

<script type="text/javascript">
   Vue.config.productionTip = false

   new Vue({
      el:'#root',
      data:{
         persons:[
            {id:'001',name:'张三',age:18},
            {id:'002',name:'李四',age:19},
            {id:'003',name:'王五',age:20}
         ],
         car:{
            name:'奥迪A8',
            price:'70万',
            color:'黑色'
         },
         str:'hello'
      }
   })
</script>
```

> 说明：
>
> 在 `v-for`的表达式中，`in` 和 `of` 都可以。

### :key的作用

`:key`表示了这个列表的唯一标识。用于diff算法中虚拟dom的内容比较。

1. index作为key

<img src="https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/遍历列表时key的作用（index作为key）.png" style="zoom: 50%;" />

2. id作为key

<img src="https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/遍历列表时key作用（id作为key）.png" style="zoom:50%;" />



**总结：**

```
面试题：react、vue中的key有什么作用？（key的内部原理）
						
1. 虚拟DOM中key的作用：
	key是虚拟DOM对象的标识，当数据发生变化时，Vue会根据【新数据】生成【新的虚拟DOM】, 
	随后Vue进行【新虚拟DOM】与【旧虚拟DOM】的差异比较，比较规则如下：
										
2.对比规则：
	(1).旧虚拟DOM中找到了与新虚拟DOM相同的key：
		①.若虚拟DOM中内容没变, 直接使用之前的真实DOM！
		②.若虚拟DOM中内容变了, 则生成新的真实DOM，随后替换掉页面中之前的真实DOM。

	(2).旧虚拟DOM中未找到与新虚拟DOM相同的key
		创建新的真实DOM，随后渲染到到页面。
												
3. 用index作为key可能会引发的问题：
	(1). 若对数据进行：逆序添加、逆序删除等破坏顺序操作:
		会产生没有必要的真实DOM更新 ==> 界面效果没问题, 但效率低。
	(2). 如果结构中还包含输入类的DOM：
		会产生错误DOM更新 ==> 界面有问题。

4. 开发中如何选择key?:
	(1).最好使用每条数据的唯一标识作为key, 比如id、手机号、身份证号、学号等唯一值。
	(2).如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，使用index作为key是没有问题的。
```

### 列表的过滤

对列表中的数据进行过滤，让界面上只显示复合条件的列表中的数据。

<img src="https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/列表过滤案例图.png" style="zoom: 50%;" />

```html
<div id="root">
   <h2>人员列表</h2>
   <input type="text" placeholder="请输入名字" v-model="keyWord">
   <ul>
      <li v-for="(p,index) of filPerons" :key="index">
         {{p.name}}-{{p.age}}-{{p.sex}}
      </li>
   </ul>
</div>

<script type="text/javascript">
   Vue.config.productionTip = false

   //用watch实现
   //#region 
   /* new Vue({
				el:'#root',
				data:{
					keyWord:'',
					persons:[
						{id:'001',name:'马冬梅',age:19,sex:'女'},
						{id:'002',name:'周冬雨',age:20,sex:'女'},
						{id:'003',name:'周杰伦',age:21,sex:'男'},
						{id:'004',name:'温兆伦',age:22,sex:'男'}
					],
					filPerons:[]
				},
				watch:{
					keyWord:{
						immediate:true,
						handler(val){
							this.filPerons = this.persons.filter((p)=>{
								return p.name.indexOf(val) !== -1
							})
						}
					}
				}
			}) */
   //#endregion

   //用computed实现
   new Vue({
      el:'#root',
      data:{
         keyWord:'',
         persons:[
            {id:'001',name:'马冬梅',age:19,sex:'女'},
            {id:'002',name:'周冬雨',age:20,sex:'女'},
            {id:'003',name:'周杰伦',age:21,sex:'男'},
            {id:'004',name:'温兆伦',age:22,sex:'男'}
         ]
      },
      computed:{
         filPerons(){
            return this.persons.filter((p)=>{
               return p.name.indexOf(this.keyWord) !== -1
            })
         }
      }
   }) 
</script>
```



### 列表排序

可以用计算属性，然后将过滤后的内容缓存起来，然后对缓存的数据进行排序。（`sort()`方法）

代码略

## 1.14  vue监测数据的原理（重要）

### 问题引入

一般情况下，vue会自动检测到data中数据的改变，然后将改变的内容渲染到页面上。但是可能出现无法检测到的问题。这个时候就要深入的了解vue监视数据的原理。

```html
<div id="root">
    <h2>人员列表</h2>
    <button @click="updateMei">更新马冬梅的信息</button>
    <ul>
        <li v-for="(p,index) of persons" :key="p.id">
            {{p.name}}-{{p.age}}-{{p.sex}}
        </li>
    </ul>
</div>

<script type="text/javascript">
    Vue.config.productionTip = false

    const vm = new Vue({
        el: '#root',
        data: {
            persons: [
                {id: '001', name: '马冬梅', age: 30, sex: '女'},
                {id: '002', name: '周冬雨', age: 31, sex: '女'},
                {id: '003', name: '周杰伦', age: 18, sex: '男'},
                {id: '004', name: '温兆伦', age: 19, sex: '男'}
            ]
        },
        methods: {
            updateMei() {
                // this.persons[0].name = '马老师' //更改奏效
                // this.persons[0].age = 50 //更改奏效
                // this.persons[0].sex = '男' //更改奏效
                this.persons[0] = {id:'001',name:'马老师',age:50,sex:'男'} //不奏效
                // this.persons.splice(0, 1, {id: '001', name: '马老师', age: 50, sex: '男'})
            }
        }
    })

</script>
```

### 监测对象的原理





### 监测数组的原理





## 1.15 收集表单数据

### 收集表单数据：

若：`<input type="text"/>`，则v-model收集的是value值，用户输入的就是value值。
若：`<input type="radio"/>`，则v-model收集的是value值，且要手动给标签设置value值。
若：`<input type="checkbox"/>`
		1.没有配置input的value属性，那么收集的就是checked（勾选 or 未勾选，是布尔值）
		2.配置input的value属性:
			(1)v-model的初始值是非数组，那么收集的就是checked（勾选 or 未勾选，是布尔值）
			(2)v-model的初始值是数组，那么收集的的就是value组成的数组

若为下拉框，则v-model设置在select标签中，需要给option标签设置value值

> 备注：v-model的三个修饰符：
> 	`lazy`：失去焦点再收集数据
> 	`number`：输入字符串转为有效的数字
> 	`trim`：输入首尾空格过滤

```html
<div id="app">
   <form>
      <label for="account">账号：</label>
      <input type="text" id="account" v-model.trim="account"><br><br>
      <label for="password">密码：</label>
      <input type="password" id="password" v-model="password"><br><br>
      <label for="age">年龄：</label>
      <input type="number" id="age" v-model.number="age"><br><br>
      <!--            说明：type=number是h5的标准，用来限制输入框只能输入数字，v-model.number是vue提供的，用来将输入框中的数据转换为数字，便于给后端传数据-->
      性别：
      男<input type="radio" value="男" name="sex" v-model="sex" ><!--注意：在vue中check不生效-->
      女<input type="radio" value="女" name="sex" v-model="sex"><br><br>
      爱好：
      吸烟<input type="checkbox" value="吸烟" name="hobby" v-model="hobby">
      喝酒<input type="checkbox" value="喝酒" name="hobby" v-model="hobby">
      烫头<input type="checkbox" value="烫头" name="hobby" v-model="hobby"><br><br>
      所属地区：
      <select v-model="city">
         <option value="请选择">请选择城市</option>
         <option value="北京">北京</option>
         <option value="上海">上海</option>
         <option value="广州">广州</option>
      </select>
      <br><br>
      其他信息：
      <textarea v-model.lazy="other"></textarea>
      <br><br>
      <input type="checkbox" v-model="read"> 阅读并接受协议<a href="https://www.baidu.com">《用户协议》</a><br><br>
      <button @click.prevent="showMsg()">提交</button>
   </form>
</div>

<script>
   const vm = new Vue({
      el: '#app',
      data() {
         return {
            account:'',
            password:'',
            age:18,
            sex:'男',
            hobby:[],
            city:'北京',
            other:' ',
            read:' '
         }
      },
      methods: {
         showMsg(){
            // 将data中的数据转换为json
            let json = JSON.stringify(this._data);
            console.log(json);
         }
      }

   })
</script>

```

## 1.16  过滤器

**定义：**对要显示的数据进行特定格式化后再显示（适用于一些简单逻辑的处理）。

**语法：**
		1）.注册过滤器：`Vue.filter(name,callback)` 或 `new Vue{filters:{}}`

​		2）.使用过滤器：`{{ xxx | 过滤器名}}`  或  `v-bind:属性 = "xxx | 过滤器名"`

> 备注：
> 		1).过滤器默认接受管道符前的参数，也可以接收额外参数、多个过滤器也可以串联
>
> ​		2).并没有改变原本的数据, 是产生新的对应的数据

```html
<div id="root">
   <h2>显示格式化后的时间</h2>
   <!-- 计算属性实现 -->
   <h3>现在是：{{fmtTime}}</h3>
   <!-- methods实现 -->
   <h3>现在是：{{getFmtTime()}}</h3>
   <!-- 过滤器实现 -->
   <h3>现在是：{{time | timeFormater}}</h3>
   <!-- 过滤器实现（传参） -->
   <h3>现在是：{{time | timeFormater('YYYY_MM_DD') | mySlice}}</h3>
   过滤器还可以用在标签属性中
   <h3 :x="msg | mySlice">乔治</h3>
</div>

<div id="root2">
   <h2>{{msg | mySlice}}</h2>
</div>

<script type="text/javascript">
   Vue.config.productionTip = false
   //全局过滤器
   Vue.filter('mySlice', function (value) {
      return value.slice(0, 4)
   })

   new Vue({
      el: '#root',
      data: {
         time: 1640102027933, //时间戳
         msg: '我是george'
      },
      computed: {
         fmtTime() {
            return dayjs(this.time).format('YYYY年MM月DD日 HH:mm:ss')
         }
      },
      methods: {
         getFmtTime() {
            return dayjs(this.time).format('YYYY年MM月DD日 HH:mm:ss')
         }
      },
      //局部过滤器
      filters: {
         timeFormater(value, str = 'YYYY年MM月DD日 HH:mm:ss') {
            // console.log('@',value)
            return dayjs(value).format(str)
         }
      }
   })

   //用于演示全局的过滤器
   new Vue({
      el: '#root2',
      data: {
         msg: 'hello,world!'
      }
   })
</script>
```

## 1.17  Vue中的其他的内置指令

### v-text

作用：向其所在的节点中渲染**文本内容**。
与插值语法的区别：v-text会替换掉节点中的内容，{{xx}}则不会。

```html
<div id="app">
   <!--插值语法-->
   <div>{{demo}}</div>
   <!--v-text指令-->
   <div v-text="demo2"></div>
</div>

<script>
   const vm = new Vue({
      el: '#app',
      data() {
         return {
            demo:'aaa',
            demo2:'<h2>hello</h2>'
         }
      }
</script>
```

### v-html

作用：向指定节点中渲染**包含html结构的内容**。
与插值语法的区别：
		(1).v-html会替换掉节点中所有的内容，{{xx}}则不会。
		(2).v-html可以识别html结构。

> 严重注意：v-html有安全性问题！！！！
> 		(1).在网站上动态渲染任意HTML是非常危险的，容易导致XSS攻击。
> 		(2).一定要在可信的内容上使用v-html，永不要用在用户提交的内容上！

```html
<div id="app">
   <!--v-html指令-->
   <div v-html="msg"></div>
</div>

<script>
   const vm = new Vue({
      el: '#app',
      data() {
         return {
            msg:'<h2>hello</h2>'
         }
      },
</script>
```

### v-cloak

v-cloak指令（没有值）：
		1).本质是一个特殊属性，Vue实例创建完毕并接管容器后，会删掉v-cloak属性。
		2).使用css配合属性选择器  `[v-cloak]`  可以解决网速慢时页面展示出{{xxx}}的问题。

代码示例略。

### v-once

**作用：**

​		1).`v-once`所在节点在初次动态渲染后，就视为静态内容了。
​		2).以后数据的改变不会引起`v-once`所在结构的更新，可以用于优化性能

​		3).这个指令也没有值

```html
<div id="app">
    <span v-once>number：{{number}}</span>
    <div>name的当前值：{{number}}</div>
    <br>
    <button @click="number++">number加一</button>
</div>

<script>
    const vm = new Vue({
        el: '#app',
        data() {
            return {
                number:1
            }
        },
        methods: {}

    })
</script>
```

### v-pre

**作用：**

​		1).跳过其所在节点的编译过程。
​		2).可利用它跳过：没有使用指令语法、没有使用插值语法的节点，会加快编译。
​		3).这个指令也没有值。

### 总结

所有的指令都不能脱离标签使用，它充当标签的属性。

## 1.18  自定义指令

### 函数式

**案例：**自定义一个指令v-big,功能类似v-text,但是会显示number十倍的数字

```html
<div id="app">
    <h2>当前的值为:{{number}}</h2>
    <!--自定义一个指令v-big,功能类似v-text,但是会显示number十倍的数字-->
    <h2>放大后的值为:<span v-big="number"></span></h2>
    <button @click="number++">number加1</button>
</div>

<script>
    const vm = new Vue({
        el: '#app',
        data() {
            return {
                number:1
            }
        },
        directives: {
            /*
                element参数是该标签绑定的dom元素，
                binding是绑定的事件对象,
            */
            big(element,binding){
                element.innerText = binding.value*10;

            }
        }

    })
</script>
```

> 注意：
>
> ​	自定义指令的函数要写在`directives`属性中。

### 对象式

```html
<div id="root">
    <button @click="n++">点我n+1</button>
    <hr/>
    <input type="text" v-fbind:value="n">
</div>
<script type="text/javascript">
    Vue.config.productionTip = false

    //定义全局指令
    /* Vue.directive('fbind',{
        //指令与元素成功绑定时（一上来）
        bind(element,binding){
            element.value = binding.value
        },
        //指令所在元素被插入页面时
        inserted(element,binding){
            element.focus()
        },
        //指令所在的模板被重新解析时
        update(element,binding){
            element.value = binding.value
        }
    }) */

    new Vue({
        el:'#root',
        data:{
            name:'尚硅谷',
            n:1
        },
        directives:{
            //big函数何时会被调用？1.指令与元素成功绑定时（一上来）。2.指令所在的模板被重新解析时。
           // 使用多个单词时，需要将指令的名用引号包含起来。（即原始的对象表示法）
            /* 'big-number'(element,binding){
                // console.log('big')
                element.innerText = binding.value * 10
            }, */
            big(element,binding){
                console.log('big',this) //注意此处的this是window
                // console.log('big')
                element.innerText = binding.value * 10
            },
            fbind:{
                //指令与元素成功绑定时（一上来）
                bind(element,binding){
                    element.value = binding.value
                },
                //指令所在元素被插入页面时
                inserted(element,binding){
                    element.focus()
                },
                //指令所在的模板被重新解析时
                update(element,binding){
                    element.value = binding.value
                }
            }
        }
    })
</script>
```

### 自定义指令总结

1. 定义的语法：

   ①局部定义的指令

   ```javascript
   new Vue({
      directives:{
         指令名:配置对象
      }
   })
   //或者如下
   new Vue({
      directives:{
         指令名:回调函数
      }
   })
   ```

   ②全局指令：

   ```
   Vue.directive(指令名,配置对象)
   Vue.directive(指令名,回调函数)
   ```

2. 配置对象中常用的3个回调：
               (1).  `bind`  指令与元素成功绑定时调用。
               (2).  `inserted`  指令所在元素被插入页面时调用。
               (3).  ` update`指令所在模板结构被重新解析时调用。

3. 备注：

   ​		指令定义时不加 `v-`，但使用时要加  `v-`；
   ​		指令名如果是多个单词，要使用kebab-case命名方式，不要用camelCase命名。用了驼峰命名它会自动转换为全小写的。

## 1.19  生命周期

### 声明周期入门

1.又名：生命周期回调函数、生命周期函数、生命周期钩子。
2.是什么：Vue在关键时刻帮我们调用的一些特殊名称的函数。
3.生命周期函数的名字不可更改，但函数的具体内容是程序员根据需求编写的。
4.生命周期函数中的this指向是vm 或 组件实例对象。

```html
<div id="app">

</div>

<script>
    const vm = new Vue({
        el: '#app',
        data() {
            return {
                n:1
            }
        },
        methods: {
            show(){

            }
        },
        mounted(){
            console.log(this);
            console.log("mounted","挂载");
            debugger;
        },
        beforeCreate(){
            console.log(this);
            console.log("创建之前");
            debugger;
        }

    })
</script>
```

### 生命周期流程分析

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/Vue生命周期.png)

### 生命周期总结

常用的生命周期钩子：
1）`mounted`: 发送ajax请求、启动定时器、绑定自定义事件、订阅消息等【初始化操作】。
2）`beforeDestroy`: 清除定时器、解绑自定义事件、取消订阅消息等【收尾工作】。

关于销毁Vue实例：
1) 销毁后借助Vue开发者工具看不到任何信息。
2) 销毁后自定义事件会失效，但原生DOM事件依然有效。
3) 一般不会在beforeDestroy操作数据，因为即便操作数据，也不会再触发更新流程了。

# 第二章、Vue组件

## 2.1  组件介绍

组件就是实现应用中局部功能代码和资源的集合

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/Vue组件示意图.png)

## 2.2  非单文件的组件

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

**三、编写组件标签：**
                `<school> </school>`

