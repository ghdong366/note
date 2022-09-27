File类和IO流

# 第一章、File类

### 概述

File:它文件和目录路径名的抽象表示。主要用于文件和目录的创建、查找和删除等操作。
文件和目录是可以通过File封装成对象的对于File而言，其封装的并不是一个真正存在的文件,仅仅是一个路径名而已。它可以是存在的，也可以是不存在的。

==IDEA中的路径问题==

默认当前的路径为工程的根目录（注意是否分模块）

1. 如果要访问工程文件夹中的文件

   ```
   文件名
   ```

2. 如果要访问某个模块下的文件

   ```
   模块名\\文件名
   ```

3. 如果访问某个src文件夹中的文件

   ```
   模块名\\src\\文件名
   ```

   

### 静态成员变量

static String pathSeparator 与系统相关的路径分隔符字符，为方便起见，表示为字符串。  

static char pathSeparatorChar 与系统相关的路径分隔符。  

static String separator 与系统相关的默认名称的分隔符字符，以方便的方式表示为字符串。  

static char separatorChar 与系统相关的默认名称分隔符。  

```
windows中：
			pathSeparator是     分号（;）
			separator是         反斜杠(\)
linux中：
			pathSeparator是     冒号（:）
			separator是         正斜杠(/)
```

### 构造方法：

| 构造方法                           | 描述                                                         |
| ------------------------------| ------------------------------------------------- |
| File(String pathname)       | 通过将给定的路径名字符串转换为抽象路径名来创建新的 `File`实例。 |
| File(String parent,  String child) | 从父路径名字符串和子路径名字符串创建新的 `File`实例。        |
| File(File parent, String child) | 从父抽象路径名和子路径名字符串创建新的 `File`实例。 |

### 常用方法：

**创建方法：**


|返回值|创建相关方法|功能说明|
|-------------------------------------|-----------------------------------|-----------------------------------|
|public boolean |createNewFile(): |当具有该名称的文件不存在时，创建一个由该抽象路径名命名的新空文件|
|public boolean | mkdir():         |创建由此抽象路径名命名的目录|
|public boolean | mkdirs():        |创建由此抽象路径名命名的目录，创建多级目录|

```java
//需求1:我要在E:\JavaSource\files 目录下创建一个文件java. txt
	File f1 = new File("E:\\JavaSource\\files\\java.txt");
	System.out.println(f1.createNewFile());
//需求2:我要在E:\JavaSource\files 目录下创建一个目录JavaHello
	File f2 = new File("E:\\JavaSource\\files\\JavaHello");
	System.out.println(f2.mkdir());

//需求3:我要在E:\JavaSource\files 日录 下创建一个多 级目录JavaWEB\\HTML
 	File f3 = new File("E:\\JavaSource\\files\\JavaWEB\\HTML");
//        System.out.println(f3.mkdir());  不能使用mkdir创建多级目录
	System.out.println(f3.mkdirs());
//需求4:我要在E:\JavaSource\files 目录下创建一个文件夹javase.txt
	File f4 = new File("E:\\JavaSource\\files\\javase.txt");
	System.out.println(f4.mkdirs());
```

==注意：==

1. 如果文件不存在，就创建文件，并返回true
   如果文件存在，就不创建文件，并返回false

2. 创建文件时，如果上级目录不存在，也无法创建该文件

3. 不能通过文件路径来判断File对象表示的是文件目录还是文件。

   如 `E:\\JavaSource\\files\\javase.txt   `  它也有可能是javase.txt文件夹

**判断和获取功能**

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/File获取判断方法.png)

**删除功能**
|删除方法|说明|
|-----|------|
|public boolean delete（）|删除由此抽象路径名表示的文件或目录|

==注意：==

如果一个目录中有内容(==目录,文件==),不能直接删除。应该先删除目录中的内容，最后才能删除目录。

### 练习

1. 遍历一个文件夹下（及子文件夹）中的所有文件

   ```java
   public static void getAllFile(File directory){
       File[] files = directory.listFiles();
       for (File f : files){
           if (f.isDirectory()){
               getAllFile(f);
           }else {
               System.out.println(f.getAbsolutePath());
           }
       }
   }
   ```

