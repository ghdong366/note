# Lambda表达式 #

## 1.1Lambda表达式简介 ##

### 什么是Lambda？ ###

Lambda是JAVA 8添加的新特性，说白了，Lambda是一个匿名函数

### 为什么使用Lambda ###

使用Lambda表达式可以对一个接口的方法进行非常简洁的实现

### Lambda对接口的要求 ###

虽然可以使用Lambda表达式对某些接口进行简单的实现，但是并不是所有的接口都可以用Lambda表达式来实现，要求接口中定义的**必须要实现的抽象方法只能是一个**

```
在JAVA8中 ，对接口加了一个新特性：default
可以使用default对接口方法进行修饰，被修饰的方法在接口中可以默认实现
```

### @FunctionalInterface ###

修饰函数式接口的，接口中的抽象方法只有一个

## 1.2、Lmbda的基础语法 ##

### 1.语法 ###

```java
// 1.Lambda表达式的基础语法
// Lambda是一个匿名函数 一般关注的是以下两个重点
// 参数列表 方法体

/**
* ( )：用来描述参数列表
*  {}：用来描述方法体 有时可以省略
*  ->: Lambda运算符 读作goes to
*  例 Test t=()->{System.out.println("hello word")}; 大括号可省略
*/
```



### 2.创建多个接口 ###

```java
/**
 * 无参数无返回值接口
 * @version 1.0
 * @date 2020-05-27 10:24
 */
@FunctionalInterface
public interface LambdaNoneReturnNoneParmeter {

    void test();
}

/**
 * 无返回值有单个参数
 * @version 1.0
 * @date 2020-05-27 10:26
 */
@FunctionalInterface
public interface LambdaNoneReturnSingleParmeter {

    void test(int n);
}

/**
 * 无返回值 多个参数的接口
 * @version 1.0
 * @date 2020-05-27 10:27
 */
@FunctionalInterface
public interface LambdaNoneReturnMutipleParmeter {

    void test(int a,int b);
}

/**
 * 有返回值 无参数接口
 * @version 1.0
 * @date 2020-05-27 10:28
 */
@FunctionalInterface
public interface LambdaSingleReturnNoneParmeter {

    int test();
}

/**
 * 有返回值 有单个参数的接口
 * @version 1.0
 * @date 2020-05-27 10:29
 */
@FunctionalInterface
public interface LambdaSingleReturnSingleParmeter {

    int test(int n);
}

/**
 * 有返回值 有多个参数的接口
 * @version 1.0
 * @date 2020-05-27 10:30
 */
@FunctionalInterface
public interface LambdaSingleReturnMutipleParmeter {

    int test(int a,int b);
}
```

### 3.创建测试类 ###

```java
package com.alan.learn.syntax;

import com.alan.learn.interfaces.*;

/**
 * @version 1.0
 * @date 2020-05-27 10:33
 */
public class Syntax1 {

    public static void main(String[] args) {
        // 1.Lambda表达式的基础语法
        // Lambda是一个匿名函数 一般关注的是以下两个重点
        // 参数列表 方法体

        /**
         * （）：用来描述参数列表
         *  {}：用来描述方法体
         *  ->: Lambda运算符 读作goes to
         */

        // 无参无返回  
        LambdaNoneReturnNoneParmeter lambda1=()->{
            System.out.println("hello word");
        };
        lambda1.test();

        // 无返回值 单个参数 
        LambdaNoneReturnSingleParmeter lambda2=(int n)->{
            System.out.println("参数是："+n);
        };
        lambda2.test(10);

        // 无返回值 多个参数
        LambdaNoneReturnMutipleParmeter lambda3=(int a,int b)->{
            System.out.println("参数和是："+(a+b));
        };
        lambda3.test(10,12);

        // 有返回值 无参数
        LambdaSingleReturnNoneParmeter lambda4=()->{
            System.out.println("lambda4：");
            return 100;
        };
        int ret=lambda4.test();
        System.out.println("返回值是："+ret);

        // 有返回值 单个参数
        LambdaSingleReturnSingleParmeter lambda5=(int a)->{
            return a*2;
        };
        int ret2= lambda5.test(3);
        System.out.println("单个参数，lambda5返回值是:"+ret2);

        //有返回值 多个参数
        LambdaSingleReturnMutipleParmeter lambda6=(int a,int b)->{
            return a+b;
        };
        int ret3=lambda6.test(12,14);
        System.out.println("多个参数，lambda6返回值是："+ret3);
    }
}

输出结果：
    hello word
	参数是：10
	参数和是：22
	lambda4：
	返回值是：100
	单个参数，lambda5返回值是:6
    多个参数，lambda6返回值是：26
```

