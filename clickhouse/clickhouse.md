# ClickHouse

##  一、clickhouse介绍

ClickHouse是俄罗斯的 Yandex 于 2 016 年开源的 列式存储数据库 DBMS ），使用 C++语言编写，主要用于 **在线分析处理查询**（ OLAP ）），能够使用 SQL 查询实时生成分析数据报告。

### 1.1 特点

官方介绍：https://clickhouse.com/docs/zh/introduction/distinctive-features

##### 1.1.1列式存储

以下表为例

| id   | Name | Age  |
| ---- | ---- | ---- |
| 1    | 张三 | 18   |
| 2    | 李四 | 22   |
| 3    | 王五 | 34   |

* 采用行式存储时，数据在磁盘上的组织结构为：

  ![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/行式存储结构示例.png)

  好处是想查某个人所有的属性时，可以通过一次磁盘查找加顺序读取就可以。但是当想查所有人的年龄时，需要不停的查找，或者全表扫描才行，遍历的很多数据都是不需要的。

* 采用列式存储时，数据在磁盘上的组织结构为：

  ![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/列式存储结构示例.png)

  这时想查所有人的年龄只需把年龄那一列拿出来就可以了

  >列式存储优点：
  >
  >➢  对于列的聚合，计数，求和等统计操作原因优于行式存储。
  >
  >➢  由于某一列的数据类型都是相同的，针对于数据存储更容易进行数据压缩，每一列选择更优的数据压缩算法，大大提高了数据的压缩比重。
  >➢  由于数据压缩比更好，一方面节省了磁盘空间，另一方面对于 cache 也有了更大的发挥空间。

##### 1.1.2 基本遵循DBMS

几乎覆盖了标准S QL 的大部分语法，包括 DDL 和 DML ，以及配套的各种函数，用户管理及权限管理，数据的备份与恢复 。

##### 1.1.3 多样化引擎

ClickHouse和 MySQL类似，把表级的存储引擎插件化，根据表的不同需求可以设定不同的存储引擎。目前包括合并树、日志、接口和其他四大类 2 0 多种引擎。

##### 1.1.4 高吞吐写入能力

ClickHouse采用类 LSM Tree 的结构，数据写入后定期在后台 Compaction 。通过类 LSM tree的结构， ClickHouse 在数据导入时全部是顺序 append 写，写入后数据段不可更改，在后台compaction 时也是多个段 merge sort 后顺序写回磁盘。顺序写的特性，充分利用了磁盘的吞吐能力，即便在 HDD 上也有着优异的写入性能。

官方公开benchm ark 测试显示能够达到 50MB 200MB/s 的写入吞吐能力，按照每行100Byte 估算，大约相当于 50W 200W 条 /s 的写入速度。

##### 1.1.5 数据分区与线程级并行

ClickHouse将数据划分为多个 partition ，每个 partition 再进一步划分为多个 index granularity 索引粒度 ))，然后通过多个 CPU 核心分别处理其中的一部分来实现并行数据处理。在这种设计下， 单条 Query 就能利用整机所有 CPU 。 极致的并行处理能力，极大的降低了查询延时。
所以，ClickHouse 即使对于大量数据的查询也能够化整为零平行处理。但是有一个弊端就是对于单条查询使用多 c pu ，就不利于同时并发多条查询。所以对于高 q ps 的查询业务，ClickHouse 并不是强项。

##### 1.1.6 限制

