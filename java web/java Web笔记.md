****

# 前序

```
1. 软件架构
   C/S：客户端/服务器端
   B/S：浏览器/服务器端
2. 资源分类
   静态资源：所有用户访问后，得到的结果都是一样的，称为静态资源.静态资源可以直接被浏览器解析
   		如： html,css,JavaScript
   动态资源:每个用户访问相同资源后，得到的结果可能不一样。称为动态资源。动态资源被访问后，需要先转换为静态资源，在返回给浏览器
		如：servlet/jsp,php,asp....
3. 网络通信三要素
	1. IP：电子设备(计算机)在网络中的唯一标识。
	2. 端口：应用程序在计算机中的唯一标识。 0~65536
	3. 传输协议：规定了数据传输的规则
		1. 基础协议：
			1. TCP:安全协议，三次握手。 速度稍慢
			2. UDP：不安全协议。 速度快		

```

查看电脑上所有的正在运行的进程对应的端口号

cmd命令：`netstat -ano`

***

# 第一章、Tomcat

[Tomcat外传 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/54121733)

### 1.1  Tomcat启动的问题

```
可能遇到的问题：
1. 黑窗口一闪而过：
	* 原因： 没有正确配置JAVA_HOME环境变量
	* 解决方案：正确配置JAVA_HOME环境变量
2. 启动报错：
	1. 暴力：找到占用的端口号，并且找到对应的进程，杀死该进程
	* netstat -ano
	2. 温柔：修改自身的端口号
	* conf/server.xml
	* <Connector port="8888" protocol="HTTP/1.1"
		connectionTimeout="20000"
		redirectPort="8445" />

```

==一般会将tomcat的默认端口号修改为80。80端口号是http协议的默认端口号。
好处：在访问时，就不用输入端口号==

### 1.2  java动态项目的目录结构

1. 根目录
   1. WEB-INF目录
      1. web.xml 核心配置文件
      2. libs目录：放置jar包的文件
      3. classes目录：放置字节码文件
   2. index.jsp等多个jsp界面

### 1.3  Tomcat项目部署方式

**最好的一种**

![Tomcat动态项目部署方式](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/QQ截图20201209005113.png)

### 1.4  IDEA启动Tomcat

==启动服务器会有两次请求？==

在tomcat启动时加载index.jsp页面，同时会向浏览器发送一个favicon.ico请求，这个请求是默认的。当tomcat首次启动时，可以通过F12控制台中的network查看到这个请求。

# 第二章、javaBean

JavaBean 是特殊的 Java 类，使用 Java 语言书写，并且遵守 JavaBean API 规范。

接下来给出的是 JavaBean 与其它 Java 类相比而言独一无二的特征：

* 该类由public修饰

- 提供一个默认的无参构造函数。
- 可能有一系列可读写属性。（private修饰）
- 可能有一系列的 **getter** 或 **setter** 方法。

```xml
<jsp:useBean id="id" class="bean 编译的类" scope="bean 作用域">
   <jsp:setProperty name="bean 的 id" property="属性名"  
                    value="value"/>
   <jsp:getProperty name="bean 的 id" property="属性名"/>
   ...........
</jsp:useBean>
```

### BeanUtils

**导入的jar包**

* commons-beanutils-1.8.0.jar
* commons-logging-1.2.jar

**成员变量和属性：**

一般认为两者相同，但是特殊的：

属性为setter和getter方法截取后的产物
  	例如：getUsername() --> Username--> username

**静态方法：**

1. setProperty(Object  obj,String name,Object  value)
2. getProperty(Object  obj,String name)
3. populate(Object obj , Map map):将map集合的键值对信息，封装到对应的JavaBean对象中

```java
Student student = new Student();
BeanUtils.setProperty(student,"name","葛大爷");
System.out.println(student);
String name = BeanUtils.getProperty(student,"name");
System.out.println(name);
```

# 第三章、Servlet

运行在服务器端的小程序（Server applet），运行在服务器上。

https://blog.csdn.net/hou_ge/article/details/104684688

[servlet的本质是什么，它是如何工作的？ - 知乎 (zhihu.com)](https://www.zhihu.com/question/21416727)

### 3.1 快速入门

1. 创建类，实现接口，或者继承类
2. 重写方法
3. 配置servlet

==注意==：<url-pattern>/demo1</url-pattern>中的demo1就是浏览器对应的地址栏(跟在虚拟路径后)，用来访问该servlet

### 3.2 执行原理

1.当服务器接受到客户端浏览器的请求后，会解析请求URL路径，获取访问的Servlet的资源路径
2.查找web . xml文件，是否有对应的<url-pattern>标签体内容。
3.如果有，则在找到对应的<servlet-class>全类名

4.tomcat会将字节码文件加载进内存，并且创建其对象
5.调用其方法

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/yuanli.png)

### 3.3  Servlet中的方法------servlet生命周期	

|                  方法                   | 说明                                      |
| :-------------------------------------: | ----------------------------------------- |
|            public void init             | ==创建Servlet,只执行一次==                |
| public ServletConfig getServletConfig() |                                           |
|           public void service           | ==每次访问servlet时被调用==               |
|     public String getServletInfo()      | 获取一些servlet的信息，如版本、作者信息等 |
|          public void destroy()          | ==服务器软件正常关闭被执行==              |

Servlet默认在第一次访问时创建，但是可以通过配置文件设置何时创建

* 第一次访问时创建（默认）

  `<load-on-startup>`标签的值为负数

* 服务器启动的时候创建

  `<load-on-startup>`值为0或正整数

  * 多个用户同时访问时，可能存在线程安全问题。
  * 解决：尽量不要在Servlet中定义成员变量。即使定义了成员变量，也不要对修改值

```java
<servlet>
    <servlet-name>demo2</servlet-name>
    <servlet-class>vip.gedaye.MyServlet</servlet-class>
    <load-on-startup>0</load-on-startup>
</servlet>
```

### 3.4  Servlet注解配置

注意需要3.0及以后的版本

@WebServlet("Servlet资源路径即url-pattern")

```java
@WebServlet("/demo3")
public class MyServlet2 implements Servlet { }
```

![Servlet虚拟路径](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/Servlet虚拟路径.png)

### 3.5  IDEA与Tomcat相关的配置

1. IDEA会为每个tomcat部署的项目单独建立一份配置文件

   * 查看控制台的log：Using CATALINA_BASE:   

   ​      `C:\Users\葛浩东\.IntelliJIdea2019.3\system\tomcat\Tomcat_8_5_51_综合学习`

2. 工作空间项目   和     tomcat部署

   * tomcat真正访问的是“tomcat部署的web项目”，"tomcat部署的web项目"对应着"工作空间项目" 的web目录下的所有资源

     WEB-INF目录下的资源不能被浏览器直接访问。（不能通过浏览器URL路径直接访问）

### 3.6  Servlet体系结构

​	Servlet -- 接口
​		|
​	GenericServlet -- 抽象类
​		|
​	HttpServlet  -- 抽象类

	* GenericServlet：将Servlet接口中其他的方法做了默认空实现，只将service()方法作为抽象
		* 将来定义Servlet类时，可以继承GenericServlet，实现service()方法即可
	
	* HttpServlet：对http协议的一种封装，简化操作
		1. 定义类继承HttpServlet
		2. 复写doGet/doPost方法
==注意：==

要重写doGet,doPost并且不要重写`super.doGet`和`super.doPos`t方法。否则会出现**http405错误**