## 1.3、语法精简 ##

针对上述基础语法的精简

### 1.参数类型精简 ###

由于在接口的抽象方法中，已经定义了参数的数量类型 所以在Lambda表达式中参数的类型可以省略

```java
/**
* 语法精简
* 1.参数类型
*/
LambdaNoneReturnMutipleParmeter lambda1=(int a,int b)-> {
    System.out.println("hello world"); 
};    
可以精简为:
LambdaNoneReturnMutipleParmeter lambda1=(a,b)-> {
    System.out.println("hello world");
};
```

> 备注：如果需要省略类型，则每一个参数的类型都要省略，千万不要一个省略一个不省略

### 2.参数

小括号精简 ###

如果参数列表中，参数的数量只有一个 此时小括号可以省略

```java
/**
* 2.参数小括号
*/
LambdaNoneReturnSingleParmeter lambda2=(a)->{
    System.out.println("hello world");
};
可以精简为:
LambdaNoneReturnSingleParmeter lambda2= a->{
    System.out.println("hello world");
};
```

### 3.方法大括号精简 ###

如果方法体中只有一条语句，此时大括号可以省略

```java
/**
* 3.方法大括号
*/
LambdaNoneReturnSingleParmeter lambda3=a->{
    System.out.println("hello world");
};
可以精简为:
LambdaNoneReturnSingleParmeter lambda3=a->System.out.println("hello world");
```

### 4.大括号精简补充 ###

如果方法体中唯一的一条语句是一个返回语句

省略大括号的同时 也`必须`省略return

```java
/**
* 4.方法体中只有一个返回语句
*/
LambdaSingleReturnNoneParmeter lambda4=()->{
    return 10;
};
可以精简为:
LambdaSingleReturnNoneParmeter lambda4=()->10;
```

### 5.多参数，有返回值 精简 ###

```java
LambdaSingleReturnNoneParmeter lambda4=(a,b)->{
    return a+b;
};
可以精简为:
LambdaSingleReturnMutipleParmeter lambda5=(a,b)->a+b;
```

## 1.4、Lambda语法进阶 ##

### 1.方法引用(普通方法与静态方法) ###

在实际应用过程中，一个接口在很多地方都会调用同一个实现，例如：

```java
LambdaSingleReturnMutipleParmeter lambda1=(a,b)->a+b;
LambdaSingleReturnMutipleParmeter lambda2=(a,b)->a+b;
```

这样一来每次都要写上具体的实现方法 a+b，如果需求变更，则每一处实现都需要更改，基于这种情况，可以将后续的是实现更改为已定义的 方法，需要时直接调用就行

#### 语法： ####

```java
/**
*方法引用：
* 可以快速的将一个Lambda表达式的实现指向一个已经实现的方法
* 方法的隶属者 如果是静态方法 隶属的就是一个类  其他的话就是隶属对象
* 语法：方法的隶属者::方法名
*/
```

>  注意：
> *  1.引用的方法中，参数数量和类型一定要和接口中定义的方法一致
> *  2.返回值的类型也一定要和接口中的方法一致

#### 例： ####

```
package com.alan.learn.syntax;

import com.alan.learn.interfaces.LambdaSingleReturnSingleParmeter;

/**
 * @version 1.0
 * @date 2020-05-27 11:48
 */
public class Syntax3 {

    public static void main(String[] args) {
        
        LambdaSingleReturnSingleParmeter lambda1=a->a*2;
        LambdaSingleReturnSingleParmeter lambda2=a->a*2;
        LambdaSingleReturnSingleParmeter lambda3=a->a*2;

        //简化
        LambdaSingleReturnSingleParmeter lambda4=a->change(a);

        //方法引用
        LambdaSingleReturnSingleParmeter lambda5=Syntax3::change;
    }

    /**
    * 自定义的实现方法
    */
    private static int change(int a){
        return a*2;
    }
}
```



### 2.方法引用(构造方法) ###

目前有一个实体类

```java
public class Person {
    public String name;
    public int age;

    public Person() {
        System.out.println("Person的无参构造方法执行");
    }

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
        System.out.println("Person的有参构造方法执行");
    }
}
```