1. 没有完整的事务支持。
2. 缺少高频率，低延迟的修改或删除已存在数据的能力。仅能用于批量删除或修改数据，但这符合 [GDPR](https://gdpr-info.eu/)。
3. 稀疏索引使得ClickHouse不适合通过其键检索单行的点查询。

##### 1.1.7 与其他数据库比较

ClickHouse 像很多 OLAP 数据库一样，单表查询速度优于关联查询，而且 ClickHouse的两者差距更为明显。

## 二、ClickHouse的安装

### 2.1 前期准备

##### 2.1.1关闭防火墙

##### 2.1.2 centOS修改打开文件数限制

可以使用 `ulimit -a` 命令查看预设的参数。

<img src="https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/ulimit查看预设参数.png" style="zoom:80%;" />

修改的步骤：

1. 在 服务器的 /etc/security/limits.conf文件的末尾加入以下内容

   ```shell
   [root@VM-4-14-centos /]$ sudo vim /etc/security/limits.conf
   
   添加以下内容
   * soft nofile 65536
   * hard nofile 65536
   * soft nproc 131072
   * hard nproc 131072
   ```

2. 在服务器 的 /etc/security/limits.d/20 nproc.conf 文件的末尾加入以下内容

   ```shell
   [ root]$ sudo vim /etc/security/limits.d/20 nproc.conf
   * soft nofile 65536
   * hard nofile 65536
   * soft nproc 131072
   * hard nproc 131072
   ```

3. 执行同步操作（可选，搭建集群需要）

   ```shell
   [root@hadoop102 ~]$ sudo /home/demo1/bin/xsync /etc/security/limits.conf
   [root@hadoop102 ~]$ sudo /home/demo1/bin/xsync
   /etc/security/limits.d/20-nproc.conf
   ```

##### 2.1.3 安装依赖

在需要安装ck的服务器上执行下面命令：

```shell
[root@hadoop102 ~]$ sudo yum install -y libtool
```

```shell
[root@hadoop102 ~]$ sudo yum install -y *unixODBC*
```

##### 2.1.4 CentOS 取消SELinux

SELinux(Security-Enhanced Linux) 是美国国家安全局（NSA）对于强制访问控制的实现，是 Linux历史上最杰出的新安全子系统。但是，为了防止出现不必要的问题，这里将其关闭。（有的centOS默认就是关闭的，需要查看）。它的配置文件地址在：`/etc/selinux/config`

所以执行下面的命令：将其设置为disabled

```shell
[root@hadoop102 ~]$ sudo vim /etc/selinux/config
```

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/关闭SELinux.png)

### 2.2 单机安装

clickhouse有多种安装方式,可以[参考官网安装部署](https://clickhouse.com/docs/zh/getting-started/install)

这里以rpm安装包安装为例。

##### 2.2.1 首先建立一个clickhouse的目录，用来存放安装包。

* 这里以新建/opt/software/clickhouse文件夹为例

* 然后将四个包上传到该文件夹下

  ![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/clickhouse安装包图示.png)

##### 2.2.1执行命令进行安装

进入到安装包所在的文件夹中，执行下面的命令：

```shell
[root@hadoop102 clickhouse]$ sudo rpm -ivh *.rpm
```

新版本安装过程中需要输入密码，这一步是可选的。如果不需设置密码，直接回车就行。我这里设置的密码为gedaye666。但是密码的占位符是不显示的，所以这里就容易出错。这一步也可以不设置，后面再从配置文件中设置。

##### 2.2.2查看安装情况

```shell
sudo rpm -qa | grep clickhouse
```

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/查看clickhouse安装情况.png)

出现上述的画面，就说明安装成功了。如果想要集群，其他服务器上同样的安装步骤

> 注意：
>
> 本次通过rpm进行安装，安装之后软件的命令、配置文件、数据、日志都不在同一个根目录中。这里说明一下它们分别被保存的文件目录
>
> bin/    ===>   /usr/bin/
>
> conf/  ===>   /etc/clickhouse-server/
>
> lib/     ===>   /var/lib/clickhouse
>
> log/    ===>   /var/log/clickhouse

##### 2.2.3 修改配置文件，让远程其他计算机也能访问ck

由上面可知，配置文件存在于`/etc/clickhouse-server/`如下图：

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/clickhouse的配置文件.png)

```shell
[root@hadoop102 clickhouse]$ sudo vim /etc/clickhouse-server/config.xml
```

把 `<listen_host>::</listen_host>` 的注释 打开 ，这样的话才能让 ClickHouse被除本机以外的服务器访问

注意：

文件夹中的数据会覆盖同名的xml文件的配置

一个修改默认密码的示例：

