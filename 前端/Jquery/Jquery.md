# Jquery

***

# 第一章 Jquery入门

概念： 一个JavaScript框架。简化JS开发

==jquery-xxx.js 与 jquery-xxx.min.js区别：==

 	1. jquery-xxx.js：开发版本。给程序员看的，有良好的缩进和注释。体积大一些
 	2. jquery-xxx.min.js：生产版本。程序中使用，没有缩进。体积小一些。程序加载更快

### 1.1  JS中的对象和Jquery的对象

1. 两者获取对象的方式不同。

   js：`document.querySeletorAll('选择器')`等

   Jquery：`$('选择器')`

2. 两者获取的多个对象都可以当做数组。

3. JQuery对象和js对象方法不通用的。

   **js的方法只能操作一个元素，而Jquery的方法，可以操作该对象表示的所有元素**

4. JQuery对象在操作时，更加方便。

==两者相互转换==

* Jquery -- > js :` jq对象[索引] `或者 `jq对象.get(索引)`
* js -- > Jquery : `$(js对象)`

==说明：==

this是js中的对象，在jquery方法中可以使用，但是它不能调用Jquery的方法。

jquery中索引从0开始

# 第二章  Jquery基本语法

### 2.1  事件绑定

```javascript
语法格式：
	jquery对象.事件函数（function(event){
	
	}）;
	
//举例
//1.点击id=‘b1’的元素，会弹出abc
          $("#b1").click(function(){
              alert("abc");
          });
```

==说明：==

1. 所有的事件都对应js的事件，不需要加on前缀
2. 事件源对象event可以加，也可以省略

### 2.2  入口函数

```javascript
语法格式
 $(function () {
 
 });
```

==window.onload  和 $(function) 区别==

     * window.onload 只能定义一次,如果定义多次，后边的会将前边的覆盖掉。
     * $(function)可以定义多次的。

### 2.3  样式修改

使用`css()`函数，但是css可以有多个参数，代表不同的用法

| 参数格式 | 举例                                                         | 说明                                         |
| -------- | ------------------------------------------------------------ | -------------------------------------------- |
| 一个参数 | $("p").css("color");                                         | 取得第一个段落的color样式属性的值。          |
| 两个参数 | $("p").css("color","red");                                   | 将所有段落字体设为红色                       |
| 多个参数 | $("p").css({ "color": "#ff0011", "background-color": "blue" }); | 将所有段落的字体颜色设为红色并且背景为蓝色。 |

==说明==

1. 一个参数是获取值
2. 两个参数是为该对象的css属性设置一个值
3. 多个参数时，每个属性和值用键值对形式给出，多个之间用逗号隔开
4. 对于中间有横杠的属性（如背景色），可使用`background-color`也可以使用`backgroundColor`形式

# 第三章  选择器
### 3.1  基本选择器

1. 标签选择器（元素选择器）

   ​        语法： `$("html标签名")` 获得所有匹配标签名称的元素

2. id选择器 
   		语法： `$("#id的属性值") `获得与指定id属性值匹配的元素
3. 类选择器
   		语法： `$(".class的属性值")` 获得与指定的class属性值匹配的元素

4. 并集选择器：
   		语法：`$("选择器1,选择器2....")` 获取多个选择器选中的所有元素

### 3.2  层级选择器

1. 后代选择器

   ​	语法： `$("A B ") `选择A元素内部的所有B元素		

2. 子选择器

   ​	语法： `$("A > B")` 选择A元素内部的所有B子元素

### 3.3  属性选择器

1. 属性名称选择器 

​			语法： `$("A[属性名]") `包含指定属性的选择器

2. 属性选择器

   语法： $("A[属性名='值']") 包含指定属性等于指定值的选择器

3. 复合属性选择器

   语法： `$("A[属性名='值'][]...")` 包含多个属性条件的选择器

### 	3.4  过滤选择器

1. 首元素选择器 

   ​	语法： `:first `获得选择的元素中的第一个元素

2. 尾元素选择器 
   ​			* 语法：` :last `获得选择的元素中的最后一个元素
