# java集合

## 1、集合体系结构

<img src="https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/集合体系.png" style="zoom:80%;" />

## 2、由 ArrayList\<E>引入

E是泛型，它是ArrayList中的元素类型

* 构造方法

| 构造方法                         | 说明                           |
| -------------------------------- | ------------------------------ |
| `ArrayList()`                    | 构造一个初始容量为十的空列表。 |
| `ArrayList(int initialCapacity)` | 构造具有指定初始容量的空列表。 |

* 常用方法

| Modifier and Type | 方法                        | 描述                               |
| ----------------- | --------------------------- | ---------------------------------- |
| `void`            | `add(int index, E element)` | 在此列表中的指定位置插入指定的元素。 |
| `boolean`         | `add(E e)`                  | 将指定的元素追加到此列表的末尾。     |
| `E`       | `remove(int index)` | 删除该列表中指定位置的元素。                   |
| `boolean` | `remove(Object o)`  | 从列表中删除指定元素的第一个出现（如果存在）。 |
| `void` | `clear()` | 从列表中删除所有元素。 |
| `E`  | `get(int index)` | 返回此列表中指定位置的元素。 |
| `E`   | `set(int index, E element)` | 用指定的元素替换此列表中指定位置的元素。 |
| `int` | `size()` | 返回此列表中的元素数。 |
| `boolean` | `isEmpty()` | 如果此列表不包含元素，则返回 `true` 。 |

* 遍历集合

  ```java
  ArrayList<String> list= new ArrayList<String>();
  list.add("亚瑟");
  list.add("安琪拉");
  list.add("鲁班七号");
  list.add("瑶妹");
  
  /*第一种遍历：普通for遍历*/
  System.out.println("第1种遍历----------------");
  for(int i=0;i<list.size();i++){
      System.out.println(list.get(i));
  }
  /*第二种遍历：foreach遍历*/
  System.out.println("第2种遍历----------------");
  for(String name:list){
      System.out.println(name);
  }
  /*第三种遍历：iterator迭代器遍历*/
  System.out.println("第3种遍历---------------");
  Iterator<String> iterator = list.iterator();
  while(iterator.hasNext()){
      String s = iterator.next();
      System.out.println(s);
  }
  ```


## 3、Collection

* Collection集合概述
  ▶是单例集合的顶层接口，它表示一组对象, 这些对象也称为Collection的元素

  ▶JDK 不提供此接口的任何直接实现，它提供更具体的子接口(如Se和List) 实现

* Collection常用方法

  ![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/Collection常用方法.png)

### Iterator\<E>迭代器

Iterator:迭代器，集合的专用遍历方式
▶lterator\<E> iterator（）: 返回此集合中元素的迭代器,通过集合的==iterator( )==方法得到

▶迭代器是通过集合的iterator( )方法得到的，所以我们说它是依赖于集合而存在的

| Type      | 方法        | 描述                                   |
| --------- | ----------- | -------------------------------------- |
| `boolean` | `hasNext()` | 如果迭代具有更多元素，则返回 `true` 。 |
| `E`       | `next()`    | 返回迭代中的下一个元素。               |

## 4、 List

List集合概述
●有序集合(也称为序列)， 用户可以精确控制列表中每个元素的插入位置。用户可以通过整数索引|访问元素,并搜索列表中的元素

●与Set集合不同， 列表通常允许重复的元素

### List特有方法:

比Collection多了下列常用方法，

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/list特有方法.png)

==并行修改异常==

产生原因：用Iterator遍历中调用add()等方法修改列表。

解决办法：用for循环遍历列表，不用Iterator迭代器遍历

​					或者使用ListIterator提供的方法add()。见ListIterator

### ListIterator迭代器

通过List集合的listlterator( )方法得到，所以说它是List集合特有的迭代器。它继承了Iterator接口，有自己特有的方法

▶ E next():返回迭代中的下一个元素

▶ boolean hasNext( ):如果迭代具有更多元素,则返回true

▶ E previous( ):返回列表中的上一个元素

