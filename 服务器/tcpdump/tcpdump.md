# 全网最详细的 tcpdump 使用指南



> 文章来自博客园‘写代码的明哥’https://www.cnblogs.com/wongbingming/archive/2020/06/30/13212306.html

今天要给大家介绍的一个 Unix 下的一个 **网络数据采集分析工具**，也就是我们常说的抓包工具。

与它功能类似的工具有 wireshark ，不同的是，wireshark 有图形化界面，而 tcpdump 则只有命令行。

由于我本人更习惯使用命令行的方式进行抓包，因此今天先跳过 wireshark，直接给大家介绍这个 tcpdump 神器。

这篇文章，我肝了好几天，借助于Linux 的 man 帮助命令，我把 tcpdump 的用法全部研究了个遍，才形成了本文，不夸张的说，应该可以算是中文里把 tcpdump 讲得最清楚明白，并且还最全的文章了（至少我从百度、谷歌的情况来看），所以本文值得你收藏分享，就怕你错过了，就再也找不到像这样把 tcpdump 讲得直白而且特全的文章了。

![img](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/imags/20200630095709.png)

在讲解之前，有两点需要声明：

1. 第三节到第六节里的 tcpdump 命令示例，只为了说明参数的使用，并不一定就能抓到包，如果要精准抓到你所需要的包，需要配合第五节的逻辑逻辑运算符进行组合搭配。
2. 不同 Linux 发行版下、不同版本的 tcpdump 可能有小许差异， 本文是基于 CentOS 7.2 的 4.5.1 版本的tcpdump 进行学习的，若在你的环境中无法使用，请参考 `man tcpdump` 进行针对性学习。

## 1. tcpdump 核心参数图解

大家都知道，网络上的流量、数据包，非常的多，因此要想抓到我们所需要的数据包，就需要我们定义一个精准的过滤器，把这些目标数据包，从巨大的数据包网络中抓取出来。

所以学习抓包工具，其实就是学习如何定义过滤器的过程。

而在 tcpdump 的世界里，过滤器的实现，都是通过一个又一个的参数组合起来，一个参数不够精准，那就再加一个，直到我们能过滤掉无用的数据包，只留下我们感兴趣的数据包。

tcpdump 的参数非常的多，初学者在没有掌握 tcpdump 时，会对这个命令的众多参数产生很多的疑惑。

就比如下面这个命令，我们要通过 `host` 参数指定 host ip 进行过滤

```shell
$ tcpdump host 192.168.10.100
```

`主程序` + `参数名`+ `参数值` 这样的组合才是我们正常认知里面命令行该有的样子。

可 tcpdump 却不走寻常路，我们居然还可以在 host 前再加一个限定词，来缩小过滤的范围？

```shell
$ tcpdump src host 192.168.10.100
```

从字面上理解，确实很容易理解，但是这不符合编写命令行程序的正常逻辑，导致我们会有所疑虑：

1. 除了 src ，dst，可还有其它可以用的限定词？
2. src，host 应该如何理解它们，叫参数名？不合适，因为 src 明显不合适。

如果你在网上看到有关 tcpdump 的博客、教程，无一不是给你一个参数组合，告诉你这是实现了怎样的一个过滤器？这样的教学方式，很容易让你依赖别人的文章来使用 tcpdump，而不能将 tcpdump 这样神器消化，达到灵活应用，灵活搭配过滤器的效果。

上面加了 src 本身就颠覆了我们的认知，你可知道在 src 之前还可以加更多的条件，比如 tcp, udp, icmp 等词，在你之前的基础上再过滤一层。

```shell
$ tcpdump tcp src host 192.168.10.100
```

这种参数的不确定性，让大多数人对 tcpdump 的学习始终无法得其精髓。

因此，在学习 tcpdump 之前，我觉得有必要要先让你知道：**tcpdump 的参数是如何组成的？这非常重要。**

为此，我画了一张图，方便你直观的理解 tcpdump 的各种参数：

![img](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/imags/20200628111325.png)

1. option 可选参数：将在后边一一解释。
2. proto 类过滤器：根据协议进行过滤，可识别的关键词有： tcp, udp, icmp, ip, ip6, arp, rarp,ether,wlan, fddi, tr, decnet
3. type 类过滤器：可识别的关键词有：host, net, port, portrange，这些词后边需要再接参数。
4. direction 类过滤器：根据数据流向进行过滤，可识别的关键字有：src, dst，同时你可以使用逻辑运算符进行组合，比如 src or dst

