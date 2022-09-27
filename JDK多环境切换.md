# JDK多环境切换

​		对于不同的公司和项目来说，可能会使用不同的JDK版本。另外作为开发人员，我们不能一直止步于JDK1.8，更需要学习新版本的特性。这就需要在一个电脑上安多个JDK版本。如果不能清楚的使用不同的版本，极易造成各种冲突和错误。如下图。

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/JDK版本使用错误造成的问题举例.png)

​		下面会详细的介绍关于不同版本JDK在IDEA中的自由切换使用。

## 1、环境变量的配置策略

​		首先，需要指出的是无论电脑上有多少JDK版本，只能给一个JDK设置Path环境变量，所以一般设置最常使用的版本。如果需要切换，这里提供一个比较好的思路，可以更快捷的操作。

1. 安装不同的JDK版本

2. 在环境变量中为每个JDK设置一个不同的`JAVA_HOME`子变量,命名规则为`JAVA_HOME版本号`如下：

   ![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/java_home8环境变量.png)

   ![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/java_home12环境变量.png)

3. 然后设置一个名字为`JAVA_HOME`的变量，它的值为第二步中设置的变量名称。（注意这里需要用%%来引用）

   ![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/java_home.png)

4. 在Path环境变量中添加如下路径。这样在控制台执行java相关命令，它就会到指定文件夹中搜索。

   ```
   %JAVA_HOME%\bin
   %JAVA_HOME%\jre\bin
   ```

> 这样，在使用时如果需要切换jdk版本，只需要替换JAVA_HOME的值为相应的子变量即可。无须再改动Path

## 2、编译器的配置

​		编译器的配置是针对项目实际的工作环境进行限制。它不依赖path环境变量，就是在不改动环境变量的情况下进行项目的JDK环境切换。

### 2.1 项目结构（4个配置）

1. 打开Project Structure项目结构

2. 针对下图几点进行设置，让其保持一致的版本。

   <img src="https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/JDK环境切换项目配置1.png"  />

   ![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/JDK环境切换项目配置2.png)

   ![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/JDK环境切换项目配置3.png)

3. 点击OK保存配置

### 2.2 编译设置（1个配置）

​		编译的配置是指编译出的结果(jar包)可以在什么版本上运行。项目配置的JDK版本可以**高于**编译目标的JDK版本，但是不能是项目的JDK版本**低于**编译目标JDK。

1. 打开Setting设置

2. 找到Java Compiler选项

3. 选择目标版本

   ![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/目标结果JDK配置.png)

> 虽然项目的JDK版本可以高于目标结果的JDK版本，但是一般最好还是保持一致。

## 3、pom文件（1个标签）

​		在SpringBoot项目中，通过模板创建项目时会选择JDK的版本，所以在pom.xml中生成对应的java的版本信息。如下：

```xml
<properties>
    <java.version>11</java.version>
</properties>
```

> 这里的标签标识的JDK没有实际的意义，可以忽略。