▶ boolean hasPrevious( ):如果此列表迭代器在相反方向遍历列表时具有更多元素，则返回true

▶ void add(E e):将指定的元素插入列表

==列表迭代器的逆向遍历==

注：不能直接使用逆向，因为指针默认初始指向第一个元素。hasPrecious()为false

因此并不常用

```java
ListIterator<String> lt = list.listIterator();
        System.out.println("正向遍历---------");
while (lt.hasNext()){
            String s = lt.next();
            System.out.print(s+" ");
        }
        System.out.println("\n逆向遍历----------");
while (lt.hasPrevious()){
            String s = lt.previous();
            System.out.print(s+" ");
        }
```

==ListIterator中的add()方法==

通过迭代器对象对列表进行添加元素，不会产生并发修改异常。

### 增强for语句（for-each）

针对数组和Collection集合。在ArrayList中已经演示过使用方法。

它的内部使用的是Iterator迭代器

格式:

```
for(元素数据类型铭:数组或者Collection集合) {
//在此处使用变量即可，变量就是元素
}
```

### ArrayList, LinkedList

List集合常用子类: ArrayList, LinkedList

●ArrayList: 底层数据结构是数组，查询快，增删慢

●LinkedList: 底层数据结构是链表,查询慢,增删快

==LinkedList特有的方法==

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/LinkedList特有方法.png)

### ArrayList底层原理

1）ArrayList中维护了一个Object类型的数组elementData.

2）当创建ArrayList对象时，如果使用的是无参构造器，则初始elementData容量为0, 第1次添加，则扩容elementData为10,如需要再次扩容，则扩容elementData为1 .5倍。

3）如果使用的是指定大小的构造器，则初始elementData容量为指定大小， 如果需要扩容，
则直接扩容elementData为1.5倍。

## 5、Set集合

它继承了Collection接口，其中方法也比较局限，没有List那么多的方法。

●==没有带索引的方法，所以不能使用普通for循环遍历==

### 哈希值

由对象产出的一个int类型的整数

对象的哈希值特点
●同一个对象多次调用hashCode(方法返回的哈希值是相同的

●默认情况下，不同对象的哈希值是不同的。而重写hashCode0方法，可以实现让不同对象的哈希值相同

### HashSet

HashSet:对集合的迭代顺序不作任何保证

==保证元素唯一性源码==

<img src="https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/hashset保证元素唯一性.png" style="zoom:80%;" />

==哈希表==

JDK8之前，底层采用数组+链表实现，可以说是一个==元素为链表的数组==

JDK8以后，在长度比较长的时候，底层实现了优化

**底层结构**

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/哈希表结构.png)



**练习：**

创建一一个存储学生对象的集合,存储多个学生对象,使用程序实现在控制台遍历该集合

要求:学生对象的成员变量值相同，我们就认为是同一个对象

```
①定义学生类
②创建HashSet集合对象
③创建学生对象
④把学生添加到集合
⑤遍历集合(增强for)
⑥在学生类中重写两个方法
	hashCode0和equals()
	IDEA自动生成即可

```

### HashSet底层原理

https://blog.csdn.net/yueaini10000/article/details/109030129



HashSet的方法contains()方法的复杂度为O(1)。

https://blog.csdn.net/qingtian_1993/article/details/80763381

https://www.cnblogs.com/jiezai/p/11149932.html

### LinkedHashSet

LinkedHashSet集合特点
●哈希表和链表实现的Set接口， 具有==可预测的迭代次序==

●由链表保证元素有序，也就是说元素的存储和取出顺序是一致的

●由哈希表保证元素唯一， 也就是说没有重复的元素

### TreeSet

元素有序，这里的顺序不是指存储和取出的顺序,而是按照一定的规则进行排序,排序方式取决于构造方法

没有带索引的方法，所以不能使用普通for循环遍历

| 构造方法                                                |
| ------------------------------------------------------- |
| TreeSet（）:根据其元素的自然排序进行排序                |
| TreeSet(Comparator comparator):根据指定的比较器进行排序 |