需求

两个接口，各有一个方法，一个接口的方法需要引用Person的无参构造，一个接口的方法需要引用Person的有参构造 用于返回两个Person对象，例：

```java
interface PersonCreater{
    //通过Person的无参构造实现
    Person getPerson();
}

interface PersonCreater2{
    //通过Person的有参构造实现
    Person getPerson(String name,int age);
}
```

那么可以写作：

```java
public class Syntax4 {
    public static void main(String[] args) {

        PersonCreater creater=()->new Person();

        //引用的是Person的无参构造
         //PersonCreater接口的方法指向的是Person的方法
        PersonCreater creater1=Person::new; //等价于上面的()->new Person()
        //实际调用的是Person的无参构造 相当于把接口里的getPerson()重写成new Person()。
        Person a=creater1.getPerson(); 

        //引用的是Person的有参构造
        PersonCreater2 creater2=Person::new;
        Person b=creater2.getPerson("张三",18);
    }
}
```

> 注意：是引用无参构造还是引用有参构造 在于接口定义的方法参数

## 1.5、综合练习 ##

### 1.集合排序案例 ###

```java
package com.alan.exercise;

import com.alan.learn.data.Person;

import java.util.ArrayList;

/**
 * 集合排序案例
 * @author Alan
 * @version 1.0
 * @date 2020-05-27 15:08
 */
public class Exercise1 {

    public static void main(String[] args) {

        //需求：已知在一个ArrayList中有若干各Person对象，将这些Person对象按照年龄进行降序排列
        ArrayList<Person> list=new ArrayList<>();


        list.add(new Person("张三",10));
        list.add(new Person("李四",12));
        list.add(new Person("王五",13));
        list.add(new Person("赵六",14));
        list.add(new Person("李雷",11));
        list.add(new Person("韩梅梅",8));
        list.add(new Person("jack",10));

        System.out.println("排序前："+list);

        //将排列的依据传入 具体的方法指向的是 内部元素的age相减 sort会依据结果的正负进行降序排列
        //sort 使用提供的 Comparator对此列表进行排序以比较元素。
        list.sort((o1, o2) -> o2.age-o1.age);

        System.out.println("排序后："+list);
    }
}

```

### 2.Treeset排序案例 ###

```java
package com.alan.exercise;

import com.alan.learn.data.Person;

import java.util.TreeSet;

/**
 * @author Alan
 * @version 1.0
 * @date 2020-05-27 15:37
 */
public class Exercise2 {
    public static void main(String[] args) {

        /**Treeset 自带排序
         * 但是现在不知道Person谁大谁小无法排序
         * 解决方法：
         * 使用Lambda表达式实现Comparator接口，并实例化一个TreeSet对象
         * 注意：在TreeSet中如果Comparator返回值是 0 会判断这是两个元素是相同的 会进行去重
         * TreeSet<Person> set=new TreeSet<>((o1, o2) -> o2.age-o1.age); 
         * 这个获取的对象打印会少一个Person
         * 此时我们将方法修改
        */
        TreeSet<Person> set=new TreeSet<>((o1, o2) ->{
            if(o1.age>=o2.age){
                return -1;
            }else {
                return 1;
            }
        });

        set.add(new Person("张三",10));
        set.add(new Person("李四",12));
        set.add(new Person("王五",13));
        set.add(new Person("赵六",14));
        set.add(new Person("李雷",11));
        set.add(new Person("韩梅梅",8));
        set.add(new Person("jack",10));

        System.out.println(set);
    }
}

```

### 3.集合的遍历 ###

```java
package com.alan.exercise;

import java.util.ArrayList;
import java.util.Collections;

/**
 * 集合的遍历
 * @author Alan
 * @version 1.0
 * @date 2020-05-27 15:52
 */
public class Exercise3 {

    public static void main(String[] args) {
        ArrayList<Integer> list=new ArrayList<>();

        Collections.addAll(list,1,2,3,4,5,6,7,8,9);
        /**
         * list.forEach(Consumer<? super E> action) 
         * api文档解释： 对 集合中的每个元素执行给定的操作，直到所有元素都被处理或动作引发异常。
         * 将集合中的每一个元素都带入到接口Consumer的方法accept中  然后方法accept指向我们的引用
         * 输出集合中的所有元素
         * list.forEach(System.out::println);
        */

        //输出集合中所有的偶数
        list.forEach(ele->{
            if(ele%2==0){
                System.out.println(ele);
            }
        });
    }
}

```