proto、type、direction 这三类过滤器的内容比较简单，也最常用，因此我将其放在最前面，也就是 **第三节：常规过滤规则**一起介绍。

而 option 可选的参数非常多，有的甚至也不经常用到，因此我将其放到后面一点，也就是 **第四节：可选参数解析**

当你看完前面六节，你对 tcpdump 的认识会上了一个台阶，至少能够满足你 80% 的使用需求。

你一定会问了，还有 20% 呢？

其实 tcpdump 还有一些过滤关键词，它不符合以上四种过滤规则，可能需要你单独记忆。关于这部分我会在 **第六节：特殊过滤规则** 里进行介绍。

## 2. 理解 tcpdump 的输出

### 2.1 输出内容结构

tcpdump 输出的内容虽然多，却很规律。

这里以我随便抓取的一个 tcp 包为例来看一下

```shell
21:26:49.013621 IP 172.20.20.1.15605 > 172.20.20.2.5920: Flags [P.], seq 49:97, ack 106048, win 4723, length 48
```

从上面的输出来看，可以总结出：

1. 第一列：时分秒毫秒 21:26:49.013621
2. 第二列：网络协议 IP
3. 第三列：发送方的ip地址+端口号，其中172.20.20.1是 ip，而15605 是端口号
4. 第四列：箭头 >， 表示数据流向
5. 第五列：接收方的ip地址+端口号，其中 172.20.20.2 是 ip，而5920 是端口号
6. 第六列：冒号
7. 第七列：数据包内容，包括Flags 标识符，seq 号，ack 号，win 窗口，数据长度 length，其中 [P.] 表示 PUSH 标志位为 1，更多标识符见下面

### 2.2 Flags 标识符

使用 tcpdump 抓包后，会遇到的 TCP 报文 Flags，有以下几种：

- `[S]` : SYN（开始连接）
- `[P]` : PSH（推送数据）
- `[F]` : FIN （结束连接）
- `[R]` : RST（重置连接）
- `[.]` : 没有 Flag （意思是除上面四种类型外的其他情况，有可能是 ACK 也有可能是 URG）

## 3. 常规过滤规则

### 3.1 基于IP地址过滤：host

使用 `host` 就可以指定 host ip 进行过滤

```shell
$ tcpdump host 192.168.10.100
```

数据包的 ip 可以再细分为源ip和目标ip两种

```shell
# 根据源ip进行过滤
$ tcpdump -i eth2 src 192.168.10.100

# 根据目标ip进行过滤
$ tcpdump -i eth2 dst 192.168.10.200
```

### 3.2 基于网段进行过滤：net

若你的ip范围是一个网段，可以直接这样指定

```shell
$ tcpdump net 192.168.10.0/24
```

网段同样可以再细分为源网段和目标网段

```shell
# 根据源网段进行过滤
$ tcpdump src net 192.168

# 根据目标网段进行过滤
$ tcpdump dst net 192.168
```

### 3.3 基于端口进行过滤：port

使用 `port` 就可以指定特定端口进行过滤

```shell
$ tcpdump port 8088
```

端口同样可以再细分为源端口，目标端口

```shell
# 根据源端口进行过滤
$ tcpdump src port 8088

# 根据目标端口进行过滤
$ tcpdump dst port 8088
```

如果你想要同时指定两个端口你可以这样写

```shell
$ tcpdump port 80 or port 8088
```

但也可以简写成这样

```shell
$ tcpdump port 80 or 8088
```

如果你的想抓取的不再是一两个端口，而是一个范围，一个一个指定就非常麻烦了，此时你可以这样指定一个端口段。

```shell
$ tcpdump portrange 8000-8080
$ tcpdump src portrange 8000-8080
$ tcpdump dst portrange 8000-8080
```

对于一些常见协议的默认端口，我们还可以直接使用协议名，而不用具体的端口号

比如 http == 80，https == 443 等

```shell
$ tcpdump tcp port http
```

### 3.4 基于协议进行过滤：proto

常见的网络协议有：tcp, udp, icmp, http, ip,ipv6 等

若你只想查看 icmp 的包，可以直接这样写

```shell
$ tcpdump icmp
```

> protocol 可选值：ip, ip6, arp, rarp, atalk, aarp, decnet, sca, lat, mopdl, moprc, iso, stp, ipx, or netbeui

> 注意：tcp和udp只能搭配port使用
>
> ip才能搭配host使用

### 3.5 基本IP协议的版本进行过滤

当你想查看 tcp 的包，你也许会这样子写

