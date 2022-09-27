# Web标准

* 结构
  结构用于对网页元素进行整理和分类，现阶段主要学的是HTML,
* 表现
  表现用于设置网页元素的版式，颜色、大小等外观样式，主要指的是CSS
* 行为
  行为是指网页模型的定义及交互的编写，现阶段主要学的是Javascript

# 工具篇

==VScode==

**插件推荐**

| 插件            | 功能                     |
| --------------- | ------------------------ |
| Open in Browser | 右键选择浏览器打开html   |
| Auto Rename Tag | 自动重命名匹配html的标签 |
| 会了吧          | 翻译文件中英文单词       |

**Emment语法**

快速生成标签和样式

```
-------html标签
1.生成标签直接输入标签名按tab键即可比如div 然后tab键，就可以生成<div> </div>
2.如果想要生成多个相同标签加上*就可以了比如div*3 就可以快速生成3个div
3.如果有父子级关系的标签,可以用>比如ul> li就可以了
4.如果有兄弟关系的标签,用+就可以了比如div+p
5.如果生成带有类名或者id名字的，直接写.demo或者#two tab 键就可以了
6.如果生成的div类名是有顺序的，可以用自增符号$
7.如果想要在生成的标签内部写内容可以用{}表示
```

```
-------css样式
可以简写属性
```

***

# HTML

（Hyper Text Markup Language）超文本编辑语言

注释：

```html
<!--注释内容-->
```

特殊字符

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/html特殊字符.png)

### 1.1基本结构

```html
<html>
    <head>
        <title>页面名</title>
    </head>
    <body>
        月薪两万，一飞冲天
    </body>
</html>
```

### 1.2DOCTYPE   lang  char

```html
<!DOCTYPE html>文件类型声明，表示本文档是H5
<html lang="en"> <!--英文网页-->
<html lang="zh-CN"> 中文网页 
<head>
    <meta charset="UTF-8">
```

### 1.3常用基本标签

 ##### 标题标签

  ```html
  <h1>~<h6>表示六个级别的标题,标题独占一行
  ```

 ##### 段落和换行标签

  ```html
  <p></p>:其间内容是一个段落
  <br/>:换行符
  ```

 ##### 粗体 斜体 下划线

  ```html
<strong>加粗</strong><br>  <!--也可以是<b></b>-->
  <em>倾斜</em><br>          <!--也可以是<i></i>-->
  <del>删除线</del><br>       <!--也可以是<s></s>-->
  <ins>下划线</ins><br>       <!--也可以是<u></u>-->
  ```

 ##### 盒子标签

  ```html
  <div></div>   块格式，一个占一行
  <span></span>  行内块格式，多个span可以放在一行
  ```

 ##### 图像标签

  ```html
  <imag  src="url"/>
  ```

  图像标签的属性：

| 属性  | 说明                                 |
| ----- | ------------------------------------ |
| src   | 图片的路径，用双引号包含             |
| alt   | 替换文本，图像不能显示的文字         |
| title | 提示文字，鼠标放在图像上，显示的文字 |

  相对路径

| 相对路径分类 | 符号 | 说明                           |
| ------------ | ---- | ------------------------------ |
| 同一级       |      | \<img src="佩奇.png">          |
| 下一级路径   | /    | \<img src="imag/佩奇.png">     |
| 上一级路径   | ../  | \<img src="../imags/佩奇.png"> |

  绝对路径

  src的绝对路径（带盘符的，或完整的URL）

 ##### 超链接标签

  ```html
  <a href="https://www.baidu.com/" target="_blank">百度一下</a>
  <!--给图片加链接-->
  <a href="https://www.baidu.com/"><img src="imag/佩奇.png"></a>
  ```

  \<a></a>标签的属性

| 属性   | 作用                                                  |
| ------ | ----------------------------------------------------- |
| href   | 链接的指向地址（URL或者当前目录下的其他html文件）     |
| target | \_self在当前窗口打开(默认本选项)，\_blank在新窗口打开 |

  ==链接的分类==

| 类型                             | 举例                                           |
| -------------------------------- | ---------------------------------------------- |
| 外部链接                         | \<a href="https://www.baidu.com/">百度一下</a> |
| 内部链接                         | \<a href="图像.html">转到图像</a>              |
| 空链接                           | \<a href="#">空链接</a>                        |
| 锚点链接(被指向的标签要加id标签) | \<a href="#title">锚点链接,回到顶部</a>        |
| 文件下载                         | \<a href="压缩包.zip">文件下载</a>             |

  

 ##### 表格标签

  \<table>表示表格

  \<tr>表示一行

  \<th>表头单元格

  \<td>单元格

  ```html
  <table border="1" cellspace="0" cellspacing="0">
          <tr>
              <th>name</th> <th>sex</th> <th>age</th>
          </tr>
          <tr>
              <td>刘德华</td><td>男</td><td>55</td>
          </tr>
          <tr>
              <td>葛男神</td><td>男</td><td>18</td>
          </tr>
  </table>
  ```

  table标签属性

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/table属性.png)

**\<thead>    \<tbody>标签**

\<thead> ：表格的头部，将表格的头部标签放在其中

\<tbody>：表格的内容部分，

**合并单元格**

​	跨行合并: rowspan="合并单元格的个数"
​	跨列合并: colspan= "合并单元格的个数”

```html
<tr>
     <td></td><td colspan="2"></td>
</tr>
```

==注意：==合并完要删除多余的单元格

##### 列表标签

* 无序列表

  注意`ul`里面只能放`li`

  ```html
  <ul>
          <li>目录1</li>
          <li>目录2</li>
          <li>目录3</li>
  </ul>
  ```

* 有序列表

  同样的`ol`里只能放`li`

  ```html
  <ol>
          <li>目录</li>
          <li>目录</li>
          <li>目录</li>
          <li>目录</li>
  </ol>
  ```