添加一般数据类型时，TreeSet会自动将元素从小到大排列。取出时，也是

### 自然排序Comparable使用

自然排序，就是让元素所属的类实现Comparable接口，重写compareTo(T o)方法

**案例：**

存储学生对象并遍历，创建TreeSet集合使用无参构造方法

要求:按照年龄从小到大排序，年龄相同时，按照姓名的字母顺序排序

```java
public class Beauty implements Comparable<Beauty>{
    private String name;
    private int age;
    public Beauty(){

    }
    public Beauty(String name, int age){
        this.name = name;
        this.age = age;
    }
    public String toString(){
        return this.name+":"+this.age;
    }

    @Override
    public int compareTo(Beauty b) {
        int num  = this.age-b.age;//当前对象的age与要比较的age相减
//        num = num==0?this.name.compareTo(b.name):num;
        if(num==0){
            num = this.name.compareTo(b.name);
        }
        return num;
    }
}
```

```java
public class TreeSetTest {
    public static void main(String[] args) {
        TreeSet<Beauty> ts = new TreeSet<Beauty>();
        Beauty beauty1  = new Beauty("西施",31);
        Beauty beauty2  = new Beauty("王昭君",30);
        Beauty beauty3  = new Beauty("貂蝉",29);
        Beauty beauty4  = new Beauty("杨玉环",33);
        Beauty beauty5 = new Beauty("meiren",33);//年龄与杨贵妃相同
        ts.add(beauty1);
        ts.add(beauty2);
        ts.add(beauty3);
        ts.add(beauty4);
        ts.add(beauty5);
        for (Beauty b : ts){
            System.out.println(b);
        }
    }

}
```

## 6、可变参数的方法

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/Arrays-List-Set可变参数的方法.png)



## 7、Map

**概述**

Interface Map<K,V> K: 键的类型; V:值的类型

将键映射到值的对象;==不能包含重复的键==;每个键可以映射到最多一个值

**map基本方法**

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/map方法.png)

==注：==调用put()方法时，如果key在之前已经存在，则会更新当前key对应的value.

==map获取元素的方法==

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/map获取元素的方法.png)

**Map集合的遍历**

1. 方式1

   ```
   我们刚才存储的元素都是成对出现的，所以我们把Map看成是一个夫妻对的集合
   遍历思路
   ●把所有的丈夫给集中起来
   ●遍历丈夫的集合，获取到每一个丈夫
   ●根据丈夫去找对应的妻子
   
   转换为Map集合中的操作:
   ●获取所有键的集合。用keySet(方法实现
   ●遍历键的集合，获取到每一个键。 用增强for实现
   ●根据键去找值。用get(Object key)方法实现
   
   ```

   ==注意：==这种遍历的结果不是可预测的顺序。

   ```java
   HashMap<String, Integer> map = new HashMap<>();
   map.put("鲁班",23);
   map.put("安琪拉",200);
   map.put("瑶妹",10);
   map.put("成吉思汗",30);
   
   //利用key组成的Set集合遍历map
   Set<String> keyset = map.keySet();
   System.out.println(keyset);
   for(String name : keyset){
       Integer age = map.get(name);
       System.out.println(name+":"+age);
   }
   ```

2. 方式2

   `Map.Entry<K,V>`是一个接口。

   利用

   ```markdown
   遍历思路
   ●获取所有结婚证的集合 Map.Entry<K,V>
   ●遍历结婚证的集合,得到每一个结婚证
   ●根据结婚证获取丈夫和妻子
   
   
   转换为Map集合中的操作:
   ●获取所有键值对对象的集合
   	Set <Map.Entry<K,V> > entrySet0:获取所有键值对对象的集合
   ●遍历键值对对象的集合， 得到每一个键值对对象
   	用增强for实现，得到每一个Map.Entry
   ●根据键值对对象获取键和值
   	用getKey0得到键
   	用getValue0得到值
   
   ```

   同样遍历的结果顺序是不可预测的：

   ```java
   Map<String, Integer> map = new HashMap<>();
   map.put("鲁班",23);
   map.put("安琪拉",200);
   map.put("瑶妹",10);
   map.put("成吉思汗",30);
   //获取键值对的Set集合。相当于结婚证集合。集合中的元素是Map.Entry<String, Integer>。
   Set<Map.Entry<String, Integer>> entries = map.entrySet();
   for(Map.Entry<String, Integer> me :entries){
       String key = me.getKey();
       Integer value = me.getValue();
       System.out.println(key+":"+value);
   }
   ```