```shell
$ tcpdump tcp
```

这样子写也没问题，就是不够精准，为什么这么说呢？

ip 根据版本的不同，可以再细分为 IPv4 和 IPv6 两种，如果你只指定了 tcp，这两种其实都会包含在内。

那有什么办法，能够将 IPv4 和 IPv6 区分开来呢？

很简单，如果是 IPv4 的 tcp 包 ，就这样写（友情提示：数字 6 表示的是 tcp 在ip报文中的编号。）

```shell
$ tcpdump 'ip proto tcp'

# or

$ tcpdump ip proto 6

# or

$ tcpdump 'ip protochain tcp'

# or 

$ tcpdump ip protochain 6
```

而如果是 IPv6 的 tcp 包 ，就这样写

```shell
$ tcpdump 'ip6 proto tcp'

# or

$ tcpdump ip6 proto 6

# or

$ tcpdump 'ip6 protochain tcp'

# or 

$ tcpdump ip6 protochain 6
```

关于上面这几个命令示例，有两点需要注意：

1. 跟在 proto 和 protochain 后面的如果是 tcp, udp, icmp ，那么过滤器需要用引号包含，这是因为 tcp,udp, icmp 是 tcpdump 的关键字。
2. 跟在ip 和 ip6 关键字后面的 proto 和 protochain 是两个新面孔，看起来用法类似，它们是否等价，又有什么区别呢？

关于第二点，网络上没有找到很具体的答案，我只能通过 `man tcpdump` 的提示， 给出自己的个人猜测，但不保证正确。

proto 后面跟的 `<protocol>` 的关键词是固定的，只能是 ip, ip6, arp, rarp, atalk, aarp, decnet, sca, lat, mopdl, moprc, iso, stp, ipx, or netbeui 这里面的其中一个。

而 protochain 后面跟的 protocol 要求就没有那么严格，它可以是任意词，只要 tcpdump 的 IP 报文头部里的 protocol 字段为 `<protocol>` 就能匹配上。

理论上来讲，下面两种写法效果是一样的

```shell
$ tcpdump 'ip && tcp'
$ tcpdump 'ip proto tcp'
```

同样的，这两种写法也是一样的

```shell
$ tcpdump 'ip6 && tcp'
$ tcpdump 'ip6 proto tcp'
```

## 4. 可选参数解析

### 4.1 设置不解析域名提升速度

- `-n`：不把ip转化成域名，直接显示 ip，避免执行 DNS lookups 的过程，速度会快很多
- `-nn`：不把协议和端口号转化成名字，速度也会快很多。
- `-N`：不打印出host 的域名部分.。比如,，如果设置了此选现，tcpdump 将会打印'nic' 而不是 'nic.ddn.mil'.

### 4.2 过滤结果输出到文件

使用 tcpdump 工具抓到包后，往往需要再借助其他的工具进行分析，比如常见的 wireshark 。

而要使用wireshark ，我们得将 tcpdump 抓到的包数据生成到文件中，最后再使用 wireshark 打开它即可。

使用 `-w` 参数后接一个以 `.pcap` 后缀命令的文件名，就可以将 tcpdump 抓到的数据保存到文件中。

```shell
$ tcpdump icmp -w icmp.pcap
```

> 说明：当使用-w参数时，截取的信息不会再显示在命令行中，而是在后台将信息保存到文件中。

### 4.3 从文件中读取包数据

使用 `-w` 是写入数据到文件，而使用 `-r` 是从文件中读取数据。

读取后，我们照样可以使用上述的过滤器语法进行过滤分析。

```shell
$ tcpdump icmp -r all.pcap
```

### 4.4 控制详细内容的输出

- `-v`：产生详细的输出. 比如包的TTL，id标识，数据包长度，以及IP包的一些选项。同时它还会打开一些附加的包完整性检测，比如对IP或ICMP包头部的校验和。
- `-vv`：产生比-v更详细的输出. 比如NFS回应包中的附加域将会被打印, SMB数据包也会被完全解码。（摘自网络，目前我还未使用过）
- `-vvv`：产生比-vv更详细的输出。比如 telent 时所使用的SB, SE 选项将会被打印, 如果telnet同时使用的是图形界面，其相应的图形选项将会以16进制的方式打印出来（摘自网络，目前我还未使用过）

### 4.5 控制时间的显示

- `-t`：在每行的输出中不输出时间
- `-tt`：在每行的输出中会输出时间戳
- `-ttt`：输出每两行打印的时间间隔(以毫秒为单位)
- `-tttt`：在每行打印的时间戳之前添加日期的打印（此种选项，输出的时间最直观）