* 自定义列表

  使用场景:
  自定义列表常用于对术语或名词进行解释和描述,定义列表的列表项前没有任何项目符号。(比如网站最下面的分类说明栏)

  `dl`里面只能有`dt` `dd`

  ```html
  <dl>
          <dt>关注我们</dt>
          <!-- 下面是内容 -->
          <dd>B站</dd>
          <dd>新浪微博</dd>
          <dd>公众号</dd>
  </dl>
  ```

#####  表单标签

表单域是通过\<form>标签包含。

```html
<!--form常用三个属性-->
<form action="login.php" method="GET" name="注册">
        
</form>
```

1. input输入表单元素

   input是行内块标签，不会单独占一行

   ```html
   <form action="#" method="GET" name="注册">
        用户名：<input type="text" name="username" value="请输入用户名"><br>
        密码：<input type="password" name="password" id=""><br>
       <!-- radio单选框，若要实现单选，多个单选的name属性要相同 -->
       男<input type="radio" name="sex" > 女<input type="radio" name="sex" ><br>
       照片：<input type="file" name="photo" id=""><br>
       <input type="submit" name="submit"><br>
       </form>
   ```

   **type值**

   <img src="https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/input中type值.png" style="zoom:70%;" />

   **其他的属性**

   value=""

   name=“该标签的名字‘  ：后台可以通过该名称得到用户输入的内容

   checked="checked"  ：默认被选中

   ==说明：==

   * name 和value是每个表单元素都有的属性值,主要给后台人员使用.
   * name 表单元素的名字，要求单选按钮和复选框要有相同的name值
   * radio单选框，若要实现单选，多个单选的name属性要相同 
   * 同源的checkbox类型的也要使得name属性相同
   
   **\<lable>标签**
   
   <label>标签用于绑定一个表单元素当点击<label>标签内的文本时,浏览器就会自动将焦点(光标转到或者选择对应的表单元素上,用来增加用户体验.
   
   核心: <label> 标签的for属性应当与相关元素的id属性相同。
   
   ```html
   <label for="sex">男</label>
   <input type="radio" name= "Sex" id="sex"/>
   ```
   
2. select 下拉表单元素

   ```html
   <form action="#">
           地区：
           <select name="地区">
               <option>安徽</option>
               <option selected="selected">北京</option>
               <option>湖南</option>
               <option>江苏</option>
           </select>
   </form>
   ```

   说明要放在select前面

   \<select> 中至少包含- -对\<option>
   在\<option> 中定义selected= " selected"时,当前项即为默认选中项。

3. textarea 文本域元素

   ```html
   <textarea name="introduce"></textarea>
   ```


# CSS

层叠样式表（Cascading Style Sheets）

CSS 能够对网页中元素位置的排版进行像素级精确控制，支持几乎所有的字体字号样式，拥有对网页对象和模型样式编辑的能力

### 2.1 基本语法规范

●选择器是用于指定 CSS样式的HTML标签,花括号内是对该对象设置的具体样式
●属性和属性值以“键值对”的形式出现
●属性是对指定的对象设置的样式属性,例如字体大小、文本颜色等
●属性和属性值之间用英文":"分开
●多个"键值对”之间用英文";" 进行区分

①属性值前面,冒号后面,保留一个空格
②选择器(标签)和大括号中间保留空格

==css的注释==

用`/*  */`

```css
p {
   color: red;
    /*这个是注释*/
   font-size: 15px;
}
```

==css属性书写顺序==

建议遵循以下顺序:

1. 布局定位属性: display / position/ float / clear / visibility/ overflow (建议display第一个写 ,毕竟关系到模式)
2. 自身属性: width/ height / margin/ padding / border/ background
3. 文本属性: color/ font / text- decoration/ text- align/ vertical-align/ white- space / break-word
4. 其他属性( CSS3) : content / cursor / border-radius / box-shadow / text-shadow/ background:linear-gradient...

### 2.2css样式引入三种方法

* 行内样式表（行内式）

  仅适合临时少量的样式，不建议大量使用

  ```html
  <div style="color:blue;font-size:20px">div标签，行内式</div>
  ```

* 内部样式表（嵌入式）

  ```html
  <style>
         p {
              color: pink;
          }
  </style>
  ```

* 外部样式表（链接式）

  适合样式比较多的时候，实际开发中使用的方法

  ```html
  <link rel="stylesheet" href="css文件路径">
  ```

### 2.3 css选择器

一个选择器对符合该条件的所有标签都适用。

**基础选择器**

* 标签选择器

  ```html
  p {
      color: rgb(255, 219, 99);
      font-size: 20px;
  }
  
  <p>这个一个段落，用css来修饰</p>
  ```

* 类选择器

  定义时：用英文的 `.`开始

  单类名或者多类名（即一个标签使用多个样式）

  ```html
  .man {
        color: rgb(255, 219, 99);
        font-size: 20px;
  }
  .boxsize {
        width: 100px;
        height: 100px;
        background-color: rgb(51, 107, 228);
  }
  
  <div class="man">男孩子</div>
  <!--多类名选择器-->
  <div class="man boxsize">一个盒子</div>
  ```

* id选择器

  定义时：用英文的 `#`开始

  ==只能被调用一次，调用后其他的标签不能再调用==

  ```html
  #pink {
         color: pink;
  }
  <div id="pink">粉红的回忆</div>
  ```

* 通配符选择器

  在CSS中,通配符选择器使用`*`定义，它表示选取页面中所有元素(标签)。

  ```html
  * {
       font-size: 25px;
       color: pink;
  }
  ```

**复合选择器**

* 后代选择器

  可以选择父元素里面的后代元素（包括儿子孙子---），

  `元素1  元素2  {样式声明} `

  ```css
  /* 只选择ol中的所有li元素 */
  ol li {
          color: pink;
      }
  /* 选择ul的孙子a */
   ul li a {
           color:red;
  }
  ```

  元素1和元素2用空格隔开

  元素1是父级，元素2是子级，最终选择的是元素2

  元素1和元素2可以是任意的基础选择器

  

* 子元素选择器

  选择父元素里的==亲儿子==，即最近一级的子元素

  `元素1>元素2  {样式声明} `

  ```css
  .nav>p {
          color:red;
  }
  ```

  元素1和元素2用大于号隔开

  只对父元素的亲儿子有效

* 并集选择器

  可以一次性选择多组标签，同时为他们设置同样的样式

  `元素1， 元素2  {样式声明} `

  ```css
  div,p {
              color:red;
              font-size:20px;
              font-weight: 600;
          }
  ```

  多个元素用逗号隔开

  元素1和元素2可以是任意的基础选择器

* 伪类选择器

  用于向某些元素添加特殊的效果,伪类选择器有很多，比如链接伪类，结构伪类

  `a:link  选择所有的未被访问的链接`

  `a:visited  选择所有已访问的链接`

  `a:hover  选择鼠标经过的链接`

  `a:active  选择所有鼠标按下未弹起的链接`

  实际书写时，要按照这个顺序。最常用的就是a:hover

  `input:focus   获得光标的表单元素 `

  ```css
  /* 未访问的链接a */
  a:link {
          text-decoration: none;
  }
  /* 鼠标经过时的a */
  a:hover {
          text-decoration: none;
          color: red;
  }
  /* 获得光标的表单元素 */
  input:focus {
        background-color: pink;
        color: red;
  }
  ```

  

### 2.4 css字体属性

| 属性名      | 含义                                                         |
| ----------- | ------------------------------------------------------------ |
| font-family | 字体类型<br />（多个字体并列时，用逗号隔开）                 |
| font-size   | 字体大小<br />谷歌默认是16px                                 |
| font-weight | 字体粗细（默认是normal,粗体是bold）<br />另外可以用数字100~900来表示，400表示normal |
| font-style  | 文字样式（斜体）默认是normal不倾斜，italic倾斜               |

```css
.ziti {
        /* 字体选项，首选项是宋体，如果浏览器中没有，用楷体。 */
        font-family: "宋体","楷体";
        /* 字体大小 */
        font-size: 20px;
        /* 字体粗细 */
        font-weight: 600;
        /* 文字样式（斜体） */
        font-style: italic;
}
```

**字体复合属性**

直接一个`font`属性，依次按照 `font-style`   `font-weight`   `font-size/font-height`  `font-family`各个属性值之间用空格隔开。如：

```css
p {
     /* 字体复合属性的书写 */
     font: italic 900 50px "楷体";
}
```

### 2.5 文本属性

文本颜色，对齐方式，装饰文本，文本缩进，行间距等

| 属性            | 含义                                                         |
| --------------- | ------------------------------------------------------------ |
| color           | 文本字体颜色<br />可以直接用预定义的颜色单词<br />可以用十六进制表示，如 \#e68888<br />还可以用RGB表示，如：rgb(236, 129, 147) |
| text-align      | 水平对齐方式（可以是left center right）                      |
| text-decoration | text-decoration属性规定添加到文本的修饰。<br />可以给文本添加下划线、删除线、上划线等。<br />none:默认，没有线<br />underline:下划线<br />overline:上划线<br />line-through:删除线 |
| text-indent     | 文本缩进，一般用em作为缩进的单位<br />如：text-indent: 2em;  |
| line-height     | 行间距                                                       |

```css
p {
       color: pink;

       text-align: center;
       /* 文本的修饰。可以给文本添加下划线、删除线、上划线等。 */
       text-decoration: overline;
}
div {
       /* 文本缩进 */
       text-indent: 3em;
}
div {
            /* 行高50，字体20。因此字体还有15的上间距和下间距 */
            line-height: 50px;
            font-size: 20px;
}
```

应用说明：

* 在实际开发中，通过text-decoration可以删去a链接标签的下划线
* 行间距的说明:包含字体的大小，字体上下间
* 可以通过line-height将其设置为父元素的高度，实现单行文字垂直居中

### 2.6  css元素显示模式

在html中，根据显示位置分类，可以将所有的标签分为“块元素”和“行内元素”。在布局中，具体如何显示，就是显示模式。

| 分类       | 特点                                                         | 举例                                                 |
| ---------- | ------------------------------------------------------------ | ---------------------------------------------------- |
| 块元素     | 1）自己独占一行<br />2）可以设置宽和高<br />3）宽度默认是父容器的100% | 如：div h1 li  p                                     |
| 行内元素   | 1）一行可以放多个元素<br />2）宽度和高度直接设置是无效的<br />3）默认的宽度就是其内容的宽度<br />4）里面只能放文字或行内元素，不能放块级元素（\<a>标签除外） | 如：a  strong span<br />span等不能直接指定高度和宽度 |
| 行内块元素 | 1）一行可以显示多个，但是多个之间 有空隙（行的特点)<br />2）默认宽度是它本身的宽度（行的特点）<br />3）可以更改高度和宽度（块的特点） | 如：img input  td                                    |

  **显示模式的转换**

