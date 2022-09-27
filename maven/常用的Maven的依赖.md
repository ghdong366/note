# 项目中使用的依赖表

### mysql数据库相关的依赖

| 依赖的artifactId     | 说明                |      |
| -------------------- | ------------------- | ---- |
| mysql-connector-java | mysql数据库连接驱动 |      |
| c3p0                 | C3P0连接池          |      |
| druid                | Druid连接池         |      |

### Jackson依赖

| 依赖的artifactId    | 说明               |              |
| ------------------- | ------------------ | ------------ |
| jackson-core        | jackson核心配置    | ObjectMapper |
| jackson-databind    | jackson-core的依赖 |              |
| jackson-annotations | jackson的注解      |              |

```xml
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-core</artifactId>
    <version>2.12.3</version>
</dependency>
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.12.3</version>
</dependency>
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-annotations</artifactId>
    <version>2.12.3</version>
</dependency>
```

### Spring相关依赖

| 依赖的artifactId     | 说明                            | 包含的类举例                                                 |
| -------------------- | ------------------------------- | ------------------------------------------------------------ |
| spring-context       | Spring开发的基本包              | ClassPathXmlApplicationContext                               |
| javax.annotation-api | 使用@Resource来依赖注入时需要的 | @Resource                                                    |
| spring-test          | 用于Spring集成Junit             | @RunWith<br />@ContextConfiguration(classes = {SpringConfiguration.class}) |
| aspectjweaver        | 实现AOP的，用于aspectj的织入    | <aop:config><br />@Before()                                  |
| spring-jdbc          | SpringjdbcTamplate              | JdbcTemplate                                                 |
| spring-tx            | Spring事务                      | @Transactional                                               |
| spring-web           | spring集成web环境               | WebApplicationContextUtils<br />通过ServeltContexct对象来获取ApplicationContext |
|                      |                                 |                                                              |



### SpringMVC相关依赖

| 依赖的artifactId   | 说明          | 包含的类举例                                                 |
| ------------------ | ------------- | ------------------------------------------------------------ |
| spring-webmvc      | SpringWeb依赖 | DispatcherServlet<br />@RequestMapping<br />ModelAndView<br />HandlerInterceptor |
| commons-fileupload | 文件上传依赖  | CommonsMultipartResolver<br />                               |
| commons-io         | 文件上传依赖  | uploadFile                                                   |

### Mybatis

| 依赖的artifactId | 说明          | 包含的类举例                          |
| ---------------- | ------------- | ------------------------------------- |
| mybatis          | mybatis的依赖 | Resources<br />SqlSessionFactoryBulid |
|                  |               |                                       |

### 分页查询插件

```xml
<!--分页插件依赖-->
<dependency>
    <groupId>com.github.pagehelper</groupId>
    <artifactId>pagehelper</artifactId>
    <version>5.2.0</version>
</dependency>
<dependency>
    <groupId>com.github.jsqlparser</groupId>
    <artifactId>jsqlparser</artifactId>
    <version>3.1</version>
</dependency>
```

| 依赖的artifactId | 说明 | 包含的类举例 |
| ---------------- | ---- | ------------ |
| pagehelper       |      | PageHelper   |
| jsqlparser       |      |              |
|                  |      |              |



### Spring整合Mybatis

```xml
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis-spring</artifactId>
    <version>2.0.3</version>
</dependency>
```

| 依赖的artifactId | 说明                  | 包含的类举例                                   |
| ---------------- | --------------------- | ---------------------------------------------- |
| mybatis-spring   | 用于Spring整合Mybatis | SqlSessionFactoryBean、MapperScannerConfigurer |

```xml
<bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
    <property name="dataSource" ref="dataSource"/>
    <property name="configLocation" value="classpath:sqlMapConfig.xml"/>
</bean>
```



### Dubbo&Zookeeper

```xml
<!--dubbo-->
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>dubbo</artifactId>
    <version>2.6.2</version>
</dependency>

<!--zookeeper-->
<dependency>
    <groupId>org.apache.zookeeper</groupId>
    <artifactId>zookeeper</artifactId>
    <version>3.6.2</version>
</dependency>
<dependency>
    <groupId>com.github.sgroschupf</groupId>
    <artifactId>zkclient</artifactId>
    <version>0.1</version>
</dependency>
```

| 依赖的artifactId | 说明 | 包含的类举例 |
| ---------------- | ---- | ------------ |
| dubbo            |      |              |
| zookeeper        |      |              |

