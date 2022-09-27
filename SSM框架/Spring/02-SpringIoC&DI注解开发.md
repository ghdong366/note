# 1.Spring配置数据源

### 1.1 数据源（连接池）的作用 

数据源(连接池)是提高程序性能如出现的

事先实例化数据源，初始化部分连接资源

使用连接资源时从数据源中获取

使用完毕后将连接资源归还给数据源

常见的数据源(连接池)：DBCP、C3P0、BoneCP、Druid等

**开发步骤**

①导入数据源的坐标和数据库驱动坐标

②创建数据源对象

③设置数据源的基本连接数据

④使用数据源获取连接资源和归还连接资源

### 1.2 数据源的手动创建

①导入c3p0和druid的坐标

```xml
<!-- C3P0连接池 -->
<dependency>
    <groupId>c3p0</groupId>
    <artifactId>c3p0</artifactId>
    <version>0.9.1.2</version>
</dependency>
<!-- Druid连接池 -->
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid</artifactId>
    <version>1.1.10</version>
</dependency>
```

①导入mysql数据库驱动坐标

```xml
<!-- mysql驱动 -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>5.1.39</version>
</dependency>
```

②创建C3P0连接池

```java
@Test
public void testC3P0() throws Exception {
	//创建数据源
	ComboPooledDataSource dataSource = new ComboPooledDataSource();
	//设置数据库连接参数
    dataSource.setDriverClass("com.mysql.jdbc.Driver");    	               	 dataSource.setJdbcUrl("jdbc:mysql://localhost:3306/test");
    dataSource.setUser("root");
    dataSource.setPassword("root");
	//获得连接对象
	Connection connection = dataSource.getConnection();
	System.out.println(connection);
}

```

②创建Druid连接池

```java
@Test
public void testDruid() throws Exception {
   //创建数据源
   DruidDataSource druid = new DruidDataSource();
   //设置数据库连接参数
   druid.setDriverClassName("com.mysql.cj.jdbc.Driver");
   druid.setUrl("jdbc:mysql://localhost:3306/test?serverTimezone=UTC");
   druid.setUsername("root");
   druid.setPassword("root");
   //获得连接对象
   DruidPooledConnection connection = druid.getConnection();
   System.out.println(connection);
}
```

③提取jdbc.properties配置文件

```properties
jdbc.driver=com.mysql.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/test
jdbc.username=root
jdbc.password=root
```

④读取jdbc.properties配置文件创建连接池

```java
@Test
public void testC3P0ByProperties() throws Exception {
    //加载类路径下的jdbc.properties
    ResourceBundle rb = ResourceBundle.getBundle("jdbc");
    ComboPooledDataSource dataSource = new ComboPooledDataSource(); 
    dataSource.setDriverClass(rb.getString("jdbc.driver"));   
    dataSource.setJdbcUrl(rb.getString("jdbc.url")); 
    dataSource.setUser(rb.getString("jdbc.username")); 
    dataSource.setPassword(rb.getString("jdbc.password"));
    Connection connection = dataSource.getConnection();   
    System.out.println(connection);
}
```

### 1.3 Spring配置数据源

可以将DataSource的创建权交由Spring容器去完成

DataSource有无参构造方法，而Spring默认就是通过无参构造方法实例化对象的

DataSource要想使用需要通过set方法设置数据库连接信息，==而Spring可以通过set方法进行字符串注入==

```xml
<bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
    <property name="driverClass" value="com.mysql.jdbc.Driver"/>
    <property name="jdbcUrl" value="jdbc:mysql://localhost:3306/test"/>
    <property name="user" value="root"/>
    <property name="password" value="root"/>
</bean>
```

测试从容器当中获取数据源

```java
ApplicationContext applicationContext = new 
           ClassPathXmlApplicationContext("applicationContext.xml");
DataSource dataSource = (DataSource) 
applicationContext.getBean("dataSource");
Connection connection = dataSource.getConnection();
System.out.println(connection);
```

### 1.4 抽取jdbc配置文件