3. 非元素选择器
   ​			* 语法： `:not(selector) `不包括指定内容的元素   (selector的格式为选择器)
4. 偶数选择器
   ​			* 语法： `:even` 偶数，从 0 开始计数
5. 奇数选择器
   ​			* 语法： `:odd` 奇数，从 0 开始计数
6.  等于索引选择器
   ​			* 语法： `:eq(index) `指定索引元素
7.  大于索引选择器 
   ​			* 语法： `:gt(index)` 大于指定索引元素
8. 小于索引选择器 
   ​			* 语法：` :lt(index)` 小于指定索引元素
9. 标题选择器
   ​			* 语法： `:header` 获得标题（h1~h6）元素，固定写法

### 3.5  表单过滤选择器

1. 可用元素选择器 

   ​	语法： `:enabled` 获得可用元素

2. 不可用元素选择器 

   ​	语法： :`disabled` 获得不可用元素

3.  选中选择器 

   ​	语法： `:checked` 获得单选/复选框选中的元素

4. 选中选择器 

   ​	语法： `:selected `获得下拉框选中的元素

```js
=======基本选择器
$("#one").css("backgroundColor","pink");
$("div").css("backgroundColor","pink");
$(".mini").css("backgroundColor","pink");
$("span,#two").css("backgroundColor","pink");

========属性选择器
$("div[title]").css("backgroundColor","pink");
$("div[title='test']").css("backgroundColor","pink");
$("div[title!='test']").css("backgroundColor","pink");
$("div[title^='te']").css("backgroundColor","pink");
$("div[title$='est']").css("backgroundColor","pink");
$("div[title*='es']").css("backgroundColor","pink");
$("div[id][title*='es']").css("backgroundColor","pink");

=========层级选择器
$("body div").css("backgroundColor","pink");
$("body > div").css("backgroundColor","pink");

=========过滤选择器
$("div:first").css("backgroundColor","pink");
$("div:not(.one)").css("backgroundColor","pink");
$("div:even").css("backgroundColor","pink");
$("div:gt(3)").css("backgroundColor","pink");
$(":header").css("backgroundColor","pink");

==========表单过滤选择器
$("input[type='text']:enabled").val("aaa");
$("input[type='text']:disabled").val("aaa");
alert($("input[type='checkbox']:checked").length);
alert($("#job > option:selected").length);
```

# 第四章 DOM操作

###  4.1  内容操作

| 方法   | 描述                            |
| ------ | ------------------------------- |
| html() | 获取/设置元素的标签体内容       |
| text() | 获取/设置元素的标签体纯文本内容 |
| val()  | 获取/设置元素的value属性值      |

方法没有参数时表示获取，参数为字符串时表示为对象设置内容

###  4.2  属性操作

1. 通用属性操作

   | 方法         | 描述                |
   | ------------ | ------------------- |
   | attr()       | 获取/设置元素的属性 |
   | removeAttr() | 删除属性            |
   | prop()       | 获取/设置元素的属性 |
   | removeProp() | 删除属性            |

   ==attr和prop区别==

   如果操作的是元素的固有属性，则建议使用prop
   如果操作的是元素自定义的属性，则建议使用attr

   prop操作`checked`属性时，不会在标签中添加，但是会生效。

   ```js
   <input id="chke1" type="checkbox" />记住密码
   <input id="chke2" type="checkbox" checked="checked" />记住啦
   console.log($("#chke1").prop("checked"));// false
   console.log($("#chke2").prop("checked"));// true
   console.log($("#chke1").attr("checked"));//undefined
   console.log($("#chke2").attr("checked"))//"checked"
   
   $("input[type='checkbox']").prop("checked");//获取
   $("input[type='checkbox']").prop("disabled", false);//disable设置为false
   $("input[type='checkbox']").prop("checked", true);//checked设置为true
   ```

2. 对class属性操作

   | 方法          | 描述                                                         |
   | ------------- | ------------------------------------------------------------ |
   | addClass()    | 添加class属性的值                                            |
   | removeClass() | 删除class属性值                                              |
   | toggleClass() | 切换class属性。<br />`toggleClass("one")`: 判断如果元素对象上存在class="one"，则将属性值one删除掉。  如果元素对象上不存在class="one"，则添加 |

   ==这三个方法的参数都是单个字符串，但removeClass()可以没有参数，表示删除该对象表示的所有标签的类。==