### 3.7  @WebServlet()再深入

urlpartten:Servlet访问路径

1. 一个Servlet可以定义多个访问路径 ： @WebServlet({"/d4","/dd4","/ddd4"})
2. 路径定义规则：
	1. /xxx：路径匹配
	2. /xxx/xxx:多层路径，目录结构
	3. *.do：扩展名匹配

# 第四章、 HTTP协议

### 4.1 概述

Hyper Text Transfer Protocol 超文本传输协议
* 传输协议：定义了，客户端和服务器端通信时，发送数据的格式
* 特点：
	1. 基于TCP/IP的高级协议
	2. 默认端口号:80
	3. 基于请求/响应模型的:一次请求对应一次响应
	4. 无状态的：每次请求之间相互独立，不能交互数据

* 历史版本：
	* 1.0：每一次请求响应都会建立新的连接
	* 1.1：复用连接

### 4.2  请求消息数据格式

1. 请求行
  `请求方式 请求url 请求协议/版本`
  `GET /login.html	HTTP/1.1`

  ```
  请求方式：
  * HTTP协议有7中请求方式，常用的有2种
    * GET：
      1. 请求参数在请求行中，在url后。
      2. 请求的url长度有限制的
      3. 不太安全
    * POST：
      1. 请求参数在请求体中
      2. 请求的url长度没有限制的
      3. 相对安全
  ```

2. 请求头：客户端浏览器告诉服务器一些信息
	`请求头名称: 请求头值`
	
	* 常见的请求头：
		1. User-Agent：浏览器告诉服务器，我访问你使用的浏览器版本信息
		* 可以在服务器端获取该头的信息，解决浏览器的兼容性问题
	
		2. Referer：http://localhost/login.html
			* 告诉服务器，我(当前请求)从哪里来？
				* 作用：
					1. 防盗链：
					
					2. 统计工作：
			
		   <img src="https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/Referer请求头.bmp" style="zoom:150%;" />
	
3. 请求空行
	空行，就是用于分割POST请求的请求头，和请求体的。
	
4. 请求体(正文)：
	
	* 封装POST请求消息的请求参数的
	
	```
	请求消息字符串格式：
	POST /login.html HTTP/1.1
	Host: localhost
	User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:60.0) Gecko/20100101 Firefox/60.0
	Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
	Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
	Accept-Encoding: gzip, deflate
	Referer: http://localhost/login.html
	Connection: keep-alive
	Upgrade-Insecure-Requests: 1
	
	username=zhangsan	
	```

### 4.3  响应消息数据格式

响应消息：服务器端发送给客户端的数据
1. 响应行

  组成：协议/版本 响应状态码 状态码描述

  响应状态码

  ```c
  响应状态码：服务器告诉客户端浏览器本次请求和响应的一个状态。
  
  1. 状态码都是3位数字 
  2. 分类：
    1xx：服务器就收客户端消息，但没有接受完成，等待一段时间后，发送1xx多状态码
    2xx：成功。代表：200
    3xx：重定向。代表：302(重定向)，304(访问缓存)
    4xx：客户端错误。
        * 代表：
          * 404（请求路径没有对应的资源） 
          * 405：请求方式没有对应的doXxx方法
    5xx：服务器端错误。代表：500(服务器内部出现异常)
  ```

2. 响应头：

   格式：头名称： 值

   常见的响应头：

   ​	Content-Type：服务器告诉客户端本次响应体数据格式以及编码格式;

   ​	Content-disposition：服务器告诉客户端以什么格式打开响应体数据值：

   ```c
   Content-disposition的取值：
   in-line:默认值,在当前页面内打开
   attachment;filename=xxx：以附件形式打开响应体。文件下载
   ```

3. 响应空行

4. 响应体:传输的数据

# 第五章 、Request 对象

### 5.1  response对象的原理

1. request和response对象是由服务器创建的。我们来使用它们

2. request对象是来获取请求消息，response对象是来设置响应消息

   ![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/Request和response原理.png)

### 5.2  request对象继承体系结构：	

ServletRequest		--	接口
	|	继承
HttpServletRequest	-- 接口
	|	实现
org.apache.catalina.connector.RequestFacade 类(tomcat)

### 5.3  request功能：(方法)

1. 获取请求行数据

   | 方法                                                     | 说明                 | 返回值举例                                     |
   | -------------------------------------------------------- | -------------------- | ---------------------------------------------- |
   | String getMethod()                                       | 获取请求方式         | GET                                            |
   | String getContextPath()                                  | 获取虚拟目录         | /day14                                         |
   | String getServletPath()                                  | 获取Servlet路径      | /demo1                                         |
   | String getQueryString()                                  | 获取get方式请求参数  | name=zhangsan&age=18                           |
   | String getRequestURI()<br />StringBuffer getRequestURL() | 获取请求URI（或URL） | /day14/demo1<br />http://localhost/day14/demo1 |
   | String getProtocol()                                     | 获取协议及版本       | HTTP/1.1                                       |

   URL:统一资源定位符 ： http://localhost/day14/demo1
   URI：统一资源标识符 : /day14/demo1

2. 获取请求头数据

   | 方法                                 | 说明                           |      |
   | ------------------------------------ | ------------------------------ | ---- |
   | String getHeader(String name)        | 通过请求头的名称获取请求头的值 |      |
   | Enumeration<String> getHeaderNames() | 获取所有的请求头名称           |      |

   ```java
   //        获取请求头相关信息
    String referer = req.getHeader("referer");
    System.out.println(referer);//因为是直接地址栏请求的，所以没有这一项，返回null
   
     Enumeration<String> headerNames = req.getHeaderNames();
     while (headerNames.hasMoreElements()){
         String s = headerNames.nextElement();
         String header = req.getHeader(s);
         System.out.println(s+"---"+header);
     }
   ```

3. 获取请求体数据:
   请求体：只有POST请求方式，才有请求体，在请求体中封装了POST请求的请求参数
   步骤：

   1. 获取流对象

      BufferedReader getReader()：获取字符输入流，只能操作字符数据

      ServletInputStream getInputStream()：获取字节输入流，可以操作所有类型数据

      ​	在文件上传知识点后讲解
      
   2. 再从流对象中拿数据

### 5.4  获取请求参数通用方式

   不论get还是post请求方式都可以使用下列方法来获取请求参数

| 返回值               | 方法                            | 描述                         |
| -------------------- | ------------------------------- | ---------------------------- |
| String               | getParameter(String name)       | 根据参数名称获取参数值       |
| String [ ]           | getParameterValues(String name) | 根据参数名称获取参数值的数组 |
| Enumeration<String>  | getParameterNames()             | 获取所有请求的参数名称       |
| Map<String,String[]> | getParameterMap()               |                              |



   ```java
//        根据标签的name属性，获取单个请求参数
        String name = req.getParameter("username");
        System.out.println("获取的username参数："+name);
//        根据标签name属性，获取多个复选框的参数
        String[] hobbies = req.getParameterValues("hobby");
        System.out.println("获取hobby参数"+ Arrays.toString(hobbies));
//        直接获取所有的请求参数名
        Enumeration<String> parameterNames = req.getParameterNames();
        while (parameterNames.hasMoreElements()){
            String para_name = parameterNames.nextElement();
            String parameter = req.getParameter(para_name);
            System.out.println(para_name+"的参数值为："+parameter);
        }
//直接获取请求参数的键值对
        Map<String, String[]> parameterMap = req.getParameterMap();


   
   ```

  ==注意==