applicationContext.xml加载jdbc.properties配置文件获得连接信息。

首先，需要引入context命名空间和约束路径：

命名空间：xmlns:context="http://www.springframework.org/schema/context"

约束路径：http://www.springframework.org/schema/context

​                   http://www.springframework.org/schema/context/spring-context.xsd

==多个约束路径之间用空格或换行隔开==

获取c3p0的配置文件

```xml
<context:property-placeholder location="classpath:jdbc.properties"/>

<bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
    <property name="driverClass" value="${jdbc.driver}"/>
    <property name="jdbcUrl" value="${jdbc.url}"/>
    <property name="user" value="${jdbc.username}"/>
    <property name="password" value="${jdbc.password}"/>
</bean>
```

获取druid的配置文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">
    <context:property-placeholder location="classpath:druid.properties" system-properties-mode="FALLBACK"></context:property-placeholder>

    <!--手动配置druid的bean-->
    <!--<bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
        <property name="driverClassName" value="com.mysql.cj.jdbc.Driver"></property>
        <property name="url" value="jdbc:mysql://localhost:3306/test"></property>
        <property name="username" value="root"></property>
        <property name="password" value="root"></property>
    </bean>-->
   
    <!--通过获取properties配置文件来自动配置bean-->
    <bean id="dataSource2" class="com.alibaba.druid.pool.DruidDataSource">
        <property name="driverClassName" value="${driverClassName}"></property>
        <property name="url" value="${url}"></property>
        <property name="username" value="${username}"></property>
        <property name="password" value="${password}"></property>
    </bean>

</beans>
```

### 1.5 知识要点 

Spring容器加载properties文件

```xml
<context:property-placeholder location="classpath:druid.properties"/>
<property name="类的属性名" value="${key}"/>
```

### 1.6关于Spring不能读取Druid配置文件的`${username}`问题

原因：`<context:property-placeholder>`的system-properties-mode没有设置用了默认的"ENVIRONMENT"，所以spring默认会优先加载使用系统环境变量，此时，username实际上指的是当前计算机的用户名。而不是取值配置文件中定义的username。



解决办法1：https://www.oschina.net/question/873438_234580

system-properties-mode没有设置用了默认的"ENVIRONMENT"，改成"FALLBACK"即可

```xml
<context:property-placeholder location="classpath:druid.properties" system-properties-mode="FALLBACK"/>
```

解决办法2：

修改配置文件的属性名。将userName换做name。然后再依赖注入时使用`${name}`。

```xml
<bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
    <property name="driverClassName" value="${driverClassName}"></property>
    <property name="url" value="${url}"></property>
    <property name="username" value="${name}"></property>
    <property name="password" value="${password}"></property>