2. 搜索某一文件夹中的`.java`格式的文件

   首先遍历文件，获取文件的名字filename。

   根据名字查看是够是`.java`文件。这里涉及到String类的一个方法，判断一个字符串是否以指定的字符串结尾。

   ```java
   boolean b = filename.endsWith(".java");
   ```

# 第二章、IO流

### 2.1 IO流概述和分类

**IO流概述:**
IO: 输入/输出(Input/Output)
流:是一种抽象概念，是对数据传输的总称。也就是说数据在设备间的传输称为流，流的本质是数据传输
IO流就是用来处理设备间数据传输问题的
常见的应用:文件复制;文件上传;文件下载

**分类**

I0流分类:
● 按照数据的流向（==输入输出都是以内存作为参考==）
					输入流:读数据（数据从硬盘读到内存）
					输出流:写数据（数据从内存写入硬盘）
●按照数据类型来分
					字节流
							字节输入流;字节输出流
					字符流
							字符输入流;字符输出流

**顶层超类**

|        | 输入流                     | 输出流                       |
| ------ | -------------------------- | ---------------------------- |
| 字节流 | 字节输入流<br/>InputStream | 字节输出流<br />OutputStream |
| 字符流 | 字符输入流<br/>Reader      | 字符输出流<br/>Writer        |

如果数据通过Window自带的记事本软件打开，我们还可以读懂里面的内容,就使用字符流，
否则使用字节流。如果你不知道该使用哪种类型的流，就使用字节流

### 2.2  字节流

`InputStream:`这个抽象类是表示字节输入流的所有类的超类
`OutputStream`:这个抽象类是表示字节输出流的所有类的超类
子类名特点:子类名称都是以其父类名作为子类名的后缀

#### 2.2.1  FileOutputStream字节流写数据