创建 default-password.[xml](https://so.csdn.net/so/search?q=xml&spm=1001.2101.3001.7020) 这么个文件 放到/etc/clickhouse-server/users.d 目录下，它会覆盖users.xml中的密码

```xml
<yandex>
<users>
<default>
<password>
mima
</password>
</default>
</users>
</yandex>
```

##### 2.2.4 启动clickhouse服务

```shell
[root@hadoop102 clickhouse]$ sudo systemctl start clickhouse-server
```

其实安装clickhouse时，会自动带了一个clickhouse的命令，也可以通过下面的方式进行服务的启动和关闭

```shell
[root@vm] $clickhouse start             #启动clickhouse服务
[root@vm] $clickhouse restart         #重新启动clickhouse服务
[root@vm] $clickhouse stop             #关闭clickhouse服务
[root@vm] $clickhouse status          #查看clickhouse的服务状态
```

##### 2.2.8 使用 client连接 server

安装时会有个客户端，调用下面的命令可以连接到clickhouse

```shell
[root@vm] $ clickhouse-client -m --password 密码
```

> 注意password前面是两个杠
>
> 没有密码无须指定password参数
>
> -m 可以在命令窗口输入多行命令，直到有分号才算一条语句结束

##### 2.2.9windows上连接服务器上的clickhouse

博客示例：https://blog.csdn.net/daerzei/article/details/113819193

* 连接工具：DBeaver

* 连接环境：

  DBeaver是基于Java开发的，故安装DBeaver之前首先得配置好jdk开发环境

* 详细连接过程

  1. 服务器打开9000和8123端口，因为clickhouse默认使用2个端口:9000(TCP), 8123(HTTP)

  2. 通过DBeaver进行连接

     ![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/DBeaver连接clickhouse.png)

### 2.3安装和连接过程中出现的问题

##### 2.3.1安装时密码出错

安装过程中输入密码不会显示，无须二次确认密码，所以很容易出错。另外还会对初始密码进行加密，后续无法查看密码明文。综上问题，这里不建议在安装时设置密码，而应该是安装完之后手动设置密码。另外还有一个好处，就是安装后设置密码，可以是明文，也可以对其进行加密，将密码保存在配置文件中。

##### 2.3.2 连接出错

连接过程中，应该注意下面问题：

* 如果是虚拟机中的系统，注意关闭防火墙
* 如果是云服务器，要打开9000和8123端口
* 用DBeaver连接时，要使用功能8123端口，因为是http连接。

## 三、CK的数据类型

官网参考：https://clickhouse.com/docs/en/sql-reference/data-types/

官网的案例比较全，建议用英文环境下查看官网的案例

### 3.1 整型

固定长度的整型，包括有符号整型或无符号整型。
整型范围（-2^n-1^~2^n-1^-1）

| 类型  | 范围                                         |
| ----- | -------------------------------------------- |
| Int8  | [-128 : 127]                                 |
| Int16 | [-32768 : 32767]                             |
| Int32 | [-2147483648 : 2147483647]                   |
| Int64 | [-9223372036854775808 : 9223372036854775807] |

无符号整型范围（0~2^n-1^-1)

| 类型   | 范围                      |
| ------ | ------------------------- |
| UInt8  | [0 :255]                  |
| UInt16 | [0 :65535]                |
| UInt32 | [0 :4294967295]           |
| UInt64 | [0 :18446744073709551615] |

### 3.2浮点型

| 类型    | 说明                                 |
| ------- | ------------------------------------ |
| Float32 | 32位的浮点数类型，类似java中的float  |
| Float64 | 64位的浮点数类型，类似java中的double |

建议尽可能以整数形式存储数据。例如，将固定精度的数字转换为整数值，如时间用毫秒为单位表示，因为浮点型进行计算时可能引起四舍五入的误差。

> 一般情况下不会使用这两种类型

### 3.3布尔值

没有单独的类型来存储布尔值。可以使用UInt8 类型，取值限制为 0 或 1 。

### 3.4Decimal 型

如果要求更高精度的数值运算，则需要使用定点数。clickhouse提供了Decimal32、Decimal64和Decimal128三种精度的定点数。

可以通过两种形式声明定点：

1. 简写方式：Decimal32(S)、Decimal64(S)、Decimal128(S)

➢ Decimal32(s) s)，相当于 D ecimal(9-s,s) s)，有效位数为 1~9
➢ Decimal64(s) s)，相当于 D ecimal(18-s,s) s)，有效位数为 1~18
➢ Decimal128(s) s)，相当于 D ecimal(38-s,s) s)，有效位数为 1~38

2. 原生方式为：Decimal(P,S)

P代表精度，决定总位数（整数部分+小数部分），取值范围是1~38.

S代表规模，决定小数位数，取值范围是0~P。

> 使用场景：
> 一般金额字段、汇率、利率等字段为了保证小数点精度，都使用 D ecimal进行存储。

### 3.5字符串

字符串类型可以细分为String、FixedString 和UUID三类。