通过display属性来转换

```css
display:block;  //转换为块元素
display:inline; //转换为行内元素
display:inline-block; //转换为行内块元素
```

### 2.7  CSS背景

| 类型                                | 取值                                                         | 说明                                                         |
| ----------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 背景颜色**background-color **       | 1）**transparent**    背景透明<br />2）具体的颜色值          |                                                              |
| 背景图片**background-image**        | 1) url(图片的路径)                                           | 使用于logo小图或者较大的图片，这样便于控制位置<br />路径不需要引号包含 |
| 背景平铺**background-repeat**       | **repeat :** 　背景图像在纵向和横向上平铺<br/>**no-repeat :** 　背景图像不平铺<br/>**repeat-x :**  背景图像在横向上平铺<br/>**repeat-y :** 　背景图像在纵向平铺 | 默认是平铺的                                                 |
| 背景图片位置**background-position** | **length : **百分数或具体值            <br /> **position :** 　top center bottom  left  right | background-position: 10% 50%;                                |
| 背景固定**background-attachment**   | **scroll :** 　背景图像是随对象内容滚动<br/>**fixed :** 　背景图像固定 |                                                              |
| 背景图片大小**background-size:**    | 100% 100%;根据容器的内容确定图片的尺寸                       | 控制背景图片大小尺寸的                                       |