### 4.删除集合中满足条件的元素 ###

```java
package com.alan.exercise;

import com.alan.learn.data.Person;

import java.util.ArrayList;

/**
 * 删除集合中满足条件的元素
 * @author Alan
 * @version 1.0
 * @date 2020-05-27 16:05
 */
public class Exercise4 {

    public static void main(String[] args) {
        ArrayList<Person> list=new ArrayList<>();

        list.add(new Person("张三",10));
        list.add(new Person("李四",12));
        list.add(new Person("王五",13));
        list.add(new Person("赵六",14));
        list.add(new Person("李雷",11));
        list.add(new Person("韩梅梅",8));
        list.add(new Person("jack",10));

        //删除集合中年龄大于12的元素
        /**
         * 之前迭代器的做法
         * ListIterator<Person> it = list.listIterator();
         * while (it.hasNext()){
         *   Person ele=it.next();
         *   if(ele.age>12){
         *         it.remove();
         *   }
         * }
         */

        /**
         * lambda实现
         * 逻辑
         * 将集合中的每一个元素都带入到接口Predicate的test方法中，
         * 如果返回值是true，则删除这个元素
        */
        list.removeIf(ele->ele.age>10);
        System.out.println(list);
    }
}

```

### 5.开辟一条线程 做一个数字的输出 ###

```java
package com.alan.exercise;

/**
 * 需求：
 * 开辟一条线程 做一个数字的输出
 * @author Alan
 * @version 1.0
 * @date 2020-05-27 16:17
 */
public class Exercise5 {
    public static void main(String[] args) {

        /**
         * 通过Runnable 来实例化线程
         */
        Thread t=new Thread(()->{
            for(int i=0;i<100;i++){
                System.out.println(i);
            }
        });
        t.start();
    }
}

```

## 1.6、系统内置的函数式接口 ##

```java





package com.alan.functional;

import java.util.function.*;

/**
 * 系统内置的一些函数式接口
 * @version 1.0
 * @date 2020-05-27 16:23
 */
public class FunctionalInterface {
    public static void main(String[] args) {

        // Predicate<T>              ：     参数是T 返回值boolean  
        // 在后续如果一个接口需要指定类型的参数，返回boolean时可以指向 Predicate
        //          IntPredicate            int -> boolean
        //          LongPredicate           long -> boolean
        //          DoublePredicate         double -> boolean

        // Consumer<T>               :      参数是T 无返回值(void)
        //          IntConsumer             int ->void
        //          LongConsumer            long ->void
        //          DoubleConsumer          double ->void

        // Function<T,R>             :      参数类型T  返回值R
        //          IntFunction<R>          int -> R
        //          LongFunction<R>         long -> R
        //          DoubleFunction<R>       double -> R
        //          IntToLongFunction       int -> long
        //          IntToDoubleFunction     int -> double
        //          LongToIntFunction       long -> int
        //          LongToDoubleFunction    long -> double
        //          DoubleToLongFunction    double -> long
        //          DoubleToIntFunction     double -> int

        // Supplier<T> : 参数 无 返回值T
        // UnaryOperator<T> :参数T 返回值 T
        // BiFunction<T,U,R> : 参数 T、U 返回值 R
        // BinaryOperator<T> ：参数 T、T 返回值 T
        // BiPredicate<T,U> :  参数T、U  返回值 boolean
        // BiConsumer<T,U> :    参数T、U 无返回值

        /**
         * 常用的 函数式接口
         * Predicate<T>、Consumer<T>、Function<T,R>、Supplier<T>
         */
    }
}

```

```java
public class FunctionInterfaceTest {
    public static void main(String[] args) {
        /**
         * void accept(T t);
         * 参数为T  返回值为void
         */
        Consumer<User> consumer = (user)->{
            System.out.println(user);
        };
        consumer.accept(new User(20,"tom"));

        /**
         * boolean test(T t);
         * 参数为T  返回值为boolean
          */
        Predicate<Integer> predicate = (a)->{
            return a>0;

        };
        boolean test = predicate.test(5);
        System.out.println(test);

        /**
         * R apply(T t);
         * 参数为T  返回值为R
         */
        Function<Long,String> function = (a)->{
            return a.toString();
        };
        String apply = function.apply(6L);
        System.out.println(apply);

        /**
         * T get();
         * 无参数，返回T
         */
        Supplier<Date> supplier = ()->{
            return new Date();
        };
        Date date = supplier.get();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String format = simpleDateFormat.format(date);
        System.out.println(format);
    }
}
```

