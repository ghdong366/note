# AJAX

概念： ASynchronous JavaScript And XML	异步的JavaScript 和 XML
1. 异步和同步：客户端和服务器端相互通信的基础上
	* 客户端必须等待服务器端的响应。在等待的期间客户端不能做其他操作。
	
	* 客户端不需要等待服务器端的响应。在服务器处理请求的过程中，客户端可以进行其他的操作。
	
	  ![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/同步和异步2.png)

```
*Ajax 是一种在无需重新加载整个网页的情况下，能够更新部分网页的技术。
*通过在后台与服务器进行少量数据交换，Ajax 可以使网页实现异步更新。这意味着可以在不重新加载整个网页的情况下，对网页的某部分进行更新。
*传统的网页（不使用 Ajax）如果需要更新内容，必须重载整个网页页面。
```

### 原生的JS实现Ajax

```js
实现方式：
 //1.创建核心对象
   var xmlhttp;
   if (window.XMLHttpRequest)
   {// code for IE7+, Firefox, Chrome, Opera, Safari
       xmlhttp=new XMLHttpRequest();
   }
   else
   {// code for IE6, IE5
       xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
   }

   //2. 建立连接
   /*
       参数：
           1. 请求方式：GET、POST
               * get方式，请求参数在URL后边拼接。send方法为空参
               * post方式，请求参数在send方法中定义
           2. 请求的URL：
           3. 同步或异步请求：true（异步）或 false（同步）

    */
   xmlhttp.open("GET","ajaxServlet?username=tom",true);

   //3.发送请求
   xmlhttp.send();

   //4.接受并处理来自服务器的响应结果
   //获取方式 ：xmlhttp.responseText
   //什么时候获取？当服务器响应成功后再获取

   //当xmlhttp对象的就绪状态改变时，触发事件onreadystatechange。
   xmlhttp.onreadystatechange=function()
   {
       //判断readyState就绪状态是否为4，判断status响应状态码是否为200
	    if (xmlhttp.readyState==4 && xmlhttp.status==200)
	     {
	        //获取服务器的响应结果
	        var responseText = xmlhttp.responseText;
           alert(responseText);
	     }
	 }
```

### Jquery实现Ajax

1. 普通的方式:`$.ajax(url,[settings])`

   ```js
   $.ajax({
            type:"post",
            url:"${pageContext.request.contextPath}/user/getList",
            data:[User{username='zhansan', age=18}, User{username='lisi', age=28}],
            contentType:"application/json;charset=UTF-8",
            /*success:function (data) {
                       alert("返回的数据:"+data)
              }*/
          });
   ```

2. `$.get()`：发送get请求

   ```
   语法：$.get(url, [data], [callback], [type])
   参数：
   	url：请求路径
   	ata：请求参数
   	callback：回调函数
   	type：响应结果的类型
   ```

   ```js
   <!--用jquery实现Ajax的第一种方式-->
   <button onclick="fun()">发送异步请求</button>
   <script>
       function fun(){
           $.get("/Ajax_Json/ajaxServlet",{"username":"张三"},function(data){
               alert(data);
           });
       }
   </script>
   ```

3. `$.post()`：发送post请求

   ```
   语法：$.post(url, [data], [callback], [type])
   参数：
   	url：请求路径
   	data：请求参数
   	callback：回调函数
   	type：响应结果的类型  
   ```

   <font size="4px" color="red">说明:一般建议使用第一种形式（$.ajax）,因为它可以设置更多的参数。</font>

***

# JSON

概念： JavaScript Object Notation		JavaScript对象表示法

json现在多用于存储和交换文本信息的语法
进行数据的传输
JSON 比 XML 更小、更快，更易解析。

###  Json语法：

基本规则
		数据在名称/值对中：json数据是由键值对构成的
		键用引号(单双都行)引起来，也可以不使用引号
		数据由逗号分隔：多个键值对由逗号分隔
		花括号保存对象：使用{ }定义json 格式
		方括号保存数组：[ ]

==值的取值类型：==

* 数字（整数或浮点数）

* 字符串（在双引号中）

* 逻辑值（true 或 false）

* 数组（在方括号中）	{"persons":[{},{}]}

* 对象（在花括号中） {"address":{"province"："陕西"....}}

* null

### Json数据的获取（js中）

1. `json对象.键名`

2. `json对象["键名"]`

3. ``数组对象[索引]`

```json
//1.定义基本格式
var person = {"name": "张三", age: 23, 'gender': true};

//获取name的值
//var name = person.name;
var name = person["name"];
/ alert(name);

//alert(person);
//2.嵌套格式   {}———> []
var persons = {
    "persons": [
        {"name": "张三", "age": 23, "gender": true},
        {"name": "李四", "age": 24, "gender": true},
        {"name": "王五", "age": 25, "gender": false}
        ]
};
/ alert(persons);
//获取王五值
var name1 = persons.persons[2].name;
/ alert(name1);

//2.嵌套格式   []———> {}
var ps = [{"name": "张三", "age": 23, "gender": true},
    {"name": "李四", "age": 24, "gender": true},
    {"name": "王五", "age": 25, "gender": false}];