**背景简写的形式**

background:背景颜色  背景图片  背景平铺背景  图像滚动  背景图片位置;

### 2.8 CSS三大特性

* 层叠性

  相同选择器给设置相同的样式，此时一个样式就会覆盖(层叠)另-个冲突的样式。层叠性主要解决样式冲突的问题

  ```
  基本原则：
  样式冲突,遵循的原则是就近原则,哪个样式离结构近,就执行哪个样式
  样式不冲突,不会层叠
  ```

* 继承性

  子标签会继承父标签中的某些样式，如文本颜色和字号

  （背景，高度，内外边距等不会继承）行高会继承

* 优先级

  当一个元素指定了多个选择器，有优先级.

  ```markdown
  基本原则：
  选择器相同时，按照就近原则
  选择器不同时，根据**选择器的权重**执行
  (范围越小，权重越大。权重不是二进制的，后一位永远不会进位）
  ```

  

  | 选择器               | 选择器的权重 |
  | -------------------- | ------------ |
  | 继承 或者*           | 0，0，0，0   |
  | 元素选择器           | 0，0，0，1   |
  | 类选择器  伪类选择器 | 0，0，1，0   |
  | id选择器             | 0，1，0，0   |
  | 行内样式   style=""  | 1，0，0，0   |
  | !important           | 无穷大       |
  
  说明：!important写法
  
  ```css
  div {
  	color:pink!improtant;
  }
  ```
  
  **复合选择器的权重叠加：**
  
  ```css
  /* 权重是0001+0001 为0002 */
  ul li {
          color: pink;
    }
  /* 权重为0001 */
  li {
          color: red;
      }
  ```
### 2.9  盒子模型

 <img src="https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/盒子模型.png" style="zoom:80%;" />

* 边框（border）

  **border :**[ **border-width** ](c_borderwidth.html)||[ **border-style** ](c_borderstyle.html)||[ **border-color** ](c_bordercolor.html)

  ```css
  div {
              width: 200px;
              height: 200px;
              /* 边框的粗细 一般用px作为单位 */
              border-width: 5px;
              /* 边框的样式  solid实线  dashed虚线边框  dotted点线边框 */
              border-style: dotted;
              /* 边框的颜色 */
              border-color: pink;
   }
  ```

  **复合形式：**`border:2px solid red;`

  单独对某一条变设置边框样式：`border-top: 5px solid red;`

  **相邻的边框合并：**

  ```css
  border-collapse: collapse;
  /*css3才支持*/
  ```

  ==**注意 ：**==

  边框影响盒子的实际大小，如果指定了盒子大小又加了边框，实际显示的时候盒子的大小就是两者的和。

* 内边距（padding）

  指盒子内的内容（文字或子盒子）到边框的距离

  ​		**padding-top**:上内边距

  ​		**padding-right :**右内边距

  ​		**padding-bottom:**下内边距 

  ​		**padding-left：**左内边距

  **复合形式：**

  ```
  如果提供全部四个参数值，将按上－右－下－左的顺序作用于四边。
  如果只提供一个，将用于全部的四条边。
  如果提供两个，第一个用于上－下，第二个用于左－右。
  如果提供三个，第一个用于上，第二个用于左－右，第三个用于下。
  ```

  ==**注意 ：**==

  padding也会影响盒子的实际大小。

  如果盒子指定了宽度和高度，则padding会撑大盒子

  如果没有指定宽度和高度，则不会撑大盒子。

* 外边距（margin）

  盒子与盒子之间的距离

  ​		 **margin-top: ** 上外边距

  ​	      **margin-right: ;**右外边距

  ​     	 **margin-bottom: ;**下外边距

  ​    	  **margin-left: ;**左外边距

  **复合形式：**和padding写法相同

##### 外边距的应用和盒子塌陷

**块级盒子水平居中**

外边距可以让盒子水平居中，但是要满足以下的两个条件

1）盒子必须指定了宽度width(不然它就继承了父亲的宽度，没有意义)

 2)左右的外边距都设置为`auto`

**行内元素和行内块元素水平居中**

把它们看做普通的文本，直接给父亲标签添加`text-align:center；`即可

**嵌套块元素垂直外边距的塌陷**

对于两个嵌套关系(好关系)的块元素,父元素有上外边距同时子元素也有上外边距,此时父元素会塌陷较大的外边距值。

解决方案：

①可以为父元素定义上边框。
②可以为父元素定义上内边距。
③可以为父元素添加overflow:hidden。

**清除默认的边距**

```css
* {
    margin: 0;
    padding: 0;
 }
```

**清除li标签默认的圆点**

给`li`标签设置list-sytle:none;

```css
li {
	list-style:none;
}
```