**HashMap**    和   **TreeMap**

它们都间接的实现了Map接口，有相同的方法。==但是TreeMap是按key值排序的==

## 8、集合嵌套

以ArrayList嵌套HashMap为例

`创建一个ArrayList集合, 存储两个元索，每一个元索都是HashMap, 每一个HashMap的键和值都是String, 并遍历`

```java
public static void main(String[] args) {
    ArrayList<HashMap<String,String>> arrayList = new ArrayList<HashMap<String,String>>();
    HashMap<String, String> map1 = new HashMap<String,String>();
    map1.put("001","周文俊");
    map1.put("002","葛浩东");
    map1.put("003","彭于晏");
    HashMap<String, String> map2 = new HashMap<String,String>();
    map2.put("004","汪汪");
    map2.put("005","鹏鹏鸟");

    arrayList.add(map1);
    arrayList.add(map2);
    for (HashMap<String,String> stu :arrayList){
        System.out.println(stu);//每次遍历获取的是HashMap对象
    }

}
```

## 9、Collections类

1. 用Collections类对List集合排序

     需求：
         ArrayList存储学生对象，使用Collections对ArrayList进行排序
         要求：按照年龄从小到大排序，年龄相同时，按照姓名的字母顺序排序

```java
public static void main(String[] args) {
    //创建ArrayList集合对象
    ArrayList<Student> array = new ArrayList<Student>();

    //创建学生对象
    Student s1 = new Student("linqingxia", 30);
    Student s2 = new Student("zhangmanyu", 35);
    Student s3 = new Student("wangzuxian", 33);
    Student s4 = new Student("liuyan", 33);

    //把学生添加到集合
    array.add(s1);
    array.add(s2);
    array.add(s3);
    array.add(s4);

    //使用Collections对ArrayList集合排序
    //sort(List<T> list, Comparator<? super T> c)
    Collections.sort(array, new Comparator<Student>() {
        @Override
        public int compare(Student s1, Student s2) {
            //按照年龄从小到大排序，年龄相同时，按照姓名的字母顺序排序
            int num = s1.getAge() - s2.getAge();
            int num2 = num == 0 ? s1.getName().compareTo(s2.getName()) : num;
            return num2;
        }
    });

    //遍历集合
    for (Student s : array) {
        System.out.println(s.getName() + "," + s.getAge());
    }

}
```

## 10、练习

### 统计字符串

需求：
    键盘录入一个字符串，要求统计字符串中每个字符串出现的次数。
    举例：键盘录入“aababcabcdabcde”   在控制台输出：“a(5)b(4)c(3)d(2)e(1)”

```
思路：
    1:键盘录入一个字符串
    2:创建HashMap集合，键是Character，值是Integer
    3:遍历字符串，得到每一个字符
    4:拿得到的每一个字符作为键到HashMap集合中去找对应的值，看其返回值
        如果返回值是null：说明该字符在HashMap集合中不存在，就把该字符作为键，1作为值存储
        如果返回值不是null：说明该字符在HashMap集合中存在，把该值加1，然后重新存储该字符和对应的值
    5:遍历HashMap集合，得到键和值，按照要求进行拼接
    6:输出结果
```