### 4.6 显示数据包的头部

- `-x`：以16进制的形式打印每个包的头部数据（但不包括数据链路层的头部）
- `-xx`：以16进制的形式打印每个包的头部数据（包括数据链路层的头部）
- `-X`：以16进制和 ASCII码形式打印出每个包的数据(但不包括连接层的头部)，这在分析一些新协议的数据包很方便。
- `-XX`：以16进制和 ASCII码形式打印出每个包的数据(包括连接层的头部)，这在分析一些新协议的数据包很方便。

### 4.7 过滤指定网卡的数据包

- `-i`：指定要过滤的网卡接口，如果要查看所有网卡，可以 `-i any`

### 4.8 过滤特定流向的数据包

- `-Q`： 选择是入方向还是出方向的数据包，可选项有：in, out, inout，也可以使用 --direction=[direction] 这种写法

### 4.9 其他常用的一些参数

- `-A`：以ASCII码方式显示每一个数据包(不显示链路层头部信息). 在抓取包含网页数据的数据包时, 可方便查看数据
- `-l` : 基于行的输出，便于你保存查看，或者交给其它工具分析
- `-q` : 简洁地打印输出。即打印很少的协议相关信息, 从而输出行都比较简短.
- `-c` : 捕获 count 个包 tcpdump 就退出
- `-s` : tcpdump 默认只会截取前 `96` 字节的内容，要想截取所有的报文内容，可以使用 `-s number`， `number` 就是你要截取的报文字节数，如果是 0 的话，表示截取报文全部内容。
- `-S` : 使用绝对序列号，而不是相对序列号
- `-C`：file-size，tcpdump 在把原始数据包直接保存到文件中之前, 检查此文件大小是否超过file-size. 如果超过了, 将关闭此文件,另创一个文件继续用于原始数据包的记录. 新创建的文件名与-w 选项指定的文件名一致, 但文件名后多了一个数字.该数字会从1开始随着新创建文件的增多而增加. file-size的单位是百万字节(nt: 这里指1,000,000个字节,并非1,048,576个字节, 后者是以1024字节为1k, 1024k字节为1M计算所得, 即1M=1024 ＊ 1024 ＝ 1,048,576)
- `-F`：使用file 文件作为过滤条件表达式的输入, 此时命令行上的输入将被忽略.

### 4.10 对输出内容进行控制的参数

- `-D` : 显示所有可用网络接口的列表
- `-e` : 每行的打印输出中将包括数据包的数据链路层头部信息
- `-E` : 揭秘IPSEC数据
- `-L` ：列出指定网络接口所支持的数据链路层的类型后退出
- `-Z`：后接用户名，在抓包时会受到权限的限制。如果以root用户启动tcpdump，tcpdump将会有超级用户权限。
- `-d`：打印出易读的包匹配码
- `-dd`：以C语言的形式打印出包匹配码.
- `-ddd`：以十进制数的形式打印出包匹配码

## 5. 过滤规则组合

有编程基础的同学，对于下面三个逻辑运算符应该不陌生了吧

- and：所有的条件都需要满足，也可以表示为 `&&`
- or：只要有一个条件满足就可以，也可以表示为 `||`
- not：取反，也可以使用 `!`

举个例子，我想需要抓一个来自`10.5.2.3`，发往任意主机的3389端口的包

```shell
$ tcpdump src 10.5.2.3 and dst port 3389
```

当你在使用多个过滤器进行组合时，有可能需要用到括号，而括号在 shell 中是特殊符号，因为你需要使用引号将其包含。例子如下：

```shell
$ tcpdump 'src 10.0.2.4 and (dst port 3389 or 22)'
```

而在单个过滤器里，常常会判断一条件是否成立，这时候，就要使用下面两个符号

- `=`：判断二者相等
- `==`：判断二者相等
- `!=`：判断二者不相等

当你使用这两个符号时，tcpdump 还提供了一些关键字的接口来方便我们进行判断，比如

- if：表示网卡接口名、
- proc：表示进程名
- pid：表示进程 id
- svc：表示 service class
- dir：表示方向，in 和 out
- eproc：表示 effective process name
- epid：表示 effective process ID

比如我现在要过滤来自进程名为 `nc` 发出的流经 en0 网卡的数据包，或者不流经 en0 的入方向数据包，可以这样子写

```shell
$ tcpdump "( if=en0 and proc =nc ) || (if != en0 and dir=in)"
```