### 4.3  样式操作

| 方法   | 描述                                      |
| ------ | ----------------------------------------- |
| css(): | 用于获取/设置标签的样式。具体用法见第二章 |

### 4.4  结点的添加和删除

**添加**

`append()`:父元素将子元素追加到末尾
			*对象1.append(对象2): 将对象2添加到对象1元素内部，并且在末尾
`prepend()`:父元素将子元素追加到开头
			*对象1.prepend(对象2):将对象2添加到对象1元素内部，并且在开头

`after()`:添加元素到元素后边
			*对象1.after(对象2)： 将对象2添加到对象1后边。对象1和对象2是兄弟关系
`before()`:添加元素到元素前边
			*对象1.before(对象2)： 将对象2添加到对象1前边。对象1和对象2是兄弟关系

**删除**

`remove()`:移除当前的元素
		*对象.remove():将对象删除掉
`empty()`:清空元素的所有后代元素。
		*对象.empty():将对象的后代元素全部清空，但是保留当前对象以及其属性节点

# 案例

1. 全选全不选

   ```html
   <table class="table" cellspacing="0">
       <tr>
           <th><input type="checkbox" class="select_all"></th>
           <th class="all_text">全选</th>
       </tr>
       <tr>
           <td><input type="checkbox" name="hobby"></td>
           <td>唱歌</td>
       </tr>
       <tr>
           <td><input type="checkbox" name="hobby"></td>
           <td>跳舞</td>
       </tr>
       <tr>
           <td><input type="checkbox" name="hobby"></td>
           <td>绘画</td>
       </tr>
   </table>
   <script>
       var flag = false;
       $(".select_all").click(function () {
           //全选全不选的文字对应的标签
           var $allText = $(".all_text");
           if (flag == false) {
               $("input[name]").prop("checked", true);
               $allText.html("全不选");
               flag = true;
           }else{
               $("input[name]").prop("checked",false);
               $allText.html("全选");
               flag = false;
           }
       });
   </script>
   ```

2. 表情添加

   ```
       <script>
           //需求：点击qq表情，将其追加到发言框中
           $(function () {
               $("ul img").click(function () {
                   $(".word").append($(this).clone());
   
               });
           });
   
   
       </script>
   
   </head>
   <body>
       <div class="emoji">
           <ul>
               <li><img src="img/01.gif" height="22" width="22" alt=""/></li>
               <li><img src="img/02.gif" height="22" width="22" alt=""/></li>
               <li><img src="img/03.gif" height="22" width="22" alt=""/></li>
               <li><img src="img/04.gif" height="22" width="22" alt=""/></li>
               <li><img src="img/05.gif" height="22" width="22" alt=""/></li>
               <li><img src="img/06.gif" height="22" width="22" alt=""/></li>
               <li><img src="img/07.gif" height="22" width="22" alt=""/></li>
               <li><img src="img/08.gif" height="22" width="22" alt=""/></li>
               <li><img src="img/09.gif" height="22" width="22" alt=""/></li>
               <li><img src="img/10.gif" height="22" width="22" alt=""/></li>
               <li><img src="img/11.gif" height="22" width="22" alt=""/></li>
               <li><img src="img/12.gif" height="22" width="22" alt=""/></li>
           </ul>
           <p class="word">
               <strong>请发言：</strong>
               <img src="img/12.gif" height="22" width="22" alt=""/>
           </p>
       </div>
   </body>
   ```

# 第五章  Jquery动画

三种方式显示和隐藏元素的动画

1. 默认显示和隐藏方式

   `show([speed,[easing],[fn]])`

   参数：

   ```
   speed：动画的速度。三个预定义的值("slow","normal", "fast")或表示动画时长的毫秒数值(如：1000)
   easing：用来指定切换效果，默认是"swing"，可用参数"linear"
   	swing：动画执行时效果是 先慢，中间快，最后又慢
   	inear：
   fn：在动画完成时执行的函数，每个元素执行一次。
   ```

   `hide([speed,[easing],[fn]])`

   `toggle([speed],[easing],[fn])`