//获取李四值
//alert(ps);
alert(ps[1].name);
```

### Json的遍历

两种方式：对于普通的可以使用`for in`遍历，对于数组的形式使用`一般for`循环的方式遍历。

1. 单层循环

   ```json
   var person = {"name": "张三", age: 23, 'gender': true};
   //获取person对象中所有的键和值
    //for in 循环
   for(var key in person){
        //这样的方式获取不行。因为相当于  person."name"
        //alert(key + ":" + person.key);
        alert(key+":"+person[key]);
    }
   ```

2. 多层循环

   ```json
   var ps = [{"name": "张三", "age": 23, "gender": true},
       {"name": "李四", "age": 24, "gender": true},
       {"name": "王五", "age": 25, "gender": false}];
   //获取ps中的所有值
    for (var i = 0; i < ps.length; i++) {
        var p = ps[i];
        for(var key in p){
            alert(key+":"+p[key]);
        }
    }
   ```

### Java对象与Json的转换

常见的解析器：Jsonlib，Gson，fastjson，jackson。以jackson为例使用测试。

**Java对象转换JSON**

```
使用步骤：
导入jackson的相关jar包
创建Jackson核心对象 ObjectMapper
调用ObjectMapper的相关方法进行转换
```

  1. 转换方法(ObjectMapper对象的方法)：
        `writeValue(参数1，obj):`
           参数1可选项：
               File：将obj对象转换为JSON字符串，并保存到指定的文件中
               Writer：将obj对象转换为JSON字符串，并将json数据填充到字符输出流中
               OutputStream：将obj对象转换为JSON字符串，并将json数据填充到字节输出流中。

        `writeValueAsString(obj):`   将对象转为json字符串

        ==注意是write不是writer==

2. 注解：

   `@JsonIgnore`：排除属性。
   `@JsonFormat`：属性值格式化

   这两个注解的位置都应该是在类定义的属性上

   对日期的格式化： @JsonFormat(pattern = "yyyy-MM-dd")

   ```java
   // @JsonIgnore    /*忽略birthday这个属性*/
   @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")/*格式化birthday这个属性*/
   private Date birthday;
   ```

3. 复杂java对象转换
      List：转换为数组形式   `[ ]`
      Map：转换为` { }`形式，同对象转换后的相同

```java
public void test() throws JsonProcessingException {
    Person p = new Person();
    p.setName("张三");
    p.setAge(18);
    p.setGender("男");
    ObjectMapper mapper = new ObjectMapper();
    String s = mapper.writeValueAsString(p);
    System.out.println("p对象转换后的json字符串为：\n"+s);
    /*p对象转换后的json字符串为：
    {"name":"张三","age":18,"gender":"男"}*/
}
```

**Json转换为Java对象**

```
1.导入jackson的相关jar包
2.创建Jackson核心对象 ObjectMapper
3.调用ObjectMapper的相关方法进行转换
```

转换方法

`readValue(json字符串数据,类名.class)`

```java
//演示 JSON字符串转为Java对象
    @Test
    public void test5() throws Exception {
       //1.初始化JSON字符串
        String json = "{\"gender\":\"男\",\"name\":\"张三\",\"age\":23}";

        //2.创建ObjectMapper对象
        ObjectMapper mapper = new ObjectMapper();
        //3.转换为Java对象 Person对象
        Person person = mapper.readValue(json, Person.class);

        System.out.println(person);
    }
```

# 案例

案例要求：
当注册的时候，输入要注册的用户名，前端向服务器发出一个Ajax请求，判断数据库中是否已经存在。
然后服务器将查询的结果以Json形式传回前端。如果已经存在， 提醒用户重复。如不存在,就显示名字可用。
`{"userExist":true,"I 'msg":"此用户名已被占用！"}
{ "userExist":false, "msg":"用户名可用"}`

```html
<body>
    用户名：<input type="text" class="username"><span></span><br>
    密  码：<input type="password"><br>
    <input type="submit" value="提交">
    <script>
        $(".username").blur(function () {
            var value = this.value;
            $.get("/Ajax_Json/findUserServlet",{"username":value},function(data){
                // alert(data);
                if(data.userExist){
                    $("span").css("color","red");
                    $("span").html(data.msg);
                }
                else {
                    $("span").css("color","green");
                    $("span").html(data.msg);
                }
            },"json");
        });
    </script>
</body>
```

```java
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String username = req.getParameter("username");
        resp.setContentType("text/html;charset=utf-8");
//        System.out.println(username);
        ServletContext servletContext = req.getServletContext();
        String path = servletContext.getRealPath("/data.properties");//获取配置文件的路径
//        System.out.println(path);
        Properties properties = new Properties();
        properties.load(new FileReader(path));

        String driver = properties.getProperty("driver");
        String url = properties.getProperty("url");
        String user = properties.getProperty("user");
        String password = properties.getProperty("password");
//        System.out.println(driver);
        try {
            Class.forName(driver);
            Connection connection = DriverManager.getConnection(url, user, password);
            String sql = "select * from user where username=?";
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setString(1,username);//向数据库中查找前端发送来的用户名
            ResultSet resultSet = preparedStatement.executeQuery();
            if(resultSet.next()){
                //如果有数据，就说明数据库中已经存在了这个用户名
                Map<String,Object> message = new HashMap<String,Object>();
                message.put("userExist",true);
                message.put("msg","此用户名已被占用！");
                ObjectMapper mapper = new ObjectMapper();
                mapper.writeValue(resp.getWriter(),message);//将map对象封装为json数据

            }
            else{
                //如果没有数据，则数据库中没有该用户名
                Map<String,Object> message = new HashMap<String,Object>();
                message.put("userExist",false);
                message.put("msg","用户名可用");
                ObjectMapper mapper = new ObjectMapper();
                mapper.writeValue(resp.getWriter(),message);
            }

        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }
    }
```