| 类型        | 描述                                                         |
| ----------- | ------------------------------------------------------------ |
| String      | 字符串由String定义，长度不限。因此在使用String的时候无须声明大小。它完全代替了传统意义上数据库的Varchar、Text、Clob、Blob等字符类型。 |
| FixedString | 定长字符串通过FixedString(N)声明，其中N表示字符串长度。FixedString使用null字节填充末尾字符。 |
| UUID        | UUID是一种数据库常见的主键类型。UUID共32位，它的格式为8-4-4-4-12。如果一个UUID类型的字段在写入数据时没有被赋值，则会依照格式使用0填充。 |

### 3.6日期类型

目前ClickHouse 有三种时间类型
➢ Date 接受 年-月-日 的字符串比如 2019-12-16
➢ Datetime 接受 年-月-日 时:分:秒 的字符串比如 2019-12-16 20:50:10
➢ Datetime64 接受 年-月-日 时:分:秒 亚秒 的字符串比如‘ 2019-12-16 20:50:10 66

### 3.7复合类型

clickhouse支持数组、元组、枚举和嵌套四类复合类型。[参照官网](https://clickhouse.com/docs/en/sql-reference/data-types/)

## 四、表引擎

https://clickhouse.com/docs/en/engines/table-engines/

### 4.1 表引擎的使用

表引擎是ClickHouse 的一大特色。可以说， 表引擎决定了如何存储表的数据。包括：

* 数据的存储方式和位置，写到哪里以及从哪里读取数据 。

* 支持哪些查询以及如何支持。

* 并发数据访问。

* 索引的使用（如果存在）。

* 是否可以执行多线程请求。

* 数据复制参数。

表引擎的使用方式就是必须显式在创建表时定义该表使用的引擎，以及引擎使用的相关参数。

> 特别注意：引擎的名称大小写敏感

### 4.2 TinyLog

以列文件的形式保存在磁盘上，不支持索引，没有并发控制。一般保存少量数据的小表，
生产环境上作用有限。可以用于平时练习测试用。

```sql
create table t_tinylog ( id String, name String) engine=TinyLog;
```

### 4.3 Memory

内存引擎，数据以未压缩的原始形式直接保存在内存当中，服务器重启数据就会消失。
读写操作不会相互阻塞，不支持索引。简单查询下有非常非常高的性能表现（ 超过 1 0 G s ）。
一般用到它的地方不多，除了用来测试，就是在需要非常高的性能，同时数据量又不太
大（上限大概 1 亿行）的场景。

### 4.4 MergeTree(重要)

ClickHouse中 **最强大的表引擎**当属 MergeTree （合并树）引擎及该系列 （*MergeTree ）中的其他引擎 支持索引和分区 地位可以相当于 innodb 之于 M ysql 。 而且基于MergeTree
还衍生除了很多小弟，也是非常有特色的引擎。

##### 4.4.1建表语句(测试)

```sql
create table t_order_mt(
   id UInt32,
   sku_id String,
   total_amount Decimal(16,2),
   create_time Datetime
) engine MergeTree
partition by toYYYYMMDD(create_time)
primary key (id)
order by (id,sku_id)
```

>这里简单对上面几个关键词说明：（后续还会详细的介绍他们）
>
>partition by是分区的依据
>
>primary key是主键标识，但是注意它不会为主键设置唯一约束
>
>order by 排序字段，注意第一个字段要为主键字段

##### 4.4.2插入数据

```sql
insert into t_order_mt values
(101,'sku_001',1000.00,'2020 06 01 12:00:00') ,
(102,'sku_002',2000.00,'2020 06 01 11:00:00'),
(102,'sku_004',2500.00,'2020 06 01 12:00:00'),
(102,'sku_002',2000.00,'2020 06 01 13:00:00'),
(102,'sku_002',12000.00,'2020 06 01 13:00:00'),
(102,'sku_002',600.00,'2020 06 02 12:00:00');
```

因为设置了时间分区依据，所以插入的数据会根据时间分区存储。

clickhouse-client客户端查询结果如下：

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/clickhouse查询分区显示.png)

> 注意：
>
> 使用DBeaver查询时不会出现这用分区的显示结果。

##### 4.4.3数据如何存储的

clickhouse数据库的数据是储存在`/var/lib/clickhouse`文件夹中的。其中有两个文件夹：

metadata、data

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/clickhouse数据目录.png)

