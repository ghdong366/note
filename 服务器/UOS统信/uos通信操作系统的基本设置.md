## 镜像下载

专业版下载链接：https://www.chinauos.com/resource/download-professional

## 开启root用户权限

第一步：首先需要在系统设置中开启“开发者模式”

第二步：用当前用户给root用户设置密码

````shell
sudo passwd root
````

![image-20221025112045547](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/imags/image-20221025112045547.png)

## 开启ssh并使用root用户连接

第一步：确保系统已经处于”开发者模式“

第二步：开启ssh服务，并且设置开机自启

```shell
 systemctl start ssh
 systemctl enable ssh
```

这个时候，可以使用其他用户远程连接，但是root还不能直接连接，因为系统禁用了root远程连接。如果使用root连接会出现访问被拒绝

![image-20221025140352408](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/imags/image-20221025140352408.png)

第三步：修改ssh配置文件

修改`/etc/ssh/sshd_config`配置文件，开放root远程登录权限

<img src="C:\Users\Admin\Pictures\typora\image-20221025140937128.png" alt="image-20221025140937128" style="zoom: 67%;" />

第四步：重启生效

> 其实有一种曲线救国的办法：
>
> 不直接开启root的ssh,而是使用其他用户登录，然后su到root用户。