* 圆角边框（border-radius）

  `border-radius`

  原理：让圆或椭圆与矩形边框相切达到的

  ![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/圆角边框原理.png)

  

  ```css
  /* 一般的圆角边框 */
          .yiban {
              height: 200px;
              width: 200px;
              background-color: pink;
              border-radius: 20px;
          }
          /* 圆角矩形 */
          .yuanjiao {
              height: 100px;
              width: 200px;
              background-color: skyblue;
              border-radius: 50px;
          }
          /* 正圆形 */
          .yuan {
              height: 200px;
              width: 200px;
              background-color: pink;
              border-radius: 100px;
          }
          /* 树叶形（对角圆角） */
          .duijiao {
              height: 200px;
              width: 200px;
              background-color: skyblue;
              border-radius: 0 40px;
          }
  ```

  效果图

  <img src="https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/圆角盒子展示.png" style="zoom:50%;" />

  ==注意：==

  border-radius属性是复合属性，可以对四个角分别设置圆角的大小

  如：border-radius: 0 10px 40px 0;

* 盒子阴影（box-shadow）

  影子默认在右下位置。

  `box-shadow: h-shadow v-shadow blur spread color inset;`

  ```css
  box-shadow: 5px 10px 20px 5px rgba(0, 0, 0, 0.3);
  ```

  

  | 值       | 描述                     |
  | -------- | ------------------------ |
  | h-shadow | 必需。水平阴影。允许负值 |
  | v-shadow | 必需。垂直阴影，允许负值 |
  | blur     | 可选。模糊举例           |
  | spread   | 可选。阴影的尺寸         |
  | color    | 可选。阴影的颜色         |
  | inset    | 可选。设置为内阴影       |

  ==**注意：**==
  1.默认的是外阴影(outset),但是不可以写这个单词，否则导致阴影无效
  2.盒子阴影不占用空间,不会影响其他盒子排列。

* 文字阴影（text-shadow）

  `text-shadow: h- shadow  v-shadow blur  color ;`

  含义同盒子阴影

### 2.10  浮动

##### 网页布局的三种方式

* 标准流

* 浮动

* 定位

  常用策略：多个块级元素纵向排列找标准流,多个块级元素横向排列找浮动。

| 浮动  | 取值                                            |
| ----- | ----------------------------------------------- |
| float | none：无浮动<br />left:左浮动<br />right:右浮动 |

##### 浮动的特性：

1. 浮动元素会脱离标准流(脱标)

   浮动的盒子不再保留原先的位置，位置被标准流的盒子会取代

2. 浮动的元素会一行内显示并 且元素==顶部对齐==，如果父级盒子装不下，就另起一行

3. 所有浮动的元素都会具有行内块元素的特性

   所以行内元素添加浮动后，它不再需要转化为块级元素

   如果块级盒子没有设置宽度,默认宽度和父级一样宽,但是添加浮动后,它的大小根据内容来决定

##### 浮动搭配标准流父盒子

先用标准流的父元素排列上下位置之后内部子元素采取浮动排列左右位置.符合网页布局第一准侧.

```
这里有一个小技巧，就是父盒子中的最后一个浮动的盒子不需要边距时，可以单独指定其边距为0，注意权重
```

浮动的两个注意:

一个盒子浮动了，它的兄弟应该也浮动，防止引起问题

浮动的盒子只会影响后面的标准流，不会影响前面确定好的标准流

##### 清除浮动（clear：both）

为什么要清除浮动；

理想中的状态,让子盒子撑开父亲.有多少孩子,我父盒子就有多高。由于父级盒子很多情况下,==不方便给高度,但是子盒子浮动又不占有位置,最后父级盒子高度为0时==,就会影响下面的标准流盒子。

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/QQ截图20210414111542.png)

 1.清除浮动本质是?
 清除浮动的本质是清除浮动元素脱离标准流造成的影响
 2.清除浮动策略是?
 闭合浮动.只让浮动在父盒子内部影响,不影响父盒子外面的其他盒子.

 清除浮动之后,父级就会根据浮动的子盒子自动检测高度。父级有了高度,就不会影响下面的标准流了

* 额外标签法（隔墙法）

  额外标签法会在浮动元素末尾添加一个空的块级标签。例如`<div style=" clear:both" > </div>` , 或者其他标签

* overflow法

  给父级元素添加overflow属性，将其属性值设置为hidden、auto 或scroll 都可以

* after伪元素法

  <img src="https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/after伪元素清除浮动.png" style="zoom:80%;" />

  再由父盒子调用

* 双伪元素

  ![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/双伪元素清除浮动.png)


### 东哥在线企业级网站练习

1. 版心的确定

   即网站的基本宽度，只需设置一次，方便后续的调用

2. 导航栏的制作

   实际开发中,我们不会直接用链接a。而是用li包含链接(li+ a)的做法。

   li+a语义更清晰, -看这就是有条理的列表型内容。
   如果直接用a ,搜索引擎容易辨别为有堆砌关键字嫌疑(故意堆砌关键字容易被搜索引擎有降权的风险) ,从而影响网站排名

3. 浮动的盒子不会有盒子外边距塌陷问题

### 2.11  CSS定位

定位则是可以让盒子自由的在某个盒子内移动位置或者固定屏幕中某个位置,并且可以压住其他盒子。

定位:将盒子定在某一个位置,所以定位也是在摆放盒子，按照定位的方式移动盒子。
定位=定位模式+边偏移。

**定位模式**

确定定位方式，通过`position`属性。其取值有四个

| position值 |   语义   |
| :--------- | :------: |
| static     | 静态定位 |
| relative   | 相对定位 |
| absolute   | 绝对定位 |
| fixed      | 固定定位 |

**边偏移**

定位盒子的位置量，有`top bottom left right` 四个属性

但实际中用两个即可确定位置

这四个属性可以为负值

| 边偏移属性 | 示例 | 说明                                                 |
| ---------- | ---- | ---------------------------------------------------- |
| top        |      | ==顶端==偏移量,定义元素相对于其父元素上边线的距离。  |
| bottom     |      | ==底部==偏移量，定义元素相对于其父元素下边线的距离。 |
| left       |      | ==左侧==偏移量,定义元素相对于其父元素左边线的距离。  |
| right      |      | ==右侧==偏移量，定义元素相对于其父元素右边线的距离   |