如果一个请求参数对应对个value，getParameter(String name)只能返回一个值（第一个）。

 ==乱码问题==

   上面的相关方法，在doGet方法中不会出现中文乱码问题。

   在doPost方法中会有中文乱码。

==中文乱码问题的解决==

在获取参数前，设置request的编码`request.setCharacterEncoding("utf-8");`

```html
这里的`utf-8`依据是html中的编码格式是utf-8,
如果源界面中是其他格式，相应的在获取参数时就指定对应的格式
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
```

```java
protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    request.setCharacterEncoding("utf-8");
    String username = request.getParameter("username");
    System.out.println("username----->"+username);
    String password = request.getParameter("password");
    System.out.println("password------>"+password);
}
```
### 5.5  请求转发

一种在服务器内部的资源跳转方式

**转发步骤：**

```java
1. 通过request对象获取请求转发器对象：
		RequestDispatcher getRequestDispatcher(String path)
2. 使用RequestDispatcher对象来进行转发：
		forward(ServletRequest request, ServletResponse response) 
		
一般连起来写：
request.getRequestDispatcher("login.html").forward(request,response);
```

**请求转发的代码执行步骤**

```
1.先执行转发前Servlet中的代码
2.进入转发的资源（如servlet或jsp等）中执行代码。
3.回到Servlet继续执行剩余的代码
```

**请求转发的特点：**

1. 浏览器地址栏路径不发生变化。
2. 只能转发到当前服务器内部资源中。
3. 转发是一次请求（前后资源使用同一个request）

### 5.6  共享数据

域对象：一个有作用范围的对象，可以在范围内共享数据
* request域：==代表一次请求的范围，一般用于==请求转发==的多个资源中共享数据
	* 方法：
		1. void setAttribute(String name,Object obj):存储数据
		2. Object getAttitude(String name):通过键获取值
		3. void removeAttribute(String name):通过键移除键值对
	
	![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/Request数据域.png)

### 5.7  获取ServletContext：

使用方法`ServletContext getServletContext()`

[点击链接](###6.6   ServletContext)

### 5.8 登录案例

```
案例要求

1.编写login. html登录页面
		username & password 两个输入框
2.在Servlet中获取用户输入的值，并将其封装为一个对象
3.使用数据库连接技术,操作mysql中servlet数据库中user表(用PreparedStatement对象)
4.登录成功跳转到success.html展示:登录成功!
5.登录失败跳转到error.html展示:登录失败，用户名或密码错误
```

**案例分析**

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/用户登录案例.png)

**项目目录结构**

> src
>
> > dao：数据库操作的类
> >
> > domain：javaBean数据封装类
> >
> > test：测试类
> >
> > utils：工具类
> >
> > web
> >
> > >Servlet：处理请求的Servlet类



> web
>
> >WEB-INF
> >
> >>lib：存放依赖jar包
> >>
> >>web.xml：配置文件
> >
> >相关的html,jsp文件

**代码展示**

1. 封装User(Student)对象的代码

2. servlet代码

   ```java
   @WebServlet("/loginServlet")
   public class LoginServlet extends HttpServlet {
       @Override
       protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
           try {
               req.setCharacterEncoding("utf-8");
               String name = req.getParameter("name");
               String password = req.getParameter("password");
               System.out.println("获取的参数值为："+name+"\t"+password);
               //将获取的参数值封装为Studetn对象
               Student student = new Student();
               student.setName(name);
               student.setPassword(password);
               //返回登录的对象，如果没有成功登录就返回null
               Student user = UserDao.login(student);
               if(user!=null){
                   req.getRequestDispatcher("success.html").forward(req,resp);
               }else {
                   req.getRequestDispatcher("error.html").forward(req,resp);
               }
           } catch (ClassNotFoundException e) {
               e.printStackTrace();
           } catch (SQLException e) {
               e.printStackTrace();
           }
       }
   
       @Override
       protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
   
       }
   }
   ```

3. 数据库操作代码

   ```java
   public class UserDao {
       public static Student login(Student student) throws ClassNotFoundException, SQLException {
           String name = student.getName();
           String password = student.getPassword();
           //传统方式获取数据库连接对象
           Class.forName("com.mysql.cj.jdbc.Driver");
           Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/servlet?serverTimezone=UTC","root","root");
           //数据库工具类获取连接对象
   //        Connection connection = JDBCUtils.getConnection();
           String sql = "select * from user where name = ? and password = ?";
           PreparedStatement preparedStatement = connection.prepareStatement(sql);
           preparedStatement.setString(1,name);
           preparedStatement.setString(2,password);
           ResultSet resultSet = preparedStatement.executeQuery();
   
           if(resultSet.next()){
               resultSet.close();
               preparedStatement.close();
               connection.close();
               return student;
           }else
           {
               resultSet.close();
               preparedStatement.close();
               connection.close();
               return null;
           }
       }
   }
   ```

**错误分析**

1. mysql的jar包位置

   在普通的java项目中，jar包位置比较随意，

   但是在javaWeb项目中，jar包文件放在WEB-INF目录下的lib目录中

2. properties配置文件的获取

   [java项目与web项目中获取当前项目下的properties文件](https://blog.csdn.net/qiukui111/article/details/104958202)

   * 一般的java项目：(放在src目录下)

     其他目录下不能这样

   ```java
    Properties pro = new Properties();
   //2.直接用文件输入流的方式
   //InputStream inStream = new FileInputStream("模块名/src/config.properties");
   //3.也可以用类加载器的方式
    InputStream is = 当前类名.class.getClassLoader().getResourceAsStream("config.properties");
   //4.加载文件(输入流)
       pro.load(is);
   
   ------------------------------------------------------------------------
     // 读取配置文件中文乱码
   -------------------------------------------------------------------
   Properties properties = new Properties();
       InputStream is = Test.class.getClassLoader().getResourceAsStream("config.properties");
   //因为properties文件默认使用GBK编码
           FileReader fr = new FileReader("文件路径")
           properties.load(fr);
   
           String name = properties.getProperty("name");
           String age = properties.getProperty("age");
           String address = properties.getProperty("address");
           System.out.println(name);
           System.out.println(age);
           System.out.println(address);
       }
   ```
   * Web项目

     

3. 关闭服务器时报错

   <font color="red">Web应用程序 [Tomcat_war_exploded] 注册了JDBC驱动程序 [com.mysql.cj.jdbc.Driver]，但在Web应用程序停止时无法注销它。 为防止内存泄漏，JDBC驱动程序已被强制取消注册。</font>

# 第六章、 Response对象

### 6.1  设置响应消息

1. 设置响应行

  格式：HTTP/1.1 200 ok

  设置状态码：`setStatus(int sc) `
2. 设置响应头：`setHeader(String name, String value) `
	
3. 设置响应体：
  * 获取输出流
    * 字符输出流：`PrintWriter getWriter()`

    * 字节输出流：`ServletOutputStream getOutputStream()`
    
  * 使用输出流，将数据输出到客户端浏览器

### 6.2  重定向

重定向：资源跳转的方式

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/重定向.png)

1. 方法一

   ```java
   //1. 设置状态码为302
         response.setStatus(302);
   //2.设置响应头location
         response.setHeader("location","/day15/responseDemo2");
   ```

2. 方法二

   ```java
    //简单的重定向方法
   response.sendRedirect("/day15/responseDemo2");
   ```

### 6.3  **重定向和请求转发的比较**

重定向的特点:redirect