## 1.7、Lambda闭包 ##

```java
package com.alan.closure;

import java.util.function.Supplier;

/**
 * @author Alan
 * @version 1.0
 * @date 2020-05-27 16:59
 */
public class ClosureDemo {
    public static void main(String[] args) {

        /**
         * lambda的闭包会提升包围变量的生命周期
         * 所以局部变量 num在getNumber()方法内被 get()引用 不会在getNumber()方法执行后销毁
         * 这种方法可以在外部获取到某一个方法的局部变量
         */
        int n=getNumber().get();
        System.out.println(n);
    }
    private static Supplier<Integer> getNumber(){
        int num=10;
        /**
         * Supplier supplier=()->num;
         * return supplier;
         */
        return ()->{
            return num;
        };
    }
}
*************************************************************************
    
package com.alan.closure;

import java.util.function.Consumer;

/**
 * @author Alan
 * @version 1.0
 * @date 2020-05-27 17:20
 */
public class ClosureDemo2 {
    public static void main(String[] args) {
        int a=10;
        Consumer<Integer> c=ele->{
            System.out.println(a+1);
            //System.out.println(ele);
            //System.out.println(a++); 会报错
            //在lambda中引用局部变量 这个变量必须是一个常量
        };
        //a++; 这样也会导致内部报错
        //如果在内部已经引用局部变量 参数传递后 打印的还是 10
        c.accept(1);
    }
}

```

#  Stream

## 2.1体验Stream流

- 案例需求

  按照下面的要求完成集合的创建和遍历

  - 创建一个集合，存储多个字符串元素
  - 把集合中所有以"张"开头的元素存储到一个新的集合
  - 把"张"开头的集合中的长度为3的元素存储到一个新的集合
  - 遍历上一步得到的集合

- 原始方式示例代码

  ```java
  public class StreamDemo {
      public static void main(String[] args) {
          //创建一个集合，存储多个字符串元素
          ArrayList<String> list = new ArrayList<String>();
  
          list.add("林青霞");
          list.add("张曼玉");
          list.add("王祖贤");
          list.add("柳岩");
          list.add("张敏");
          list.add("张无忌");
  
          //把集合中所有以"张"开头的元素存储到一个新的集合
          ArrayList<String> zhangList = new ArrayList<String>();
  
          for(String s : list) {
              if(s.startsWith("张")) {
                  zhangList.add(s);
              }
          }
  
  //        System.out.println(zhangList);
  
          //把"张"开头的集合中的长度为3的元素存储到一个新的集合
          ArrayList<String> threeList = new ArrayList<String>();
  
          for(String s : zhangList) {
              if(s.length() == 3) {
                  threeList.add(s);
              }
          }
  
  //        System.out.println(threeList);
  
          //遍历上一步得到的集合
          for(String s : threeList) {
              System.out.println(s);
          }
          System.out.println("--------");
      }
  }
  ```

- 使用Stream流示例代码

  ```java
  public class StreamDemo {
      public static void main(String[] args) {
          //创建一个集合，存储多个字符串元素
          ArrayList<String> list = new ArrayList<String>();
  
          list.add("林青霞");
          list.add("张曼玉");
          list.add("王祖贤");
          list.add("柳岩");
          list.add("张敏");
          list.add("张无忌");
  
          //Stream流来改进
         //        list.stream().filter(s -> s.startsWith("张")).filter(s -> s.length() == 3).forEach(s -> System.out.println(s));
          list.stream().filter(s -> s.startsWith("张")).filter(s -> s.length() == 3).forEach(System.out::println);
      }
  }
  ```

- Stream流的好处

  - 直接阅读代码的字面意思即可完美展示无关逻辑方式的语义：获取流、过滤姓张、过滤长度为3、逐一打印

  - Stream流把真正的函数式编程风格引入到Java中

## 2.2Stream流的常见生成方式

- Stream流的思想

  ![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/Stream流思想.jpg)

- 生成Stream流的方式

  - Collection体系集合

    使用默认方法stream()生成流， default Stream<E> stream()

  - Map体系集合

    把Map转成Set集合，间接的生成流

  - 数组

    通过Stream接口的静态方法of(T... values)生成流