使用字节输出流写数据的步骤:
●创建字节输出流对象(

​		调用系统功能创建了文件

​		创建字节输出流对象

​		让字节输出流对象指向文件)
●调用字节输出流对象的写数据方法
●释放资源(关闭此文件输出流并释放与此流相关联的任何系统资源

==注意：==

所有与IO流相关的对象，都要手动释放资源.

**创建FileOutputStream对象**

```java
FileOutputStream fileOutputStream = new FileOutputStream("hi.txt");
//相当于 FileOutputStream fileOutputStream = new FileOutputStream(new File("hi.txt"));
```

**FileOutputStream写数据的方法**

| 返回值 | 方法 | 描述 |
| ------ | ------------------- | ---------------------------------------- |
| `void` | `write(int b)`       | 将指定的字节写入此文件输出流。      |
| `void` | `write(byte[] b)` | 将 `b.length`字节从指定的字节数组写入此文件输出流。     |
| `void` | `write(byte[] b,  int off, int len)` | 将 `len`字节从指定的字节数组开始，从偏移量 `off`开始写入此文件输出流。 |

==写数据的两个问题==

1. 如何实现换行

   ```
   FileOutputStream fileOutputStream = new FileOutputStream("换行和追加.txt");
   for (int i=0;i<=10;i++){
       //通过字符串中的转义字符来实现换行
       fileOutputStream.write("hello".getBytes());
       fileOutputStream.write("\n".getBytes());
   }
   ```

2. 追加数据，而不是重写数据

   使用`public FileOutputStream(String name,boolean append)`构造函数来创建，设置append为true。就可以实现每次运行程序`write`从文件的末尾追加数据

#### 2.2.2  FileInputStream字节流读数据

使用字节输入流读数据的步骤:

* 1、创建字节输入流对象
* 2、调用字节输入流对象的读数据方法
* 3、释放资源

**创建FileInputStream对象**

```java
FileInputStream fileInputStream = new FileInputStream("小猪佩奇.txt");
```

==注意：==创建FileInputStream对象时，文件必须已经存在

**读数据的方法**

| 返回值 |             读数据方法              | 说明                                                         |
| ----- | :------------------:| :------------------------ |
| `int` | `read()`           | 从该输入流读取一个字节的数据。**返回值为当前字节数值**，==读到末尾返回-1== |
| `int` | `read(byte[] b)`  | 从该输入流读取最多 `b.length`个字节的数据到一个字节数组b中。 |
| `int` | `read(byte[] b,  int off, int len)` | 从该输入流读取最多 `len`个字节的数据到字节数组。|

```java
FileInputStream fileInputStream = new FileInputStream("小猪佩奇.txt");
//        读取一个字符
        //int read = fileInputStream.read();
        //System.out.println((char) read);

 //     遍历文件中的所有字符
        int now_char = fileInputStream.read();
        while (now_char!=-1){
            System.out.println((char) now_char);
            now_char = fileInputStream.read();
        }
        //释放资源
        fileInputStream.close();
```

**案例*

1. 复制文本文件 

   ```java
   /*
    *案例
    * 将E:\JavaSource\files\pig.txt文件复制到当前工程下 (pig副本.txt)
    * 就是先读文件，将里面的所有字节都复制奥
    */
    FileInputStream resource = new FileInputStream("E:\\JavaSource\\files\\pig.txt");
    FileOutputStream goal = new FileOutputStream("pig副本.txt");
   
        int x = resource.read();
        while (x!=-1){
          goal.write(x);
          x=resource.read();
        }
   //释放资源
        resource.close();
        goal.close();
   ```

2. 复制图片文件

   ```java
   /*
      每次读取100字节
   	将读取的字节放到arr临时数组中（数组的类型是byte[]）
   */
   
   public class CopyFile  {
       public static void main(String[] args) throws IOException {
           FileInputStream fi = new FileInputStream("IO\\source\\photo.png");
           FileOutputStream fos = new FileOutputStream("IO\\photo副本.png");
           byte[] arr = new byte[100];
           int read = fi.read(arr);
           fos.write(arr);
           while (read!=-1) {
               read = fi.read(arr);
               fos.write(arr);
           }
       }
   }
   ```

#### 2.2.3  字节缓冲流

* `BufferOutputStream`:该谈实现缓冲输出流。通过设置这样的输出流， 应用程序可以向底层输出流写入字节,而不必为写入的每个字节导致底层系统的调用
* `BufferedInputStream`:创建BufferedInputStream将创建一 个内部缓冲区数组。 当从流中读取或跳过字节时, 内部缓冲区将根据需要从所包含的输入流中重新填充，一次很多字节

**对应的构造方法：**

字节缓冲输出流: BufferedOutputStream(OutputStream out)
字节缓冲输入流: BufferedInputStream(InputStream in)

==为什么构造方法需要的是字节流，而不是具体的文件或者路径呢?==
●字节缓冲流仅仅提供缓冲区， 而真正的读写数据还得依靠基本的字节流对象进行操作

**方法：**

它们的方法名和对应的字节流对象相同。

```java
//字节输出缓冲流  使用举例
public static void main(String[] args) throws IOException {
    FileOutputStream file = new  FileOutputStream("字节输出缓冲流.txt");
    BufferedOutputStream bufferedOutputStream  = new BufferedOutputStream(file);
    bufferedOutputStream.write("字节缓冲流\n".getBytes());
    bufferedOutputStream.close();
    file.close();
}
```

**四种方式实现复制视频，并记录每种方式复制视频的时间**
1:基本字节流（一次读写一个字节 ）               共耗时: 64565毫秒
2:基本字节流（一次读写一个字节数组）       共耗时: 107毫秒
3:字节缓冲流（一次读写一个字节 ）            共耗时: 405毫秒
4:字节缓冲流（一次读写一个字节数组 ）      共耗时: 60毫秒

### 2.3  字符流

#### 2.3.1  字符流出现的原因：

字节流处理中文时，不知道编码格式，就会出现错误。

```
用字节流复制文本文件时，本文件也会有中文，但是没有问题，原因是最终底层操作会自动进行字节拼接成中文，如何识别是中文的呢?
●汉字在存储的时候， 无论选择哪种编码存储，第一个字节都是负数
```

字符流=字节流+编码表

#### 2.3.2 编码表

| 编码表  |  位数   | 说明                                                         |
| ------- | :-----: | ------------------------------------------------------------ |
| ASCII   |   8位   | ASCII(American Standard Code for Information Interchange,美国信息交换标准代码):是基于拉打字母的一套电脑编码系统,用于显示现代英语，主要包括控制字符(回车键、退格、换行键等)和可显示字符(英文大小写字符、阿拉伯数字和西文符号) |
| GB2312  |  16位   | 简体中文码表。一个小于127的字符的意义与原来相同，但两个大于127的字符连在一起时,就表示一个汉字,这样大约可以组合了包含7000多个简体汉字,此外数学符号、罗马希腊的字母、暗的假名等都编进去了，连在ASCI里本来就有的数字、标点、字母都统统重新编了两个字节长的编码，这就是常说的"全角"字符，而原来在127号以下的那些就叫"半角”字符了 |
| GBK     |  16位   | 常用的中文码表。是在GB2312标准基础上的扩展规范，使用了双字节编码方案，共收录了21003个汉字,完全兼容GB2312标准，同时支持繁体汉字以及日韩汉字等 |
| GB18030 |  16位   | 最新的中文码表。收录汉字70244个,采用多字节编码,每个字可以由1个、2个或4个字节组成。支持中国国内少数民族的文字，同时支持繁体汉字以及日韩汉字等 |
| Unicode | 1~4字节 | 为表达任意语言的任意字符而设计， 是业界的一种标准，也称为统一码、标准万国码。它最多使用4个字节的数字来表达每个字母、符号,或者文字。有三种编码方案, UTF-8、 UTF-16和UTF32。 ==最为常用的UTF-8编码== |

```
UTF-8编码:可以用来表示Unicode标准中任意字符,它是电子邮件、网页及其他存储或传送文字的应用
中，优先采用的编码。互联网工程工作小组(IETF) 要求所有互联网协议都必须支持UTF-8编码。它使用
一至四个字节为每 个字符编码
编码规则:
	128个US-ASCII字符,只需一个字节编码
	拉丁文等字符,需要二个字节编码
	大部分常用字(含中文)，使用三个字节编码
	其他极少使用的Unicode辅助字符，使用四字节编码
	
小结:采用何种规则编码，就要采用对应规则解码，否则就会出现乱码
```

#### 2.3.3 字符串的编码和解码

**编码:**

编码:
`byte[] getBytes（）`:使用平台的默认字符集将该String编码为-系列字节,将结果存储到新的字节数组中
`byte[] getBytes(String charsetName`):使用指定的字符集将该String编码为一系列字节,将结果存储
到新的字节数组中

