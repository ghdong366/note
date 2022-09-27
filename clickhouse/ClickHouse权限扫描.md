# ClickHouse权限扫描

ClickHouse 是Yandex于2016年开源的列式存储数据库（DBMS），主要用于在线分析处理查询（OLAP），能够使用SQL查询实时生成分析数据报告。本文主要介绍Clickhouse权限扫描相关的操作，不是入门教程，需要提前了解ClickHouse的基本概念和使用。

## 1、前置的配置

Clickhouse20.5版本及以后才支持RBAC(基于角色的访问控制)，因此如果使用权限扫描，数据库版本需要大于20.5

本文环境基于clickhouse21.7.3.14版本，与新版本的配置可能有所不同。

#### 1.1、相关配置

安装clickhouse后，会提供给一个默认的default用户，这个用户已经有了几乎所有的权限，但是没有RBAC权限，不能创建和查看用户角色。如果需要权限扫描，必须对用户开启RBAC权限，它才可以查询其他用户的权限。因此需要在配置文件（默认路径为：/etc/clickhouse-sever/)中的两个配置文件中添加配置如下内容。（注意：一般在公司的服务器上，普通员工没有操作权限。可以向管理员申请，或下面的步骤由管理员提前配置完成。）

1. 在user.xml中的default用户标签添加如下

   ```xml
   <access_management>1</access_management>
   ```

   > access_management默认为0，设置为1标识为该用户开启RBAC权限。

2. 开启远程访问控制，可以让其他电脑访问到clickhouse。在config.xml中配置如下：

   ```xml
   <listen_host>::</listen_host>
   ```

3. 在config.xml中添加如下标签，位置放在根标签内。（本步骤针对老版本，如果默认已经配置，无须重复配置）

   ```xml
   <!--Source to read users, roles , access rights ,profiles of settings, quotas -->
   <user_directories>
      <users_xml>
         <path>users.xml</path>
      </users_xml>
      
      <local_directory>
         <path>/var/lib/clickhouse/access</path>
      </local_directory>
   </user_directories>
   
   ```

   > users_xml中的path标识了用户配置文件的地址
   >
   > local_directory中的path标识了使用sql来管理用户权限信息所保存的文件位置。
   >
   > 注意：
   >
   > 1、老版本可能存在<user_config>users.xml</user_config>标签，需要将其删除
   >
   > 2、确保path指向的目录存在的

4. 配置完后重启clickhouse服务，让配置文件生效。

## 2、ClickHouse中权限的授予和回收

ClickHouse有两种方式创建用户和为用户赋予权限：配置文件方式和Sql语句方式。

由于配置文件的方式过于繁琐又不直观，所以基本不用。官方推荐使用SQL的方式进行用户管理。

#### 2.1、创建用户

clickhouse也是使用`create user`创建用户，但是与mysql不同的是，它不需要为每个用户绑定一个IP。语法如下：

```sql
create user 用户名 identified [with 加密方式]  by '密码'
```

```sql
-- 创建用户
create user tom identified by 'tom123'
create user jerry identified by 'jerry123'
```

<img src="https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/clickhouse用户表.png" style="zoom: 50%;" />

#### 2.2、为用户授权

```sql
grant 权限名称 on 数据库名.表名 to 用户名
```

```sql
-- 为用户授权
grant all privileges on *.* to admin
grant select,insert on sea.* to tom
grant show tables,select on default.* to jerry
grant create table on default.* to sam
grant select,show,insert,update on test.`user` to grady
grant insert,delete on sea.season  to jack
grant update,select,delete,drop on default.t_order to ketty
```

#### 2.3、删除用户

```sql
drop user 用户名
```

```sql
--删除用户
drop user jack
```

#### 2.4、取消用户权限

revoke 取消的权限名列表 on  数据库名.表名 from 用户名

```sql
-- 取消用户授权
revoke delete,drop on default.t_order from ketty
```

### 3、用户权限的扫描

#### 3.1、权限的保存

在clickhouse里，用户的权限分为全局权限、数据库权限、表权限、字段权限。他们的关系是前一个包含后一个。clickhouse将这些权限信息统一记录在system数据库下的grants表中。但一般不会细分到字段权限，所以这里只讨论前三种。

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/clickhouse的用户的权限表grants.png)

>说明：
>
>1、clickhouse里没有update,delete等权限，如果设置这个权限，会自动转换为alert update和laert delete权限
>
>2、全局权限的all privileges与数据库（或表）的权限all privileges不同。

1. **全局权限**

   database和table字段都为null,每个权限分别单独保存在一行，有access_type表示。如果某个用户有所有的权限，则只有一行，access_type值为all

2. **数据库权限**

   database不为null，table字段为null，每个权限单独保存一行，由access_type表示。

3. **表权限**

   database和table字段都为null，每个权限单独保存一行，由access_type表示。

### 3.2、使用sql查询权限

1. **查询全局权限**

   ```sql
   -- 测试clickhouse中用户的全局权限
   select
      `user_name`,
      groupArray(toString(`access_type`)) as arrays,
      arrayStringConcat(arrays,',') as authorities
   from grants
   where  (`database` is null) and (`table` is null)
   group by `user_name`
   ```

   ![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/clickhouse全局权限a.png)

2. **查询数据库权限**

   ```sql
   -- 测试clickhouse中用户对具体数据库的权限
   select 
      `user_name`,
      `database`,
      groupArray(toString(`access_type`)) as arrays,
      arrayStringConcat(arrays,',') as authorities
   from grants
   where (`database` is not null) and (`table` is null)
   group by `user_name`,`database` 
   ```

   ![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/clickhouse数据库权限a.png)

3. **查询表权限**

   ```sql
   -- 测试clickhouse中用户对表的权限
   select 
      `user_name`,
      `database`,
      `table`,
      groupArray(toString(`access_type`)) as arrays,
      arrayStringConcat(arrays,',') as authorities
   from grants
   where (`database` is not null) and (`table` is not null)
   group by `user_name`,`database`,`table`
   ```

   ![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/clickhouse表权限a.png)

   > 注意：
   >
   > 为了将权限进行合并，这里使用了clickhouse中特有的函数groupArray（）函数和arrayStringConcat（）函数。如果不清楚，需要先简单了解。

## 总结：

本文介绍了clickhouse权限扫描的相关概念和操作，分析了clickhouse是如何存储这些权限。然后使用sql对权限进行查询合并。可以直接使用上面的sql或者简单的改动就能在项目中使用。