* 静态定位（static）

  无定位的方式，没有边偏移（就相当于标椎流）

* 相对定位（relative）

  相对定位是元素在移动位置的时候,是相对于它原来的位置来说的(自恋型)。

  **特点：**

  它在标椎流中的位置继续占有，==不会脱标==。后面的盒子会把它当做标准流对待

  它常用来为绝对定位服务。

  ```css
  .box1 {
              position: relative;
              top: 50px;
              left: 50px;
              height: 200px;
              width: 200px;
     		    background-color: pink;
      }
  ```

* 绝对定位（absolute）

  元素在移动时，相对于它的==祖先元素==

  **特点：**

  如果没有祖先元素或者祖先元素没有定位,则以浏览器为准定位( Document文档)。

  如果祖先元素有定位(相对、绝对、固定定位) , 则以最近一级的有定位祖先元素为参考点移动位置。

  绝对定位不会占有原本的位置（==脱标==）

  父盒子的padding不会影响子盒子的绝对定位。（子级无视内边距）

  ```css
  .son {
              position: absolute;
              left: 20px;
              bottom: 30px;
              height: 200px;
              width: 200px;
              background-color: pink;
          }
  ```

  ==子绝父相==：

  子级使用绝对定位，父级使用相对定位

  子级绝对定位,不会占有位置,可以放到父盒子里面的任何一个地方,不会影响其他的兄弟盒子。
  父盒子需要加定位限制子盒子在父盒子内显示。

* 固定定位（fixed）

  固定定位是元素固定于浏览器可视区的位置。

  主要使用场景:可以在浏览器页面滚动时元素的位置不会改变。

  **特点：**

  以浏览器的可视窗口（当前的界面范围）为参照点移动元素。

  也会==脱标==

  ```css
  div {
              position: fixed;
              top: 200px;
              left: 200px;
          }
  ```

  ==固定定位小技巧：==固定在版心的右侧位置

  让固定定位的盒子left: 50%.走到浏览器可视区(也可以看做版心)的一-半位置。
  让固定定位的盒子margin-left:版心宽度的一半距离。多走 版心宽度的一半位置

  ```css
  .w {
              width: 1000px;
              height: 1500px;
              margin: 0 auto;
              background-color: pink;
     }
  .fixed {
              position: fixed;
              left: 50%;
              top: 50px;
              height: 60px;
              width: 40px;
              margin-left: 503px;
              background-color: skyblue;
        }
  ```

* 黏性定位（sticky）

  **特点：**

  以浏览器的可视窗口为参照点移动元素(固定定位特点)
  粘性定位占有原先的位置，不脱标(相对定位特点)
  必须添加top、left、 right、 bottom 其中-一个才有效

  ```css
  div {
              /* 说明：原本盒子距离顶部100px 由于设置了黏性定位
              并且top:0,当盒子和顶部距离为0时，它就变成了固定位置 */
              position: sticky;
              top: 0;
              height: 100px;
              width: 600px;
              margin: 100px auto;
              background-color: pink;
          }
  ```

  ==几种定位总结：==

  ![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/定位总结.png)

  ==定位叠放顺序==

  在使用定位布局时,可能会出现盒子重叠的情况。此时,可以使用`z-index`来控制盒子的前后次序(z轴)
  语法:

     `z-index: 1;`

  注意：

  数值可以是正整数、负整数或0,默认是auto ,数值越大,盒子越靠上
  如果属性值相同,则按照书写顺序,后来居上
  数字后面不能加单位
  只有定位的盒子才有z-index属性

  ==利用定位使盒子水平或垂直居中==

  | 居中                 | 实现思路                                                     |
  | -------------------- | ------------------------------------------------------------ |
  | 在父级盒子中水平居中 | 先让left:50%，走父容器的一半<br />然后给盒子设置一个margin-left。数值是盒子宽度的一半的负值 |
  | 在父级盒子中垂直居中 | top:50%<br />然后margin-top。数值是盒子高度的一半的负值。    |

  ==定位的特殊性：==

  绝对定位和固定定位也和浮动类似。
  1.行内元素添加绝对或者固定定位,可以直接设置高度和宽度。

  2.块级元素添加绝对或者固定定位,如果不给宽度或者高度,默认大小是内容的大小。不再是100%

  3.脱标的盒子不会触发外边距塌陷

  ==浮动和定位==

  浮动的元素会压住下面的标准流，但是不会压住标准流中的文字和图片

  绝对定位或固定定位会压住下面的标椎流，同时也会压住标准流的

### 定位练习-焦点图

````html
<style>
        /* 使用ul之前，都要消除原本的默认的格式 */
        * {
            margin: 0;
            padding: 0;
        }
        a {
            text-decoration: none;
            color: #fff;
        }

        li {
            list-style: none;
        }

        .box {
            position: relative;
            height: 280px;
            width: 520px;
            margin: 200px auto;
            border-radius: 30px;
            background-color: pink;
        }

        .box img {
            height: 280px;
            width: 520px;
            border-radius: 30px;
        }

        .pre {
            position: absolute;
            top: 50%;
            left: 0px;
            height: 30px;
            width: 20px;
            background-color: rgba(0, 0, 0, 0.705);
            margin-top: -15px;
            line-height: 30px;
            text-align: center;
            border-radius: 0 15px 15px 0;
        }

        .next {
            position: absolute;
            top: 50%;
            right: 0px;
            height: 30px;
            width: 20px;
            background-color: rgba(0, 0, 0, 0.705);
            margin-top: -15px;
            line-height: 30px;
            text-align: center;
            border-radius: 15px 0 0 15px;
        }
        /*底部小按钮盒子，用ul  */
        .nav {
            position: absolute;
            bottom: 10px;
            left: 50%;
            width: 70px;
            height: 14px;
            background-color: rgba(255, 255, 255, 0.678);
            border-radius: 7px;
            margin-left: -35px;
        }

        .nav li {
            float: left;
            height: 8px;
            width: 8px;
            background-color: #fff;
            border-radius: 50%;
            margin: 3px;
        }
        .nav li:hover {
            background-color: rgb(50, 181, 241);
        }
    </style>

