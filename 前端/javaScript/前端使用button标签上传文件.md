# 使用\<button>标签来上传文件

最近在做关于文件上传的功能，在html5中最直接的就是使用的就是`<input type="file">`,你或许会疑惑：现成的组件库你不用，干嘛要自己费这个劲。说得好！确实现在每个组件库都有精美的上传相关的组件可以直接拿来使用。

这样的：

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/image-20220414151256523.png)

或者这样的：

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/image-20220414151328571.png)

再或者这样的：

![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/image-20220414151703668.png)

在开发中我们直接拿来用没有问题，但是我们今天不谈论如何使用这些组件。而是关注他们是如何实现的。

你或许忽略了一个问题。如果你检查元素，就会发现这些个组件使用的标签***不是***`<input>`,而是`<button>`。乍一听，有点不可能是吧，button怎么可以作为表单项提交？但其实原理很简单，

我们先来看看是如何实现这个功能的。注意，这里的“不是”并不是真的不是，是将`<input>`隐藏起来。不废话，直接上代码

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>测试使用button标签上传文件</title>
<script type="text/javascript">
function F_Open() 
{ 
     document.getElementById("file").click(); 
} 

</script>
</head>
<body>
<div>
<input type="file" id="file" style="display:none">
<button type="button" onclick="F_Open()">选择文件</button>
</div>

</body>
</html>
```

可以看出，其实input标签一直存在，它只不过不显示出来而已。点击button的时候去触发input的点击事件。这样，就能选择本地文件进行上传了。

那我们再回到问题本身上来，为什么要这么做呢，我直接用input不好吗。答案肯定是不好，要不然人家框架就这样做了。

那为什么要隐藏起来呢？

1. **长得丑，而且丑的无法修复**。这里可以和button对比一下（同时设置了背景色、高度、字体大小）。不仅多了不必要的提醒，而且还没有办法修改样式。

   ![](https://geda-1302176138.cos.ap-nanjing.myqcloud.com/img/image-20220414161433757.png)

2. **可以被禁用**。在某些场景中，如果不满足条件我们可能不想让用户上传文件，这个时候就需要去禁用。但是input没法直接被禁用，而button按钮禁用就简单的多了，直接添加一个disabled属性就可以了。

所以，到此问题就比较清楚了。当我们手动去实现一个上传的组件时，使用button标签就十分重要了。