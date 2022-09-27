# Maven的问题汇总

### ☺配置文件问题

Maven安装后，用户目录下不会自动生成settings.xml，只有全局配置文件。如 果需要创建用户范围的settings.xml，可以将安装路径下的settings复制到目录${user.home}/.m2/。Maven默认的 settings.xml是一个包含了注释和例子的模板，可以快速的修改它来达到你的要求。



### ☺插件plugin和依赖dependency

​	依赖的话就相当于你用c写代码时候引用的库文件。你之所以引用这些库是因为你需要它里面的函数，需要通过这些函数构建自己的代码。所以最终你调用的库函数成为了你代码的一部分。

​	插件呢，相当于你用word写文档时候最上面工具栏里面的工具，比如你可以通过‘插入图片’工具往word里面插入一张喜欢的图片。可是插件与你的文本本身不发生任何关系。

​	回到maven，依赖中被你调用过的函数会与你的代码一起进行编译。对于插件来说呢，比如有些插件是帮助你进行编译工作的，你不用手动写javac一个个去编译。插件就相当于小程序(其实是脚本)。



### ☺resources目录

默认需要手动创建resources目录，但是需要右键: `make directory as`作为资源目录



### ☺Servlet的jar包与Tomcat中提供的冲突

当我们运行Tomcat的时候，肯定把Tomcat依赖的jar包都导入了，而`<scope>provided</scope>`的作用就是让servlet-api依赖只在编译的时候起作用，运行的时候不起作用，避免和Tomcat自带的依赖产生冲突，所以我们引入servlet-api依赖的时候可以这样写：

```xml
<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>javax.servlet-api</artifactId>
    <version>3.1.0</version>
    <scope>provided</scope>
</dependency>
```

==其他的作用域==
runtime：运行时

test：测试时



### ☺IDEA下maven新建servlet3.x/web3.x工程

[IDEA下maven新建servlet3.x/web3.x工程_孤独的小狼狗的博客-CSDN博客](https://blog.csdn.net/weixin_42604515/article/details/81170593)



### ☺web项目中java文件夹下不能新建Servlet

因为没有配置Servlet的依赖

```xml
<dependency>
	<groupId>javax.servlet</groupId>
	<artifactId>javax.servlet-api</artifactId>
	<version>3.1.0</version>
	<!--如果tomcat提供了这个jar，就使用tomcat提供的-->
	<scope>provided</scope>
</dependency>dependency>

<dependency>
      <groupId>javax.servlet.jsp</groupId>
      <artifactId>javax.servlet.jsp-api</artifactId>
      <version>2.3.3</version>
      <scope>provided</scope>
</dependency>


```

类似的：resources目录下不能创建Spring的配置文件

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>5.0.3.RELEASE</version>
</dependency>
```