1. 地址栏发生变化
2. 重定向可以访问其他站点(服务器)的资源
3. 重定向是两次请求。不能使用request对象来共享数据

转发的特点：forward
1. 转发地址栏路径不变
2. 转发只能访问当前服务器下的资源
3. 转发是一次请求，可以使用request对象来共享数据

### 6.4  **资源的路径（URI）问题**

==这里讨论的是web资源的相对和绝对路径，和java或html中的不太相同==

路径分类

1. 相对路径：通过相对路径不可以确定唯一资源
   * 如：`./index.html`  ==以./开头路径==	
   * 规则：找到当前资源和目标资源之间的相对位置关系
		* `./`当前目录(可省略)
		* `../`后退一级目录
2. 绝对路径：通过绝对路径可以确定唯一资源（推荐使用）
	* 如：`http://localhost/day15/responseDemo2`  ==以http开头的路径==
		  或者: `/day15/responseDemo2`  ==以/开头的路径==
	* 规则：判断定义的路径是给谁用的？判断请求将来从哪儿发出
		* 给客户端浏览器使用：需要加虚拟目录(项目的访问路径)
				建议虚拟目录动态获取：request.getContextPath()
				举例：\<a> , \<form>  重定向...
		* 给服务器使用：不需要加虚拟目录
				举例：请求转发

```
总结:
用相对路径可以使用所有场景，但是找资源之间相对位置关系比较麻烦。
绝对路径需要先确定，再决定是否使用项目虚拟路径。
```

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/重定向和请求转发的路径分析图2.png)

### 6.5    获取输出流对象

服务器向界面输出内容，输出的内容都被浏览器解析。（可识别html标签）

* 字符输出流：`PrintWriter getWriter()`

  ==中文乱码问题：==需要在获取输出流对象之前设置流对象和浏览器的编码`response.setContentType("text/html;charset=utf-8");`

  ```java
  // response.setCharacterEncoding("utf-8");
  //告诉浏览器，服务器发送的消息体数据的编码。建议浏览器使用该编码解码
  //response.setHeader("content-type","text/html;charset=utf-8");
  
  //简单的形式，设置编码
  response.setContentType("text/html;charset=utf-8");
  
  //1.获取字符输出流
  PrintWriter pw = response.getWriter();
  //2.输出数据
  //pw.write("<h1>hello response</h1>");
  pw.write("你好啊啊啊 response");
  ```
  
* 字节输出流：`ServletOutputStream getOutputStream()`

  字节输入流对象没有写入字符串的方法，所以要将字符串转换为指定格式的字符数组。

  ```java
  response.setContentType("text/html;charset=utf-8");
  
  //1.获取字节输出流
  ServletOutputStream sos = response.getOutputStream();
  //2.输出数据
  sos.write("你好".getBytes("utf-8"));
  ```

### 6.6   ServletContext

概念：代表整个web应用，可以和程序的容器(服务器)来通信

**获取：**
   方式1. 通过request对象获取
   			`request.getServletContext();`
   方式2. 通过HttpServlet获取(静态方法)
				` this.getServletContext();`

**ServletContext功能：**

   1. 获取MIME类型：
      *MIME类型:在互联网通信过程中定义的一种文件数据类型
        *格式： 大类型/小类型   text/html		image/jpeg
      *获取：String getMimeType(String file)  

   2. 域对象：共享数据
      1. `setAttribute(String name,Object value)`
      2. `getAttribute(String name)`
      3. `removeAttribute(String name)`
      ==ServletContext对象范围：所有用户所有请求的数据==

   3. 获取文件的真实(服务器)路径
      方法：`String getRealPath(String path)` 
      
      其就相当于web文件夹的路径。不同文件下的写法不同

```java
String b = context.getRealPath("/b.txt");//web目录下资源访问
System.out.println(b);
String c = context.getRealPath("/WEB-INF/c.txt");//WEB-INF目录下的资源访问
System.out.println(c);
String a = context.getRealPath("/WEB-INF/classes/a.txt");//src目录下的资源
System.out.println(a);
//输出如下
E:\JavaSource\WEB综合\out\artifacts\Tomcat_war_exploded\a.txt
E:\JavaSource\WEB综合\out\artifacts\Tomcat_war_exploded\WEB-INF\b.txt
E:\JavaSource\WEB综合\out\artifacts\Tomcat_war_exploded\WEB-INF\classes\ceshi.properties
```

### 6.7  文件下载案例



# 第七章、Cookie

==前言：==

```
会话技术
1. 会话：一次会话中包含多次请求和响应。
	 一次会话：浏览器第一次给服务器资源发送请求，会话建立，直到有一方断开为止
2. 功能：在一次会话的范围内的多次请求间，共享数据
3. 方式：
	1. 客户端会话技术：Cookie
	2. 服务器端会话技术：Session
```

概念：客户端会话技术，将数据保存到客户端

### 7.1  快速入门：使用步骤：

1. 创建Cookie对象，绑定数据

  `new Cookie(String name, String value) `
2. 发送Cookie对象

  `response.addCookie(Cookie cookie) `
3. 获取Cookie，拿到数据

  `Cookie[]  request.getCookies()`

```java
@WebServlet("/cookieDemo1")
public class CookieDemo1 extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doGet(request,response);
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Cookie cookie = new Cookie("data","数据");
        response.addCookie(cookie);
    }
}

@WebServlet("/cookieDemo2")
public class CookieDemo2 extends HttpServlet {
    	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request,response);
    }
==========================================
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //获取Cookie
        Cookie[] cookies = request.getCookies();
        //遍历Cookie
        if(cookies!=null){
            for (Cookie c : cookies) {
                String name = c.getName();
                String value = c.getValue();
                System.out.println(name+"----->"+value);
            }
        }
    }
}
```

### 7.2  cookie原理

基于响应头set-cookie

请求头cookie实现

![cookie原理](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/cookie原理.png)

### 7.3  cookie的细节

1. 一次可不可以发送多个cookie?
	* 可以
	* 可以创建多个Cookie对象，使用response调用多次addCookie方法发送cookie即可。
	
2. cookie在浏览器中保存多长时间？

  默认情况下，当浏览器关闭后，Cookie数据被销毁

  持久化存储：
  * `setMaxAge(int seconds)`
  	1. 正数：将Cookie数据写到硬盘的文件中。持久化存储。并指定cookie存活时间==(单位是秒)==，时间到后，cookie文件自动失效
  	2. 负数：默认值
  	3. 零：删除cookie信息

3. cookie能不能存中文？
	* 在tomcat 8 之前 cookie中不能直接存储中文数据。
		* 需要将中文数据转码，一般采用URL编码(%E3)
	* ==在tomcat 8 之后==，cookie支持中文数据。特殊字符还是不支持，建议使用URL编码存储，URL解码解析
	
4. cookie共享问题？

  | 共享域                                                       | Cookie的方法           | 说明                                                         |
  | ------------------------------------------------------------ | ---------------------- | ------------------------------------------------------------ |
  | 假设在一个tomcat服务器中，部署了多个web项目，那么在这些web项目中cookie能不能共享？默认情况下cookie不能共享 | setPath(String path)   | 如果要共享，则可以将path设置为"/",表示只要URL为`域名:端口号/`就可以共享数据 |
  | 不同的tomcat服务器间cookie共享问题？默认是不能共享           | setDomain(String path) | 如果设置一级域名相同，那么多个服务器之间cookie可以共享。setDomain(".baidu.com"),那么tieba.baidu.com和news.baidu.com中cookie可以共享 |