</bean>
```

# 2. Spring注解开发

### 2.1 Spring原始注解

Spring是轻代码而重配置的框架，配置比较繁重，影响开发效率，所以注解开发是一种趋势，注解代替xml配置文件可以简化配置，提高开发效率。 

Spring原始注解主要是替代\<Bean>的配置

| 注解           | 说明                                                         |
| -------------- | ------------------------------------------------------------ |
| @Component     | 使用在类上用于实例化Bean                                     |
| @Controller    | 使用在web层类上用于实例化Bean                                |
| @Service       | 使用在service层类上用于实例化Bean                            |
| @Repository    | 使用在dao层类上用于实例化Bean                                |
| @Autowired     | 使用在字段上用于根据类型依赖注入                             |
| @Qualifier     | 结合@Autowired一起使用用于根据名称进行依赖注入               |
| @Resource      | 相当于@Autowired+@Qualifier，按照名称进行注入（==需要name属性==） |
| @Value         | ==注入普通属性==                                             |
| @Scope         | 标注Bean的作用范围（直接以字符串的形式给出）                 |
| @PostConstruct | 使用在方法上标注该方法是Bean的初始化方法                     |
| @PreDestroy    | 使用在方法上标注该方法是Bean的销毁方法                       |

<font color="red" size="4px">注意：</font>

==使用注解进行开发时，需要在applicationContext.xml中配置组件扫描，作用是指定哪个包及其子包下的Bean需要进行扫描以便识别使用注解配置的类、字段和方法。==

```java
<!--注解的组件扫描-->
<context:component-scan base-package="com.george"></context:component-scan>
```

使用@Compont或@Repository标识UserDaoImpl需要Spring进行实例化。

```java
//@Component("userDao")
@Repository("userDao")
public class UserDaoImpl implements UserDao {
    @Override
    public void save() {
    	System.out.println("save running... ...");
    }
}
```

使用@Compont或@Service标识UserServiceImpl需要Spring进行实例化

使用@Autowired或者@Autowired+@Qulifier或者@Resource进行userDao的注入

```java
//@Component("userService")
@Service("userService")
public class UserServiceImpl implements UserService {
    /*@Autowired
    @Qualifier("userDao")*/
    @Resource(name="userDao")
    private UserDao userDao;
    @Override
    public void save() {       
   	  userDao.save();
    }
}
```

==IDEA使用@Resource报错==

​	问题：问题在spring项目中引入@Resource注解的时候，有红色下划线错误，而且输入注解的时候不能出现自动代码补全。

​	解决办法：Spring项目中缺少javax.annotation包的依赖。在maven配置文件pom.xml中加入依赖。

```xml
<dependency>
    <groupId>javax.annotation</groupId>
    <artifactId>javax.annotation-api</artifactId>
    <version>1.3.1</version>
</dependency>
```



使用@Value进行字符串和整数的注入

```java
@Repository("userDao")
public class UserDaoImpl implements UserDao {
    @Value("注入普通数据")
    private String str;
    @Value("${driverClassName}")//利用SPEL表达式，可以直接获取引入容器的druid.properties配置文件中的键值
    private String driver;
    @Value("2")//这里给age注入赋值为2，虽然用双引号，由于age是int类型的，这里会自动解析为整数
    private int age;
   