2. 滑动显示和隐藏方式

   `slideDown([speed],[easing],[fn])`

   `slideUp([speed,[easing],[fn]])`

   `slideToggle([speed],[easing],[fn])`

3. 淡入淡出显示和隐藏方式

   `fadeIn([speed],[easing],[fn])`

   `fadeOut([speed],[easing],[fn])`

   `fadeToggle([speed,[easing],[fn]])`

# 第六章  Jquery中的遍历

### 6.1  传统js的遍历方式

for(初始化值;循环结束条件;步长)

### 6.2  jq的遍历方式

1. `jq对象.each(callback)`

  ```js
  语法：
  jquery对象.each(function(index,element){
  
  });
  ============
  index:就是元素在集合中的索引
  element：就是集合中的每一个元素对象
  this：集合中的每一个元素对象
  ```

  ==each中的break和continue==

  根据设置回调函数返回值：
  * true:如果当前function返回为false，则结束循环(break)。
  * false:如果当前function返回为true，则结束本次循环，继续下次循环(continue)

2. `$.each(object, [callback])`

   这里的回调函数用法和上面的each()中的用法一样。

3. `for..of: jquery` 3.0 版本之后提供的方式
  for(元素对象 of 容器对象)

==注意：==

这几个遍历方式得到的对象都是JS对象，不是Jquery对象，注意方法的使用。

```html
<ul>
    <li>北京</li>
    <li>上海</li>
    <li>重庆</li>
    <li>天津</li>
    <li>合肥</li>
</ul>
<script>
    $("ul li").each(function(index,element){
        //each遍历的第一种，直接用this表示正在遍历的标签
        // alert(this.innerHTML);
        //each遍历的第二种，回调函数中添加两个参数index    element
        alert(index+":"+element.innerHTML);
    });
</script>
```

# 第六章 Jquery的事件

1. jquery标准的绑定方式
   `q对象.事件方法(回调函数)；`

   ==注：==如果调用事件方法，不传递回调函数，则会触发浏览器默认行为。

   单对象.submit();//让表单提交

2. on绑定事件/off解除绑定

   `jq对象.on("事件名称",回调函数)`

   `jq对象.off("事件名称")`

   ==注：==如果off方法不传递任何参数，则将组件上的所有事件全部解绑

3. 事件切换：toggle

   `jq对象.toggle(fn1,fn2...)`

   当单击jq对象对应的组件后，会执行fn1.第二次点击会执行fn2.....

	* 注意：1.9版本 .toggle() 方法删除,jQuery Migrate（迁移）插件可以恢复此功能。
	<script src="../js/jquery-migrate-1.0.0.js" type="text/javascript" charset="utf-8"></script>

# 第七章 插件

插件：增强JQuery的功能。用于创建自定义的函数。

### $.fn.extend(object) 

  * 可以设置预定义的方法，这个方法可以供所有的Jquery对象使用。

    ```js
    $.fn.extend({
                //定义了一个check()方法。所有的jq对象都可以调用该方法
                check:function () {
                   //让复选框选中
    
                    //this:调用该方法的jq对象
                    this.prop("checked",true);
                },
                uncheck:function () {
                    //让复选框不选中
    
                    this.prop("checked",false);
                }
                
    });
    ===========以后所有的jquery对象都可以调用check()和uncheck()
     $("#btn-check").click(function () {
         //获取复选框对象
         $("input[type='checkbox']").check();
    
     });
    ```

### $.extend(object)

  * 设置预定义的方法。该方法通过 `$.方法名()`调用

    ```js
    $.extend({
        max:function (a,b) {
           //返回两数中的较大值
           return a >= b ? a:b;
       },
        min:function (a,b) {
           //返回两数中的较小值
           return a <= b ? a:b;
        }
                
    });
    
    //调用全局方法
    var max = $.max(4,3);
    //alert(max);
    ```

    