### 7.4  Cookie的特点和作用

cookie存储数据在客户端浏览器

浏览器对于单个cookie 的大小有限制(4kb) 以及 对同一个域名下的总cookie数量也有限制(20个)

作用：
1. cookie一般用于存出少量的不太敏感的数据
2. 在不登录的情况下，完成服务器对客户端的身份识别

### 7.5  案例（显示上次登录的时间）

```java
/**
 * 案例需求：
 *     1. 访问一个Servlet，如果是第一次访问，则提示：您好，欢迎您首次访问。
 *     2. 如果不是第一次访问，则提示：欢迎回来，您上次访问时间为:显示时间字符串
 */
@WebServlet("/cookieTest")
public class CookieTest extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request,response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        Cookie[] cookies = request.getCookies();
        boolean flag=false;//是否存在之前的cookie
        response.setContentType("text/html;charset=utf-8");
        if(cookies!=null&&cookies.length>0){
            //遍历cookie
            for (Cookie c : cookies) {
                String name = c.getName();
                //找到了lastTime的cookie，说明不是第一次访问
                if("lastTime".equals(name)){
                    //置flag为true
                    flag=true;
                    String value = c.getValue();
                    response.getWriter().write("<font size='15px'>欢迎回来，您上次访问时间为：</font>"+value);
                    //接下来重新设置该cookie
                    Date date = new Date();
                    SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日 HH:mm:ss");
                    String datetime = sdf.format(date);//这里获取的时间里有空格，不能放在Cookie的value中
                    datetime = datetime.replaceAll(" ", "");//消除dateTime中的空格
                    System.out.println(datetime);
                    c.setValue(datetime);//重新对value赋值
                    c.setMaxAge(30*24*60*60);//cookie保存一个月
                    response.addCookie(c);
                }

            }
        }
        //找不到lastTime的cookie
        if(cookies==null||flag==false){
            response.getWriter().write("<font color='red' size='15px'>您好，欢迎首次访问<font>");
            //接着首次向客户端发送一个cookie
            Date date = new Date();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日 HH:mm:ss");
            String datetime = sdf.format(date);//这里获取的时间里有空格，不能放在Cookie的value中
            datetime = datetime.replaceAll(" ", "");//消除dateTime中的空格
            System.out.println(datetime);

            Cookie cookie = new Cookie("lastTime",datetime);
            cookie.setMaxAge(30*24*60*60);//cookie保存一个月
            response.addCookie(cookie);

        }


    }
}
```

# 第八章、 Session

概念：服务器端会话技术，在一次会话的多次请求间共享数据，将数据保存在服务器端的对象中。HttpSession

### 8.1  快速入门：

1. 获取HttpSession对象：
	`HttpSession session = request.getSession();`
2. 使用HttpSession对象：
	`void setAttribute(String name, Object value)`
	
	`Object getAttribute(String name)  `
	`void removeAttribute(String name)  ` -------->删除指定名的域数据

### 8.2  原理

Session的实现是依赖于Cookie的。

第一次获取Session时，服务器会自动创建一个Cookie对象，用来保存Session的id信息

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/Session原理.png)

###  8.3  Session细节：

 1. 当客户端关闭后，服务器不关闭，两次获取session是否为同一个？
       默认情况下。不是。

       如果需要相同，则可以创建Cookie,键为JSESSIONID，设置最大存活时间，让cookie持久化保存。

        ```
        Cookie c = new Cookie("JSESSIONID",session.getId());
        c.setMaxAge(60*60);
        response.addCookie(c);
        ```

	2. 客户端不关闭，服务器关闭（==注意是正常关闭==）后，两次获取的session是同一个吗？

       ==不是同一个==，但是要确保数据不丢失。tomcat自动完成以下工作

       ```
       * session的钝化：
         在服务器正常关闭之前，将session对象系列化到硬盘上
       * session的活化：
         在服务器启动后，将session文件转化为内存中的session对象即可。
       ```

       ==说明==

       * tomcat会自动完成钝化和活化的操作

         当tomcat正常关闭前，它会将Session对象相关信息在work文件夹中存储，下次启动服务器时再自动读取。

       * IDEA中不会

3. Session什么时候被销毁？

  * 服务器关闭

  * session对象调用invalidate() 。

  * session默认失效时间 30分钟
    选择性配置修改。可以在tomcat目录下的web.xml配置，也可以在项目的web.xml中配置	

  ```xml
  <session-config>
        <session-timeout>30</session-timeout>
  </session-config>
  ```

  ### 8.4  session的特点

  session用于存储一次会话的多次请求的数据，存在服务器端

  session可以存储任意类型，任意大小的数据

  **session与Cookie的区别：**

  ```
  session存储数据在服务器端，Cookie在客户端
  session没有数据大小限制，Cookie有
  session数据安全，Cookie相对于不安全
  ```

# 第九章、Jsp

### 9.1  概述

Java Server Pages： java服务器端页面

可以理解为：一个特殊的页面，其中既可以指定定义html标签，又可以定义java代码

==当修改内容时，它需要重启服务器就能生效吗？==

### 9.2  jsp原理

	* JSP本质上就是一个Servlet
	* 每次访问一个jsp生成的.java和.class文件会保存在配置目录下的work文件夹中

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/JSP原理.png)

### 9.3  jsp的脚本：

JSP定义Java代码的方式

1. `<%  代码 %>`：定义的java代码，在service方法中。service方法中可以定义什么，该脚本中就可以定义什么。
2. `<%! 代码 %>`：定义的java代码，在jsp转换后的java类的成员位置。
3. `<%= 代码 %>`：定义的java代码，会输出到页面上。输出语句中可以定义什么，该脚本中就可以定义什么。

==jsp界面中的代码截断式写法==

这里的`<h1>temp的值为<%=temp%></h1>`会被当做for循环中的内容 ，执行10次

```jsp
<%
    int temp = 100;
    for (int i = 0; i <=10 ; i++) {
        System.out.println(i);
%>
<h1>temp的值为<%=temp%></h1>
<%
    }
%>
```

### 9.4 jsp指令

指令
* 作用：用于配置JSP页面，导入资源文件
* 格式：
	`<%@ 指令名称 属性名1=属性值1 属性名2=属性值2 ... %>`

指令的分类：

1. page ： 用来配置JSP页面

  | 属性        | 描述                                                | 备注                                                         |
  | ----------- | --------------------------------------------------- | ------------------------------------------------------------ |
  | buffer      | 指定out对象使用缓冲区的大小                         | 默认是8kb                                                    |
  | contentType | 等同于response.setContentType()                     | 1、设置响应体的mime类型以及字符集 <br />2、设置当前jsp页面的编码（只能是高级的IDE才能生效，如果使用低级工具，则需要设置pageEncoding属性设置当前页面的字符集） |
  | language    | 定义JSP页面所用的脚本语言，默认是Java               | 只能拿是java,不能是其他值                                    |
  | import      | 导入jsp中java代码所需要的包                         |                                                              |
  | errorPage   | 指定当前界面发生异常时，跳转到哪里（路径）          | 无论指定跳转的jsp界面isErrorPage是否为true，都会跳转         |
  | isErrorPage | 指定当前页面是否可以作为另一个JSP页面的错误处理页面 | true：是，可以使用内置对象`exception` <br />false：否。默认值。不可以使用内置对象`exception` |