    @Override
    public void save() {
        System.out.println(str);
        System.out.println(driver);
        System.out.println("save running... ...");
    }
}
```

使用@Scope标注Bean的范围

```java
//@Scope("prototype")
@Scope("singleton")
public class UserDaoImpl implements UserDao {
   //此处省略代码
}
```

使用@PostConstruct标注初始化方法，使用@PreDestroy标注销毁方法

```java
@PostConstruct
public void init(){
	System.out.println("初始化方法....");
}
@PreDestroy
public void destroy(){
	System.out.println("销毁方法.....");
}
```

### 2.2 Spring新注解

使用上面的注解还不能全部替代xml配置文件，还需要使用注解替代的配置如下：

```
非自定义的Bean的配置(如DruidDataSource)： <bean>
加载properties文件的配置： <context:property-placeholder>
组件扫描的配置： <context:component-scan>
引入其他文件： <import>
```

| 注解            | 说明                                                         |
| --------------- | ------------------------------------------------------------ |
| @Configuration  | 用于指定当前类是一个 Spring   配置类，当创建容器时==会从该类上加载注解== |
| @ComponentScan  | 用于指定 Spring   在初始化容器时要扫描的包。   作用和在 Spring   的 xml 配置文件中的   <context:component-scan   base-package="com.itheima"/>一样 |
| @Bean           | ==使用在方法上==，标注将该方法的返回值存储到   Spring   容器中 |
| @PropertySource | 用于加载.properties   文件中的配置                           |
| @Import         | 用于导入其他配置类,参数是class类型的数组                     |

==注意：==
`@PropertySource`代替`<context:property-placeholder/>`后，system-properties-mode不能改变为`FALLBACK`，因此还是不能使用`${username}`。

**示例**

@Configuration

@ComponentScan

@Import

```java
@Configuration
@ComponentScan("com.itheima")
@Import({DataSourceConfiguration.class})
public class SpringConfiguration {
   
}
```

@PropertySource

@Value

```java
@PropertySource("classpath:jdbc.properties")
public class DataSourceConfiguration {
    @Value("${driver}")
    private String driver;
    @Value("${url}")
    private String url;
    @Value("${username}")
    private String username;
    @Value("${password}")
    private String password;
```

@Bean

```java
@Bean("dataSource")
public DataSource getDataSource() throws PropertyVetoException { 
    ComboPooledDataSource dataSource = new ComboPooledDataSource(); 
    dataSource.setDriverClass(driver);
    dataSource.setJdbcUrl(url);
    dataSource.setUser(username);
    dataSource.setPassword(password);
    return dataSource;
} 
```

**加载核心配置类创建Spring容器**

使用
`ApplicationContext applicationContext = new AnnotationConfigApplicationContext(SpringConfiguration.class);`

```java
@Test
public void testAnnoConfiguration() throws Exception {
ApplicationContext applicationContext = new 
          AnnotationConfigApplicationContext(SpringConfiguration.class);    
    UserService userService = (UserService)    
    applicationContext.getBean("userService");
    userService.save();
    DataSource dataSource = (DataSource) 
    applicationContext.getBean("dataSource");
    Connection connection = dataSource.getConnection(); 
    System.out.println(connection);
    }
```

# 3. Spring整合Junit

### 3.1 原始Junit测试Spring的问题

在测试类中，每个测试方法都有以下两行代码：

```java
 ApplicationContext ac = new ClassPathXmlApplicationContext("bean.xml");
 AccountService as = ac.getBean("accountService",AccountService.class);
```

这两行代码的作用是获取容器，如果不写的话，直接会提示空指针异常。所以又不能轻易删掉。

### 3.2 上述问题解决思路

让SpringJunit负责创建Spring容器，但是需要将配置文件的名称告诉它

将需要进行测试Bean直接在测试类中进行注入

### 3.3 Spring集成Junit步骤

①导入spring集成Junit的坐标

②创建测试类，==注意测试类要在maven工程里的test文件夹内==

③使用@Runwith注解替换原来的运行期

④使用@ContextConfiguration指定配置文件或配置类

⑤使用@Autowired或者@Resource(name="")注入需要测试的对象

⑥创建测试方法进行测试

```
说明：
	@ContextConfiguration默认参数是xml的配置文件路径名，需要加载配置类时，需要指定classes属性名，值是一个class类型的数组
	创建测试类需要在test文件下，否则@ContextConfiguration注解无法加载SpringJunit4ClassRunner.class
```

### 3.4 Spring集成Junit代码实现

①导入spring集成Junit的坐标

```xml
<dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-test</artifactId>
      <version>5.3.8</version>
      <scope>test</scope>
</dependency>

<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.12</version>
    <scope>test</scope>
</dependency>
```

②使用@Runwith注解替换原来的运行期

```java
@RunWith(SpringJUnit4ClassRunner.class)
public class SpringJunitTest {
}
```

③使用@ContextConfiguration指定配置文件或配置类

```java
@RunWith(SpringJUnit4ClassRunner.class)
//加载spring核心配置文件
//@ContextConfiguration(value = {"classpath:applicationContext.xml"})
//加载spring核心配置类
@ContextConfiguration(classes = {SpringConfiguration.class})
public class SpringJunitTest {
}
```

④使用@Autowired注入需要测试的对象

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {SpringConfiguration.class})
public class SpringJunitTest {
    @Autowired
    private UserService userService;
}
```

⑤创建测试方法进行测试

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {SpringConfiguration.class})
public class SpringJunitTest {
    @Autowired
    private UserService userService;
    @Test
    public void testUserService(){
   	 userService.save();
    }
}
```

Spring集成Junit步骤

①导入spring集成Junit的坐标

②创建测试类，==注意测试类要在maven工程里的test文件夹内==

③==对类==使用@Runwith注解替换原来的运行期

④==对类==使用@ContextConfiguration指定配置文件或配置类

⑤使用@Autowired或者@Resource(name="")注入需要测试的对象

⑥创建测试方法进行测试