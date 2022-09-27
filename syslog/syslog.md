# Syslog

`syslog` 是一个协议，它定义了消息的格式，它广泛的使用在日志系统中，作为多设备间日志的发送方式。本文主要介绍java程序中syslog具体的使用,以及`syslog4j`开源库的详细说明。

## 1、Syslog是什么

https://blog.csdn.net/zhezhebie/article/details/75222667

**syslog协议标准（非强制)**

![syslog协议标准（非强制）](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/imags/syslog%E5%8D%8F%E8%AE%AE%E6%A0%87%E5%87%86%EF%BC%88%E9%9D%9E%E5%BC%BA%E5%88%B6%EF%BC%89.png)



**为什么要使用syslog。**

我们平时做的每一个系统不都有自己的日志模块吗？我们登录自己的日志模块，可以很方便的查看自己的日志信息。那么为什么还要使用syslog呢？

答案是这样的，如果只是针对一个系统，我们一般是没有必要使用syslog的，如果一个企业部署了很多系统，每个系统都有自己的日志模块，每个系统都是独立的。那么管理员要想通过日志获取到系统的运行信息或者审计日志，那么工作量是相当大的。这个时候，只有要求所有的系统都将日志传输到syslog服务器上，通过syslog服务器统一管理日志，就会方便很多。

当然这些系统包括所有的硬件，软件系统，他们都会源源不断的发来信息，由syslog服务器将信息分类，分级别记录。

## 2、快速入门

#### 2.1 引入开源库

开源库syslog4j官网：http://syslog4j.org/

```xml
<dependency>
    <groupId>org.syslog4j</groupId>
    <artifactId>syslog4j</artifactId>
    <version>0.9.46</version>
</dependency>
```

> 说明：
>
> 最新的syslog4j是0.9.46,但是这个在maven仓库中已经不提供下载，maven仓库中只有0.9.30。
>
> 0.9.30版本会出现‘过长中文日志被截断’的bug
>
> 综上，需要手动下载syslog4j-0.9.46.jar包,再导入到maven中（这一步会复杂一点）

<img src="C:\Users\Admin\Pictures\typora\syslog4j下载jar包.png" alt="image-20220729152214123" style="zoom:50%;" />

#### 2.2 安装syslogwatcher

为了便于在windows上查看syslog日志，使用`syslogwatcher`进行日志的监控捕获。

直接下载安装，注意下载完需要设置接受日志的编码格式：

<img src="https://geda-1302176138.cos.ap-nanjing.myqcloud.com/imags/syslogwatcher%E8%AE%BE%E7%BD%AEutf-8.png" alt="image-20220729152832316" style="zoom: 50%;" />

#### 2.3 发送日志

```java
/**
 * @author Admin
 */
public class SyslogSendTask {
    private static final String HOST = "127.0.0.1";
    private static final int PORT = 514;

    public static void generate() {
        SyslogIF syslog = Syslog.getInstance(SyslogConstants.UDP);
        SyslogConfigIF config = syslog.getConfig();
        config.setHost(HOST);
        config.setPort(PORT);

        StringBuffer buffer = new StringBuffer();
        Map<String,String> map = new HashMap<>();
        map.put("LogName","日志告警");
        map.put("Date",new Date().toString().substring(4,20));
        map.put("LogDetails","服务器日志告警信息");

        try {
            syslog.log(0, URLDecoder.decode(JSON.toJSONString(map), "utf-8"));
        } catch (UnsupportedEncodingException e) {
            System.out.println("generate log get exception " + e);
        }
        System.out.println("发送日志完成。。。");
    }

    public static void main(String[] args) {
        generate();
    }
}
```

syslogwatcher接收到程序发出的syslog日志。

![image-20220729161729991](C:\Users\Admin\Pictures\typora\image-20220729161729991.png)



## 3、syslog4j详解