2. include	： 页面包含的。导入页面的资源文件

   `<%@include file="top.jsp"%>`

   ==注意==

   在jsp中不能使用没有包名 的类。<u>如src下的User类</u>

3. taglib	： 导入资源

   `<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>`

   prefix：前缀，自定义的

### 9.5  jsp注释:

   1. html注释：

      ==\<!-- -->== : 只能注释html代码片段

   2. jsp注释：推荐使用
      ==<%-- --%>==：可以注释所有

### 9.6  jsp的九大内置对象：

​	 在jsp页面中不需要获取和创建，可以直接使用的对象
​	 jsp一共有9个内置对象。

| 对象        | 描述                                                         |
| ----------- | ------------------------------------------------------------ |
| request     | **HttpServletRequest** 接口的实例                            |
| response    | **HttpServletResponse** 接口的实例                           |
| out         | **JspWriter**类的实例，用于把结果输出至网页上                |
| session     | **HttpSession**类的实例                                      |
| application | **ServletContext**类的实例（服务器容器对象），与应用上下文有关 |
| config      | **ServletConfig**类的实例。                                  |
| pageContext | **PageContext**类的实例。==可以获取其他八个内置对象==，设置域对象的值 |
| page        | 当前jsp表示的Servlet相当于this关键字                         |
| exception   | **Exception**类的对象，代表发生错误的JSP页面中对应的异常对象 |

==四个域对象：==范围从小到大：

```
pageContext（本文档内）
request（一次请求间）
session（一次会话的多个请求)
application（服务器，所有的用户共享数据）
```

==response.getWriter()和out.write()的区别：==

* 在tomcat服务器真正给客户端做出响应之前，会先找response缓冲区数据，再找out缓冲区数据。 
* response.getWriter()数据输出永远在out.write()之前

### 9.7  EL

概念：Expression Language 表达式语言

作用：替换和简化jsp页面中java代码的编写

语法：`${表达式}`

==注意：==

```
jsp默认支持el表达式的。如果要忽略el表达式
1. 设置jsp中page指令中：isELIgnored="true" 忽略当前jsp页面中所有的el表达式
2. \${表达式} ：忽略当前这个el表达式
```

**运算：**

 1. 算数运算符： + - * /(div) %(mod)
 2. 比较运算符： > < >= <= == !=
 3. 逻辑运算符： &&(and) ||(or) !(not)
 4. 空运算符： `empty`
    * 功能：用于判断字符串、集合、数组对象是否为null或者长度是否为0
    * `${empty list}`:判断字符串、集合、数组对象是否为null或者长度为0
    * `${not empty str}`:表示判断字符串、集合、数组对象是否不为null 并且 长度>0

**获取值**

   1. el表达式只能从域对象中获取值

   2. 语法：

      `${域名称.键名}`：从指定域中获取指定键的值

      域名称：

      ```
      1. pageScope		--> pageContext
      2. requestScope 	--> request
      3. sessionScope 	--> session
      4. applicationScope --> application（ServletContext）
      
      * 举例：在request域中存储了name=张三
      * 获取：${requestScope.name}
      ```

      `${键名}`：表示依次从最小的域中查找是否有该键对应的值，直到找到为止。

**获取对象、List集合、Map集合中的值**

1. 对象：`${域名称.键名.属性名}`
     * ==本质上会去调用对象的getter方法，==
     * 属性名就是get方法的==方法名去掉get然后将首字母小写==
   
2.  List集合：`${域名称.键名[索引号]}`

3. Map集合：
	* `${域名称.键名.key名称}`
	* `${域名称.键名["key名称"]}`

**EL的隐式对象**

EL中有11个隐式对象。这里只介绍`pageContext`

==在jsp页面动态获取虚拟目录==

​    ${pageContext.request.contextPath}

```jsp
${pageContext.request.contextPath}相当于执了：
	pageContext.getRequest().getContextPath();
	
===举例(获取项目中的css文件链接)
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/login.css">
```

**EL代码演示：**

```jsp
<%
    String str = "";
    request.setAttribute("str",str);

    List list = new ArrayList();
    request.setAttribute("list",list);

%>
<h3>算数运算符</h3>
    ${3 + 4}<br>
    ${3 / 4}<br>
    ${3 mod 4}<br>
<h3>比较运算符</h3>
    ${3 == 4}<br>

<h3>逻辑运算符</h3>
    ${3 > 4  && 3 < 4}<br>
    ${3 > 4  and 3 < 4}<br>
    ${not empty str}
=================
<%
    //在域中存储数据
    session.setAttribute("name","李四");

    request.setAttribute("name","张三");
    session.setAttribute("age","23");

    request.setAttribute("str","");

%>
<h3>el获取值</h3>
${requestScope.name}
${sessionScope.age}
${name}
===================
<%
        User user = new User();
        user.setName("张三");
        user.setAge(23);
        user.setBirthday(new Date());

        request.setAttribute("u",user);

        List list = new ArrayList();
        list.add("aaa");
        list.add("bbb");
        list.add(user);

        request.setAttribute("list",list);

        Map map = new HashMap();
        map.put("sname","李四");
        map.put("gender","男");
        map.put("user",user);

        request.setAttribute("map",map);
    %>

<h3>el获取对象中的值</h3>
	${requestScope.u}<br>
<%--
    * 通过的是对象的属性来获取
        * setter或getter方法，去掉set或get，在将剩余部分，首字母变为小写。
        * setName --> Name --> name
--%>
    ${requestScope.u.name}<br>
    ${u.age}<br>
    ${u.birthday}<br>
    ${u.birthday.month}<br>

    ${u.birStr}<br>

<h3>el获取List值</h3>
<!--超出长度的索引不会报错，界面上也没有数据显示-->
    ${list}<br>
    ${list[0]}<br>
    ${list[1]}<br>
    ${list[10]}<br>
    ${list[2].name}


<h3>el获取Map值</h3>
    ${map.gender}<br>
    ${map["gender"]}<br>
    ${map.user.name}
```

### 9.8  JSTL