**解码：**

`String(byte[] bytes)`:通过使用平台的默认字符集解码指定的字节数组来构造新的String
`String(byte[] bytes, String charsetName)`:通过指定的字符集解码指定的字节数组来构造新的String

```java
 //定义一个字符串
        String s = "中国";

        //byte[] getBytes()：使用平台的默认字符集将该 String编码为一系列字节，将结果存储到新的字节数组中
        //byte[] bys = s.getBytes(); //[-28, -72, -83, -27, -101, -67]
        //byte[] getBytes(String charsetName)：使用指定的字符集将该 String编码为一系列字节，将结果存储到新的字节数组中
//        byte[] bys = s.getBytes("UTF-8"); //[-28, -72, -83, -27, -101, -67]
        byte[] bys = s.getBytes("GBK"); //[-42, -48, -71, -6]
        System.out.println(Arrays.toString(bys));

        //String(byte[] bytes)：通过使用平台的默认字符集解码指定的字节数组来构造新的 String
//        String ss = new String(bys);
        //String(byte[] bytes, String charsetName)：通过指定的字符集解码指定的字节数组来构造新的 String
//        String ss = new String(bys,"UTF-8");
        String ss = new String(bys,"GBK");
        System.out.println(ss);
```

#### 2.3.4  字符流的编码和解码

**OutputStreamWriter：是从字符流到字节流的桥梁**
		是从字符流到字节流的桥梁，使用指定的编码将写入的字符编码为字节
        它使用的字符集可以由名称指定，也可以被明确指定，或者可以接受平台的默认字符集