- 代码演示

  ```java
  public class StreamDemo {
      public static void main(String[] args) {
          //Collection体系的集合可以使用默认方法stream()生成流
          List<String> list = new ArrayList<String>();
          Stream<String> listStream = list.stream();
  
          Set<String> set = new HashSet<String>();
          Stream<String> setStream = set.stream();
  
          //Map体系的集合间接的生成流
          Map<String,Integer> map = new HashMap<String, Integer>();
          Stream<String> keyStream = map.keySet().stream();
          Stream<Integer> valueStream = map.values().stream();
          Stream<Map.Entry<String, Integer>> entryStream = map.entrySet().stream();
  
          //数组可以通过Stream接口的静态方法of(T... values)生成流
          String[] strArray = {"hello","world","java"};
          Stream<String> strArrayStream = Stream.of(strArray);
          Stream<String> strArrayStream2 = Stream.of("hello", "world", "java");
          Stream<Integer> intStream = Stream.of(10, 20, 30);
      }
  }
  ```

## 2.3Stream流中间操作方法【重要】

- 概念

  中间操作的意思是，执行完此方法之后，Stream流依然可以继续执行其他操作。

- 常见方法

  | 方法名                                          | 说明                                                       |
  | ----------------------------------------------- | ---------------------------------------------------------- |
  | Stream<T> filter(Predicate predicate)           | 用于对流中的数据进行过滤                                   |
  | Stream<T> limit(long maxSize)                   | 返回此流中的元素组成的流，截取前指定参数个数的数据         |
  | Stream<T> skip(long n)                          | 跳过指定参数个数的数据，返回由该流的剩余元素组成的流       |
  | static <T> Stream<T> concat(Stream a, Stream b) | 合并a和b两个流为一个流                                     |
  | Stream<T> distinct()                            | 返回由该流的不同元素（根据Object.equals(Object) ）组成的流 |
  | Stream<T> sorted()                              | 返回由此流的元素组成的流，根据自然顺序排序                 |
  | Stream<T> sorted(Comparator comparator)         | 返回由该流的元素组成的流，根据提供的Comparator进行排序     |
  | <R> Stream<R> map(Function mapper)              | 返回由给定函数应用于此流的元素的结果组成的流               |
  | IntStream mapToInt(ToIntFunction mapper)        | 返回一个IntStream其中包含将给定函数应用于此流的元素的结果  |

- filter代码演示

  ```java
  public class StreamDemo01 {
      public static void main(String[] args) {
          //创建一个集合，存储多个字符串元素
          ArrayList<String> list = new ArrayList<String>();
  
          list.add("林青霞");
          list.add("张曼玉");
          list.add("王祖贤");
          list.add("柳岩");
          list.add("张敏");
          list.add("张无忌");
  
          //需求1：把list集合中以张开头的元素在控制台输出
          list.stream().filter(s -> s.startsWith("张")).forEach(System.out::println);
          System.out.println("--------");
  
          //需求2：把list集合中长度为3的元素在控制台输出
          list.stream().filter(s -> s.length() == 3).forEach(System.out::println);
          System.out.println("--------");
  
          //需求3：把list集合中以张开头的，长度为3的元素在控制台输出
          list.stream().filter(s -> s.startsWith("张")).filter(s -> s.length() == 3).forEach(System.out::println);
      }
  }
  ```

- limit&skip代码演示

  ```java
  public class StreamDemo02 {
      public static void main(String[] args) {
          //创建一个集合，存储多个字符串元素
          ArrayList<String> list = new ArrayList<String>();
  
          list.add("林青霞");
          list.add("张曼玉");
          list.add("王祖贤");
          list.add("柳岩");
          list.add("张敏");
          list.add("张无忌");
  
          //需求1：取前3个数据在控制台输出
          list.stream().limit(3).forEach(System.out::println);
          System.out.println("--------");
  
          //需求2：跳过3个元素，把剩下的元素在控制台输出
          list.stream().skip(3).forEach(System.out::println);
          System.out.println("--------");
  
          //需求3：跳过2个元素，把剩下的元素中前2个在控制台输出
          list.stream().skip(2).limit(2).forEach(System.out::println);
      }
  }
  ```

