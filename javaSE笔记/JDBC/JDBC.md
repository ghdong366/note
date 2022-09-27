# JDBC

Java DataBase Connectivity

用java语言操作数据库。其实是官方(sun公司) 定义的一套操作所有关系型数据库的规则，即接口。各个数据库厂商去实现这套接口，提供数据库驱动jar包。

### 1、快速入门：

1. 导入jar包

2. 注册驱动

   ==注意==这里新版本jar包jdbc路径和旧版本路径不同。`com.mysql.cj.jdbc.Driver`

3. 获取数据库连接对象

   ==注意：==这里的数据库名后要加`?serverTimezone=UTC`

   [问题连接](https://blog.csdn.net/Dreamboy_w/article/details/96505068?utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7Edefault-17.baidujs&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7Edefault-17.baidujs)

4. 定义sql语句
5. 获取执行sql语句的对象Statement
6. 执行sql,返回影响的行数
7. 处理结果，这里简单的打印
8. 释放资源

* ```java
  // 1、导入jar包
  // 2、注册驱动
  Class.forName("com.mysql.cj.jdbc.Driver");//这里新版的mysql jar包路径添加了一个cj
  //3、获取数据库连接对象
  Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/jdbctest?serverTimezone=UTC", "root", "root");
  //4、定义sql语句
  String sql = "update student set age = 26 where id = '001'";
  //5、获取执行sql语句的对象Statement
  Statement statement = connection.createStatement();
  //6、执行sql,返回影响的行数
  int i = statement.executeUpdate(sql);
  //7、处理结果，这里简单的打印
  System.out.println(i);
  //8、释放资源
  connection.close();
  statement.close();
  ```

### 2、类详解

#### DriverManner

**功能1：注册驱动。告诉程序使用哪一个驱动jar包。**

Class.forName("com.mysql.cj.jdbc.Driver")。实际上是Driver调用了DriverManner中的`registerDriver()`方法

```java
//Driver源码中静态代码块
static {
    try {
        DriverManager.registerDriver(new Driver());
    } catch (SQLException var1) {
        throw new RuntimeException("Can't register driver!");
    }
```

说明：mysql5之后可以不用手动注册驱动，

**功能2：获取数据库连接对象**

方法：`static  Connection   getConnection(String url, String user,  String password)`

```
url:	指定连接的路径
	jdbc:mysql://ip地址(域名):端口号/数据库名称
	当连接自己的电脑，并且mysql端口号默认是3306时，可简写为：
	`jdbc:mysql:///数据库名称`
user:	mysql用户名
password:	mysql密码
```



#### Connection

**功能1：获取执行sql的对象statement**

● `Statement   createStatement()`  创建一个Statement对象，用于将SQL语句发送到数据库 

●`PreparedStatement prepareStatement(String sql)` 创建一个 PreparedStatement对象，用于将参数化的SQL语句发送到数据库。 

**功能2：管理事务**

●开启事务

`void setAutoCommit(boolean autoCommit)` 参数为false时，开启事务

●提交事务

`void commit() `

●回滚事务

`void rollback()`

#### Statement

用于执行静态SQL语句并返回其生成的结果的对象。

1. `boolean execute(String sql) `执行给定的SQL语句，这可能会返回多个结果

2. `int executeUpdate(String sql) `执行给定的DML语句（ INSERT ， UPDATE ，或 DELETE），或者不返回任何内容，如 DDL（create alter drop）语句。返回影响的行数。

3. `ResultSet executeQuery(String sql)`执行给定的SQL语句，返回一个 ResultSet对象。

#### ResultSet

结果集对象，封装结果集对象。

| 返回值  | 方法         | 说明                                                         |
| ------- | ------------ | ------------------------------------------------------------ |
| boolean | next()       | 游标向下移动一行（默认指向表头），并判断当前指定的行是否有数据<br />（即判断是否到末尾，末尾无数据返回false） |
| boolean | previous()   | 游标向上移动一行                                             |
| xxx     | getXxx(参数) | 重载的方法。<br />XXX代表返回类型。如getInt()<br />==参数有两种：==<br />int类型，表示当前行的第几列<br />String类型是该字段的名字。<br />例如getString("name")     //返回name字段的字符串内容 |
|         |              |                                                              |

**ResultSet结果集遍历**

```java
resultSet = statement.executeQuery(sql);//获取结果集
//遍历结果集
while(resultset.next()){
    String id = resultSet.getString(1);
    String name = resultSet.getString("name");
    int age = resultSet.getInt("age");
    System.out.println(id+" "+name+" "+age);
}
```

### 3、 JDBC工具类

简化了JDBC操作数据库的步骤，将获取Connection对象和释放资源的方法封装到JDBCUtiils类中，

```java
public class JDBCUtil {
    //因为只需要获取一次，直接作为成员变量就可以
    private static String url = null;
    private static String user = null;
    private static String password =null;
    private static String driver = null;
    //静态代码块进行从配置文件中取值
    static{
        try {
            //1. 创建Properties集合类。
            Properties pro = new Properties();

            FileReader fw = new FileReader("JDBC\\jdbc.properties");
            //2. 加载文件
            pro.load(fw);
            url = pro.getProperty("url");
            user = pro.getProperty("user");
            password = pro.getProperty("password");
            driver = pro.getProperty("driver");
            Class.forName(driver);
            System.out.println("静态代码块结束~~~~~~~~");
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    //获取数据库连接对象(通过配置文件的方式)
    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(url,user,password);

    }

    //释放资源方法（不涉及select查询时）
    public static void close(Statement statement, Connection connection){
        if(statement!=null){
            try {
                statement.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        if(connection!=null){
            try {
                connection.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
    //释放资源的方法（涉及到select查询，有ResultSet对象时）
    public static void close( Statement statement, Connection connection,ResultSet resultSet){
        if (resultSet!=null){
            try {
                resultSet.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        if(statement!=null){
            try {
                statement.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        if(connection!=null){
            try {
                connection.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

    }
}
```

### 4、 PreparedStatement类

==注意类名单词的拼写==

#### SQL注入问题

在拼接sql语句时，有一些sql的特殊关键字参与字符串的拼接，打破原来SQL的判断逻辑。会造成安全性问题。

```sql
举例：
select * from User where name ='' and pass=''
如果第一个参数随便，而在pass参数中输入  a' or 'a'=a'

该SQL变为
select * form User 
where name = 'tom' and pass='a' or 'a'='a'
恒成立，会产生安全问题
```

#### 解决SQL注入问题

利用preparedStatement对象，使用预编译的SQL来检索数据库。

**预编译的SQL:**参数使用 `?` 作为占位符。

如`select * from User where name=?`

#### 使用PreparedStatement步骤

1. 导入jar包

2. 注册驱动

3. 获取数据库连接对象

4. 定义sql语句

   --------使用占位符

5. 获取执行sql语句的对象  Connection.prepareStatement(sql)

   --------在创建执行对象时就传入了sql语句

6. 对SQL语句中的 ？赋值

   --------通过PreparedStatemetn中的SetXxx(index,value)来对？赋值

   index是？的位置。==从序号1开始==

   value是？对应的值。

7. 执行sql,调用execute方法，但无须再传入SQL语句

8. 处理结果

9. 释放资源

```java
Connection connection = JDBCUtil.getConnection();
Scanner in = new Scanner(System.in);
System.out.println("请输入用户名：");
String name = in.nextLine();
System.out.println("密码：");
String pass = in.nextLine();

String sql = "select * from User where name=? and password=?";//预编译的SQL语句
PreparedStatement preparedStatement = connection.prepareStatement(sql);//在创建时就传入预编译的sql语句
//给sql语句中的?赋值
preparedStatement.setString(1,name);
preparedStatement.setString(2,pass);
//执行SQL语句
ResultSet resultSet = preparedStatement.executeQuery();//无须再传入sql语句
if(resultSet.next()){
    String username = resultSet.getString("name");
    System.out.println("登录成功----"+username);
}else {
    System.out.println("登录失败，用户名或密码错误！");
}
```

# 数据库事务

### 事务的概念

如果一个包含多个步骤的业务操作，被事务管理，那么这些操作要么同时成功，要么同时失败。

```
例如：张三向李四转账500元

1、查询张三账户余额是否大于500
2、张三账户余额-500
3、李四账户余额+500
```

### 事务相关操作

* 开启事务：start transaction

* 回滚事务：rollback

* 提交事务：commit

### 手动提交和自动提交

* 自动提交

  MySQL默认是自动提交的

  一条DML语句执行玩后会自动提交一次事务

* 手动提交

  Oracle默认是手动提交的

  需要先开启事务，再提交

* 修改事务的默认提交方式

  查看默认提交方式：`select @@autocommit`   1表示自动提交，0表示手动提交

  修改默认提交方式：`set  @@autocommit=0`

### 事务的四大特征

事务的四大特征:

1. ==原子性==:   是不可分割的最小操作单位，要么同时成功，要么同时失败。
2. ==持久性==:   当事务提交或回滚后，数据库会持久化的保存数据。
3. ==隔离性==:   多个事务之间。相互独立。

4. ==一致性==:   事务操作前后，数据总量不变

### 事务隔离级别（了解）

* 概念：多个事务之间隔离的，相互独立的。但是如果多个事务操作同一批数据，则会引发一些问题，设置不同的隔离级别就可以解决这些问题。

* 存在问题：
	1. 脏读：一个事务，读取到另一个事务中没有提交的数据
	2. 不可重复读(虚读)：在同一个事务中，两次读取到的数据不一样。
	3. 幻读：一个事务操作(DML)数据表中所有记录，另一个事务添加了一条数据，则第一个事务查询不到自己的修改。
	
* 隔离级别：
	1. read uncommitted：读未提交
		* 产生的问题：脏读、不可重复读、幻读
	2. read committed：读已提交 （Oracle）
		* 产生的问题：不可重复读、幻读
	3. repeatable read：可重复读 （MySQL默认）
		* 产生的问题：幻读
	4. serializable：串行化（将表锁上，在其他用户访问这个表时，不能再由访问此表，只有当别人访问完，提交后才能继续访问。）
		* 可以解决所有的问题

	* 注意：隔离级别从小到大安全性越来越高，但是效率越来越低
	* 数据库查询隔离级别：
		* select @@tx_isolation;
	* 数据库设置隔离级别：（重启才会生效）
		* set global transaction isolation level  级别字符串;

* 演示：
	set global transaction isolation level read uncommitted;
	start transaction;
	-- 转账操作
	update account set balance = balance - 500 where id = 1;
	update account set balance = balance + 500 where id = 2;

# JDBC管理事务

#### 使用Connection对象来管理事务

* 开启事务: `setAutoCommit(boolean autoCommit) `: 调用该方法设置参数为false,即开启事务.
* 提交事务: `commit()`
* 回滚事务:`rollback()`

### 银行转账的案例

*开启事务上setAutoCommit (boolean autoCommit) : 调用该方法设置参数为false,即开启事务
           在执行sql之前开启事务
*提交事务: commit()
          当所有sq1都执行完提交事务
*回滚事务: rollback()
          在catch中回滚事务

```java
 Connection conn = null;
 PreparedStatement pstmt1 = null;
 PreparedStatement pstmt2 = null;

 try {
     //1.获取连接
     conn = JDBCUtils.getConnection();
     //开启事务
     conn.setAutoCommit(false);

     //2.定义sql
     //2.1 张三 - 500
     String sql1 = "update account set balance = balance - ? where id = ?";
     //2.2 李四 + 500
     String sql2 = "update account set balance = balance + ? where id = ?";
     //3.获取执行sql对象
     pstmt1 = conn.prepareStatement(sql1);
     pstmt2 = conn.prepareStatement(sql2);
     //4. 设置参数
     pstmt1.setDouble(1,500);
     pstmt1.setInt(2,1);

     pstmt2.setDouble(1,500);
     pstmt2.setInt(2,2);
     //5.执行sql
     pstmt1.executeUpdate();
     // 手动制造异常
     int i = 3/0;

     pstmt2.executeUpdate();
     //提交事务
     conn.commit();
    } catch (Exception e) {
        //事务回滚
        try {
             if(conn != null) {
               conn.rollback();
              }
             } catch (SQLException e1) {
                e1.printStackTrace();
      }
       e.printStackTrace();
      }finally {
        JDBCUtils.close(pstmt1,conn);
        JDBCUtils.close(pstmt2,null);
        }
```

# 数据库连接池

**概念：**

其实就是一个容器(集合)，存放数据库连接的容器。可以同时存在多个连接对象。

当系统初始化好后，容器被创建，容器中会申请一些连接对象，当用户来访问数据库时，从容器中获取连接对象，用户访问完之后，会将连接对象归还给容器。

**优点好处：**

1. 节约资源
2. 用户访问高效

**连接池的实现**

1. 标准接口：DataSource   javax.sql包下的
2. 方法：
  * 获取连接：getConnection()
  * 归还连接：Connection.close()。如果连接对象Connection是从连接池中获取的，那么调用Connection.close()方法，则不会再关闭连接了。而是归还连接

### C3P0

### Druid连接池

Druid：数据库连接池实现技术，由阿里巴巴提供的
**使用步骤：**
  1. 导入jar包 druid-1.0.9.jar

  2. 定义配置文件：

     * 是properties形式的

     * 可以叫任意名称，可以放在任意目录下

3. 加载配置文件。Properties

   ```properties
   driverClassName=com.mysql.cj.jdbc.Driver
   url=jdbc:mysql://localhost:3306/db3
   username=root
   password=root
   initialSize=5
   maxActive=10
   maxWait=3000
   ```

4. 获取数据库连接池对象：通过工厂来来获取

    	DruidDataSourceFactory.creatDataSource(Properties pro)

   ==注意，除此之外，还可以通过new 来获取==

5. 获取连接：getConnection

```java
//通过工厂的方式加载配置文件来获取DataSource
public static void main(String[] args) throws Exception {
    //加载配置文件
    Properties pro = new Properties();
    FileReader reader = new FileReader("JDBC\\src\\druid.properties");
    pro.load(reader);
    //获取连接池对象
    DataSource dataSource = DruidDataSourceFactory.createDataSource(pro);

    //获取连接对象
    Connection connection = dataSource.getConnection();
    System.out.println(connection);

}
```

```java
//测试手动创建 druid 数据源
    public void test2() throws Exception {
        DruidDataSource dataSource = new DruidDataSource();
        dataSource.setDriverClassName("com.mysql.jdbc.Driver");
        dataSource.setUrl("jdbc:mysql://localhost:3306/test");
        dataSource.setUsername("root");
        dataSource.setPassword("root");
        DruidPooledConnection connection = dataSource.getConnection();
        System.out.println(connection);
        connection.close();
    }
```



**Druid工具类**

```java
public static DataSource ds =null;
static {
    try {
        Properties pro = new Properties();
        pro.load(new FileReader("JDBC\\src\\druid.properties"));
        ds = DruidDataSourceFactory.createDataSource(pro);
    } catch (IOException e) {
        e.printStackTrace();
    } catch (Exception e) {
        e.printStackTrace();
    }

}
//获取数据库连接对象Connection
public static Connection getConnection() throws SQLException {
    return ds.getConnection();
}
//释放资源
public static void close(Statement statement,Connection connection){
    close(null,statement,connection);
}
//释放资源
public static void close(ResultSet resultSet, Statement statement, Connection connection){
    if(resultSet!=null){
        try {
            resultSet.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    if(statement!=null){
        try {
            statement.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    if(connection!=null){
        try {
            connection.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

}
```