构造函数：

`OutputStreamWriter(OutputStream out)` 创建一个使用默认字符编码的OutputStreamWriter。
`OutputStreamWriter(OutputStream out, String charsetName) `创建一个使用命名字符集的OutputStreamWriter。

```java
OutputStreamWriter osw = new OutputStreamWriter(new FileOutputStream("myCharStream\\osw.txt"),"GBK");
        osw.write("中国");
        osw.close();
```

**InputStreamReader：是从字节流到字符流的桥梁**
        它读取字节，并使用指定的编码将其解码为字符
        它使用的字符集可以由名称指定，也可以被明确指定，或者可以接受平台的默认字符集

构造函数：

`InputStreamReader(InputStream in)` 创建一个使用默认字符集的InputStreamReader。
`InputStreamReader(InputStream in, String charsetName)` 创建一个使用命名字符集的InputStreamReader。

```java
InputStreamReader isr = new InputStreamReader(new FileInputStream("myCharStream\\osw.txt"),"GBK");
        //一次读取一个字符数据
        int ch;
        while ((ch=isr.read())!=-1) {
            System.out.print((char)ch);
        }
    isr.close();
```

#### 2.3.5  OutputStreamWriter写数据：

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/字符流写数据.png)

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/11.png)

#### 2.3.6 InputStreamReader读数据

读数据

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/InputStreamReader读数据.png)

==注意：==

在FileInputStream中read()参数是byte[]字节型数组

在InputStreamReader中read()参数是char[]字符型数组

#### 2.3.7  FileWriter

它是OutputStreamWrite的子类，新建对象时可直接给文件路径，无须再提供一个FileOutputStream对象。另外它==也需要使用flush函数==刷新流。但是它不能直接指定字符编码。若想指定字符编码，继续用OutputStreamWrite或者在新建对象时，构造方法中指定一个CharSet对象

#### 2.3.8  FileReader

使用默认的字符集来读取数据。<font color="red">在java项目中是utf8,在web项目中，是GBK</font>

==所谓的默认字符编码，其实就是JVM启动时候的本地编码。==

```java
//默认的字符编码
Charset.defaultCharset().name();

//也可用下面的语句查询默认的字符编码
String coding = System.getProperty("file.encoding");
System.out.println(coding);
```



#### 2.3.9  字符缓冲流

**BufferedWriter** 

构造方法：

`BufferedWriter(Writer out)`创建使用默认大小的输出缓冲区的缓冲字符输出流。

`BufferedWriter(Writer out,  int sz)` 创建一个新的缓冲字符输出流，使用给定大小的输出缓冲区。 

==参数Write可以是`OutputStreamWrite`或者`FileWriter`==

**BufferedReader**

构造方法：

`BufferedReader(Reader in)`创建使用默认大小的输入缓冲区的缓冲字符输入流。 

`BufferedReader(Reader in,  int sz)`创建使用指定大小的输入缓冲区的缓冲字符输入流。

==参数Reader可以是InputStreamReader或者FileReader==

#### 2.3.10  字符缓冲流的特殊功能

```
BufferedWriter:
	●void newLine():写一行 自带行分隔符,行分隔符字符串由系统属性定义
	
BufferedReader:
	●public String readLine():读一行文字。结果包含行的内容的字符串， 不包括任何行终止字符,如果流的结尾已经到达，则为null

```

### 2.4 IO小结

**字节流：**

字节流可以复制任意文件数据，有4种方式一般采用字节缓冲流一次读写一个字节数组的方式

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/字节流.png)



**字符流：**

小结:字符流只能复制文本数据，有5种方式，一般采用字符缓冲流的特有功能

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/字符流.png)

### 2.5  案例