<body>
    <div class="box">
        <img src="taobao.jpg" alt="图片">
        <!-- 左箭头 -->
        <a href="#" class="pre">&lt;</a>
        <!-- 右箭头 -->
        <a href="#" class="next">&gt;</a>
        <!-- 底部小圆点 -->
        <ul class="nav">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </div>
</body>
````

### 2.12 网页布局总结

一个完整的网页,是标准流、浮动、定位一起完成布局的,每个都有自己的专门用法。

1.标准流

可以让盒子上下排列或者左右排列,垂直的块级盒子显示就用标准流布局。
2.浮动

可以让多个块级元素一行显示或者左右对齐盒子,多个块级盒子水平显示就用浮动布局。
3.定位

定位最大的特点是有层叠的概念,就是可以让多个盒子前后叠压来显示。如果元素自由在某个盒子内移就
用定位布局。

### 2.13 元素的显示和隐藏

本质:让一个元素在页面中隐藏或者显示出来。

**display：**

以什么样的形式显示(或隐藏)，==隐藏后的盒子不占有原本的位置==。这个属性常用js进行操作

```
display: none ;  隐藏对象。同时也不占有原本的位置

display:block; 显示元素（和前面所讲的块元素不冲突）
```

**visibility** ：

设置盒子是否可见。==隐藏后盒子继续占有原位置==

```
visibility : visible; 元素可视

visibility : hidden;元素隐藏
```

**overflow：**

溢出盒子的内容显示和隐藏

```
visible	不剪切内容也不添加滚动条
hidden	不显示超过对象尺寸的内容，超出的部分隐藏掉
scroll	不管超出内容否,总是显示滚动条
auto	超出自动显示滚动条，不超出不显示滚动条
```

==注意：==但是如果有定位的盒子.请慎用overflow.hidden因为它会隐藏多余的部分。

# CSS高级

### 精灵图

核心原理:将网页中的一些小背景图像整合到一张大图中,这样服务器只需要一次请求就可以了。

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/精灵图.png)



```css
.login {
            height: 60px;
            width: 60px;
            margin: 100px auto;
            background: url(王者荣耀精灵图.png) no-repeat -184px 0;
        }
.download {
            width: 236px;
            height: 128px;
            margin: 0 auto;
            background: url(王者荣耀精灵图.png) no-repeat 0 -219px;
        }
```

由于原点在图片的左上角，所以设置位置（移动）时，一般都是向左移和向上移，因此x轴和y轴的坐标都是负的

==精灵图的缺陷==

1. 制作好图片后不能随意更换，仅适用于长时间不需要更换的一些图标。
2. 方法或缩小都会失真

### 字体图标iconfont

展示的是图标,本质属于字体。

**优点：**

轻量级: -个图标字体要比一系列的图像要小。- -旦字体加载了,图标就会马上渲染出来,减少了服务器请求
灵活性:本质其实是文字,可以很随意的改变颜色、产生阴影、透明效果、旋转等
兼容性:几乎支持所有的浏览器,请放心使用

**使用步骤**