```java
public static void main(String[] args) {
        //键盘录入一个字符串
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入一个字符串：");
        String line = sc.nextLine();

        //创建HashMap集合，键是Character，值是Integer
//        HashMap<Character, Integer> hm = new HashMap<Character, Integer>();
        TreeMap<Character, Integer> hm = new TreeMap<Character, Integer>();

        //遍历字符串，得到每一个字符
        for (int i = 0; i < line.length(); i++) {
            char key = line.charAt(i);

            //拿得到的每一个字符作为键到HashMap集合中去找对应的值，看其返回值
            Integer value = hm.get(key);

            if (value == null) {
                //如果返回值是null：说明该字符在HashMap集合中不存在，就把该字符作为键，1作为值存储
                hm.put(key,1);
            } else {
                //如果返回值不是null：说明该字符在HashMap集合中存在，把该值加1，然后重新存储该字符和对应的值
                value++;
                hm.put(key,value);
            }
        }

        //遍历HashMap集合，得到键和值，按照要求进行拼接
        StringBuilder sb = new StringBuilder();

        Set<Character> keySet = hm.keySet();
        for(Character key : keySet) {
            Integer count = hm.get(key);
            sb.append(key).append("(").append(count).append(")");
        }

        String result = sb.toString();

        //输出结果
        System.out.println(result);
    }
```

### 斗地主（带排序版）

需求:通过程序实现斗地主过程中的洗牌，发牌和看牌。要求:对牌进行排序

思路:
①创建HashMap,键是编号，值是牌
②创建ArrayList, 存储编号
③创建花色数组和点数数组
④从开始往HashMap里面存储编号,并存储对应的牌。同时往ArrayList里面存储编号
⑤洗牌(洗的是编号),用Collections的shuffle0方法实现。==这里还是对ArrayList牌编号进行打乱==
⑥发牌(发的也是编号,为了保证编号是排序的，创建TreeSet集合接收)
⑦定义方法看牌(遍历TreeSet集合,获取编号,到HashMap集合找对应的牌)

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/斗地主升级版.png)

```java
public static void main(String[] args) {
    //1、创建一桌完整的牌, 键是编号，值是牌
    HashMap<Integer, String> box = new HashMap<>();

    String[] colors = {"♠","♣","♥","♦"};//花色
    String[] numbers = {"3","4","5","6","7","8","9","10","J","Q","K","A","2"};//点数
    int index = 1;//牌的编号，对应Integer
    //注意这一步，必须是序号在外层循环，花色在内存循环
    for (String number : numbers){
        for (String color : colors){
            box.put(index,color+number);
            index++;//序号加一
        }
    }
    box.put(53,"小王");
    box.put(54,"大王");

    //2、创建ArrayList，只存储编号
    ArrayList<Integer> tags = new ArrayList<>();
    for(int i=1;i<=54;i++){
        tags.add(i);
    }

    //3、洗牌
    Collections.shuffle(tags);
    //4、发牌(发的是编号,存储在TreeSet集合中就有序了)
    TreeSet<Integer> gedaye = new TreeSet<Integer>();
    TreeSet<Integer> junjun = new TreeSet<Integer>();
    TreeSet<Integer> wangwang = new TreeSet<Integer>();
    TreeSet<Integer> dipai = new TreeSet<Integer>();
    for (int i=0; i<tags.size();i++){
        int x =tags.get(i);//获取当前牌的编号
        if(i>=tags.size()-3){
            dipai.add(x);
        }
        else if (i%3==0){
            gedaye.add(x);
        }else if(i%3==1){
            junjun.add(x);
        }else {
            wangwang.add(x);
        }
    }
    //5、看牌
    lookPoker("葛大爷",gedaye,box);
    lookPoker("周俊俊",junjun,box);
    lookPoker("汪汪汪",wangwang,box);
    lookPoker("底牌",dipai,box);

}
//看牌的独立函数,遍历的是手牌（即TreeSet）
public static void lookPoker(String name, TreeSet<Integer> treeSet, HashMap<Integer,String> box){
    System.out.print(name+"的牌：");
    for(Integer x : treeSet){
        String poker = box.get(x);//根据编号找牌
        System.out.print(poker+" ");
    }
    System.out.println();
}
```









