## 1、Swagger和SpringFox的关系：

```
Swagger 是一种规范，它与编程语言无关。
springfox-swagger 是基于 Spring 生态系统的该规范的实现。
springfox-swagger-ui 是对 swagger-ui 的封装，使得其可以使用 Spring 的服务。
```

总的来说就是在spring开发环境下，需要引入springfox相关依赖

## 2、快速入门

### 2.1、引入依赖

这里使用了springfox2.9.2,但是排除了其中的两个依赖，具体后面会介绍到。

```xml
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger2</artifactId>
    <version>2.9.2</version>
    <scope>provided </scope>
    <exclusions>
        <exclusion>
            <groupId>io.springfox</groupId>
            <artifactId>swagger-models</artifactId>
        </exclusion>
        <exclusion>
            <groupId>io.springfox</groupId>
            <artifactId>swagger-annotations</artifactId>
        </exclusion>
    </exclusions>
</dependency>
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger-ui</artifactId>
    <version>2.9.2</version>
    <scope>provided </scope>
</dependency>
<!-- https://mvnrepository.com/artifact/io.swagger/swagger-annotations -->
<dependency>
    <groupId>io.swagger</groupId>
    <artifactId>swagger-annotations</artifactId>
    <version>1.5.22</version>
</dependency>
<!-- https://mvnrepository.com/artifact/io.swagger/swagger-models -->
<dependency>
    <groupId>io.swagger</groupId>
    <artifactId>swagger-models</artifactId>
    <version>1.5.22</version>
</dependency>
```

### 2.2、添加配置

使用swagger前，需要对其进行自定义配置。在容器中创建一个 `Docket` 的Bean对象

```java
/**
 * Swagger的配置信息
 * @author Admin
 */

@Configuration
@EnableSwagger2
public class Swagger2Configuration {

    @Bean
    public Docket docket(){
        ApiInfo info = new ApiInfoBuilder().title("测试系统")
                .description("测试系统的接口文档")
                .version("1.1")
                .contact(new Contact("george", "http://www.admin.vip", "george366@163.com"))
                .build();
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(info)
                .select()
                .apis(RequestHandlerSelectors.basePackage("vip.george.admin.controller"))
                .build();
    }
}

```

![image-20220622103544541](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/imags/image-20220622103544541.png)

> 自定义配置的具体效果如上图所示。



## 3、新版SpringBoot造成的错误

如果SpringBoot环境是2.6.X以上，使用swagger会在启动项目的时候报下面这个异常：

```
`org.springframework.context.ApplicationContextException: Failed to start bean 'documentationPluginsBootstrapper'; nested exception is java.lang.NullPointerException`
```

**原因:**

Springboot2.6以后将SpringMVC 默认路径匹配策略从AntPathMatcher 更改为PathPatternParser，导致出错

**解决方案：**

在配置文件application.properties中加入以下配置

```properties
spring.mvc.pathmatch.matching-strategy=ANT_PATH_MATCHER
```

如果是application.yml就加入

```yaml
spring:
  mvc:
    pathmatch:
      matching-strategy: ant_path_matcher
```

## 4、常用注解

#### 4.1、@EnableSwagger2

开启swagger2配置

#### 4.2、@Api()

用来修饰Controller类，表示该Controller主要作用，是多个api的集合。

如:`@Api(tags = "用户模块")`

![image-20220622101555743](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/imags/image-20220622101555743.png)

**常用属性**

| 属性           | 描述                                             |
| -------------- | ------------------------------------------------ |
| value          | 接口集合的描述信息（最常用）                     |
| position       | 如果配置多个Api 想改变显示的顺序位置（弃用）     |
| produces       | For example, "application/json, application/xml" |
| consumes       | For example, "application/json, application/xml" |
| protocols      | Possible values: http, https, ws, wss.           |
| authorizations | 高级特性认证时配置                               |
| hidden         | 配置为true 将在文档中隐藏                        |

#### 4.3、@ApiOperation()

对一个网络请求操作即Controller的方法进行功能描述。

如：` @ApiOperation(value = "欢迎用户",notes = "这是描述信息，告诉前端一些注意事项")`

![image-20220622103258601](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/imags/image-20220622103258601.png)

**常用属性：**

| 属性  | 描述             |
| ----- | ---------------- |
| value | 该请求的描述信息 |
| note  | 一些提示信息     |

#### 4.4、@ApiImplicitParam()

标识一个方法，对方法的其中一个参数进行说明

如：`@ApiImplicitParam(name = "username",value = "用户名")`

![image-20220622104015628](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/imags/image-20220622104015628.png)

**常用属性：**

| 属性     | 描述                                                         |
| -------- | ------------------------------------------------------------ |
| name     | 参数名                                                       |
| value    | 参数的含义                                                   |
| required | 是否必填（注意这个只是文档标识，让前端知晓。不传程序不会报错） |

#### 4.5、@ApiImplicitParams()

标识一个方法，参数为一个数组可以将@ApiImplicitParam包括起来，然后对多个参数进行说明。

如：

```java
@ApiImplicitParams({
    @ApiImplicitParam(name = "username",value = "用户名",required = true),
    @ApiImplicitParam(name = "password",value = "密码",required = true)}
)
```

![image-20220622105346045](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/imags/image-20220622105346045.png)

#### 4.6、@ApiModel()

@ApiModel用于描述一个Model实体（如vo、dto、po、to）的信息

这种一般用在post请求的时候，使用@RequestBody这样的场景，请求参数无法使用@ApiImplicitParam注解进行描述的时候。

如：`@ApiModel(value = "用户对象",description = "user entity")`

![image-20220622104817548](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/imags/image-20220622104817548.png)

![image-20220622104856198](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/imags/image-20220622104856198.png)

#### 4.7、@ApiModelProperty

@ApiModelProperty用来描述一个Model的某一个属性。

如：`@ApiModelProperty(name = "userId",value = "用户的id")`

![image-20220622105715352](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/imags/image-20220622105715352.png)

## 5、版本2.9.2的一个Bug

Springfox2.9.2使用的是swagger-annotatios1.5.20和swagger-models1.5.20。这个版本在使用@ApiModelProperty时如果修饰的实体的整数属性时会有Bug。建议升级到1.5.22版本。见第2节中的依赖代码。

![image-20220622095001416](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/imags/image-20220622095001416.png)

![image-20220622095044264](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/imags/image-20220622095044264.png)

![image-20220622133841094](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/imags/image-20220622133841094.png)