- concat&distinct代码演示

  ```java
  public class StreamDemo03 {
      public static void main(String[] args) {
          //创建一个集合，存储多个字符串元素
          ArrayList<String> list = new ArrayList<String>();
  
          list.add("林青霞");
          list.add("张曼玉");
          list.add("王祖贤");
          list.add("柳岩");
          list.add("张敏");
          list.add("张无忌");
  
          //需求1：取前4个数据组成一个流
          Stream<String> s1 = list.stream().limit(4);
  
          //需求2：跳过2个数据组成一个流
          Stream<String> s2 = list.stream().skip(2);
  
          //需求3：合并需求1和需求2得到的流，并把结果在控制台输出
  //        Stream.concat(s1,s2).forEach(System.out::println);
  
          //需求4：合并需求1和需求2得到的流，并把结果在控制台输出，要求字符串元素不能重复
          Stream.concat(s1,s2).distinct().forEach(System.out::println);
      }
  }
  ```

- sorted代码演示

  ```java
  public class StreamDemo04 {
      public static void main(String[] args) {
          //创建一个集合，存储多个字符串元素
          ArrayList<String> list = new ArrayList<String>();
  
          list.add("linqingxia");
          list.add("zhangmanyu");
          list.add("wangzuxian");
          list.add("liuyan");
          list.add("zhangmin");
          list.add("zhangwuji");
  
          //需求1：按照字母顺序把数据在控制台输出
  //        list.stream().sorted().forEach(System.out::println);
  
          //需求2：按照字符串长度把数据在控制台输出
          list.stream().sorted((s1,s2) -> {
              int num = s1.length()-s2.length();
              int num2 = num==0?s1.compareTo(s2):num;
              return num2;
          }).forEach(System.out::println);
      }
  }
  ```

- map&mapToInt代码演示

  ```java
  public class StreamDemo05 {
      public static void main(String[] args) {
          //创建一个集合，存储多个字符串元素
          ArrayList<String> list = new ArrayList<String>();
  
          list.add("10");
          list.add("20");
          list.add("30");
          list.add("40");
          list.add("50");
  
          //需求：将集合中的字符串数据转换为整数之后在控制台输出
  //        list.stream().map(s -> Integer.parseInt(s)).forEach(System.out::println);
  //        list.stream().map(Integer::parseInt).forEach(System.out::println);
  //        list.stream().mapToInt(Integer::parseInt).forEach(System.out::println);
  
          //int sum() 返回此流中元素的总和
          int result = list.stream().mapToInt(Integer::parseInt).sum();
          System.out.println(result);
      }
  }
  ```

## 2.4Stream流终结操作方法【应用】

- 概念

  终结操作的意思是，执行完此方法之后，Stream流将不能再执行其他操作。

- 常见方法

  | 方法名                        | 说明                     |
  | ----------------------------- | ------------------------ |
  | void forEach(Consumer action) | 对此流的每个元素执行操作 |
  | long count()                  | 返回此流中的元素数       |

- 代码演示

  ```java
  public class StreamDemo {
      public static void main(String[] args) {
          //创建一个集合，存储多个字符串元素
          ArrayList<String> list = new ArrayList<String>();
  
          list.add("林青霞");
          list.add("张曼玉");
          list.add("王祖贤");
          list.add("柳岩");
          list.add("张敏");
          list.add("张无忌");
  
          //需求1：把集合中的元素在控制台输出
  //        list.stream().forEach(System.out::println);
  
          //需求2：统计集合中有几个以张开头的元素，并把统计结果在控制台输出
          long count = list.stream().filter(s -> s.startsWith("张")).count();
          System.out.println(count);
      }
  }
  ```

## 2.5Stream流综合练习【应用】

- 案例需求

  现在有两个ArrayList集合，分别存储6名男演员名称和6名女演员名称，要求完成如下的操作

  - 男演员只要名字为3个字的前三人

  - 女演员只要姓林的，并且不要第一个

  - 把过滤后的男演员姓名和女演员姓名合并到一起

  - 把上一步操作后的元素作为构造方法的参数创建演员对象,遍历数据

  演员类Actor已经提供，里面有一个成员变量，一个带参构造方法，以及成员变量对应的get/set方法