点击进去data文件夹，可以看到下面的目录

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/clickhouse数据表的目录.png)

> 这里介绍一下分区的命名规则：
>
> PartitionId_MinBlockNum_MaxBlockNum_Level
> 分区值_最小分区块编号_最大分区块编号_合并层级
>
> * PartitionId
>           数据分区ID生成规则
>           数据分区规则由分区ID决定，分区ID由PARTITION BY分区键决定。根据分区键字段类型，ID生成规则可分为：
>   1. 未定义分区键
>          没有定义PARTITION BY，默认生成一个目录名为all的数据分区，所有数据均存放在all目录下。
>   2. 整型分区键
>          分区键为整型，那么直接用该整型值的字符串形式做为分区ID。
>   3. 日期类分区键
>          分区键为日期类型，或者可以转化成日期类型。
>   4. 其他类型分区键
>          String、Float类型等，通过128位的Hash算法取其Hash值作为分区ID。
>
> * MinBlockNum
>
>   最小分区块编号，自增类型，从1开始向上递增。每产生一个新的目录分区就向上递增一个数字。
>
> * MaxBlockNum
>
>   最大分区块编号，新创建的分区MinBlockNum等于MaxBlockNum的编号。
>
> * Level
>
>   合并的层级，被合并的次数。合并次数越多，层级值越大。

具体到每个分区内的文件

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/分区的内的文件目录结构.png)

> bin文件：   数据文件
> mrk文件：  标记文件
>     标记文件在 idx索引文件 和 bin数据文件 之间起到了桥梁作用。
>     以mrk2结尾的文件，表示该表启用了自适应索引间隔。
>
> primary.idx文件：主键索引文件，用于加快查询效率。
>
> minmax_create_time.idx：分区键的最大最小值。
>
> checksums.txt：校验文件，用于校验各个文件的正确性。存放各个文件的size以及hash值。
>
> count.txt:    记录本分区内数据的条数

##### 4.4.4 partition by 分区 (可选 )

1）作用

​          分区的目的主要是降低扫描的范围，优化查询速度

2）如果不填

​          只会使用一个分区:all

3）分区目录

​          MergetTree是以列文件+索引文件+表定义文件组成的，但是如果设定了分区那么这些文件就会保存到不同的分区目录中。

4）并行

​           分区后，面对涉及跨分区的查询统计，clickhouse会以分区为单位并行处理

5）数据写入与分区合并

​          任何一个批次的数据写入都会产生一个临时分区，不会纳入任何一个已有的分区。写入后的某个时刻（大约10~15分钟后），Clickhouse会自动执行合并操作。

​          也可以手动通过`optimize` 执行），把临时分区的数据，合并到已有分区中。

```sql
optimize table <表名> final;
```

例如：再次插入4.4.2中的数据，查询结果如下

<img src="https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/clickhouse插入时不会自动合并分区.png" style="zoom:67%;" />

手动合并后：

<img src="https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/clickhouse手动合并后的分区.png" style="zoom:67%;" />

##### 4.4.5 primary key主键 (可选 )

ClickHouse中的主键，和其他数据库不太一样， 它只**提供了数据的一级索引**，但是却不是唯一约束。 这就意味着是可以存在相同 primary key 的数据的。

主键的设定主要依据是查询语句中的where 条件。

根据条件通过对主键进行某种形式的二分查找，能够定位到对应的index granularity, 避免了全表 扫描。

**index granularity：**直接翻译的话就是索引粒度，指在 稀疏索引中两个相邻索引对应数据的间隔。 ClickHouse 中的 MergeTree 默认是 8192 。官方不建议修改这个值，除非该列存在大量重复值，比如在一个分区中几万行才有一个不同 数据。

它使用的是稀疏索引：稀疏索引的好处就是可以用很少的索引数据，定位更多的数据，代价就是只能定位到索引粒度的第一行，然后再进行进行一点扫描。

##### 4.4.6 order by（必选）

order by 设定了 分区内 的数据按照哪些字段顺序进行有序保存。

order by 是 MergeTree 中唯一的一个必填项，甚至比 primary key 还重要，因为当用户不设置主键的情况，很多处理会依照 o rder by 的字段进行处理（比如后面会讲的去重和汇总）。

> 要求：主键必须是order by 字段的前缀字段。
> 比如order by 字段是 (id,sku_id) 那么主键必须是 id 或者 (id,sku_id)