教程-->：[jsp标准标签库](https://www.runoob.com/jsp/jsp-jstl.html)

概念：JavaServer Pages Tag Library  JSP标准标签库
* 是由Apache组织提供的开源的免费的jsp标签		<标签>

```
使用前需要：
	导入jstl相关jar包
	引入标签库：taglib指令：  <%@ taglib %>
```

**c:if 标签**

​	if:相当于java代码的if语句
​	属性：
​		test 必须属性，接受boolean表达式

​		如果表达式为true，则显示if标签体内容，如果为false，则不显示标签体内容

​	==注意：==

​	一般情况下，test属性值会结合el表达式一起使用

​	c:if标签没有else情况，想要else情况，则可以再定义一个c:if标签

**c:choose标签**

​	choose:相当于java代码的switch语句
  		1. 使用choose标签声明         			相当于switch声明
  		2. 使用when标签做判断         			相当于case，需要判断的的内容用test属性
  		3. 使用otherwise标签做其他情况的声明    	相当于defaul

**c:forEach标签**

foreach:相当于java代码的for语句和foreach语句

1. 完成重复的操作

	* 属性：
	    begin：开始值
	    end：结束值
	    var：临时变量
	    step：步长
	    varStatus:循环状态对象
	        index:容器中元素的索引，从0开始
	        count:循环次数，从1开始
	
2. 遍历容器

   属性：
       items:容器对象
       var:容器中元素的临时变量
       varStatus:循环状态对象
           index:容器中元素的索引，从0开始
           count:循环次数，从1开始

```jsp
===================  c:if
<%
    List list = new ArrayList();
    list.add("aaaa");

    request.setAttribute("list",list);
    request.setAttribute("number",4);
%>
<c:if test="${number % 2 != 0}">
        ${number}为奇数
</c:if>

<c:if test="${number % 2 == 0}">
    ${number}为偶数
</c:if>

=================== C:choose
<%
    request.setAttribute("number",5);
%>
<c:choose>
    <c:when test="${number == 1}">星期一</c:when>
    <c:when test="${number == 2}">星期二</c:when>
    <c:when test="${number == 3}">星期三</c:when>
    <c:when test="${number == 4}">星期四</c:when>
    <c:when test="${number == 5}">星期五</c:when>
    <c:when test="${number == 6}">星期六</c:when>
    <c:when test="${number == 7}">星期天</c:when>
    <c:otherwise>数字输入有误</c:otherwise>
</c:choose>
===================c:forEach
<%--这里循环输出1，3，5，7，9--%>
<c:forEach begin="1" end="10" var="i" step="2" varStatus="s">
    ${i} <br>
</c:forEach>

    <%
        List list = new ArrayList();
        list.add("aaa");
        list.add("bbb");
        list.add("ccc");
        request.setAttribute("list",list);
    %>

    <c:forEach items="${list}" var="str" varStatus="s">
            ${s.index} ${s.count} ${str}<br>
    </c:forEach>
```



# 第十章、MVC和三层架构

### 10.1  MVC开发模式

 1. M：Model，模型。JavaBean
       完成具体的业务操作，如：查询数据库，封装对象

 2. V：View，视图。JSP

       展示数据

3. C：Controller，控制器。Servlet

   获取用户的输入

   调用模型

   将数据交给视图进行展示

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/MVC开发模式.png)

### 10.2 三层架构

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/三层架构.png)

# 案例  

### 案例需求

```
完成用户数据的增删改查
```

### 设计：

```

	1. 技术选型：Servlet+JSP+MySQL+JDBCTempleat+Duird+BeanUtilS+tomcat
	2. 数据库设计：
		create database day17; -- 创建数据库
		use day17; 			   -- 使用数据库
		create table user(   -- 创建表
			id int primary key auto_increment,
			name varchar(20) not null,
			gender varchar(5),
			age int,
			address varchar(32),
			qq	varchar(20),
			email varchar(50)
		);

3. 开发：
	1. 环境搭建
		1. 创建数据库环境
		2. 创建项目，导入需要的jar包

	2. 编码
```

### 分析

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/CRUD_列表分析.png)

### 项目目录结构

<img src="https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/CRUD项目目录结构.png" style="zoom:80%;" />

# 第十一章、Filter

### 11.1  概念：

 web中的过滤器：当访问服务器的资源时，过滤器可以将请求拦截下来，完成一些特殊的功能。

### 11.2  过滤器的作用：

一般用于完成通用的操作。如：登录验证、统一编码处理、敏感字符过滤...

### 11.3  快速入门步骤：

定义一个类，实现接口Filter

复写方法

配置拦截路径（注意是拦截路径不是访问路径）
1. web.xml

   同servlet类似。

2. 注解（@WebFilter）

```java
@WebFilter("/hello.html")
public class Filter1 implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        System.out.println("访问了Filter1.....");
        filterChain.doFilter(servletRequest,servletResponse);
    }
    @Override
    public void destroy() {

    }
}
```

### 11.4  过滤器执行流程

执行过滤器
执行放行后的资源
回来执行过滤器放行代码下边的代码

### 11.5 过滤器生命周期

| 方法        |                             描述                             |
| :---------- | :----------------------------------------------------------: |
| init(  )    | 在服务器启动后，会创建Filter对象，然后调用init方法。只执行一次。用于加载资源 |
| doFilter( ) |     每一次请求被拦截资源时或响应返回时，会执行。执行多次     |
| destroy(  ) | :在服务器关闭后，Filter对象被销毁。如果服务器是正常关闭，则会执行destroy方法。只执行一次。用于释放资源 |

### 11.6  过滤器的配置详解

**拦截路径配置**

1. 具体资源路径： `/index.jsp`   只有访问index.jsp资源时，过滤器才会被执行

2. 拦截目录：`/user/*`	访问/user下的所有资源时，过滤器都会被执行

3. 后缀名拦截：` *.jsp`		访问所有后缀名为jsp资源时，过滤器都会被执行

4. 拦截所有资源：`/*	`	访问所有资源时，过滤器都会被执行

   ```java
   //@WebFilter("/index.jsp")  :拦截具体资源路径： /index.jsp   只有访问index.jsp资源时，过滤器才会被执行
   //@WebFilter("/user/*")     :拦截目录： /user/*	访问/user下的所有资源时，过滤器都会被执行
   //@WebFilter("*.jsp")       :后缀名拦截： *.jsp		访问所有后缀名为jsp资源时，过滤器都会被执行
   ```
   
   ==说明：==
   
   注意是否要加斜线。
   
   @WebFilter配置的拦截路径是value的值。这里value省略。

**拦截方式配置：资源被访问的方式**

1. 注解配置：
   设置dispatcherTypes属性

   `DispatcherType.REQUEST`：默认值。浏览器直接请求资源
   `DispatcherType.FORWARD`：转发访问资源
   `DispatcherType.INCLUDE`：包含访问资源
   `DispatcherType.ERROR`：错误跳转资源
   `DispatcherType.ASYNC`：异步访问资源

   ==注意：dispatcher属性是一个数组，可以通过数组的形式为其设置拦截方式==

   ```
   @WebFilter(value="/*",dispatcherTypes = {DispatcherType.REQUEST,DispatcherType.FORWARD})
   ```

2. web.xml配置

   在\<filter-mapping>标签中设置\<dispatcher>\</dispatcher>标签即可


### 11.7  过滤器链(配置多个过滤器)

**执行顺序**：如果一个请求会经过两个过滤器：过滤器1和过滤器2

```java
*过滤器1
*过滤器2
*资源执行
*过滤器2
*过滤器1 
//递归的循序执行
```

**过滤器先后顺序问题：**

1. 注解配置：按照类名的字符串比较规则比较，值小的先执行
   如：AFilter 和 BFilter，AFilter就先执行了。
2. web.xml配置： <filter-mapping>谁定义在上边，谁先执行

### 11.8  Filter案例

1. 登录案例验证

   用户必须登录才能访问关于数据增删的界面，否则就跳转到登录界面先登录。

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/Filter登录验证.png)

​	Servlet代码

```java
@WebServlet("/loginServlet")
public class LoginServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request,response);

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        System.out.println(username+"-------"+password);
        //如果登录信息正确就存储一个Session
        if("tom".equals(username)&&"123456".equals(password)){
            System.out.println("登录成功");
            HttpSession session = request.getSession();
            User u = new User();
            u.setName(username);
            u.setAge(18);
            session.setAttribute("user",u);//将用户信息存储到Session域中
            request.getRequestDispatcher("/index.jsp").forward(request,response);


        }
        //如果登录信息错误，就提示返回登录界面
        else{
            System.out.println("登录失败！");
            response.setContentType("text/html;charset=utf-8");
            response.getWriter().write("你输入的用户不存在。点击返回<a href='/checkstatus/login.jsp'>登录页面</a>");
        }
    }
}
```

​	Filter代码

