# 第一章  Spring相关问题







# 第二章、SpringMVC相关问题

### 2.1 SpringMVC中静态资源(html,css,js,png等)无法找到问题

（No mapping found for HTTP request with URI）

**问题分析：**

配置上分析，如此配置会把所有的请求都会进行拦截，交给spring去处理。而spring所有请求的URL都是在controller中使用注解@RequestMapping标明，所以这样的情况下访问静态资源是访问不到的。

**解决办法:**https://blog.csdn.net/jdjdndhj/article/details/54907891



### 2.2 通过Controller获取参数时

在浏览器发送的请求中，不能缺少Controller对应方法的参数。（可以多，不能少）



### 2.3  Controller中页面跳转的问题

<font color="red" >说明:</font>

InternalResourceViewResolve（内部视图解析器）

1. 默认是转发，它会把请求的字符串自动添加前后缀来当做URL
2. 如果带上`forward`  或 `redirect`,==则不再拼接前后缀==
3. 如果是重定向，那么它就不会自动拼接，直接用请求作为URL，重定向不能直接访问到WEB-INF文件夹下的资源。
4. 它们地址都是相对于contextPaht的

```java
return "testpage";             它的URI地址为： ContextPath/前缀+testpage+后缀
return "forward:/testpage";    它的URL不变，但是会转发到 ContextPath/testpage
return "redirect:/testpage";  它的URI地址为：  ContextPath/testpage
```

### NoSuchMethodError: javax.servlet.http.HttpServletResponse.getStatus()I

Spring V4.1.0+的版本在不支持Servlet3.0的应用服务器上跑时会报以下错误：

NoSuchMethodError: javax.servlet.http.HttpServletResponse.getStatus()I 
比如说：tomcat 7以下的版本、jboss 4.2.3以下的版本


解决版本有两个（任意选一个即可）：

1）、退回到Spring V4.0.7

2）、升级应用服务器到支持Servlet3的应用服务器。(比如tomcat7+（最好是tomcat8+）