1. 复制单级文件夹

   ```java
   /*
   复制单级文件夹
   将E:\JavaSource\files\dir 文件夹
   复制工程目录下
    */
   public class Dmeo1 {
       public static void main(String[] args) throws IOException {
           File res = new File("E:\\JavaSource\\files\\dir");
           String dirName = res.getName();//获取
           File dir = new File(dirName);//创建目标文件夹对象
           if (!dir.exists()){
               dir.mkdir();//不存在就创建
           }
           //获取源文件夹中的文件列表
           File[] files = res.listFiles();
           for (File f:files){
               String fileName = f.getName();
               //复制文件，因为有照片，所以用字节流
               //先读后写
               BufferedInputStream  bis= new BufferedInputStream(new FileInputStream(res.getAbsolutePath()+"\\"+fileName));//获取要复制的源文件
   
               BufferedOutputStream bos  = new BufferedOutputStream(new FileOutputStream(dirName+"\\"+fileName));
               int read = bis.read();
               while (read!=-1){
                   bos.write(read);
                   read = bis.read();
               }
               bis.close();
               bos.close();
           }
   
   
       }
   }
   ```

2. 复制多级文件夹

   

# 第三章、标准输入流和标准输出流

**System类中有两个静态的成员变量:**

| 成员变量                            | 名称       | 实际类型   | 解释                                                         |
| ----------------------------------- | ---------- | ---------- | ------------------------------------------------------------ |
| public static final InputStream in  | 标准输入流 | 字节输入流 | 通常该流对应于键盘输入或由主机环境或用户指定的另-一个输入源  |
| public static final PrintStream out | 标准输出流 | 字节输出流 | 通常该流对应于显示输出或由主机环境或用户指定的另一 个输出目标 |

**自己实现键盘录入数据:**
BufferedReader br = new BufferedReader(new InputStreamReader(System.in);

自己实现键盘录入数据太麻烦了，所以Java就提供了一个类供我们使用

Scanner sc = new Scanner(System.in);

**用标准输出流打印数据到控制台**

printlIn() 和print()方法

# 第四章、打印流

**字节打印流PrintStream**
●PrintStream(String fileName):使用指定的文件名创建新的打印流
●使用继承父类的方法写数据, 查看的时候会转码;使用自己的特有方法写数据，查看的数据原样输出

```java
PrintStream ps = new PrintStream("hi.txt");
//继承于父类的写数据方法
ps.write(97);
//自己特有的额写数据方法
ps.println();
ps.print(97);
ps.println("字符串");
ps.close();

//结果：
hi.txt文件中内容为
    a
    97字符串
```

**字符打印流**

```
字符打印流的构造方法:
PrintWriter (String fileName) :使用指定的文件名创建一个新的PrintWriter, 而不需要自动执行行刷新
PrintWriter (Writer out, boolean autoFlush): 创建一个 新的PrintWriter
		out:字符输出流
		autoFlush: 一个布尔值，如果为真，则println ，printf ，或format 方法将刷新输出缓冲区
```

# 第五章、 Properties

### 5.1  概述

Properties类表示一组持久的属性。  `Properties`可以保存到流中或从流中加载。  属性列表中的每个键及其对应的值都是一个字符串。 

它继承了Hashtable 类，以Map 的形式进行放置值， put(key,value) get(key)。其中键和值都是Object类型

**Properties特有方法**

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/Properties特有方法.png)



### 5.2  Properties和IO流

Properties文件：

以`.properties`结尾的文件，字符串形式存储键值对。其中#后的为注释内容

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/properties文件.png)



**与IO相关的方法**

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/Properties与IO流.png)

**案例**

1. 利用store()将数据存储到文件中

   ```java
   Properties pro = new Properties();
   pro.setProperty("id","001");
   pro.setProperty("name","葛大爷");
   pro.setProperty("age","18");
   
   FileWriter fw = new FileWriter("测试.properties");
   pro.store(fw,"comments this file");
   fw.close();
   ```

2. 从文件中读取数据到properties文件中

   ```java
   Properties pro = new Properties();
   FileReader reader = new FileReader("测试.properties");
   pro.load(reader);
   String id = pro.getProperty("id");
   String name = pro.getProperty("name");
   String age = pro.getProperty("age");
   
   System.out.println(id);
   System.out.println(name);
   System.out.println(age);
   
   reader.close();
   ```

   ==Properties对象不仅可以与Properties文件关联，也可与txt文件关联。==