```java
public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws ServletException, IOException {
    HttpServletRequest request = (HttpServletRequest) req;
    String requestURI = request.getRequestURI();
    System.out.println("请求路径是："+requestURI);
    //如果是登录相关的资源，就放行
    if(requestURI.contains("/loginServlet")||requestURI.contains("/index.jsp")||requestURI.contains("/login.jsp")||requestURI.contains("/css")||requestURI.contains("/img")){
        chain.doFilter(req,resp);
    }
    //否则就拦截
    else{
        Object user = request.getSession().getAttribute("user");
        //判断是否登录了
        if(user!=null){
            chain.doFilter(req,resp);
        }
        else{
            request.getRequestDispatcher("/login.jsp").forward(req,resp);//没有登录就跳转到login.jsp
        }
    }

}
```

2. 敏感词汇过滤
   需求：

   ```
   对day17_case案例录入的数据进行敏感词汇过滤
   敏感词汇参考《敏感词汇.txt》
   如果是敏感词汇，替换为 *** 
   ```

   分析:

   ```
   对request对象进行增强。增强获取参数相关方法
   放行。传递代理对象
   ```

   对象增强：这里用动态代理的设计模式

   ==动态代理==

   相关文章连接：https://zhuanlan.zhihu.com/p/42516717

   ```
   概念：
   	真实对象：被代理的对象
   	代理对象：
   	代理模式：代理对象代理真实对象，达到增强真实对象功能的目的
   实现方式：
   	静态代理：有一个类文件描述代理模式
   	动态代理：##在内存中形成代理类
   实现步骤：
   	1.##代理对象和真实对象实现相同的接口
   	2.代理对象 = Proxy.newProxyInstance();
   	3.使用代理对象调用方法。
   	4.增强方法
   增强方式：
   	增强参数列表
   	增强返回值类型
   	增强方法体执行逻辑
   ```

   动态代理的代码案例

   ```java
   ===================================功能接口
   public interface SaleComputer {
       public String sale(double money);
       public void show();
   }
   ====================================真实类（被代理的类）
   /**
    * 真实类
    */
   public class Lenovo implements SaleComputer {
       @Override
       public String sale(double money) {
           System.out.println("花了"+money+"元买了一台联想电脑...");
           return "联想电脑";
       }
   
       @Override
       public void show() {
           System.out.println("展示电脑....");
       }
   }   
   ===========================代理测试（这里proxy_lenovo就是代理Lenovo的类）
   public class ProxyTest {
   
       public static void main(String[] args) {
           //1.创建真实对象
           Lenovo lenovo = new Lenovo();
           
           //2.动态代理增强lenovo对象
           /*
               三个参数：
                   1. 类加载器：真实对象.getClass().getClassLoader()
                   2. 接口数组：真实对象.getClass().getInterfaces()为了保证代理对象和被代理对象实现了相同的接口
                   3. 处理器：new InvocationHandler()
            */
           SaleComputer proxy_lenovo = (SaleComputer) Proxy.newProxyInstance(lenovo.getClass().getClassLoader(), lenovo.getClass().getInterfaces(), new InvocationHandler() {
   
           /*
             代理逻辑编写的方法：代理对象调用的所有方法都会触发该方法执行
                 参数：
                    1. proxy:代理对象
                    2. method：method：对应实现接口的Method对象 。
                       proxyLenovo.sale(3000);这里就是对应接口的public abstract java.lang.String JDK动态代理.saleComputer.sale(double)
                    3. args:代理对象调用的方法时，传递的实际参数
            */
            @Override
            public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
         /*System.out.println("该方法执行了....");
                   System.out.println(method.getName());
                   System.out.println(args[0]);
   		*/
                   //判断是否是sale方法
                   if(method.getName().equals("sale")){
                       //1.增强参数
                       double money = (double) args[0];
                       money = money * 0.85;
                       System.out.println("专车接你....");
                       //使用真实对象调用该方法
                       String obj = (String) method.invoke(lenovo, money);
                       System.out.println("免费送货...");
                       //2.增强返回值
                       return obj+"_鼠标垫";
                   }else{
                       Object obj = method.invoke(lenovo, args);
                       return obj;
                   }
               }
           });
   
           //3.调用方法
          /* String computer = proxy_lenovo.sale(8000);
           System.out.println(computer);*/
   
           proxy_lenovo.show();
       }
   }   
   ```
   
   敏感词汇过滤代码
   
   ```java
   @WebFilter("/*")
   public class SensitiveWordsFilter implements Filter {
   
   
       public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws ServletException, IOException {
           //1.创建代理对象，增强getParameter方法
   
           ServletRequest proxy_req = (ServletRequest) Proxy.newProxyInstance(req.getClass().getClassLoader(), req.getClass().getInterfaces(), new InvocationHandler() {
               @Override
               public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                   //增强getParameter方法
                   //判断是否是getParameter方法
                   if(method.getName().equals("getParameter")){
                       //增强返回值
                       //获取返回值
                       String value = (String) method.invoke(req,args);
                       if(value != null){
                           for (String str : list) {
                               if(value.contains(str)){
                                   value = value.replaceAll(str,"***");
                               }
                           }
                       }
                       
                       return  value;
                   }
   
                   //判断方法名是否是 getParameterMap
   
                   //判断方法名是否是 getParameterValue
   
                   return method.invoke(req,args);
               }
           });
   
           //2.放行
           chain.doFilter(proxy_req, resp);
   }
   ```

# 第十二章、Listener

概念：web的三大组件之一。

事件监听机制
* 事件	：一件事情
* 事件源 ：事件发生的地方
* 监听器 ：一个对象
* 注册监听：将事件、事件源、监听器绑定在一起。 当事件源上发生某个事件后，执行监听器代码

### **ServletContextListener:**

监听ServletContext对象的创建和销毁

* 方法：

  `void contextDestroyed(ServletContextEvent sce)` ：ServletContext对象被销毁之前会调用该方法

  `void contextInitialized(ServletContextEvent sce) `：ServletContext对象创建后会调用该方法
* 步骤：
	1. 定义一个类，实现ServletContextListener接口
	2. 复写方法
	3. 配置
		1. web.xml
		
		      ```
		      <listener>			 
		      	<listener-class>
		      		cn.itcast.web.listener.ContextLoaderListener
		      	</listener-class>
		      </listener>
		      
		      * 指定初始化参数<context-param>
		      ```
		
		2. 注解
		
		      @WebListener

```java
@WebListener
public class ContextLoaderListener implements ServletContextListener {

    /**
     * 监听ServletContext对象创建的。ServletContext对象服务器启动后自动创建。
     *
     * 在服务器启动后自动调用
     * @param servletContextEvent
     */
    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {
        //加载资源文件
        //1.获取ServletContext对象
        ServletContext servletContext = servletContextEvent.getServletContext();

        //2.加载资源文件
        String contextConfigLocation = servletContext.getInitParameter("contextConfigLocation");

        //3.获取真实路径
        String realPath = servletContext.getRealPath(contextConfigLocation);

        //4.加载进内存
        try{
            FileInputStream fis = new FileInputStream(realPath);
            System.out.println(fis);
        }catch (Exception e){
            e.printStackTrace();
        }
        System.out.println("ServletContext对象被创建了。。。");
    }

    /**
     * 在服务器关闭后，ServletContext对象被销毁。当服务器正常关闭后该方法被调用
     * @param servletContextEvent
     */
    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {
        System.out.println("ServletContext对象被销毁了。。。");
    }
}
```