- 代码实现

  ```java
  public class Actor {
      private String name;
  
      public Actor(String name) {
          this.name = name;
      }
  
      public String getName() {
          return name;
      }
  
      public void setName(String name) {
          this.name = name;
      }
  }
  
  
  public class StreamTest {
      public static void main(String[] args) {
          //创建集合
          ArrayList<String> manList = new ArrayList<String>();
          manList.add("周润发");
          manList.add("成龙");
          manList.add("刘德华");
          manList.add("吴京");
          manList.add("周星驰");
          manList.add("李连杰");
  
  
          ArrayList<String> womanList = new ArrayList<String>();
          womanList.add("林心如");
          womanList.add("张曼玉");
          womanList.add("林青霞");
          womanList.add("柳岩");
          womanList.add("林志玲");
          womanList.add("王祖贤");
  
          /*
          //男演员只要名字为3个字的前三人
          Stream<String> manStream = manList.stream().filter(s -> s.length() == 3).limit(3);
  
          //女演员只要姓林的，并且不要第一个
          Stream<String> womanStream = womanList.stream().filter(s -> s.startsWith("林")).skip(1);
  
          //把过滤后的男演员姓名和女演员姓名合并到一起
          Stream<String> stream = Stream.concat(manStream, womanStream);
  
          //把上一步操作后的元素作为构造方法的参数创建演员对象,遍历数据
  //        stream.map(Actor::new).forEach(System.out::println);
          stream.map(Actor::new).forEach(p -> System.out.println(p.getName()));
          */
  
          Stream.concat(manList.stream().filter(s -> s.length() == 3).limit(3),
                  womanList.stream().filter(s -> s.startsWith("林")).skip(1)).map(Actor::new).
                  forEach(p -> System.out.println(p.getName()));
      }
  }
  ```

## 2.6Stream流的收集操作【应用】

- 概念

  对数据使用Stream流的方式操作完毕后，可以把流中的数据收集到集合中。

- 常用方法

  | 方法名                         | 说明               |
  | ------------------------------ | ------------------ |
  | R collect(Collector collector) | 把结果收集到集合中 |

- 工具类Collectors提供了具体的收集方式

  | 方法名                                                       | 说明                   |
  | ------------------------------------------------------------ | ---------------------- |
  | public static <T> Collector toList()                         | 把元素收集到List集合中 |
  | public static <T> Collector toSet()                          | 把元素收集到Set集合中  |
  | public static  Collector toMap(Function keyMapper,Function valueMapper) | 把元素收集到Map集合中  |

- 代码演示

  ```java
  public class CollectDemo {
      public static void main(String[] args) {
          //创建List集合对象
          List<String> list = new ArrayList<String>();
          list.add("林青霞");
          list.add("张曼玉");
          list.add("王祖贤");
          list.add("柳岩");
  
          /*
          //需求1：得到名字为3个字的流
          Stream<String> listStream = list.stream().filter(s -> s.length() == 3);
  
          //需求2：把使用Stream流操作完毕的数据收集到List集合中并遍历
          List<String> names = listStream.collect(Collectors.toList());
          for(String name : names) {
              System.out.println(name);
          }
          */
  
          //创建Set集合对象
          Set<Integer> set = new HashSet<Integer>();
          set.add(10);
          set.add(20);
          set.add(30);
          set.add(33);
          set.add(35);
  
          /*
          //需求3：得到年龄大于25的流
          Stream<Integer> setStream = set.stream().filter(age -> age > 25);
  
          //需求4：把使用Stream流操作完毕的数据收集到Set集合中并遍历
          Set<Integer> ages = setStream.collect(Collectors.toSet());
          for(Integer age : ages) {
              System.out.println(age);
          }
          */
          //定义一个字符串数组，每一个字符串数据由姓名数据和年龄数据组合而成
          String[] strArray = {"林青霞,30", "张曼玉,35", "王祖贤,33", "柳岩,25"};
  
          //需求5：得到字符串中年龄数据大于28的流
          Stream<String> arrayStream = Stream.of(strArray).filter(s -> Integer.parseInt(s.split(",")[1]) > 28);
  
          //需求6：把使用Stream流操作完毕的数据收集到Map集合中并遍历，字符串中的姓名作键，年龄作值
          Map<String, Integer> map = arrayStream.collect(Collectors.toMap(s -> s.split(",")[0], s -> Integer.parseInt(s.split(",")[1])));
  
          Set<String> keySet = map.keySet();
          for (String key : keySet) {
              Integer value = map.get(key);
              System.out.println(key + "," + value);
          }
      }
  }
  ```

