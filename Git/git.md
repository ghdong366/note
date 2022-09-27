# Git

[命令汇总](#git命令汇总)

[原理解析](http://www.ruanyifeng.com/blog/2018/10/git-internals.html)

之前用github远程存储，现在想使用码云，但是报错了，当我运行 git push -u origin master后，报用户名或密码不正确

解决:最好让github和gitee两个的用户名相同，因为在config配置易出错

# 1、Git与SVN

svn：集中式的版本分布，SVN采用客户端/服务器体系，项目的各种版本都存储在服务器上，程序开发人员首先将从服务器上获得一份项目的最新版本，并将其复制到本机，然后在此基础上，每个开发人员可以在自己的客户端进行独立的开发工作，并且可以随时将新代码提交给服务器。

<img src="https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/SVN.png" style="zoom: 40%;" />

Git：是分布式版本控制系统，那么它就没有中央服务器的，每个人的电脑就是- -个完整的版本库，这样，工作的时候就不需要联网了

<img src="https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/git.png" style="zoom:40%;" />

# 2、配置

全局配置作者信息

```c
$ git config --global user.name "runoob"
$ git config --global user.email "test@runoob.com"
```

查看所有配置信息

```c
git config --list
```

# 3、工作区、暂存区、版本库

- workspace：工作区
- staging area：暂存区/缓存区
- local repository：版本库或本地仓库
- remote repository：远程仓库

# 4、回滚

日志查看

```c
git log //查看所有本版本之前的版本记录
git reflog //查看所有的版本号
```

==git log后退出==

使用完git log后一直显示一个冒号无法退出 解决方法其实很简单，（英文状态下）输入字母q即可退出

1. 版本回滚

```c
git reset --hard 版本号
```

2. 其他回滚

```c
git checkout -- 文件名
git reset HEAD
```

<img src="https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/三大区.png"  />

# 5、分支

* 查看分支

```c
git branch  //查看所有的分支，和当前的分支（当前为绿色）
```

* 创建分支

```c
git branch 新分支名
```

* 切换分支

```c
git checkout 分支名
```

* 合并分支

```c
注：本过程分两步：
    1.先回到master分支
    2.git merge 要合并的分支名
```

* 删除分支

```c
git branch -d 要删除的分支名
```

### 合并分支的冲突

git 不知道如何处理两个合并分支

解决:手动修改文件内容，然后再提交新版本

***

# 6、github远程仓库

虽然github默认分支为master, 但是建议使用main代替master.所以会有`git branch —M main`代码

* 向远程仓库推送代码

```c
git remote add origin https://github.com/Ge-daye/dbhot.git
git branch -M main
git push -u origin main
```

* 克隆远程仓库代码到本地

```c
git clone URL //内部实现了git remote add origin功能
```

* 拉取远程仓库代码

```c
git pull origin 分支名   //拉取指定的分支到本地
```

### git pull的冲突

git pull有可能会引起冲突，如果有冲突，要手动的改动代码

# 7、多人协同开发

### git flow工作流

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/git flow工作流.png)



### 一个完整的流程

1. 在github创建一个组织，在这个组织中创建一个项目仓库（组织可以有成员，具体仓库也可有开发成员）

2. 本地创建仓库，推动到第一步中的仓库中。

3. 对第一版的代码进行打标签,然后提交该标签到远程仓库

   ```c
   git tag -a 标签名 -m '标签描述'
   
   git push origin --tags
   ```

4. 邀请其他成员

    组织中的成员默认对本组织的代码都是只读的（Settings->Member privileges）

   ![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/github组织邀请成员.png)

   项目中的成员可以设置修改或提交代码的权限

   ![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/github项目邀请成员1.png)

5. 小弟新功能开发

    小组长提前要对开发分支添加规范，

    ![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/分支添加规则.png)

    

    ![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/添加规则.png)

    小弟开发者想要合并到开发分支，要提交一个pull request

    

6. 小组长review(pull request)

    ![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/小组长处理pullrequest.png)

    在线查看修改的代码

    ![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/小组长在线review.png)

7. 删除该新功能的分支

# 8、给开源项目贡献代码

第一步: fork别人的仓库

第二步：在自己的仓库中修改并保存

第三步：给源码作者提交一个pull request

第四步：如果原作者同意，则添加到原作者的代码中

# 9、其他部分

### 配置文件

* 项目配置文件

  ```
  位置：项目根目录\.git\config
  git config --local user.name 'ge-daye'
  git config --local user.email 'XXX@gmain.com'
  ```

* 全局配置文件

  ```
  位置：用户名文件夹下的gitconfig文件。如：    C:\Users\葛*东\.gitconfig
  git config --global user.name 'ge-daye'
  git config --global user.email 'XXX@gmain.com'
  ```

* 系统配置文件

  ```
  位置：etc\.gitconfig
  git config --system user.name 'ge-daye'
  git config --system user.email 'XXX@gmain.com'
  注意:修改需要root权限
  ```

### git免密登录

以SSH的方式

```
1.生成公钥和私钥(默认放在：用户名文件夹下\.ssh)
	终端命令：ssh-keygen
	id_rsa.pub是公钥
	id_rsa是私钥
2.拷贝公钥内容，并设置到github中
	
```

### git忽略文件

让git不在管理某些文件或文件夹

```
*.h         忽略所有的.h文件
!a.h        针对上一条语句，除去a.h
files/      忽略files文件夹下的所有文件
b.py        忽略b.py这个文件
```

更多参考https://github.com/github/gitignore

# 首次将本地代码上传到远程仓库时

这里以上传到github上为例，由于github现在的主分支名字默认是main，所以上传之前需要给master分支重命名。

**本地没有仓库时：**

```shell
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:Ge-daye/linshiadf.git
git push -u origin main
```

**本地已有仓库时：**

```shell
git remote add origin git@github.com:Ge-daye/linshiadf.git
git branch -M main
git push -u origin main
```

> 说明：README文件不要在远程仓库创建时创建，建议在本地项目中创建。



# git命令汇总

| 命令                            | 功能                                                         |
| ------------------------------- | ------------------------------------------------------------ |
| ==配置==                        |                                                              |
| git config                      |                                                              |
| git config  --list              |                                                              |
| ==本地仓库操作==                |                                                              |
| git init                        |                                                              |
| git status                      |                                                              |
| git add                         |                                                              |
| git commit                      |                                                              |
| ==版本回滚==                    |                                                              |
| git log                         |                                                              |
| git reglog                      |                                                              |
| git reset  --hard  版本号       |                                                              |
| git  checkout --  [文件名]      | 加文件名是让已修改但未添加的文件恢复<br />不加文件名查看所有已修改但未添加的文件 |
| ==分支==                        |                                                              |
| git branch                      |                                                              |
| git branch 新分支名             |                                                              |
| git checkout 切换的分支名       |                                                              |
| git merge 合并的分支名          |                                                              |
| git  branch -d 要删除的分支     |                                                              |
| git branch -M 分支名            | 给当前分支重命名                                             |
| ==远程仓库==                    |                                                              |
| git remote add origin  URL      | 本地与远程仓库建立联系，origin相当于该远程仓库的名字         |
| git push                        | 其后不跟参数，默认就是推送本分支                             |
| git push -u origin main         | 推送main分支的代码到远端                                     |
| git clone                       | 克隆远程仓库到本地                                           |
| git pull origin 分支名          | 拉取指定的分支到本地                                         |
|                                 |                                                              |
| git tag -a 标签名 -m '标签描述' | 对本次的版本打标签                                           |
| git push origin --tags          | 标签同步到远程仓库                                           |



