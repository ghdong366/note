#                                               java异常

### 1、 异常的体系

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/java异常体系.png)

Error:严重问题，不需要处理
Exception:称为异常类，它表示程序本身可以处理的问题
●RuntimeException: 在编译期是不检查的,出现问题后，需要我们回来修改代码
●非RuntimeException:编译期就必须处理的，否则程序不能通过编译,就更不能正常运行了

### 2、jvm对异常的默认处理方案

* 把异常的名称，异常原因及异常出现的位置等信息输出在了控制台
* 程序停止执行

### 3、异常处理

#### try……catch()

格式：

```java
try {
	//可能出现异常的代码
}catch(异常类名 变量名){	
	//异常的处理代码
}
```

==执行流程:==
程序从try里面的代码开始执行
出现异常，会自动生成一个异常类对象,该异常对象将被提交给Java运行时系统
当Java运行时系统接收到异常对象时，会到catch中去找匹配的异常类，找到后进行异常的处理
执行完毕之后，程序还可以继续往下执行

```java
int[] arr=new int[]{6,7,8};
try{
    System.out.println(arr[3]);
    //这里自动new了一个ArrayIndexOutOfBoundsException异常
}
catch (ArrayIndexOutOfBoundsException e)
{
    System.out.println("数组访问越界");
}
```

#### finally

有一-些特定的代码无论异常是否发生,都需要执行。另外,因为异常会引发程序跳转,导致有些语句执行不到。而finally就是解决这 个问题的,在finally代码块中存放的代码都是一定会被执行的。

#### throws抛出异常

暂时不在本方法体中处理异常，而是抛给上层。以后谁调用这个方法谁再处理这个异常。

格式：

```java
//方法的括号后跟
throws 异常类名
```



```java
public static void fu2() throws ParseException {
    String s = "2021-04-19";
    SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-mm-dd");
    Date date = simpleDateFormat.parse(s);
    System.out.println(date);
    System.out.println("未发生异常");
}
```

**处理异常的总结：**

> 编译时异常必须要进行处理，两种处理方案: ty..atch ..或者throws,如果采用throws这种方案，将来谁调用谁处理

> 运行时异常可以不处理，出现问题后，需要我们回来修改代码

### 4、Throwable的成员方法

| 方法名                     | 说明                                           |
| -------------------------- | ---------------------------------------------- |
| String **getMessage()**    | 返回throwable的详细信息字符串                  |
| String **toString()**      | 返回可抛出异常的描述(包含getMessage方法的信息) |
| void **printStackTrace()** | 把错误信息输出在控制台（本方法并不会终止程序） |

### 5、编译时异常和运行时异常的区别

==编译时异常:==必须显示处理,否则程序就会发生错误，无法通过编译

==运行时异常:==无需显示处理，也可以和编译时异常一样处理

### 6、 自定义异常

一般是直接继承Exception类，新建的异常类就是编译时异常。也可以基础RuntimeException

格式：

```java
public class 类名 extends Exception {
	//无参构造方法
    //有参构造方法
}
```



```java
//自定义一个异常
public class DefineException extends Exception{

    public DefineException() {
    }
    public DefineException(String message) {
        super(message);
    }
}
```

**使用自定义异常（主动抛出异常throw）:**

用`throw new 异常类构造器`

```java
public static void shuRu() throws DefineException {
    System.out.println("请输入成绩");
    Scanner in = new Scanner(System.in);
    int score = in.nextInt();
    if(score<0||score>100) {
        //使用throw来产生自定义的异常
        throw new DefineException("输入的成绩异常");
    }else {
        System.out.println("输入的分数正常");
    }
}
```

### 7、 throws和throw的区别

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/throws与throw区别.png)