1. 从网站中下载免费的字体图标

   [icomoon.io](https://icomoon.io/app/#/select)

2. 将下载好的字体font文件夹放在根目录下

3. 在css中字体声明

   ```
   @font-face {
    font-family: 'icomoon';
    src: url('fonts/icomoon.eot?4t3z6y');
    src: url('fonts/icomoon.eot?4t3z6y#iefix') format('embedded-opentype'),
         url('fonts/icomoon.ttf?4t3z6y') format('truetype'),
         url('fonts/icomoon.woff?4t3z6y') format('woff'),
         url('fonts/icomoon.svg?4t3z6y#icomoon') format('svg');
   font-weight: normal;
   font-style: normal;
   font-display: block;
    }
   ```

4. 打开下载文件中的index.html文件，选择对应的方框复制到html文件中，

5. 给该图标的父亲盒子指定一个字体类型，该类型必须与css中的字体声明中的一致

   ```
   font-family: "icomoon";
   ```

**追加图标**

如果工作中,原来的字体图标不够用了,我们需要添加新的字体图标到原来的字体文件中。

把压缩包里面的selection.json重新上传，

然后选中自己想要新的图标,重新下载压缩包,并替换原来的文件即可。

### 三角形盒子

原理：给一个宽高都为0的盒子设置边框，它的边框就会是由四个三角形组成的。

举例：

```
.box1 {
            height: 0;
            width: 0;
            border-top: 100px solid pink;
            border-right: 100px solid red;
            border-bottom: 100px solid green;
            border-left: 100px solid blue;
  }
```

**三角形的具体做法**

将其余三个边的边框颜色设置为透明，再将需要显示的边框设置颜色

```
.box2 {
            height: 0;
            width: 0;
            border: 100px solid transparent;
            border-top-color: skyblue;
}
```



![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/三角盒子.png)



### 鼠标样式

修改`cursor`属性

| 属性值      | 描述 |
| ----------- | ---- |
| default     | 默认 |
| pointer     | 小手 |
| move        | 移动 |
| text        | 文本 |
| not-allowed | 禁止 |

```
.li1 {
    /* 默认鼠标 */
    cursor: default;
}

.li2 {
    /* 小手指(可点击) */
    cursor: pointer;
}

.li3 {
    /* 移动(抓手) */
    cursor: move;
}

.li4 {
    /* 文本图标 */
    cursor: text;
}

.li5 {
    /* 禁止选择 */
    cursor: not-allowed;
}
```

### 表单边框线

给表单添加`outline: 0;`

或者`outline: none`;样式之后,就可以去掉默认的蓝色边框。

### 文本域防拖拽

设置textarea标签的属性`resize:none;`

### vertical-align

用于设置一个元素的垂直对齐方式,但是它只针对于==行内元素==或者==行内块元素==有效。

 **vertical-align**：baseline | sub | super | top | text-top | middle  | bottom 

| 属性值   | 说明                                     |
| -------- | ---------------------------------------- |
| baseline | 把当前盒的基线与父级盒的基线对齐。       |
| top      | 把元素的顶端与行中最5元素的顶端对齐      |
| middle   | 把此元素放置在父元素的中部。             |
| bottom   | 把元素的顶端与行中最低的元素的顶端对齐。 |

注意：以文字为参考，引申出基线，顶线，中线，底线

例如图片和文字垂直居中：vertical-align:middle;

### 解决图片底部默认空白缝隙问题

bug :图片底侧会有一一个空白缝隙,原因是行内块元素会和文字的基线对齐。

主要解决方法有两种:
1. 给图片添加vertical-align:middle | topl bottom等。 (提倡使用的)
2. 把图片转换为块级元素display: block;

### 溢出文字用省略号表示

**单行文本溢出**

```
div {
            height: 40px;
            width: 120px;
            background-color: pink;
            
            /*1.这个单词的意思是如果文字显示不开也必须强制一行内显示*/
            white-space: nowrap;
            /* 2.溢出的部分隐藏起来*/
            overflow: hidden;
            /*3.文字溢出的时候用省略号来显示*/
            text-overflow: ellipsis;
 }
```

### css初始化

以京东为例

```
* {
    margin: 0;
    padding: 0
}

em,
i {
    font-style: normal
}

li {
    list-style: none
}

img {
    border: 0;
    vertical-align: middle
}

button {
    cursor: pointer
}

a {
    color: #666;
    text-decoration: none
}

a:hover {
    color: #c81623
}

button,
input {
    font-family: Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB, "\5B8B\4F53", sans-serif
}

body {
    -webkit-font-smoothing: antialiased;
    background-color: #fff;
    font: 12px/1.5 Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB, "\5B8B\4F53", sans-serif;
    color: #666
}

.hide,
.none {
    display: none
}

.clearfix:after {
    visibility: hidden;
    clear: both;
    display: block;
    content: ".";
    height: 0
}

.clearfix {
    *zoom: 1
}
```

# H5C3新增标签和属性

### HTML5新特性

增加了一些新的标签、新的表单和新的表单属性等。

##### 语义化标签

\<header> :头部标签

\<nav> : 导航标签

\<article> :内容标签

\<section> : 定义文档某个区域

\<aside> :侧边栏标签

\<footer> :尾部标签

说明：

这种语义化标准主要是针对搜索引擎的

这些新标签页面中可以使用多次

在IE9中,需要把这些元素转换为块级元素

其实,我们移动端更喜欢使用这些标签

HTML5还增加了很多其他标签,我们后面再慢慢学

##### 视频标签

当前<video> 元素支持三种视频格式:尽量使用mp4格式。

```html
<video src="文件地址" controls="controls"></ video>`
```

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/video标签属性.png)



##### 音频标签

\<audio>标签也只支持三种格式，但尽量使用mp3格式的音频

```html
<audio src="media/于文文-就差一个你.mp3" autoplay="autoplay"></audio>
```

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/音频标签.png)

**总结**

音频标签和视频标签使用方式基本-致
浏览器支持情况不同
谷歌浏览器把音频和视频自动播放禁止了
我们可以给视频标签添加muted属性来静音播放视频,音频不可以(可以通过JavaScript解决)
视频标签是重点,我们经常设置自动播放,不使用controls控件,循环和设置大小属性

##### 新表单标签

新增的表单类型。注意：要验证email中格式，要添加表单域`form`

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/H5新增的表单.png)

##### 新增的表单属性

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/表单新属性.png)

### CSS3新特性

#### 新增选择器

1. 属性选择器

   属性选择器可以根据元素特定属性的来选择元素。这样就可以不用借助于类或者id选择器。

   ```
   E[att]			选择具有att属性的E元素
   E[att="val"]	选择具有att属性且属性值等于val的E元素
   E[att^="val"]	匹配具有att属性且值以val开头的E元素
   E[att$="val"]	匹配具有att属性且值以val结尾的E元素
   E[att*="val"]	匹配具有att属性且值中含有val的E元素
   ```

   ```css
   /* 选择具有value属性的input标签 */
    input[value] {
        color: blue;
    }
   
   /* 选择type属性值为text的标签 */
   input[type=email]{
       color: pink;
   }
   ```

2. 结构伪类选择器

   根据元素的位置（在父元素中第几次出现）选择的。

   ```css
   /* 1. 选择ul里面的第一个孩子 小li */
   ul li:first-child {
       color: pink;
   }
   /* 2. 选择ul里面的最后一个孩子 小li */
   ul li:last-child {
       color: red;
   }
   /* 3. 选择ul里面的第3个孩子 小li */
   ul li:nth-child(3){
       color: skyblue;
   }
   ```
#### calc函数

   calc() 此CSS函数让你在声明CSS属性值时执行一 些计算

 ` width: calc(100% - 80px);`宽度为父盒子宽度减80px



# 其他技巧

### 设置盒子中的图片和盒子一样大

设置图片的width height 的值都为100%



### margin负值的运用

**解决两个相邻盒子的边框重复问题。**

给盒子设置一个margin属性，取值为边框宽度的负值。这样就可以实现边框合并的问题

实际上是后一个盒子压住了前一个盒子的边框。

==注意：==当鼠标经过，盒子需要显示四个完全的边框时。

1. 如果盒子没有定位，就可以为其设置一个相对定位relative
2. 如果盒子已经都有了定位，就设置其`z-index`属性为正值































